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

      {/* Stats Grid */}
      <div className="stats-grid">
        <Link to="/admin/applicants" className="text-decoration-none">
          <div className="stat-card applicants">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.applicants}</h3>
              <p>Total Applicants</p>
            </div>
          </div>
        </Link>

        <div className="stat-card households">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>{stats.households}</h3>
            <p>Households</p>
          </div>
        </div>

        <div className="stat-card residents">
          <div className="stat-icon">👫</div>
          <div className="stat-content">
            <h3>{stats.residents}</h3>
            <p>Total Residents</p>
          </div>
        </div>

        <div className="stat-card pets">
          <div className="stat-icon">🐾</div>
          <div className="stat-content">
            <h3>{stats.pets}</h3>
            <p>Registered Pets</p>
          </div>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="dashboard-grid">
        {/* Recent Applications - Wider Card */}
        <div className="dashboard-card recent-applications">
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

        {/* Quick Stats */}
        <div className="dashboard-card quick-stats">
          <h2>Quick Stats</h2>
          <div className="stat-item">
            <label>Approval Rate</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: "75%" }}></div>
            </div>
            <span>75%</span>
          </div>
          <div className="stat-item">
            <label>Completion Rate</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: "92%" }}></div>
            </div>
            <span>92%</span>
          </div>
          <div className="stat-item">
            <label>Active Cases</label>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>
            <span>60%</span>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-card system-status">
          <h2>System Status</h2>
          <div className="status-items">
            <div className="status-item online">
              <span className="status-dot"></span>
              <div>
                <p className="status-label">Database</p>
                <p className="status-value">Online</p>
              </div>
            </div>
            <div className="status-item online">
              <span className="status-dot"></span>
              <div>
                <p className="status-label">API Server</p>
                <p className="status-value">Healthy</p>
              </div>
            </div>
            <div className="status-item online">
              <span className="status-dot"></span>
              <div>
                <p className="status-label">Storage</p>
                <p className="status-value">Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="dashboard-card actions">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
