import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import AnimatedContent from "../components/AnimatedContent";

const Home = () => {
  return (
    <>
      <style>
        {`
      
      `}
      </style>

      <section className="hero d-flex justify-conent-center align-items-center wrapper-bg-color">
        <div className="container h-350px d-flex flex-column justify-content-center align-items-center rounded-3">
          <AnimatedContent
            distance={150}
            direction="veretical"
            reverse={true}
            duration={1.2}
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.1}
          >
            <div>
              <h1 className="main-heading fs-1-5 text-white animate-slide-in-top ">
                Helping Cats in the Community
              </h1>
            </div>
          </AnimatedContent>

          <p className="body-txt text-white fs-5 w-50 text-center mt-3">
            Every cat deserves a safe and loving home. TeamTNR works with local
            rescuers to make that happen through adoption and care programs.
          </p>
          <Link
            to="/"
            className="contact-btn fs-5 p-2 mt-3 rounded-3 text-decoration-none text-white"
          >
            Coming Soon!
          </Link>
        </div>
      </section>
      <section className="cards-section">
        <Cards />
      </section>
    </>
  );
};

export default Home;
