import {
  useState,
  useRef,
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormValidation } from "../hooks/useFormValidation";

// Separate component for each household member
const HouseholdMember = memo(function HouseholdMember({
  index,
  member,
  onChange,
  onRemove,
  errors,
}) {
  return (
    <div
      className="member-info d-flex flex-column gap-2 mb-4 border rounded-3 p-3"
      data-member-id={member.id}
    >
      <p className="m-0 h6">House Member {index}</p>

      <input
        className={`form-control ${
          errors[`member-${member.id}-name`] ? "is-invalid" : ""
        }`}
        type="text"
        placeholder="Name"
        value={member.name}
        onChange={(e) => onChange(member.id, { name: e.target.value })}
      />
      {errors[`member-${member.id}-name`] && (
        <div className="invalid-feedback d-block">
          {errors[`member-${member.id}-name`]}
        </div>
      )}

      <input
        className={`form-control ${
          errors[`member-${member.id}-age`] ? "is-invalid" : ""
        }`}
        type="number"
        min={0}
        placeholder="Age"
        value={member.age}
        onChange={(e) => onChange(member.id, { age: e.target.value })}
      />
      {errors[`member-${member.id}-age`] && (
        <div className="invalid-feedback d-block">
          {errors[`member-${member.id}-age`]}
        </div>
      )}

      <select
        className={`form-control ${
          errors[`member-${member.id}-relation`] ? "is-invalid" : ""
        }`}
        value={member.relation}
        onChange={(e) => onChange(member.id, { relation: e.target.value })}
      >
        <option value="">Relation</option>
        <option value="mother">Mother</option>
        <option value="father">Father</option>
        <option value="child">Child</option>
        <option value="sibling">Sibling</option>
        <option value="partner">Partner</option>
        <option value="other">Other</option>
      </select>
      {errors[`member-${member.id}-relation`] && (
        <div className="invalid-feedback d-block">
          {errors[`member-${member.id}-relation`]}
        </div>
      )}

      <div>
        <label className="form-label mt-2">Cat Allergies</label>
        <div className="d-flex gap-3">
          <label>
            <input
              type="radio"
              className="form-check-input me-1"
              name={`allergies-${member.id}`}
              checked={member.allergies === "yes"}
              onChange={() => onChange(member.id, { allergies: "yes" })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              className="form-check-input me-1"
              name={`allergies-${member.id}`}
              checked={member.allergies === "no"}
              onChange={() => onChange(member.id, { allergies: "no" })}
            />
            No
          </label>
        </div>
        {errors[`member-${member.id}-allergies`] && (
          <div className="invalid-feedback d-block">
            {errors[`member-${member.id}-allergies`]}
          </div>
        )}
      </div>

      {member.removable && (
        <button
          type="button"
          className="btn btn-danger btn-sm mt-2 align-self-end"
          onClick={() => onRemove(member.id)}
        >
          Remove
        </button>
      )}
    </div>
  );
});

const HouseholdInformation = forwardRef((props, ref) => {
  const { errors, validate, setErrors } = useFormValidation();
  const [rentOwn, setRentOwn] = useState("");
  const [form, setForm] = useState({
    landlordName: "",
    landlordPhone: "",
    landlordEmail: "",
    residenceType: "",
    petsAllowed: "",
    months: "",
  });
  const [members, setMembers] = useState([
    { id: 1, name: "", age: "", relation: "", allergies: "", removable: false },
  ]);
  const nextMemberIdRef = useRef(2);

  const handleMemberChange = useCallback((id, partial) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...partial } : m))
    );

    // Remove only the changed field’s error
    const changedField = Object.keys(partial)[0];
    if (changedField) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`member-${id}-${changedField}`];
        return copy;
      });
    }
  }, []);

  const handleRemoveMember = useCallback((id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addMember = useCallback(() => {
    const id = nextMemberIdRef.current++;
    setMembers((prev) => [
      ...prev,
      { id, name: "", age: "", relation: "", allergies: "", removable: true },
    ]);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  useImperativeHandle(ref, () => ({
    validateStep: () => {
      const requiredFields = {
        rentOwn,
        residenceType: form.residenceType,
        petsAllowed: form.petsAllowed,
        months: form.months,
        landlordName: rentOwn === "rent" ? form.landlordName : "ok",
        landlordPhone: rentOwn === "rent" ? form.landlordPhone : "ok",
        landlordEmail: rentOwn === "rent" ? form.landlordEmail : "ok",
      };

      const isValid = validate(requiredFields);

      const memberErrors = {};
      members.forEach((m) => {
        if (!m.name)
          memberErrors[`member-${m.id}-name`] = "Member name is required.";
        if (!m.age)
          memberErrors[`member-${m.id}-age`] = "Member age is required.";
        if (!m.relation)
          memberErrors[`member-${m.id}-relation`] = "Select relation.";
        if (!m.allergies)
          memberErrors[`member-${m.id}-allergies`] =
            "Please select allergy status.";
      });

      setErrors((prev) => ({ ...prev, ...memberErrors }));

      return Object.keys(memberErrors).length === 0 && isValid;
    },

    getFormData: () => ({
      rentOwn,
      landlordName: form.landlordName,
      landlordPhone: form.landlordPhone,
      landlordEmail: form.landlordEmail,
      residenceType: form.residenceType,
      petsAllowed: form.petsAllowed,
      monthsLiving: parseInt(form.months) || 0,
      members: members.map(({ removable, ...rest }) => rest),
    }),

    setBackendErrors: (backendErrors) => {
      setErrors(backendErrors);
    },
  }));

  return (
    <div className="household-info bg-sections d-flex flex-column p-4 rounded-3 mt-3">
      <span className="h5">Household Information</span>

      {/* Rent / Own */}
      <label className="form-label mt-3">Do you rent or own your home?</label>
      <div className="d-flex gap-5">
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.rentOwn ? "is-invalid" : ""
            }`}
            name="rentOwn"
            checked={rentOwn === "rent"}
            onChange={() => {
              setRentOwn("rent");
              setErrors((prev) => ({ ...prev, rentOwn: "" }));
            }}
          />
          Rent
        </label>
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.rentOwn ? "is-invalid" : ""
            }`}
            name="rentOwn"
            checked={rentOwn === "own"}
            onChange={() => {
              setRentOwn("own");
              setErrors((prev) => ({ ...prev, rentOwn: "" }));
            }}
          />
          Own
        </label>
      </div>
      {errors.rentOwn && (
        <div className="invalid-feedback d-block">{errors.rentOwn}</div>
      )}

      {/* Landlord info */}
      {rentOwn === "rent" && (
        <div className="mt-3">
          <label className="form-label">Landlord's name & contact</label>

          <input
            id="landlordName"
            type="text"
            className={`form-control mt-2 ${
              errors.landlordName ? "is-invalid" : ""
            }`}
            placeholder="Landlord's name"
            value={form.landlordName}
            onChange={handleChange}
          />
          {errors.landlordName && (
            <div className="invalid-feedback d-block">
              {errors.landlordName}
            </div>
          )}

          <input
            id="landlordPhone"
            type="tel"
            className={`form-control mt-2 ${
              errors.landlordPhone ? "is-invalid" : ""
            }`}
            placeholder="Landlord's phone"
            value={form.landlordPhone}
            onChange={handleChange}
          />
          {errors.landlordPhone && (
            <div className="invalid-feedback d-block">
              {errors.landlordPhone}
            </div>
          )}

          <input
            id="landlordEmail"
            type="email"
            className={`form-control mt-2 ${
              errors.landlordEmail ? "is-invalid" : ""
            }`}
            placeholder="Landlord's email"
            value={form.landlordEmail}
            onChange={handleChange}
          />
          {errors.landlordEmail && (
            <div className="invalid-feedback d-block">
              {errors.landlordEmail}
            </div>
          )}
        </div>
      )}

      {/* Residence Type */}
      <label className="form-label mt-3">Type of Residence</label>
      <div className="d-flex gap-5">
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.residenceType ? "is-invalid" : ""
            }`}
            name="residenceType"
            checked={form.residenceType === "house"}
            onChange={() => {
              setForm((prev) => ({ ...prev, residenceType: "house" }));
              setErrors((prev) => ({ ...prev, residenceType: "" }));
            }}
          />
          House
        </label>
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.residenceType ? "is-invalid" : ""
            }`}
            name="residenceType"
            checked={form.residenceType === "apartment"}
            onChange={() => {
              setForm((prev) => ({ ...prev, residenceType: "apartment" }));
              setErrors((prev) => ({ ...prev, residenceType: "" }));
            }}
          />
          Apartment
        </label>
      </div>
      {errors.residenceType && (
        <div className="invalid-feedback d-block">{errors.residenceType}</div>
      )}

      {/* Pets Allowed */}
      <label className="form-label mt-3">Are pets allowed in your lease?</label>
      <div className="d-flex gap-5">
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.petsAllowed ? "is-invalid" : ""
            }`}
            name="petsAllowed"
            checked={form.petsAllowed === "true"}
            onChange={() => {
              setForm((prev) => ({ ...prev, petsAllowed: "true" }));
              setErrors((prev) => ({ ...prev, petsAllowed: "" }));
            }}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            className={`form-check-input me-1 ${
              errors.petsAllowed ? "is-invalid" : ""
            }`}
            name="petsAllowed"
            checked={form.petsAllowed === "false"}
            onChange={() => {
              setForm((prev) => ({ ...prev, petsAllowed: "false" }));
              setErrors((prev) => ({ ...prev, petsAllowed: "" }));
            }}
          />
          No
        </label>
      </div>
      {errors.petsAllowed && (
        <div className="invalid-feedback d-block">{errors.petsAllowed}</div>
      )}

      {/* Months at address */}
      <label className="form-label mt-3">How long at current address?</label>
      <input
        id="months"
        type="number"
        className={`form-control ${errors.months ? "is-invalid" : ""}`}
        placeholder="Months"
        min={1}
        value={form.months}
        onChange={handleChange}
      />
      {errors.months && (
        <div className="invalid-feedback d-block">{errors.months}</div>
      )}

      {/* Members */}
      <label className="form-label mt-3">List all household members</label>
      {members.map((member, i) => (
        <HouseholdMember
          key={member.id}
          index={i + 1}
          member={member}
          onChange={handleMemberChange}
          onRemove={handleRemoveMember}
          errors={errors}
        />
      ))}

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary btn-sm mt-3"
          onClick={addMember}
        >
          Add New Member
        </button>
      </div>
    </div>
  );
});

export default HouseholdInformation;
