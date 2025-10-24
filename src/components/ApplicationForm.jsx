/* import { render } from "@react-email/render"; */
import { MultiStepForm } from "./MultiStepForm";
import ApplicantInformation from "./ApplicantInformation";
import HouseholdInformation from "./HouseholdInformation";
import PetHistory from "./PetHistory";

const ApplicationForm = () => {
  const { steps, currentStepIndex, step, isFirstStep, back, next } =
    MultiStepForm([
      <ApplicantInformation />,
      <HouseholdInformation />,
      <PetHistory />,
    ]);

  async function handleNext() {
    if (currentStepIndex === 0) {
      const ok = await submitApplicantStep1();
      if (!ok) return;
    }
    next();
  }

  async function submitApplicantStep1() {
    const preferPhone = document.getElementById("radioPhone")?.checked;
    const preferEmail = document.getElementById("radioEmail")?.checked;
    const preferedMethod = preferPhone
      ? "phone"
      : preferEmail
      ? "email"
      : undefined;

    const body = {
      name: document.getElementById("name")?.value?.trim(),
      lastName: document.getElementById("lastName")?.value?.trim(),
      dob: document.getElementById("dob")?.value,
      street: document.getElementById("street")?.value?.trim(),
      city: document.getElementById("city")?.value?.trim(),
      state: document.getElementById("state")?.value?.trim(),
      zip: document.getElementById("zip")?.value?.trim(),
      phoneNumber: document.getElementById("phoneNumber")?.value?.trim(),
      email: document.getElementById("email")?.value?.trim(),
      preferedMethod,
    };

    try {
      const VITE_API_BASE = import.meta.env.VITE_API_BASE || "";
      const response = await fetch(
        `${VITE_API_BASE}/api/forms/applicant/validate-step-1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const json = await response.json();

      if (!response.ok || json.ok === false) {
        console.error("Validation errors:", json.errors || json);
        return false;
      }

      console.log("Validation successful:", json.data || json);
      return true;
    } catch (error) {
      console.error("Error submitting applicant step 1:", error);
      return false;
    }
  }

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
        <form className="form form-bg-color pt-2 p-4 rounded-3 col-md-8">
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
              onClick={handleNext}
              className="btn btn-sm my-btn  mb-1"
            >
              Next
            </button>
          </div>

          {step}

          {/* <div className="btn-cont mt-3 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-md text-white fs-5 mt-3"
              id="sumbitFormBtn"
              type="submit"
            >
              Submit Application
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default ApplicationForm;
