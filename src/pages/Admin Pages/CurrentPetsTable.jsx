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

  const householdToApplicant = households.reduce((acc, h) => {
    acc[h.id] = h.applicantId;
    return acc;
  }, {});

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
                    <th>Current Pets</th>
                    <th>Past Pets</th>
                    <th>Vet Name</th>
                    <th>Vet Phone</th>
                    <th>Can contact Vet?</th>
                    <th>Cat Age</th>
                    <th>Cat Gender</th>
                    <th>No preference</th>
                    <th>Personality</th>
                    <th>Adoption Reason</th>
                    <th>Living Environment</th>
                    <th>Stay When Away?</th>
                    <th>Hours Alone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((currentPet) => {
                    const bothEmpty =
                      !currentPet.preferenceAge && !currentPet.preferenceGender;
                    const displayAge = bothEmpty
                      ? "N/A"
                      : currentPet.preferenceAge || "N/A";
                    const displayGender = bothEmpty
                      ? "N/A"
                      : currentPet.preferenceGender || "N/A";
                    const noPrefDisplay = bothEmpty
                      ? "N/A"
                      : currentPet.noPreference
                        ? "Yes"
                        : "No";

                    return (
                      <tr key={currentPet.id}>
                        <td>{currentPet.id}</td>
                        <td>{currentPet.householdId}</td>
                        <td>{currentPet.hasCurrentcurrentPets}</td>
                        <td>{currentPet.hadPreviouscurrentPets}</td>
                        <td>{currentPet.vetName}</td>
                        <td>{currentPet.vetPhone}</td>
                        <td>{currentPet.contactVet}</td>
                        <td>{displayAge}</td>
                        <td>{displayGender}</td>
                        <td>{noPrefDisplay}</td>
                        <td>{currentPet.personalityTraits || "N/A"}</td>
                        <td>{currentPet.whyAdopt || "N/A"}</td>
                        <td>{currentPet.catLivingArrangement || "N/A"}</td>
                        <td>{currentPet.catStayWhenAway || "N/A"}</td>
                        <td>{currentPet.hoursAlone || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              to={`/admin/applicants/${householdToApplicant[currentPet.householdId]}`}
                              className="btn-view"
                            >
                              View
                            </Link>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(currentPet.id)}
                            >
                              Delete
                            </button>
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
            <p>No pets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPetsTable;
