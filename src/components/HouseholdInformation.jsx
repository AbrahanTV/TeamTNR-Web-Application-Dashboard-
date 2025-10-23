import { useState, useRef, useCallback, memo } from "react";

// Hoisted so it doesn’t remount every render
const HouseholdMember = memo(function HouseholdMember({
  index,
  member,
  onChange,
  onRemove,
}) {
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
                name={`hasAllergies-${member.id}`}
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
                name={`hasAllergies-${member.id}`}
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
});

const HouseholdInformation = () => {
  const [rentOwn, setRentOwn] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "", age: "", relation: "", allergies: "", removable: false },
  ]);

  const addBtn = useRef(null);
  const nextMemberIdRef = useRef(2);

  const handleMemberChange = useCallback((id, partial) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...partial } : m))
    );
  }, []);

  const handleRemoveMember = useCallback((id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addMember = useCallback((e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const id = nextMemberIdRef.current++;
    setMembers((prev) => [
      ...prev,
      { id, name: "", age: "", relation: "", allergies: "", removable: true },
    ]);
  }, []);

  return (
    <>
      <style>
        {`
        .household-info {
          /* width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto; */
        }

      `}
      </style>

      <div className="household-info bg-sections p-4 rounded-3 mt-3">
        <span className="h5">Household Information</span>

        <div className="rent-own-cont">
          <label className="form-label mt-3">
            Do you rent or own your home?
          </label>
          <div className="rent-own-options  d-flex justify-content-start gap-5">
            <div className="rent d-flex gap-1 ">
              <input
                className="form-check-input "
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
            <label className="form-label mt-3">Landlord's name & contact</label>
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
          <label className="form-label mt-3">List all household members</label>

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
    </>
  );
};

export default HouseholdInformation;
