import { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const sidebarRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  function toggleSidebar() {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("sidebar-close");
      setIsSidebarHidden(!isSidebarHidden);
    }
  }

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
            transition: width 0.1s ease-in-out, padding 0.1s ease-in-out;
            overflow: hidden;
          }

          .sidebar-close {
            width: 0;
            padding: 0;
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
            /* padding: 2rem; */
          }

          .w-fit {
            width: fit-content;
          }

          .toggle-btn {
          background-color: #5a3d99;
            /* background-color: #6c4bb8; */
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 4px;
            font-size: 1rem;
            margin: 1rem;
            position: absolute;
            top: 0;
            right: 0;
          }

          .toggle-btn:hover {
            background-color: #5a3d99;
          }
        `}
      </style>

      <div className="layout">
        <aside className="sidebar" ref={sidebarRef}>
          <button className="toggle-btn bg-secondary" onClick={toggleSidebar}>
            {isSidebarHidden ? "Show Menu" : "Hide Menu"}
          </button>
          <h1 className="text-center">Admin Panel</h1>
          <Link to="/" className="w-fit">
            Go Home
          </Link>
          <Link to="applicants" className="w-fit">
            Applicants
          </Link>
          <Link to="households" className="w-fit">
            Households
          </Link>
          <Link to="residents" className="w-fit">
            Residents
          </Link>
          <Link to="pets" className="w-fit">
            Pets
          </Link>
          <Link to="current_pets" className="w-fit">
            Current Pets
          </Link>
          <Link to="lifestyle" className="w-fit">
            Lifestyle
          </Link>
          <Link to="references" className="w-fit">
            References
          </Link>
          <Link to="agreement" className="w-fit">
            Agreement
          </Link>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
