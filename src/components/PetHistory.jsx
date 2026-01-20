import {
  useState,
  useRef,
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormValidation } from "../hooks/useFormValidation";

// ----- PET ITEM -----
const CurrentPets = memo(function CurrentPets({
  index,
  pet,
  onChange,
  onRemove,
  errors,
}) {
  return (
    <div
      className="current-pets-info d-flex flex-column gap-2 mb-4 border rounded-3 p-3"
      data-pet-id={pet.id}
    >
      <p className="m-0 h6">Pet {index}</p>

      <input
        className={`form-control ${
          errors[`pet-${pet.id}-breed`] ? "is-invalid" : ""
        }`}
        type="text"
        placeholder="Pet type/breed"
        value={pet.breed}
        onChange={(e) => onChange(pet.id, { breed: e.target.value })}
      />
      {errors[`pet-${pet.id}-breed`] && (
        <div className="invalid-feedback d-block">
          {errors[`pet-${pet.id}-breed`]}
        </div>
      )}

      <input
        className={`form-control ${
          errors[`pet-${pet.id}-age`] ? "is-invalid" : ""
        }`}
        type="text"
        placeholder="Pet's age"
        value={pet.age}
        onChange={(e) => onChange(pet.id, { age: e.target.value })}
      />
      {errors[`pet-${pet.id}-age`] && (
        <div className="invalid-feedback d-block">
          {errors[`pet-${pet.id}-age`]}
        </div>
      )}

      <select
        className={`form-control ${
          errors[`pet-${pet.id}-status`] ? "is-invalid" : ""
        }`}
        value={pet.status}
        onChange={(e) => onChange(pet.id, { status: e.target.value })}
      >
        <option value="">Spayed/Neutered Status</option>
        <option value="spayed">Spayed</option>
        <option value="neutered">Neutered</option>
        <option value="none">None</option>
      </select>
      {errors[`pet-${pet.id}-status`] && (
        <div className="invalid-feedback d-block">
          {errors[`pet-${pet.id}-status`]}
        </div>
      )}

      <div className="vaccinated d-flex flex-column align-items-start">
        <label className="form-label mt-2">Vaccinated</label>
        <div className="d-flex gap-4">
          <label>
            <input
              className="form-check-input me-1"
              type="radio"
              name={`isVaccinated-${pet.id}`}
              checked={pet.vaccinated === "yes"}
              onChange={() => onChange(pet.id, { vaccinated: "yes" })}
            />
            Yes
          </label>
          <label>
            <input
              className="form-check-input me-1"
              type="radio"
              name={`isVaccinated-${pet.id}`}
              checked={pet.vaccinated === "no"}
              onChange={() => onChange(pet.id, { vaccinated: "no" })}
            />
            No
          </label>
        </div>
        {errors[`pet-${pet.id}-vaccinated`] && (
          <div className="invalid-feedback d-block">
            {errors[`pet-${pet.id}-vaccinated`]}
          </div>
        )}
      </div>

      {pet.removable && (
        <button
          type="button"
          className="btn btn-danger btn-outline-danger text-white btn-sm mt-3 align-self-end"
          onClick={() => onRemove(pet.id)}
        >
          Remove Pet
        </button>
      )}
    </div>
  );
});

// ----- MAIN COMPONENT -----
const PetHistory = forwardRef(({ householdId }, ref) => {
  const { errors, validate, setErrors } = useFormValidation();
  const nextPetIdRef = useRef(2);

  // State
  const [petsOwn, setPetsOwn] = useState("");
  const [pets, setPets] = useState([
    { id: 1, breed: "", age: "", status: "", vaccinated: "", removable: false },
  ]);
  const [previousPets, setPreviousPets] = useState("");
  const [previousPetText, setPreviousPetText] = useState("");
  const [vetName, setVetName] = useState("");
  const [vetPhone, setVetPhone] = useState("");
  const [contactVet, setContactVet] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [genderGroup, setGenderGroup] = useState("");
  const [noPreference, setNoPreference] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [whyAdopt, setWhyAdopt] = useState("");
  const [catPlacement, setCatPlacement] = useState("");
  const [whereCatStays, setWhereCatStays] = useState("");
  const [hoursAlone, setHoursAlone] = useState("");

  // --- Handlers ---
  const clearError = (key) =>
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

  const handlePetChange = useCallback((id, partial) => {
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    );

    const changedField = Object.keys(partial)[0];
    if (changedField) clearError(`pet-${id}-${changedField}`);
  }, []);

  const handleRemovePet = useCallback(
    (id) => setPets((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const addPet = useCallback(() => {
    const id = nextPetIdRef.current++;
    setPets((prev) => [
      ...prev,
      { id, breed: "", age: "", status: "", vaccinated: "", removable: true },
    ]);
  }, []);

  // --- Validation & Data for parent ---
  useImperativeHandle(ref, () => ({
    validateStep: () => {
      const required = {
        petsOwn,
        previousPets,
        contactVet,
        ageGroup: noPreference ? "ok" : ageGroup,
        genderGroup: noPreference ? "ok" : genderGroup,
        catPlacement,
        whereCatStays,
        hoursAlone,
        personalityTraits,
        whyAdopt,
      };

      const isValid = validate(required);

      const petErrors = {};
      if (petsOwn === "yes") {
        pets.forEach((p) => {
          if (!p.breed)
            petErrors[`pet-${p.id}-breed`] = "Pet breed/type is required.";
          if (!p.age) petErrors[`pet-${p.id}-age`] = "Pet age is required.";
          if (!p.status)
            petErrors[`pet-${p.id}-status`] = "Select spayed/neutered status.";
          if (!p.vaccinated)
            petErrors[`pet-${p.id}-vaccinated`] =
              "Please select vaccination status.";
        });
      }

      if (previousPets === "yes" && !previousPetText)
        petErrors.previousPetText = "Please explain what happened to them.";

      setErrors((prev) => ({ ...prev, ...petErrors }));
      return Object.keys(petErrors).length === 0 && isValid;
    },

    getFormData: () => {
      // si el usuario no tiene mascotas, no enviar array con datos vacíos
      const filteredPets = petsOwn === "yes" ? pets : [];

      return {
        householdId: householdId?.current,
        petsOwn,
        pets: filteredPets,
        previousPets,
        previousPetText,
        vetName,
        vetPhone,
        contactVet,
        ageGroup,
        genderGroup,
        noPreference,
        personalityTraits,
        whyAdopt,
        catPlacement,
        whereCatStays,
        hoursAlone,
      };
    },

    setBackendErrors: (backendErrors) => setErrors(backendErrors),
  }));

  return (
    <div className="pet-history bg-sections d-flex flex-column p-4 rounded-3 mt-3">
      <span className="h5">Current & Previous Pets</span>

      {/* ---------- Current Pets ---------- */}
      <label className="form-label mt-3">Do you currently have pets?</label>
      <div className="d-flex gap-5">
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={petsOwn === "yes"}
            onChange={() => {
              setPetsOwn("yes");
              clearError("petsOwn");
            }}
          />
          Yes
        </label>
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={petsOwn === "no"}
            onChange={() => {
              setPetsOwn("no");
              clearError("petsOwn");
              setErrors((prev) => {
                // limpiar todos los errores relacionados con pets
                const copy = { ...prev };
                Object.keys(copy).forEach((key) => {
                  if (key.startsWith("pet-")) delete copy[key];
                });
                return copy;
              });
            }}
          />
          No
        </label>
      </div>
      {errors.petsOwn && (
        <div className="invalid-feedback d-block">{errors.petsOwn}</div>
      )}

      {petsOwn === "yes" && (
        <>
          <label className="form-label mt-3">List all current pets</label>
          {pets.map((pet, i) => (
            <CurrentPets
              key={pet.id}
              index={i + 1}
              pet={pet}
              onChange={handlePetChange}
              onRemove={handleRemovePet}
              errors={errors}
            />
          ))}
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-sm mt-2"
              onClick={addPet}
            >
              Add New Pet
            </button>
          </div>
        </>
      )}

      {/* ---------- Previous Pets ---------- */}
      <label className="form-label mt-3">
        Have you had pets in the past 5 years?
      </label>
      <div className="d-flex gap-5">
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={previousPets === "yes"}
            onChange={() => {
              setPreviousPets("yes");
              clearError("previousPets");
            }}
          />
          Yes
        </label>
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={previousPets === "no"}
            onChange={() => {
              setPreviousPets("no");
              clearError("previousPets");
              clearError("previousPetText");
            }}
          />
          No
        </label>
      </div>
      {errors.previousPets && (
        <div className="invalid-feedback d-block">{errors.previousPets}</div>
      )}

      {previousPets === "yes" && (
        <>
          <label className="form-label mt-3" htmlFor="previousPetText">
            What happened to them?
          </label>
          <textarea
            id="previousPetText"
            className={`form-control ${
              errors.previousPetText ? "is-invalid" : ""
            }`}
            value={previousPetText}
            onChange={(e) => {
              setPreviousPetText(e.target.value);
              clearError("previousPetText");
            }}
          ></textarea>
          {errors.previousPetText && (
            <div className="invalid-feedback d-block">
              {errors.previousPetText}
            </div>
          )}
        </>
      )}

      {/* ---------- Veterinarian ---------- */}
      <label className="form-label mt-3">Veterinarian's name & phone</label>
      <div className="d-flex gap-2">
        <input
          className={`form-control ${errors.vetName ? "is-invalid" : ""}`}
          placeholder="Name"
          value={vetName}
          onChange={(e) => {
            setVetName(e.target.value);
            clearError("vetName");
          }}
        />
        <input
          className={`form-control ${errors.vetPhone ? "is-invalid" : ""}`}
          placeholder="Phone"
          value={vetPhone}
          onChange={(e) => {
            setVetPhone(e.target.value);
            clearError("vetPhone");
          }}
        />
      </div>

      <label className="form-label mt-3">May we contact your vet?</label>
      <div className="d-flex gap-5">
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={contactVet === "yes"}
            onChange={() => {
              setContactVet("yes");
              clearError("contactVet");
            }}
          />
          Yes
        </label>
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            checked={contactVet === "no"}
            onChange={() => {
              setContactVet("no");
              clearError("contactVet");
            }}
          />
          No
        </label>
      </div>
      {errors.contactVet && (
        <div className="invalid-feedback d-block">{errors.contactVet}</div>
      )}

      {/* ---------- Cat Preferences ---------- */}
      <label className="form-label mt-3">
        What type of cat are you interested in adopting?
      </label>
      <div className="d-flex flex-wrap gap-3">
        {["kitten", "adult", "senior"].map((age) => (
          <label key={age}>
            <input
              className="form-check-input me-1"
              type="radio"
              name="ageGroup"
              checked={ageGroup === age}
              onChange={() => {
                setAgeGroup(age);
                setNoPreference(false);
                clearError("ageGroup");
              }}
            />
            {age.charAt(0).toUpperCase() + age.slice(1)}
          </label>
        ))}

        {["male", "female"].map((gender) => (
          <label key={gender}>
            <input
              className="form-check-input me-1"
              type="radio"
              name="genderGroup"
              checked={genderGroup === gender}
              onChange={() => {
                setGenderGroup(gender);
                setNoPreference(false);
                clearError("genderGroup");
              }}
            />
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </label>
        ))}

        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            name="noPreference"
            checked={noPreference}
            onChange={() => {
              setNoPreference(true);
              setAgeGroup("");
              setGenderGroup("");
              clearError("ageGroup");
              clearError("genderGroup");
            }}
          />
          No Preference
        </label>
      </div>

      {/* ---------- Text Areas ---------- */}
      <label className="form-label mt-3">
        Personality traits you're hoping for:
      </label>
      <textarea
        className={`form-control ${
          errors.personalityTraits ? "is-invalid" : ""
        }`}
        value={personalityTraits}
        onChange={(e) => {
          setPersonalityTraits(e.target.value);
          clearError("personalityTraits");
        }}
      />
      {errors.personalityTraits && (
        <div className="invalid-feedback d-block">
          {errors.personalityTraits}
        </div>
      )}

      <label className="form-label mt-3">Why do you want to adopt a cat?</label>
      <textarea
        className={`form-control ${errors.whyAdopt ? "is-invalid" : ""}`}
        value={whyAdopt}
        onChange={(e) => {
          setWhyAdopt(e.target.value);
          clearError("whyAdopt");
        }}
      />
      {errors.whyAdopt && (
        <div className="invalid-feedback d-block">{errors.whyAdopt}</div>
      )}

      <label className="form-label mt-3">Where will your cat live?</label>
      <div className="d-flex gap-4">
        {["indoor", "outdoor", "both"].map((opt) => (
          <label key={opt}>
            <input
              className="form-check-input me-1"
              type="radio"
              checked={catPlacement === opt}
              onChange={() => {
                setCatPlacement(opt);
                clearError("catPlacement");
              }}
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
      {errors.catPlacement && (
        <div className="invalid-feedback d-block">{errors.catPlacement}</div>
      )}

      <label className="form-label mt-3">
        Where will the cat stay when you are not home?
      </label>
      <textarea
        className={`form-control ${errors.whereCatStays ? "is-invalid" : ""}`}
        value={whereCatStays}
        onChange={(e) => {
          setWhereCatStays(e.target.value);
          clearError("whereCatStays");
        }}
      />
      {errors.whereCatStays && (
        <div className="invalid-feedback d-block">{errors.whereCatStays}</div>
      )}

      <label className="form-label mt-3">
        How many hours per day will the cat be alone?
      </label>
      <input
        className={`form-control ${errors.hoursAlone ? "is-invalid" : ""}`}
        type="number"
        value={hoursAlone}
        onChange={(e) => {
          setHoursAlone(e.target.value);
          clearError("hoursAlone");
        }}
      />
      {errors.hoursAlone && (
        <div className="invalid-feedback d-block">{errors.hoursAlone}</div>
      )}
    </div>
  );
});

export default PetHistory;
