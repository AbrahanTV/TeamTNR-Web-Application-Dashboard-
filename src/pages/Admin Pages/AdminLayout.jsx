import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
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
          <Link to="applicants">Applicants</Link>
          <Link to="household">Household</Link>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
