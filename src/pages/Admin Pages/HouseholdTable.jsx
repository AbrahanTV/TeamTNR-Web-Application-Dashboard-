import { useEffect, useState } from "react";
import { fetchHouseholds, deleteHouseholds } from "/api/households";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/tables.css";

const HouseholdTable = () => {
  const [household, setHousehold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = household.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(household.length / itemsPerPage);

  const normalizeHousehold = (household) => ({
    ...household,
    landlordName: household.landlordName?.trim() || "No landlord",
    landlordEmail: household.landlordEmail?.trim() || "N/A",
    landlordPhone: household.landlordPhone?.trim() || "N/A",
  });

  useEffect(() => {
    fetchHouseholds()
      .then((data) => {
        const normalized = data.map(normalizeHousehold);
        setHousehold(normalized);
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
        <div className="spinner"></div>
        <p>Loading households...</p>;
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p className="text-danger">{error}</p>
      </div>
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this household?")) {
      return;
    }

    try {
      await deleteHouseholds(id);
      setHousehold((prev) => prev.filter((household) => household.id !== id));
    } catch (err) {
      alert("Failed to delete household member");
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <button
          onClick={() => navigate("/admin")}
          className="back-btn-small mb-2"
        >
          ← Back
        </button>
        <h1>Households</h1>
        <p>Manage and review all application submissions.</p>
      </div>

      <div className="table-card">
        {household.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Applicant ID</th>
                    <th>Landlord Name</th>
                    <th>Landlord Email</th>
                    <th>Landlord Phone</th>
                    <th>Months At Address</th>
                    <th>Pets Allowed</th>
                    <th>Rent or Own</th>
                    <th>Residence Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((household) => (
                    <tr key={household.id}>
                      <td>{household.id}</td>
                      <td>{household.applicantId}</td>
                      <td>{household.landlordName}</td>
                      <td>{household.landlordEmail}</td>
                      <td>{household.landlordPhone}</td>
                      <td>{household.monthsAtAddress}</td>
                      <td>{household.petsAllowed ? "Yes" : "No"}</td>
                      <td>{household.rentOwn}</td>
                      <td>{household.residenceType}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/applicants/${household.applicantId}`}
                            className="btn-view"
                          >
                            View
                          </Link>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(household.id)}
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
            <p>No households found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdTable;
