import { useEffect } from "react";
import App from "../App";

const ApplyPage = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".value-card");
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      cardObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="about-container">
        <h1 className="focus-heading">Focused Software Development</h1>
        <p className="focus-text">
          We help you navigate the ever-evolving landscape of software
          development, enabling you to achieve your unique vision with
          technology that best meets your needs
        </p>
      </div>
      <section className="values-section">
        <h2 className="values-heading">We Are All About</h2>
        <div className="values-cont">
          <div id="programatic" className="value-card">
            <svg
              className="about-svg"
              id="a"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.9 4.96"
            >
              <path
                d="M4.87,1.39c.22.34.34.73.34,1.15,0,1.27-1.14,2.3-2.54,2.3S.12,3.82.12,2.54,1.27.24,2.67.24c.52,0,.99.14,1.39.38"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M3.8,2.61c-.04.51-.52.91-1.09.91s-1.09-.44-1.09-.99.49-.99,1.09-.99h.11"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M4.66.86l-.15-.68s-.04-.08-.07,0l-1.32,1.93s-.02.09.05.05l2.58-1.2s.05-.08-.02-.07h-1.03s-.04,0-.04-.02Z"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
            </svg>
            <p className="value-heading">Programmatic Solutions</p>
            <p className="value-text">
              Simple approaches, no unnecessary complexity, and real impact for
              our clients
            </p>
          </div>
          <div id="communication" className="value-card">
            <svg
              id="a"
              className="about-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.24 5.24"
            >
              <path
                d="M3.92,3.42v.38c0,.31-.25.57-.56.57h-1.38l-.74.75s-.09,0-.09-.04v-.7h-.36c-.37,0-.66-.3-.66-.67v-1.83c0-.33.27-.61.6-.61h.85"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M1.56,1.28h1.75c.33,0,.6.27.6.61v1.53"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M4.36,3.42h.02c.41,0,.74-.34.74-.75V.79c0-.36-.29-.66-.65-.66H1.94c-.34,0-.61.28-.61.62v.13"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
            </svg>

            <p className="value-heading">Collaboration & Communication</p>
            <p className="value-text">
              Building strong partnerships through openness and mutual respect
            </p>
          </div>
          <div id="learning" className="value-card">
            <svg
              className="about-svg"
              id="a"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 5.25 5.25"
            >
              <line
                x1=".12"
                y1="2.48"
                x2=".73"
                y2="2.48"
                fill="none"
                stroke="#81c341"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <line
                x1="1.3"
                y1="1.23"
                x2=".79"
                y2=".69"
                fill="none"
                stroke="#81c341"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <line
                x1="2.69"
                y1=".12"
                x2="2.69"
                y2=".69"
                fill="none"
                stroke="#81c341"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <line
                x1="4.05"
                y1="1.23"
                x2="4.54"
                y2=".72"
                fill="none"
                stroke="#81c341"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <line
                x1="4.48"
                y1="2.52"
                x2="5.12"
                y2="2.52"
                fill="none"
                stroke="#81c341"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M3.24,4.26h-1.22v.65c0,.12.1.22.21.22h.8c.12,0,.21-.1.21-.22v-.65Z"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
              <path
                d="M2.02,4.26l-.57-.77c-.17-.23-.26-.5-.26-.79v-.16c0-.32.11-.62.31-.86h0c.24-.29.58-.45.93-.45h.3c.36,0,.71.16.94.45h0c.19.24.3.54.3.85v.2c0,.27-.08.53-.23.75l-.53.78"
                fill="none"
                stroke="#81c341"
                strokeMiterlimit="10"
                strokeWidth=".25"
              />
            </svg>
            <p className="value-heading">Continuous Learning</p>

            <p className="value-text">
              Studying and adapting to new challenges in an ever-changing field
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplyPage;
