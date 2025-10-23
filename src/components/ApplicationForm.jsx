/* import { render } from "@react-email/render"; */
import { MultiStepForm } from "./MultiStepForm";
import ApplicantInformation from "./ApplicantInformation";
import HouseholdInformation from "./HouseholdInformation";
import PetHistory from "./PetHistory";

const ApplicationForm = () => {
  /*   const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false); */

  const { steps, currentStepIndex, step, isFirstStep, back, next } =
    MultiStepForm([
      <ApplicantInformation />,
      <HouseholdInformation />,
      <PetHistory />,
    ]);

  /*  const submitForm = async (e) => {
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
}; */

  return (
    <>
      <style>
        {`
        .bg-sections {
      background-color: #ffffff81;
    }
  `}
      </style>

      <div className="form-cont p-4 container d-flex justify-content-center align-items-center">
        <form
          /* onSubmit={submitForm} */
          className="form form-bg-color pt-2 p-4 rounded-3 col-md-8"
        >
          <div className="form-pages page-numbers d-flex justify-content-end align-items-center pb-2">
            {currentStepIndex + 1} / {steps.length}
          </div>

          <div className="mt-1 d-flex gap-2 justify-content-end">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="btn btn-sm my-btn mb-1"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="btn btn-sm my-btn  mb-1"
            >
              Next
            </button>
          </div>

          {step}

          <div className="btn-cont mt-3 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-md text-white fs-5 mt-3"
              id="sumbitFormBtn"
              type="submit"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplicationForm;
