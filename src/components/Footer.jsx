import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        className="d-flex justify-content-between px-5 align-items-center fs-5"
      >
        <a
          href="mailto:info@teamtnr.org"
          className="text-decoration-none text-white"
        >
          info@teamtnr.org
        </a>
        <span className="copyright">
          &copy;TeamTNR {new Date().getFullYear()}
        </span>
        {/* <Link to="/contact" className="text-decoration-none text-white">
          Contact Us
        </Link> */}
      </footer>
    </>
  );
};

export default Footer;
