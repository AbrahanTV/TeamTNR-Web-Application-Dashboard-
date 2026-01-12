import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <style>
        {`
          .layout {
            display: flex;
            height: 100vh;
          }

          .sidebar {
            width: 240px;
            background-color: #6c4bb8;
            color: white;
            padding: 1rem;
          }

          .sidebar a {
            display: block;
            color: white;
            text-decoration: none;
            margin-top: 1rem;
          }

          .sidebar a:hover {
            text-decoration: underline;
          }

          .content {
            flex: 1;
            padding: 2rem;
          }
        `}
      </style>

      <div className="layout">
        <aside className="sidebar">
          <h1 className="text-center">Admin Panel</h1>
          <Link to="/">Go Home</Link>
          <Link to="/applicants">Applicants</Link>
        </aside>

        <main className="content">
          <h2>Welcome Admin</h2>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
