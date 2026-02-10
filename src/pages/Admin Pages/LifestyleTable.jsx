import { useEffect, useState } from "react";
import { fetchLifestyle } from "/api/lifestyle";
import { fetchHouseholds } from "/api/households";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";

const LifestyleTable = () => {
  const [lifestyle, setLifestyle] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lifestyle.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(lifestyle.length / itemsPerPage);

  useEffect(() => {
    Promise.all([fetchLifestyle(), fetchHouseholds()])
      .then(([lifestyleData, householdsData]) => {
        setLifestyle(lifestyleData);
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
        {lifestyle.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden table-responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Household ID</th>
                    <th>Will you declaw?</th>
                    <th>Plan if you move</th>
                    <th>Are you financially stable?</th>
                    <th>Who will take care of the cat?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((lifestyle) => {
                    return (
                      <tr key={lifestyle.id}>
                        <td>{lifestyle.id}</td>
                        <td>{lifestyle.householdId}</td>
                        <td>{lifestyle.declaw ? "Yes" : "No"}</td>
                        <td>{lifestyle.movePlan}</td>
                        <td>{lifestyle.financiallyStable ? "Yes" : "No"}</td>
                        <td>{lifestyle.catCare}</td>

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
            <p>No lifestyle found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifestyleTable;
