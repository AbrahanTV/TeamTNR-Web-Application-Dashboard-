import { useEffect, useState } from "react";
import { fetchResidents, deleteResidents } from "../../../api/residents";
import Pagination from "/src/components/Pagination.jsx";

const ResidentsTable = () => {
  const [resident, setResident] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  });

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
    <>
      <h1>Residents</h1>
      <table className="table table-responsive table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Household ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Relationship</th>
            <th>Cat Allergies</th>
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
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(resident.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </table>
    </>
  );
};

export default ResidentsTable;
