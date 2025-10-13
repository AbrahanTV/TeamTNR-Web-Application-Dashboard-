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

      <section className="hero d-flex justify-conent-center align-items-center">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1.2}
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.1}
          >
            <div>
              <h1 className="main-heading fs-1-5 text-white text-center">
                Helping Cats in the Community
              </h1>
            </div>
          </AnimatedContent>

          <p className="body-txt text-white fs-5 w-75 text-center mt-3">
            <strong>Our Mission</strong> is to protect and improve the lives of
            community cats through compassionate Trap-Neuter-Return (TNR),
            medical care, and dedicated recovery support. We provide safe
            rehabilitation and socialization for cats and kittens, helping them
            transition into loving homes whenever possible. By reducing
            overpopulation, promoting responsible care, and advocating for the
            voiceless, we strive to create a more humane future where every
            cat-feral or domestic-can live a healthy, dignified life.
            {/* Every cat deserves a safe and loving home. TeamTNR works with local
            rescuers to make that happen through adoption and care programs. */}
          </p>
          <Link
            to="/application-form"
            className="contact-btn btn btn-lg text-white fs-4 mt-3"
          >
            Apply Now!
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
