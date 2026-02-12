import { useEffect, useState } from "react";
import { fetchReferences } from "/api/references";
import { fetchHouseholds } from "/api/households";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";

const ReferencesTable = () => {
  const [references, setReferences] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = references.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(references.length / itemsPerPage);

  useEffect(() => {
    Promise.all([fetchReferences(), fetchHouseholds()])
      .then(([referencesData, householdsData]) => {
        setReferences(referencesData);
        setHouseholds(householdsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading pets...</p>
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="table-container">
      <div className="table-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Pets</h1>
        <p>Manage and review all pet submissions and preferences.</p>
      </div>

      <div className="table-card">
        {references.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden table-responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Household ID</th>
                    <th>Reference Name</th>
                    <th>Reference Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((references) => {
                    return (
                      <tr key={references.id}>
                        <td>{references.id}</td>
                        <td>{references.householdId}</td>
                        <td>{references.referenceName}</td>
                        <td>
                          <a href={`tel:${references.referencePhone}`}>
                            {references.referencePhone}
                          </a>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {/* <Link
                              to={`/admin/applicants/${householdToApplicant[pet.householdId]}`}
                              className="btn-view"
                            >
                              View
                            </Link> */}
                            {/* <button
                              className="btn-delete"
                              onClick={() => handleDelete(pet.id)}
                            >
                              Delete
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
            <p>No references found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesTable;
