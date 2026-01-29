import { useEffect, useState } from "react";
import { fetchApplicants, deleteApplicant } from "/api/applicants";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  if (loading)
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading applicants...</p>
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p>{error}</p>
      </div>
    );

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
    <div className="applicants-container">
      <div className="applicants-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Applicants</h1>
        <p>Manage and review all application submissions.</p>
      </div>

      <div className="applicants-card">
        {applicants.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="applicants-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>
                        <div className="applicant-name">
                          <div className="avatar">
                            {applicant.firstName.charAt(0)}
                            {applicant.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="name-text">
                              {applicant.firstName} {applicant.lastName}
                            </p>
                            <p className="id-text">ID: {applicant.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>{applicant.email || "N/A"}</td>
                      <td>{applicant.phoneNumber || "N/A"}</td>
                      <td>{applicant.city || "N/A"}</td>
                      <td>{applicant.state || "N/A"}</td>
                      <td>{applicant.dateOfSubmission || "N/A"}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/applicants/${applicant.id}`}
                            className="btn-view"
                          >
                            View
                          </Link>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(applicant.id)}
                          >
                            Delete
                          </button>
                        </div>
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
            <p>No applicants found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsTable;
