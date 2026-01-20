import { useEffect, useState } from "react";
import { fetchApplicants, deleteApplicant } from "/api/applicants";
import Pagination from "/src/components/Pagination.jsx";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applicants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(applicants.length / itemsPerPage);

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
            <th>View</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.id}</td>
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
                <a href={`/admin/households`}>View</a>
              </td>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ApplicantsTable;
