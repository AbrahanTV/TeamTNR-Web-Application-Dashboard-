const Navigation = () => {
  return (
    <>
      <style>
        {`
        
        .header {
            background-color: #C8A2C8;
        }

        .font-family {
            font-family: "Nunito", sans-serif;
        }
        
        `}
      </style>
      <header className="header d-flex justify-content-between align-items-center p-3">
        <img src="/src/assets/react.svg" alt="teamtnr logo" />
        <nav className="nav-bar">
          <ul className="font-family text-white d-flex list-unstyled gap-4 m-0 p-0">
            <li className="">Adoption Form</li>
            <li>Contact Us</li>
            <li>fsfs</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
