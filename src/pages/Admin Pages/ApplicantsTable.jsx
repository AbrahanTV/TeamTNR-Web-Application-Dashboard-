import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import { DUMMY_APPLICANTS } from "/src/data/dummyData.js";
import "/src/styles/tables.css";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState(DUMMY_APPLICANTS);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplicants = applicants.filter((app) => {
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    const email = (app.email || "").toLowerCase();
    const id = (app.id || "").toString().toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) || email.includes(search) || id.includes(search)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplicants.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant?")) {
      return;
    }
    setApplicants((prev) => prev.filter((applicant) => applicant.id !== id));
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Applicants</h1>
        <p>Manage and review all application submissions.</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-btn"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="table-card">
        {filteredApplicants.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip Code</th>
                    <th>Preferred Contact</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>
                        <div className="table-name">
                          <div className="avatar">
                            {applicant.firstName.charAt(0)}
                            {applicant.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="name-text">
                              {applicant.firstName} {applicant.lastName}
                            </p>
                            <p className="id-text text-black">
                              ID: {applicant.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{applicant.dob || "N/A"}</td>
                      <td>{applicant.email || "N/A"}</td>
                      <td>{applicant.phoneNumber || "N/A"}</td>
                      <td>{applicant.street || "N/A"}</td>
                      <td>{applicant.city || "N/A"}</td>
                      <td>{applicant.state || "N/A"}</td>
                      <td>{applicant.zipCode || "N/A"}</td>
                      <td>{applicant.preferredContact || "N/A"}</td>
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
