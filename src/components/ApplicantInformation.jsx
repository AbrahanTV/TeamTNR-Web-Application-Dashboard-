import { useRef } from "react";

const ApplicantInformation = () => {
  const emailRef = useRef(null);

  return (
    <>
      <div className="applicant-info bg-sections p-4 rounded-3 ">
        <span className="h5 d-block mb-3">Applicant Information</span>
        <div className="full-name d-flex gap-3">
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

          <div className="last-name d-flex flex-column col-md-6">
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

        <div className="dob col-md-12">
          <label htmlFor="dob" className="form-label mt-3">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            placeholder="Enter your date of birth"
            required
          />
        </div>

        <div className="full-address d-flex flex-column gap-3">
          <div className="street-city d-flex gap-3">
            <div className="street col-md-6">
              <label htmlFor="street" className="form-label mt-3">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Street"
                required
              />
            </div>
            <div className="city col-md-6">
              <label className="form-label mt-3">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
                required
              />
            </div>
          </div>
          <div className="state-zip d-flex gap-3">
            <div className="state col-md-6">
              <label className="form-label mt-3">State</label>
              <input
                type="text"
                maxLength={2}
                className="form-control"
                id="state"
                placeholder="State"
                required
              />
            </div>
            <div className="zip col-md-6">
              <label className="form-label mt-3">Zip</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder="Zip"
                required
              />
            </div>
          </div>
        </div>

        <div className="contact-methods d-flex gap-3 ">
          <div className="phone-number col-md-6">
            <label htmlFor="phoneNumber" className="form-label mt-3">
              Phone Number
            </label>
            <input
              className="form-control"
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="email col-md-6 ">
            <label htmlFor="email" className="form-label mt-3">
              Email
            </label>
            <input
              className="form-control"
              ref={emailRef}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <label className="form-label mt-3">Prefered Contact Method:</label>
        <div className="prefered-method-cont d-flex flex-column">
          <div className="methods d-flex gap-5 justify-content-start">
            <div className="radio-left d-flex gap-1">
              <input
                className="form-check-input"
                id="radioPhone"
                type="radio"
                name="preferedMethod"
              />
              <label htmlFor="radioPhone">Phone</label>
            </div>

            <div className="radio-right d-flex gap-1">
              <input
                className="form-check-input"
                id="radioEmail"
                type="radio"
                name="preferedMethod"
              />
              <label htmlFor="radioEmail">Email</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantInformation;
