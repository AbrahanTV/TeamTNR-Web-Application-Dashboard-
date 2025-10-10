import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        className="col-lg-12  col-md-12 d-flex justify-content-between align-items-center px-2  fs-5"
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
