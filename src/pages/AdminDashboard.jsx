import { useEffect, useState } from "react";
import { fetchApplicants } from "/api/applicants";
import { fetchHouseholds } from "/api/households";
import { fetchResidents } from "/api/residents";
import { fetchPets } from "/api/pets";
import "../styles/dashboard.css";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    applicants: 0,
    households: 0,
    residents: 0,
    pets: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentApplicants, setRecentApplicants] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchApplicants(),
      fetchHouseholds(),
      fetchResidents(),
      fetchPets(),
    ])
      .then(([applicantData, householdData, residentData, petData]) => {
        setStats({
          applicants: applicantData.length,
          households: householdData.length,
          residents: residentData.length,
          pets: petData.length,
        });
        setRecentApplicants(applicantData.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your application overview.</p>
      </div>

      {/* Bento Grid Content */}
      <div className="dashboard-grid">
        {/* Recent Applications - Wider Card */}
        <div className="dashboard-card recent-applications ">
          <div className="card-header">
            <h2>Recent Applications</h2>
            <span className="badge">{recentApplicants.length}</span>
          </div>
          <div className="applications-list">
            {recentApplicants.length > 0 ? (
              recentApplicants.map((app, index) => (
                <Link
                  to={`/admin/applicants/${app.id}`}
                  className="text-decoration-none"
                >
                  <div key={index} className="application-item">
                    <div className="app-avatar">
                      {app.firstName.charAt(0)}
                      {app.lastName.charAt(0)}
                    </div>
                    <div className="app-info">
                      <h4>
                        {app.firstName} {app.lastName}
                      </h4>
                      <p>{app.email || "No email"}</p>
                    </div>
                    <div className="app-date">
                      <small>{app.dateOfSubmission || "N/A"}</small>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-data">No recent applications</p>
            )}
          </div>
        </div>

        {/* Applicants Widget */}
        <Link to="/admin/applicants" className="text-decoration-none">
          <div className="dashboard-card applicants-widget">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.applicants}</h3>
              <p>Total Applicants</p>
            </div>
          </div>
        </Link>

        {/* Action Cards */}
        {/* <div className="dashboard-card actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span className="btn-icon">+</span>
              New Applicant
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">📊</span>
              View Reports
            </button>
            <button className="action-btn tertiary">
              <span className="btn-icon">⚙️</span>
              Settings
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
