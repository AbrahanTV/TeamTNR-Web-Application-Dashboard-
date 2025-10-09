import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <a href="mailto:info@bigbigsoftware.com" className="email">
        info@bigbitsoftware.com
      </a>
      <span className="copyright">&copy; BigBit Software 2025</span>
      <ul>
        {/* <Link to="/" className="links">
          Services
        </Link>
        <Link to="/about" className="links">
          About Us{" "}
        </Link> */}
        <Link to="/contact" className="links">
          Contact Us
        </Link>
      </ul>
    </>
  );
};

export default Footer;
