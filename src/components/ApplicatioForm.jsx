const ApplicationForm = () => {
  const submitForm = async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      companyName: document.getElementById("companyName").value.trim() || null,
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    const emailHtml = await render(<Welcome />);

    try {
      const url = import.meta.env.VITE_API_BASE
        ? `${import.meta.env.VITE_API_BASE}/api/contact`
        : "/api/contact";

      console.log("posting to:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, emailHtml }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

      setShowAlert(true);
      e.target.reset();
      setTimeout(() => {
        setShowAlert(false);
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000, err);
    }
  };

  return (
    <>
      <div className="form-cont container d-flex justify-content-center align-items-center">
        <form
          onSubmit={submitForm}
          className="form form-bg-color p-4 rounded-3 fs-5"
        >
          <div className="full-name d-flex gap-3 justify-content-center flex-row text-start">
            <div className="name d-flex flex-column col-md-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="last-name d-flex flex-column col-md-6 ">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="company d-flex flex-column mt-3 col-md-12">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              placeholder="Enter your company name"
            />
          </div>

          <div className="email d-flex flex-column mt-3 col-md-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="btn-cont mt-3 d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-md text-white fs-5 mt-3">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplicationForm;
