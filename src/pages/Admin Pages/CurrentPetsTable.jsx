import { useEffect, useState } from "react";
import { fetchCurrentPets, deleteCurrentPets } from "/api/currentPets";
import { fetchHouseholds } from "/api/households";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";
const CurrentPetsTable = () => {
  const [currentPets, setCurrentPets] = useState([]);
  const [households, setHouseholds] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentPets.length / itemsPerPage);

  /* const householdToApplicant = households.reduce((acc, h) => {
    acc[h.id] = h.applicantId;
    return acc;
  }, {}); */

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchCurrentPets(), fetchHouseholds()])
      .then(([currentPetsData, householdsData]) => {
        setCurrentPets(currentPetsData);
        setHouseholds(householdsData);
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
        <p>Loading pets...</p>
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p>{error}</p>
      </div>
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) {
      return;
    }

    try {
      await deleteCurrentPets(id);
      setCurrentPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      alert("Failed to delete pet");
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Current Pets</h1>
        <p>Manage and review all pet submissions and preferences.</p>
      </div>

      <div className="table-card">
        {currentPets.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Household ID</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Vaccinated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((pet) => (
                    <tr key={pet.id}>
                      <td>{pet.id}</td>
                      <td>{pet.householdId}</td>
                      <td>{pet.petBreed}</td>
                      <td>{pet.petAge}</td>
                      <td>{pet.petStatus}</td>
                      <td>{pet.petVaccinated ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(pet.id)}
                        >
                          Delete
                        </button>
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
            <p>No pets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPetsTable;
