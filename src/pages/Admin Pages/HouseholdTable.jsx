import { useEffect, useState } from "react";
import { fetchHouseholds, deleteHouseholds } from "/api/households";

const HouseholdTable = () => {
  const [household, setHousehold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHouseholds()
      .then((data) => {
        setHousehold(data);
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
    if (!window.confirm("Are you sure you want to delete this applicant?")) {
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
      <h1>Applicants</h1>
      <table className="table table-responsive table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone Number</th>
            <th>Preferred Contact</th>
            <th>Date of Submission</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {household.map((householdMember, index) => (
            <tr key={householdMember.id}>
              <td>{index + 1}</td>
              <td>household</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(householdMember.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HouseholdTable;
