import { useEffect, useState } from "react";
import { fetchHouseholds, deleteHouseholds } from "/api/households";
import Pagination from "/src/components/Pagination.jsx";

const HouseholdTable = () => {
  const [household, setHousehold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
    <>
      <h1>Households</h1>
      <table className="table table-responsive table-striped table-bordered">
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
            <th>View</th>
            <th>Details</th>
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
                <a href={`/admin/residents`}>View</a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(household.id)}
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

export default HouseholdTable;
