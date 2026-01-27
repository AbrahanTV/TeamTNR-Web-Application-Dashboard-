import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplicants } from "/api/applicants";
import { fetchHouseholds } from "/api/households";
import { fetchResidents } from "/api/residents";
import "/src/styles/applicant-detail.css";

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [household, setHousehold] = useState(null);
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchApplicants(), fetchHouseholds(), fetchResidents()])
      .then(([applicantData, householdData, residentData]) => {
        const foundApplicant = applicantData.find((a) => a.id == id);
        const foundHousehold = householdData.find((h) => h.applicantId == id);
        const foundResident = residentData.find((r) => r.householdId == id);

        if (!foundApplicant) {
          setError("Applicant not found");
          setLoading(false);
          return;
        }

        setApplicant(foundApplicant);
        if (foundHousehold) setHousehold(foundHousehold);
        if (foundResident) setResident(foundResident);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading applicant details...</p>
      </div>
    );

  if (error)
    return (
      <div className="detail-error">
        <h2>⚠️ {error}</h2>
        <button onClick={() => navigate("/admin")} className="back-btn">
          Back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="applicant-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <div className="header-title">
          <h1>
            {applicant?.firstName} {applicant?.lastName}
          </h1>
          <p>Application ID: {applicant?.id}</p>
        </div>
      </div>

      <div className="detail-grid">
        {applicant && (
          <div className="detail-card applicant-main">
            <div className="card-header-detail">
              <h2>📋 Personal Information</h2>
              <span className="status-badge">Active</span>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Full Name</label>
                  <p>
                    {applicant.firstName} {applicant.lastName}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Application ID</label>
                  <p>{applicant.id}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Date of Birth</label>
                  <p>{applicant.dob}</p>
                </div>
                <div className="detail-field">
                  <label>Preferred Contact</label>
                  <p>{applicant.preferredContact}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field full-width">
                  <label>Address</label>
                  <p>
                    {applicant.street}, {applicant.city}, {applicant.state}{" "}
                    {applicant.zipCode}
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Phone</label>
                  <p>
                    <a href={`tel:${applicant.phoneNumber}`} className="link">
                      {applicant.phoneNumber}
                    </a>
                  </p>
                </div>
                <div className="detail-field">
                  <label>Email</label>
                  <p>
                    <a href={`mailto:${applicant.email}`} className="link">
                      {applicant.email || "N/A"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field full-width">
                  <label>Submission Date</label>
                  <p>{applicant.dateOfSubmission}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {household ? (
          <div className="detail-card household-card">
            <div className="card-header-detail">
              <h2>🏠 Household Information</h2>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Household ID</label>
                  <p>{household.id}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Months at Address</label>
                  <p>{household.monthsAtAddress || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Rent or Own</label>
                  <p className="badge-inline">{household.rentOwn || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Pets Allowed</label>
                  <p>{household.petsAllowed ? "✅ Yes" : "❌ No"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No household information available</p>
          </div>
        )}

        {resident ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>👤 Resident Information</h2>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Resident ID</label>
                  <p>{resident.id}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>First Name</label>
                  <p>{resident.firstName}</p>
                </div>
                <div className="detail-field">
                  <label>Last Name</label>
                  <p>{resident.lastName}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field full-width">
                  <label>Date of Birth</label>
                  <p>{resident.dob || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No resident information available</p>
          </div>
        )}

        <div className="detail-card actions-card">
          <h2>⚡ Quick Actions</h2>
          <div className="action-list">
            <button className="action-item edit">✏️ Edit</button>
            <button className="action-item approve">✅ Approve</button>
            <button className="action-item reject">❌ Reject</button>
            <button className="action-item print">🖨️ Print</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
