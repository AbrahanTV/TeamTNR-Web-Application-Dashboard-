import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import About from "./About";

const Home = () => {
  const spanRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    if (!spanRef.current) return;

    typedRef.current = new Typed(spanRef.current, {
      strings: ["People", "Ideas", "Goals"],
      typeSpeed: 40,
      backSpeed: 100,
      loop: true,
      smartBackspace: true,
    });

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
        typedRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1 className="main-heading">
            Programmatic Solutions for Ambitious{" "}
            <span className="span-ideas" ref={spanRef}></span>
          </h1>
          <p className="main-txt">
            From debugging legacy systems to building AI-driven agents: we
            design, develop, and optimize with purpose.
          </p>
          <Link to="/contact" className="contact-btn">
            Let's Talk
          </Link>
        </div>
      </div>
      <section className="services">
        <p>Our Services</p>
        <div className="icons-cont">
          <div className="icons" id="application">
            <svg
              id="a"
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.31 5.25"
            >
              <polygon
                points="2.13 .12 3.24 .12 3.53 1.08 4.58 .84 5.16 1.86 4.55 2.6 5.16 3.44 4.62 4.41 3.64 4.35 3.37 5.12 2.13 5.12 1.8 4.28 .85 4.42 .24 3.51 .83 2.62 .16 1.83 .78 .86 1.77 .99 2.13 .12"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
              <ellipse
                cx="2.66"
                cy="2.62"
                rx=".62"
                ry=".64"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
            </svg>
            <span>Application Development</span>
          </div>
          <div className="icons" id="gameComponents">
            <svg
              id="a"
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.25 5.25"
            >
              <ellipse
                cx="2.63"
                cy=".88"
                rx=".88"
                ry=".76"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M2.35,1.63h.56v1.69c0,.15-.13.27-.3.27h0c-.14,0-.26-.11-.26-.24v-1.73Z"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M2.35,2.43L.2,3.25c-.1.04-.1.17,0,.21l2.28.91c.1.04.21.04.31,0l2.26-.87c.11-.04.11-.18,0-.22l-2.12-.86"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M.13,3.36v.61c0,.12.08.23.2.28l2.05.82c.16.06.34.07.5,0l1.95-.75c.18-.07.3-.23.3-.41v-.51"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <ellipse cx="1.25" cy="3.38" rx=".33" ry=".18" fill="#81c341" />
            </svg>
            <span>Game Components and Tooling</span>
          </div>
          <div className="icons" id="etl">
            <svg
              id="a"
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.25 5.25"
            >
              <ellipse
                cx="1.1"
                cy="4.19"
                rx=".97"
                ry=".93"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
              <ellipse
                cx="1.1"
                cy="4.19"
                rx=".31"
                ry=".33"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
              <path
                d="M.89.78V.27c0-.08.06-.14.13-.14h3.97c.07,0,.13.06.13.14v4.72c0,.08-.06.14-.13.14h-2.64"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
              <path
                d="M.89,2.46v-.71h3.37v1.26c0,.06-.05.11-.1.11h-.5"
                fill="none"
                stroke="#81c341"
                strokeWidth=".25"
              />
            </svg>
            <span>ETL & Migrations</span>
          </div>
          <div className="icons" id="dev-ops">
            <svg
              id="a"
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.25 5.25"
            >
              <ellipse
                cx=".62"
                cy=".56"
                rx=".48"
                ry=".43"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <ellipse
                cx="3.6"
                cy="2.49"
                rx=".53"
                ry=".47"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <ellipse
                cx="1.76"
                cy="4.66"
                rx=".53"
                ry=".47"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M1.08.47h2.92c.09,0,.19.03.25.09l.73.62c.07.06.11.15.11.24v.88"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <polyline
                points="3.08 2.46 .8 2.46 .12 3.06 .12 3.92 .74 4.41 1.38 4.41"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M2.27,4.66l1.87-.03c.05,0,.1-.02.14-.05l.76-.56c.05-.04.08-.09.08-.15v-.48"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
            </svg>
            <span>DevOps & SRE Practices</span>
          </div>
          <div className="icons" id="debug">
            <svg
              id="a"
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12.25 8.44"
            >
              <ellipse
                cx="8.4"
                cy="5.36"
                rx=".96"
                ry=".89"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
              <polyline
                points="5.45 .19 3.73 1.6 5.39 3.14"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
              <path
                d="M3.73,1.6h5.53c.23,0,.45.08.62.23l1.85,1.68c.17.15.27.37.27.59v1.85c0,.22-.09.42-.25.58l-1.52,1.42c-.16.15-.39.24-.63.24h-4.35c-.23,0-.46-.09-.62-.24l-1.08-1"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
              <line
                x1="7.44"
                y1="5.36"
                x2="3.19"
                y2="5.36"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
              <path
                d="M3.01,4h-1.36c-.1,0-.18.07-.18.17v2.38c0,.09.08.17.18.17h1.36c.1,0,.18-.07.18-.17v-2.38c0-.09-.08-.17-.18-.17Z"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
              <line
                x1="1.47"
                y1="5.36"
                y2="5.36"
                fill="none"
                stroke="#81c341"
                strokeWidth=".5"
              />
            </svg>
            <span>Debugging & Optimization</span>
          </div>
        </div>
      </section>

      <About />
    </>
  );
};

export default Home;
