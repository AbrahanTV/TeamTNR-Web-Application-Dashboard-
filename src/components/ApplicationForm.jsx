/* import { render } from "@react-email/render"; */

import { useRef, useState } from "react";

function HouseholdMember({ index, member, onChange, onRemove }) {
  return (
    <div
      className="member-info d-flex flex-column gap-2 mb-4"
      data-member-id={member.id}
    >
      <p className="m-0 h6"> House Member {index}</p>
      <input
        className="form-control"
        type="text"
        placeholder="House member's name"
        value={member.name}
        onChange={(e) => onChange(member.id, { name: e.target.value })}
      />
      <input
        className="form-control"
        type="number"
        placeholder="House member's age"
        min={0}
        value={member.age}
        onChange={(e) => onChange(member.id, { age: e.target.value })}
      />
      <div className="member-relationship-cont d-flex flex-column align-items-center">
        <select
          className="form-control"
          value={member.relation}
          onChange={(e) => onChange(member.id, { relation: e.target.value })}
        >
          <option value="" disabled>
            {"Member Relationship"}
          </option>
          <option value="mother">Mother</option>
          <option value="father">Father</option>
          <option value="child">Child</option>
          <option value="sibling">Sibling</option>
          <option value="partner">Partner</option>
          <option value="other">Other</option>
        </select>
        <div className="allergies d-flex flex-column align-items-start align-self-start">
          <label className="form-label mt-3">Cat Allergies</label>
          <div className="allergie-options d-flex gap-5">
            <div className="allergies-yes d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name={`allergies-${member.id}`}
                id={`allergiesYes-${member.id}`}
                value="yes"
                checked={member.allergies === "yes"}
                onChange={() => onChange(member.id, { allergies: "yes" })}
              />
              <label htmlFor={`allergiesYes-${member.id}`}>Yes</label>
            </div>
            <div className="allergies-no d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name={`allergies-${member.id}`}
                id={`allergiesNo-${member.id}`}
                value="no"
                checked={member.allergies === "no"}
                onChange={() => onChange(member.id, { allergies: "no" })}
              />
              <label htmlFor={`allergiesNo-${member.id}`}>No</label>
            </div>
          </div>
        </div>

        {member.removable && (
          <button
            type="button"
            className="btn btn-danger btn-outline-danger text-white btn-sm mt-3"
            onClick={() => onRemove(member.id)}
          >
            Remove Member
          </button>
        )}
      </div>
    </div>
  );
}

const ApplicationForm = () => {
  /*   const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false); */

  const emailRef = useRef(null);
  const [rentOwn, setRentOwn] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "", age: "", relation: "", allergies: "", removable: false },
  ]);
  const nextMemberIdRef = useRef(2);

  const handleMemberChange = (id, partial) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...partial } : m))
    );
  };

  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const addBtn = useRef(null);

  function addMember(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const id = nextMemberIdRef.current++;
    setMembers((prev) => [
      ...prev,
      { id, name: "", age: "", relation: "", allergies: "", removable: true },
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
        <form
          /* onSubmit={submitForm} */
          className="form form-bg-color p-4 rounded-3"
        >
          <div className="applicant-info bg-sections p-4 rounded-3">
            <span className="h5 d-block mb-3">Applicant Information</span>
            <div className="full-name d-flex gap-3 justify-content-center flex-row text-start">
              <div className="name d-flex flex-column ">
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

              <div className="last-name d-flex flex-column  ">
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

            <div className="full-address d-flex gap-3">
              <div className="address">
                <label htmlFor="address" className="form-label mt-3">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address"
                  required
                />
                <div className="state">
                  <label className="form-label mt-3">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              <div className="location">
                <div className="city">
                  <label className="form-label mt-3">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="zip">
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

          <div className="household-info bg-sections p-4 rounded-3 mt-3">
            <span className="h5">Household Information</span>

            <div className="rent-own-cont">
              <label className="form-label mt-3">
                Do you rent or own your home?
              </label>
              <div className="rent-own-options d-flex justify-content-start gap-5">
                <div className="rent d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rentOwn"
                    id="rent"
                    value="rent"
                    checked={rentOwn === "rent"}
                    onChange={() => setRentOwn("rent")}
                  />
                  <label htmlFor="rent">Rent</label>
                </div>
                <div className="own d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rentOwn"
                    id="own"
                    value="own"
                    checked={rentOwn === "own"}
                    onChange={() => setRentOwn("own")}
                  />
                  <label htmlFor="own">Own</label>
                </div>
              </div>
            </div>

            {rentOwn === "rent" && (
              <div className="if-rent">
                <label className="form-label mt-3">
                  Landlord's name & contact
                </label>
                <input
                  type="text"
                  name="landlordName"
                  id="landlordName"
                  className="form-control mt-2"
                  placeholder="Landlord's name"
                />
                <input
                  type="tel"
                  name="landlordPhone"
                  id="landlordPhone"
                  className="form-control mt-2"
                  placeholder="Landlord's phone"
                />
                <input
                  type="email"
                  name="landlordEmail"
                  id="landlordEmail"
                  className="form-control mt-2"
                  placeholder="Landlord's email"
                />
              </div>
            )}

            <div className="residence-type">
              <label className="form-label mt-3">Type of Residence</label>
              <div className="type-options d-flex justify-content-start gap-5">
                <div className="house d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="house"
                  />
                  <label htmlFor="house">House</label>
                </div>
                <div className="apt d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="apt"
                  />
                  <label htmlFor="apt">Apartment</label>
                </div>
              </div>
            </div>

            <div className="pets-allowed">
              <label className="form-label mt-3">
                Are pets allowed in your lease?
              </label>
              <div className="pets-options d-flex gap-5">
                <div className="pets-yes d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="petsYes"
                  />
                  <label htmlFor="petsYes">Yes</label>
                </div>
                <div className="pets-no d-flex gap-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="petsNo"
                  />
                  <label htmlFor="petsNo">No</label>
                </div>
              </div>
            </div>

            <div className="time-living d-flex flex-column">
              <label className="form-label mt-3" htmlFor="time">
                How long at current address?
              </label>
              <input
                className="form-control"
                type="number"
                name="monthsLiving"
                id="months"
                placeholder="Months"
                min={1}
              />
            </div>
            <div className="house-members d-flex flex-column">
              <label className="form-label mt-3">
                List all household members
              </label>

              {members.map((member, i) => (
                <HouseholdMember
                  key={member.id}
                  index={i + 1}
                  member={member}
                  onChange={handleMemberChange}
                  onRemove={handleRemoveMember}
                />
              ))}

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-3"
                  id="addMemberBtn"
                  ref={addBtn}
                  onClick={addMember}
                >
                  Add New Member
                </button>
              </div>
            </div>
          </div>

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
