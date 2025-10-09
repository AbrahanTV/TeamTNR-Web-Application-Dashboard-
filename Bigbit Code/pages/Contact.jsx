import { useState, useEffect } from "react";
import { render } from "@react-email/render";
import Welcome from "../emails/Welcome";

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Evita animación al cargar la página
    setMounted(true);
  }, []);

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
      {mounted && (
        <div
          className={`alert-cont ${showAlert ? "alert-show" : "alert-hide"}`}
        >
          <div className="alert">
            <p>Form Submitted!</p>
          </div>
        </div>
      )}

      {mounted && (
        <div
          className={`alert-cont ${showError ? "alert-show" : "alert-hide"}`}
        >
          <div className="alert-error">
            <p>Please try sending Again</p>
          </div>
        </div>
      )}

      <div className="top-cont">
        <h1 className="contact-h1">Contact</h1>
        <h2 className="contact-h2">Get in Touch</h2>
        <p className="contact-p">
          Need help with a project? Reach out via the form below or email us at{" "}
          <a href="mailto:info@bigbitsoftware.com" id="contact-page-email">
            info@bigbitsoftware.com
          </a>
        </p>
      </div>
      <div className="form">
        <form onSubmit={submitForm}>
          <div className="full-name">
            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="last-name">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="company">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="message">
            <label htmlFor="message">Message</label>
            <textarea
              name=""
              id="message"
              placeholder="Type your message"
              required
              rows={6}
            ></textarea>
            <div className="btn-cont">
              <button type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
