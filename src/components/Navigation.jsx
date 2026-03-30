import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <header className="header navbar navbar-expand-lg col-lg-12 col-md-12 d-flex justify-content-between align-items-center p-2 white-space-no-wrap">
        <div className="header-left navbar-brand d-flex justify-content-center align-items-center text-center">
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/logo.png`}
              className="img-fluid"
              alt="teamtnr logo"
              width={90}
            />
            <span className="fs-1 text-white ">TeamTNR</span>
          </Link>
        </div>

        <nav className="navbar">
          <ul className="font-family fw-bold fs-3 d-flex list-unstyled gap-4 m-0 p-0">
            <li>
              <button
                className="text-white text-decoration-none links-hover bg-transparent border-0"
                onClick={() =>
                  document.getElementById("footer")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Contact Us
              </button>
            </li>
            <li>{/* <Link to="/admin">View Dashboard</Link> */}</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
