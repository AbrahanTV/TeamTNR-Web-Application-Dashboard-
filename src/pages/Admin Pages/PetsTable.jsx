import { useEffect, useState } from "react";
import { fetchPets, deletePets } from "/api/pets";
import { fetchHouseholds } from "/api/households";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";

const PetsTable = () => {
  const [pets, setPets] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const householdToApplicant = households.reduce((acc, h) => {
    acc[h.id] = h.applicantId;
    return acc;
  }, {});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const normalizePets = (pet) => ({
    ...pet,
    vetName: pet.vetName?.trim() || "N/A",
    vetPhone: pet.vetPhone?.trim() || "N/A",
    hasCurrentPets: pet.hasCurrentPets ? "Yes" : "No",
    hadPreviousPets: pet.hadPreviousPets ? "Yes" : "No",
    contactVet: pet.contactVet ? "Yes" : "No",
    preferenceAge: pet.preferenceAge?.trim() || "",
    preferenceGender: pet.preferenceGender?.trim() || "",
  });

  useEffect(() => {
    Promise.all([fetchPets(), fetchHouseholds()])
      .then(([petsData, householdsData]) => {
        const normalized = petsData.map(normalizePets);
        setPets(normalized);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) {
      return;
    }

    try {
      await deletePets(id);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
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
        <h1>Pets</h1>
        <p>Manage and review all pet submissions and preferences.</p>
      </div>

      <div className="table-card">
        {pets.length > 0 ? (
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
                  {currentItems.map((pet) => {
                    const bothEmpty =
                      !pet.preferenceAge && !pet.preferenceGender;
                    const displayAge = bothEmpty
                      ? "N/A"
                      : pet.preferenceAge || "N/A";
                    const displayGender = bothEmpty
                      ? "N/A"
                      : pet.preferenceGender || "N/A";
                    const noPrefDisplay = bothEmpty
                      ? "N/A"
                      : pet.noPreference
                        ? "Yes"
                        : "No";

                    return (
                      <tr key={pet.id}>
                        <td>{pet.id}</td>
                        <td>{pet.householdId}</td>
                        <td>{pet.hasCurrentPets}</td>
                        <td>{pet.hadPreviousPets}</td>
                        <td>{pet.vetName}</td>
                        <td>{pet.vetPhone}</td>
                        <td>{pet.contactVet}</td>
                        <td>{displayAge}</td>
                        <td>{displayGender}</td>
                        <td>{noPrefDisplay}</td>
                        <td>{pet.personalityTraits || "N/A"}</td>
                        <td>{pet.whyAdopt || "N/A"}</td>
                        <td>{pet.catLivingArrangement || "N/A"}</td>
                        <td>{pet.catStayWhenAway || "N/A"}</td>
                        <td>{pet.hoursAlone || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              to={`/admin/applicants/${householdToApplicant[pet.householdId]}`}
                              className="btn-view"
                            >
                              View
                            </Link>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(pet.id)}
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

export default PetsTable;
