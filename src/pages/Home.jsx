import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <style>
        {`
      
      `}
      </style>

      <section className="hero d-flex justify-conent-center align-items-center wrapper-bg-color">
        <div className="container h-350px d-flex flex-column justify-content-center align-items-center rounded-3">
          <h1 className="main-heading fs-1-5 text-white ">
            Helping Cats in the Community
          </h1>
          <p className="body-txt text-white fs-5 w-50">
            Every cat deserves a safe and loving home. TeamTNR works with local
            rescuers to make that happen through adoption and care programs.
          </p>
          <Link
            to="/contact"
            className="contact-btn fs-5 p-2 rounded-3 text-decoration-none text-white"
          >
            Apply Now!
          </Link>
        </div>
      </section>
      <section className="cards-section">
        <div className="container d-flex justify-content-center align-items-center gap-4 my-5">
          <div className="card-cont d-flex justify-content-center align-items-center gap-4">
            <div className="card d-flex justify-content-center align-items-center">
              <img src="/public/img/cat-01.jpg" alt="cat 1" />
            </div>
            <div className="card d-flex justify-content-center align-items-center">
              <img src="" alt="" />
            </div>
            <div className="card d-flex justify-content-center align-items-center">
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
