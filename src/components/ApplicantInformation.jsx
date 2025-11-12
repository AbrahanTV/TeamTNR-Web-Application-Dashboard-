import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

const ApplicantInformation = forwardRef((props, ref) => {
  const { errors, validate, setErrors } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    email: "",
    preferedMethod: "",
  });

  const emailRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const normalizeToE164 = (value) => {
    const digits = (value || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
    return `+${digits}`;
  };

  const handlePhoneBlur = (e) => {
    const normalized = normalizeToE164(e.target.value);
    if (normalized) e.target.value = normalized;
  };

  useImperativeHandle(ref, () => ({
    validateStep: () => validate(form),
    getFormData: () => form,
    setBackendErrors: (backendErrors) => setErrors(backendErrors),
  }));

  return (
    <div className="applicant-info bg-sections p-4 rounded-3">
      <span className="h5 d-block mb-3">Applicant Information</span>

      {/* Name & Last Name */}
      <div className="full-name d-flex gap-3">
        <div className="name d-flex flex-column col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="last-name d-flex flex-column col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="dob col-md-12">
        <label htmlFor="dob" className="form-label mt-3">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          className={`form-control ${errors.dob ? "is-invalid" : ""}`}
          value={form.dob}
          onChange={handleChange}
        />
        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
      </div>

      {/* Address Section */}
      <div className="full-address d-flex flex-column gap-3">
        <div className="street-city d-flex gap-3">
          <div className="street col-md-6">
            <label htmlFor="street" className="form-label mt-3">
              Street
            </label>
            <input
              id="street"
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
              value={form.street}
              onChange={handleChange}
              placeholder="Street"
            />
            {errors.street && (
              <div className="invalid-feedback">{errors.street}</div>
            )}
          </div>

          <div className="city col-md-6">
            <label htmlFor="city" className="form-label mt-3">
              City
            </label>
            <input
              id="city"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>
        </div>

        <div className="state-zip d-flex gap-3">
          <div className="state col-md-6">
            <label htmlFor="state" className="form-label mt-3">
              State
            </label>
            <input
              id="state"
              maxLength={2}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              value={form.state}
              onChange={handleChange}
              placeholder="State"
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          <div className="zip col-md-6">
            <label htmlFor="zip" className="form-label mt-3">
              Zip
            </label>
            <input
              id="zip"
              className={`form-control ${errors.zip ? "is-invalid" : ""}`}
              value={form.zip}
              onChange={handleChange}
              placeholder="Zip"
            />
            {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-methods d-flex gap-3">
        <div className="phone-number col-md-6">
          <label htmlFor="phoneNumber" className="form-label mt-3">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          )}
        </div>

        <div className="email col-md-6">
          <label htmlFor="email" className="form-label mt-3">
            Email
          </label>
          <input
            id="email"
            ref={emailRef}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
      </div>

      {/* Preferred Contact */}
      <label className="form-label mt-3">Preferred Contact Method:</label>
      <div className="prefered-method-cont d-flex flex-column">
        <div className="methods d-flex gap-5 justify-content-start">
          <div className="radio-left d-flex gap-1">
            <input
              className="form-check-input"
              id="radioPhone"
              type="radio"
              name="preferedMethod"
              value="phone"
              checked={form.preferedMethod === "phone"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  preferedMethod: e.target.value,
                }))
              }
            />
            <label htmlFor="radioPhone">Phone</label>
          </div>

          <div className="radio-right d-flex gap-1">
            <input
              className="form-check-input"
              id="radioEmail"
              type="radio"
              name="preferedMethod"
              value="email"
              checked={form.preferedMethod === "email"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  preferedMethod: e.target.value,
                }))
              }
            />
            <label htmlFor="radioEmail">Email</label>
          </div>
        </div>

        {errors.preferedMethod && (
          <div className="invalid-feedback d-block">
            {errors.preferedMethod}
          </div>
        )}
      </div>
    </div>
  );
});

export default ApplicantInformation;
