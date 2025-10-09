import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="nav-bar">
        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}Icons/logo-svg.svg`}
            alt="bigbit logo"
            width={90}
            draggable="false"
          />
        </Link>
        <ul>
          <Link to="/contact" className="links">
            Contact Us
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
