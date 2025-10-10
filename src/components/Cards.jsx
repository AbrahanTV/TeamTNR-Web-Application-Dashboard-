const Cards = () => {
  <div className="container d-flex justify-content-center align-items-center gap-4 my-5">
    <div className="card-cont d-flex justify-content-center align-items-center gap-4">
      <div className="card d-flex justify-content-center align-items-center">
        <img src={`${import.meta.env.BASE_URL}img/cat-01.jpg`} alt="cat 1" />
      </div>
      <div className="card d-flex justify-content-center align-items-center">
        <img src={`${import.meta.env.BASE_URL}img/cat-02.jpg`} alt="cat 2" />
      </div>
      <div className="card d-flex justify-content-center align-items-center">
        <img src={`${import.meta.env.BASE_URL}img/cat-03.jpg`} alt="cat 3" />
      </div>
    </div>
  </div>;
};

export default Cards;
