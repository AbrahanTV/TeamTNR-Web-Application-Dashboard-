import { useEffect, useState } from "react";
import { fetchPets, deletePets } from "/api/pets";
import { fetchHouseholds } from "/api/households";
import Pagination from "/src/components/Pagination.jsx";

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

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
    <>
      <h1>Pets</h1>
      <table className="table table-responsive table-striped table-bordered">
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
            <th>Personality</th>
            <th>Adoption Reason</th>
            <th>Living Environment</th>
            <th>Stay When Away?</th>
            <th>Hours Alone</th>
            <th>View</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.householdId}</td>
              <td>{pet.hasCurrentPets}</td>
              <td>{pet.hadPreviousPets}</td>
              <td>{pet.vetName}</td>
              <td>{pet.vetPhone}</td>
              <td>{pet.contactVet}</td>
              <td>{pet.preferenceAge}</td>
              <td>{pet.preferenceGender}</td>
              <td>{pet.personalityTraits}</td>
              <td>{pet.whyAdopt}</td>
              <td>{pet.catLivingArrangement}</td>
              <td>{pet.catStayWhenAway}</td>
              <td>{pet.hoursAlone}</td>
              <td>
                <a
                  href={`/admin/applicants/${householdToApplicant[pet.householdId]}`}
                >
                  View
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(pet.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default PetsTable;
