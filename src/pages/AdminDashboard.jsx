import {
  DUMMY_APPLICANTS,
  DUMMY_HOUSEHOLDS,
  DUMMY_RESIDENTS,
  DUMMY_PETS,
} from "/src/data/dummyData.js";
import "../styles/dashboard.css";
import { Link } from "react-router";

const stats = {
  applicants: DUMMY_APPLICANTS.length,
  households: DUMMY_HOUSEHOLDS.length,
  residents: DUMMY_RESIDENTS.length,
  pets: DUMMY_PETS.length,
};

const AdminDashboard = () => {
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
        <div className="dashboard-card recent-applications">
          <div className="card-header">
            <h2>Recent Applications</h2>
            <span className="badge">{DUMMY_APPLICANTS.length}</span>
          </div>
          <div className="applications-list">
            {DUMMY_APPLICANTS.map((app, index) => (
              <Link
                key={index}
                to={`/admin/applicants/${app.id}`}
                className="text-decoration-none"
              >
                <div className="application-item">
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
            ))}
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
