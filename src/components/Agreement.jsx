const Agreement = () => {
  return (
    <>
      <div className="agreement-cont mb-5">
        <span className="h5">Agreement</span>
        <div className="agreement-signature form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="agree"
            id="agree"
          />
          <label className="" htmlFor="agree">
            By submitting this application, I certify that the information
            provided is true and complete.
          </label>
          <div className="signature">
            <label className="form-label mt-3" htmlFor="signature">
              Electronic Signature (Type your full name)
            </label>
            <input
              type="text"
              className="form-control"
              id="signature"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="date">
            <label className="form-label mt-3" htmlFor="date">
              Date
            </label>
            <input type="date" className="form-control" id="date" required />
          </div>

          <span className="h3 mt-5 d-flex align-items-center justify-content-center text-center">
            Thank You for opening your heart and home to rescue a cat!
          </span>
        </div>
      </div>
    </>
  );
};

export default Agreement;
