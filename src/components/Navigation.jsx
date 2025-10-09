import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <style>
        {`
       
        `}
      </style>

      <header className="header h-100px d-flex justify-content-between align-items-center p-3">
        <Link to="/" className="text-decoration-none">
          <span className="fs-1 text-white">TeamTNR Logo</span>
        </Link>
        <nav className="navbar-nav">
          <ul className="font-family fw-bold fs-3 d-flex list-unstyled gap-4 m-0 p-0">
            <li>
              <Link
                to="/adoption-form"
                className="text-white text-decoration-none links-hover"
              >
                Application Form
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white text-decoration-none links-hover"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
