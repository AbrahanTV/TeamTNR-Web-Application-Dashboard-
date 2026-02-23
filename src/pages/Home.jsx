import { Link } from "react-router-dom";
import AnimatedContent from "../components/AnimatedContent";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center py-2">
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
            <div className="text-center">
              <h1 className="hero-heading text-white mb-4">
                Helping Cats in the Community
              </h1>
              <p className="hero-subheading text-white mb-4">
                Compassionate TNR • Medical Care • Forever Homes
              </p>
              <Link
                to="/application-page"
                className="hero-cta-btn btn btn-lg text-white px-5 py-3"
              >
                Start Your Adoption Journey
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AnimatedContent
                distance={100}
                direction="vertical"
                duration={1}
                initialOpacity={0}
                animateOpacity
                threshold={0.2}
              >
                <div className="mission-card">
                  <h2 className="mission-title text-center mb-4">
                    Our Mission
                  </h2>
                  <p className="mission-text text-center">
                    We protect and improve the lives of community cats through
                    compassionate Trap-Neuter-Return (TNR), medical care, and
                    dedicated recovery support. We provide safe rehabilitation
                    and socialization for cats and kittens, helping them
                    transition into loving homes whenever possible. By reducing
                    overpopulation, promoting responsible care, and advocating
                    for the voiceless, we strive to create a more humane future
                    where every cat—feral or domestic—can live a healthy,
                    dignified life.
                  </p>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section mb-5 py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">What We Do</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <AnimatedContent
                distance={80}
                direction="vertical"
                duration={0.8}
                initialOpacity={0}
                animateOpacity
                threshold={0.2}
                delay={0.1}
              >
                <div className="service-card">
                  <div className="service-icon mb-3">🐱</div>
                  <h3 className="service-title">Trap-Neuter-Return</h3>
                  <p className="service-description">
                    Humanely managing community cat populations through proven
                    TNR practices, preventing overpopulation while ensuring cats
                    live healthy lives.
                  </p>
                </div>
              </AnimatedContent>
            </div>
            <div className="col-md-4">
              <AnimatedContent
                distance={80}
                direction="vertical"
                duration={0.8}
                initialOpacity={0}
                animateOpacity
                threshold={0.2}
                delay={0.2}
              >
                <div className="service-card">
                  <div className="service-icon mb-3">❤️</div>
                  <h3 className="service-title">Medical Care</h3>
                  <p className="service-description">
                    Providing essential veterinary care, vaccinations, and
                    treatment to ensure every cat receives the medical attention
                    they deserve.
                  </p>
                </div>
              </AnimatedContent>
            </div>
            <div className="col-md-4">
              <AnimatedContent
                distance={80}
                direction="vertical"
                duration={0.8}
                initialOpacity={0}
                animateOpacity
                threshold={0.2}
                delay={0.3}
              >
                <div className="service-card">
                  <div className="service-icon mb-3">🏡</div>
                  <h3 className="service-title">Adoption Services</h3>
                  <p className="service-description">
                    Matching rehabilitated cats and kittens with loving forever
                    homes through our comprehensive adoption and screening
                    process.
                  </p>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="cta-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <AnimatedContent
                distance={80}
                direction="vertical"
                duration={1}
                initialOpacity={0}
                animateOpacity
                threshold={0.2}
              >
                <div className="cta-card text-center">
                  <h2 className="cta-title mb-3">Ready to Make a Difference?</h2>
                  <p className="cta-text mb-4">
                    Whether you're looking to adopt, foster, or support our mission,
                    every action helps create a better future for community cats.
                  </p>
                  <Link
                    to="/application-page"
                    className="cta-button btn btn-lg text-white px-5 py-3"
                  >
                    Apply to Adopt Today
                  </Link>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
