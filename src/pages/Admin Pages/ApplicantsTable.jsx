import { useEffect, useState } from "react";
import { fetchApplicants, deleteApplicant } from "/api/applicants";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicants()
      .then((data) => {
        setApplicants(data);
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
      await deleteApplicant(id);
      setApplicants((prev) => prev.filter((applicant) => applicant.id !== id));
    } catch (err) {
      alert("Failed to delete applicant");
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
          {applicants.map((applicant, index) => (
            <tr key={applicant.id}>
              <td>{index + 1}</td>
              <td>{applicant.firstName}</td>
              <td>{applicant.lastName}</td>
              <td>{applicant.dob}</td>
              <td>{applicant.street}</td>
              <td>{applicant.city}</td>
              <td>{applicant.state}</td>
              <td>{applicant.zipCode}</td>
              <td>{applicant.phoneNumber}</td>
              <td>{applicant.preferredContact}</td>
              <td>{applicant.dateOfSubmission}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(applicant.id)}
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

export default ApplicantsTable;
