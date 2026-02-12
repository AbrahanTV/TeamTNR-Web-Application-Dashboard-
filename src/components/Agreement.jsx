import { useState, forwardRef, useImperativeHandle } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";

const Agreement = forwardRef(({ applicantId }, ref) => {
  const { errors, validate, setErrors } = useFormValidation();
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const clearError = (key) =>
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

  useImperativeHandle(ref, () => ({
    validateStep: () => {
      const required = { agree, signature, date };
      const isValid = validate(required);
      return isValid;
    },
    getFormData: () => ({
      applicantId: applicantId?.current,
      agree,
      signature,
      date,
    }),
    setBackendErrors: (backendErrors) => setErrors(backendErrors),
    markSubmitted: () => setSubmitted(true),
    get isSubmitted() {
      return submitted;
    },
  }));

  //  Thank-you view
  if (submitted) {
    return (
      <div className="agreement-cont d-flex flex-column align-items-center justify-content-center text-center p-5 fade-in">
        <h3 className="text-success fw-bold mt-4">
          Thank You for opening your heart and home to rescue a cat!
        </h3>
        <p className="mt-3 text-muted">
          Your application has been submitted successfully.
        </p>

        <button
          className="btn contact-btn mt-4 px-4 py-2"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  //  Default Agreement Form
  return (
    <div className="agreement-cont d-flex flex-column mb-5 bg-sections p-4 rounded-3">
      <span className="h5">Agreement</span>

      <div className="agreement-signature form-check mt-3">
        <input
          className={`form-check-input ${errors.agree ? "is-invalid" : ""}`}
          type="checkbox"
          name="agree"
          id="agree"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            clearError("agree");
          }}
        />
        <label className="ms-2" htmlFor="agree">
          By submitting this application, I certify that the information
          provided is true and complete.
        </label>
        {errors.agree && (
          <div className="invalid-feedback d-block">{errors.agree}</div>
        )}

        <div className="signature mt-3">
          <label className="form-label" htmlFor="signature">
            Electronic Signature (Type your full name)
          </label>
          <input
            type="text"
            className={`form-control ${errors.signature ? "is-invalid" : ""}`}
            id="signature"
            placeholder="Enter your full name"
            value={signature}
            onChange={(e) => {
              setSignature(e.target.value);
              clearError("signature");
            }}
          />
          {errors.signature && (
            <div className="invalid-feedback d-block">{errors.signature}</div>
          )}
        </div>

        <div className="date mt-3">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              clearError("date");
            }}
          />
          {errors.date && (
            <div className="invalid-feedback d-block">{errors.date}</div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Agreement;
