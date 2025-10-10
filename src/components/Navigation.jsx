import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <style>
        {`
       
        `}
      </style>

      <header className="header h-100px d-flex justify-content-between align-items-center p-3">
        <div className="header-left d-flex justify-content-center align-items-center text-center">
          <Link to="/" className="text-decoration-none">
            <img
              src={`${import.meta.env.BASE_URL}img/logo.png`}
              alt="teamtnr logo"
              width={90}
            />
          </Link>
          <span className="fs-1 text-white ">TeamTNR</span>
        </div>

        <nav className="navbar-nav">
          <ul className="font-family fw-bold fs-3 d-flex list-unstyled gap-4 m-0 p-0">
            {/* <li>
              <Link
                to="/adoption-form"
                className="text-white text-decoration-none links-hover"
              >
                Application Form
              </Link>
            </li> */}
            <li>
              {/* <Link
                to="/contact"
                className="text-white text-decoration-none links-hover"
              >
                Contact Us
              </Link> */}
              <a
                href="#footer"
                className="text-white text-decoration-none links-hover"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
