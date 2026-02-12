import { useEffect, useState } from "react";
import { fetchAgreement } from "/api/agreement";
import { fetchApplicants } from "/api/applicants";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "/src/components/Pagination.jsx";
import "/src/styles/applicants-table.css";

const AgreementTable = () => {
  const [agreements, setAgreements] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agreements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(agreements.length / itemsPerPage);

  useEffect(() => {
    Promise.all([fetchAgreement(), fetchApplicants()])
      .then(([agreementData, applicantsData]) => {
        setAgreements(agreementData);
        setApplicants(applicantsData);
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
        <p>Loading agreements...</p>
      </div>
    );
  if (error)
    return (
      <div className="table-error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="table-container">
      <div className="table-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <h1>Agreements</h1>
        <p>Manage and review all agreement submissions.</p>
      </div>

      <div className="table-card">
        {agreements.length > 0 ? (
          <>
            <div className="table-wrapper">
              <table className="my-table overflow-hidden table-responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Applicant ID</th>
                    <th>Agreed</th>
                    <th>Signature</th>
                    <th>Signed Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((agreement) => {
                    return (
                      <tr key={agreement.id}>
                        <td>{agreement.id}</td>
                        <td>{agreement.applicantId}</td>
                        <td>{agreement.agreed ? "Yes" : "No"}</td>
                        <td>{agreement.signature}</td>
                        <td>
                          {new Date(agreement.signedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              to={`/admin/applicants/${agreement.applicantId}`}
                              className="btn-view"
                            >
                              View
                            </Link>
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
            <p>No agreements found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgreementTable;
