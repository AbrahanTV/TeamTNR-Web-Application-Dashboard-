import { useRef, useState } from "react";
import { MultiStepForm } from "./MultiStepForm";
import ApplicantInformation from "./ApplicantInformation";
import HouseholdInformation from "./HouseholdInformation";
import PetHistory from "./PetHistory";
import Lifestyle from "./Lifestyle";
import Agreement from "./Agreement";

const ApplicationForm = () => {
  const applicantRef = useRef();
  const householdRef = useRef();
  const petHistoryRef = useRef();
  const lifestyleRef = useRef();
  const agreementRef = useRef();

  const [isFading, setIsFading] = useState(false);
  const [step1Fail, setStep1Fail] = useState(false);

  const [applicationId, setApplicationId] = useState(null);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    MultiStepForm([
      <ApplicantInformation ref={applicantRef} />,
      <HouseholdInformation ref={householdRef} />,
      <PetHistory ref={petHistoryRef} />,
      <Lifestyle ref={lifestyleRef} />,
      <Agreement ref={agreementRef} />,
    ]);

  const stepRefs = [
    applicantRef,
    householdRef,
    petHistoryRef,
    lifestyleRef,
    agreementRef,
  ];

  const stepEndpoints = [
    "/api/forms/applicant/validate-step-1",
    "/api/forms/household/validate-step-2",
    "/api/forms/pet-history/validate-step-3",
    "/api/forms/lifestyle/validate-step-4",
    "/api/forms/agreement/validate-step-5",
  ];

  const submitEndpoints = [
    "/api/forms/applicant/submit-step-1",
    "/api/forms/household/submit-step-2",
    "/api/forms/pet-history/submit-step-3",
    "/api/forms/lifestyle/submit-step-4",
    "/api/forms/agreement/submit-step-5",
  ];

  async function handleNext() {
    const currentRef = stepRefs[currentStepIndex];
    const endpoint = stepEndpoints[currentStepIndex];
    const VITE_API_BASE = import.meta.env.VITE_API_BASE || "";

    if (!currentRef || !endpoint) {
      next();
      return;
    }

    const isFrontendValid = await currentRef.current?.validateStep?.();
    if (!isFrontendValid) return;

    const formData = currentRef.current?.getFormData?.();
    if (!formData) return;

    try {
      const response = await fetch(`${VITE_API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok || json.ok === false) {
        console.error(
          `Backend validation failed at step ${currentStepIndex + 1}:`,
          json.errors || json
        );
        currentRef.current?.setBackendErrors?.(json.errors || {});
        return;
      }

      if (currentStepIndex === 0) {
        const submitRes = await fetch(`${VITE_API_BASE}${submitEndpoints[0]}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const submitJson = await submitRes.json();

        if (!submitRes.ok || submitJson.ok === false) {
          currentRef.current?.setBackendErrors?.(submitJson.errors || {});
          return;
        }

        setApplicationId(submitJson.application_id);
      }

      console.log(`Step ${currentStepIndex + 1} validated successfully`);

      if (isLastStep) {
        // Show thank you message on final step success
        currentRef.current?.markSubmitted?.();
        return;
      }

      next();
    } catch (error) {
      console.error(`Error submitting step ${currentStepIndex + 1}:`, error);
      setStep1Fail(true);
      setIsFading(false);
      setTimeout(() => setIsFading(true), 10);
      setTimeout(() => setStep1Fail(false), 3500);
    }
  }

  return (
    <>
      <style>
        {`
          .bg-sections {
            background-color: #ffffff81;
          }

          .fade-out {
            opacity: 0;
            transition: opacity 5s ease-out;
          }
        `}
      </style>

      <div className="form-cont p-4 container d-flex flex-column justify-content-center align-items-center">
        {/* Error Alert */}
        {step1Fail && (
          <div
            className={`alert my-alert alert-danger mb-3 ${
              isFading ? "fade-out" : ""
            }`}
          >
            Step submission error - Please try again.
          </div>
        )}
        <form className="form form-bg-color pt-2 p-4 rounded-3 col-md-8">
          {/* Step counter */}
          <div className="form-pages page-numbers d-flex justify-content-end align-items-center pb-2">
            {currentStepIndex + 1} / {steps.length}
          </div>

          {/* Navigation buttons */}
          <div className="mt-1 d-flex gap-2 justify-content-end">
            {/* Navigation buttons */}
            {!(isLastStep && agreementRef.current?.isSubmitted) && (
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
                  className="btn btn-sm my-btn mb-1"
                >
                  {isLastStep ? "Submit" : "Next"}
                </button>
              </div>
            )}
          </div>

          {/* Render current step */}
          {step}
        </form>
      </div>
    </>
  );
};

export default ApplicationForm;
