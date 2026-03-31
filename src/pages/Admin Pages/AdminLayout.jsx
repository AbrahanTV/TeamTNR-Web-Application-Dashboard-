import { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";
// import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const sidebarRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  // const { user, logout, loading } = useAuth();
  // const navigate = useNavigate();

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [user, loading, navigate]);

  function toggleSidebar() {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("sidebar-close");
      setIsSidebarHidden(!isSidebarHidden);
    }
  }

  // function handleLogout() {
  //   googleLogout();
  //   logout();
  //   navigate("/login");
  // }

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
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .sidebar-close {
            width: 0;
            padding: 0;
          }

          .sidebar-close ~ .content {
            margin-left: 0;
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
            margin-left: 240px;
            overflow-y: auto;
            height: 100vh;
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
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
          }

          .toggle-btn:hover {
            background-color: #5a3d99;
          }

          .user-profile {
            margin-top: auto;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid white;
          }

          .user-details {
            flex: 1;
            overflow: hidden;
          }

          .user-name {
            font-weight: 600;
            font-size: 0.9rem;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-email {
            font-size: 0.75rem;
            margin: 0;
            opacity: 0.8;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .logout-btn {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid white;
            padding: 0.6rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }

          .logout-btn:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        `}
      </style>

      <div className="layout">
        <button
          className="toggle-btn bg-secondary me-4"
          onClick={toggleSidebar}
        >
          {isSidebarHidden ? "Show Menu" : "Hide Menu"}
        </button>

        <aside className="sidebar" ref={sidebarRef}>
          <h1 className="text-center">Admin Panel</h1>
          <Link to="/" className="w-fit">
            Go Home
          </Link>
          <Link to="applicants" className="w-fit">
            Applicants
          </Link>

          {/* {user && (
            <div className="user-profile">
              <div className="user-info">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )} */}
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
