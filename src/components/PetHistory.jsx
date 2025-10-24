import { useState, useRef, useCallback, memo } from "react";

// Hoisted so it doesn't remount on each parent render
const CurrentPets = memo(function CurrentPets({
  index,
  pet,
  onChange,
  onRemove,
}) {
  return (
    <div
      className="current-pets-info d-flex flex-column gap-2 mb-4"
      data-pet-id={pet.id}
    >
      <p className="m-0 h6"> Pet {index}</p>

      <input
        className="form-control"
        type="text"
        placeholder="Pet type/breed"
        value={pet.breed}
        onChange={(e) => onChange(pet.id, { breed: e.target.value })}
      />

      <input
        className="form-control"
        type="text"
        placeholder="Pet's age"
        value={pet.age}
        onChange={(e) => onChange(pet.id, { age: e.target.value })}
      />

      <div className="pet-status-cont d-flex flex-column align-items-center">
        <select
          className="form-control"
          value={pet.status}
          onChange={(e) => onChange(pet.id, { status: e.target.value })}
        >
          <option value="" disabled>
            {"Spayed/Neutered Status"}
          </option>
          <option value="spayed">Spayed</option>
          <option value="neutered">Neutered</option>
          <option value="none">None</option>
        </select>

        <div className="vaccinated d-flex flex-column align-items-start align-self-start">
          <label className="form-label mt-3">Vaccinated</label>

          <div className="vaccinated-options d-flex gap-5">
            <div className="vaccinated-yes d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name={`isVaccinated-${pet.id}`}
                id={`vaccinatedYes-${pet.id}`}
                value="yes"
                checked={pet.vaccinated === "yes"}
                onChange={() => onChange(pet.id, { vaccinated: "yes" })}
              />
              <label htmlFor={`vaccinatedYes-${pet.id}`}>Yes</label>
            </div>

            <div className="vaccinated-no d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name={`isVaccinated-${pet.id}`}
                id={`vaccinatedNo-${pet.id}`}
                value="no"
                checked={pet.vaccinated === "no"}
                onChange={() => onChange(pet.id, { vaccinated: "no" })}
              />
              <label htmlFor={`vaccinatedNo-${pet.id}`}>No</label>
            </div>
          </div>
        </div>

        {pet.removable && (
          <button
            type="button"
            className="btn btn-danger btn-outline-danger text-white btn-sm mt-3"
            onClick={() => onRemove(pet.id)}
          >
            Remove Pet
          </button>
        )}
      </div>
    </div>
  );
});

const PetHistory = () => {
  const [petsOwn, setPetsOwn] = useState("");
  const [pets, setPets] = useState([
    {
      id: 1,
      breed: "",
      age: "",
      status: "",
      vaccinated: "",
      removable: false,
    },
  ]);

  const addBtn = useRef(null);
  const nextPetIdRef = useRef(2);

  const handlePetChange = useCallback((id, partial) => {
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...partial } : p))
    );
  }, []);

  const handleRemovePet = useCallback((id) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addPet = useCallback((e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const id = nextPetIdRef.current++;
    setPets((prev) => [
      ...prev,
      { id, breed: "", age: "", status: "", vaccinated: "", removable: true },
    ]);
  }, []);

  return (
    <>
      <style>
        {`
          .household-info { }
        `}
      </style>

      <div className="pet-history bg-sections p-4 rounded-3 mt-3">
        <span className="h5">Current & Previous Pets</span>

        <div className="current-pets">
          <label className="form-label mt-3">Do you currently have pets?</label>
          <div className="pets-options  d-flex justify-content-start gap-5">
            <div className="yes d-flex gap-1 ">
              <input
                className="form-check-input "
                type="radio"
                name="havePets"
                id="havePetsYes"
                value="yes"
                checked={petsOwn === "yes"}
                onChange={() => setPetsOwn("yes")}
              />
              <label htmlFor="havePetsYes">Yes</label>
            </div>
            <div className="no d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name="havePets"
                id="havePetsNo"
                value="no"
                checked={petsOwn === "no"}
                onChange={() => setPetsOwn("no")}
              />
              <label htmlFor="havePetsNo">No</label>
            </div>
          </div>
        </div>

        {petsOwn === "yes" && (
          <div className="if-yes">
            <label className="form-label mt-3">List all current pets</label>

            {pets.map((pet, i) => (
              <CurrentPets
                key={pet.id}
                index={i + 1}
                pet={pet}
                onChange={handlePetChange}
                onRemove={handleRemovePet}
              />
            ))}

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-sm mt-3"
                id="addPetBtn"
                ref={addBtn}
                onClick={addPet}
              >
                Add New Pet
              </button>
            </div>
          </div>
        )}
        <div className="btn-cont mt-3 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-md text-white fs-5 mt-3"
            id="sumbitFormBtn"
            type="submit"
          >
            Submit Application
          </button>
        </div>
      </div>
    </>
  );
};

export default PetHistory;
