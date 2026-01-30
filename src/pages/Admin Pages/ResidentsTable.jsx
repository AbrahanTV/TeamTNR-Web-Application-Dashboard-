import { useEffect, useState } from "react";
import { fetchResidents, deleteResidents } from "../../../api/residents";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/tables.css";

const ResidentsTable = () => {
  const [resident, setResident] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = resident.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(resident.length / itemsPerPage);

  useEffect(() => {
    fetchResidents()
      .then((data) => {
        setResident(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="table-loading">
        <p>Loading applicants...</p>
        <div className="spinner"></div>
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p className="text-danger">{error}</p>
      </div>
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resident?")) {
      return;
    }

    try {
      await deleteResidents(id);
      setResident((prev) => prev.filter((resident) => resident.id !== id));
    } catch (err) {
      alert("Failed to delete resident");
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Residents</h1>
        <p>Manage and review all application submissions.</p>
      </div>

      <div className="table-card">
        {resident.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Household ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Relationship</th>
                    <th>Cat Allergies</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((resident) => (
                    <tr key={resident.id}>
                      <td>{resident.id}</td>
                      <td>{resident.householdId}</td>
                      <td>{resident.memberName}</td>
                      <td>{resident.age}</td>
                      <td>{resident.relationship}</td>
                      <td>{resident.catAllergies ? "Yes" : "No"}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`admin.applicants${resident.id}`}
                            className="btn-view"
                          >
                            View
                          </Link>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(resident.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <div className="no-applicants">
            <p>No residents found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentsTable;
