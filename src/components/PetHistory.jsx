import { useState, useRef, useCallback, memo } from "react";

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
  const [previousPets, setPreviousPets] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [genderGroup, setGenderGroup] = useState("");
  const [noPreference, setNoPreference] = useState(false);

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
          <div className="pets-options d-flex gap-5">
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

        <div className="previous-pets">
          <label className="form-label mt-3">
            Have you had pets in the past 5 years?
          </label>
          <div className="previous-pets-options d-flex gap-5">
            <div className="previous-pets-yes d-flex gap-1 ">
              <input
                className="form-check-input "
                type="radio"
                name="previousPets"
                id="previousPetsYes"
                value="yes"
                checked={previousPets === "yes"}
                onChange={() => setPreviousPets("yes")}
              />
              <label htmlFor="previousPetsYes">Yes</label>
            </div>
            <div className="previous-pets-no d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name="previousPets"
                id="previousPetsNo"
                value="no"
                checked={previousPets === "no"}
                onChange={() => setPreviousPets("no")}
              />
              <label htmlFor="previousPetsNo">No</label>
            </div>
          </div>
        </div>

        {previousPets === "yes" && (
          <div className="previous-pets-if-yes d-flex flex-column">
            <label className="form-label mt-3" htmlFor="previousPetText">
              What happened to them?
            </label>
            <textarea
              className="form-control"
              name="previousPetTextArea"
              id="previousPetText"
            ></textarea>
          </div>
        )}

        <div className="veterinarian-info">
          <label htmlFor="" className="form-label mt-3">
            Veterinarian's name & phone
          </label>
          <div className="vet-info-cont d-flex gap-2">
            <input
              className="form-control"
              type="text"
              name="vetInfo"
              id="vetName"
              placeholder="Name"
            />
            <input
              className="form-control"
              type="tel"
              name="vetInfo"
              id="vetPhone"
              placeholder="Phone"
            />
          </div>
          <label className="mt-3">May we contact your veterinarian?</label>
          <div className="contact-vet-options d-flex gap-5">
            <div className="contact-vet-yes d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name="contactVet"
                id="contactVetYes"
              />
              <label className="" htmlFor="contactVetYes">
                Yes
              </label>
            </div>
            <div className="contact-vet-no d-flex gap-1">
              <input
                className="form-check-input"
                type="radio"
                name="contactVet"
                id="contactVetNo"
              />
              <label className="form-label" htmlFor="contactVetNo">
                No
              </label>
            </div>
          </div>
        </div>

        {/* CAT ADOPTING INFO  */}

        <div className="cat-type-cont">
          <label className="form-label mt-3" htmlFor="catType">
            What type of cat are you interested in adopting?
          </label>
          <div className="cat-type-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="ageGroup"
                value="kitten"
                id="kittenCheck"
                checked={ageGroup === "kitten"}
                onChange={() => {
                  setAgeGroup("kitten");
                  setNoPreference(false);
                }}
              />
              <label htmlFor="kittenCheck">Kitten</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="ageGroup"
                value="adult"
                id="adultCheck"
                checked={ageGroup === "adult"}
                onChange={() => {
                  setAgeGroup("adult");
                  setNoPreference(false);
                }}
              />
              <label htmlFor="adultCheck">Adult</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="ageGroup"
                value="senior"
                id="seniorCheck"
                checked={ageGroup === "senior"}
                onChange={() => {
                  setAgeGroup("senior");
                  setNoPreference(false);
                }}
              />
              <label htmlFor="seniorCheck">Senior</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genderGroup"
                value="male"
                id="maleCheck"
                checked={genderGroup === "male"}
                onChange={() => {
                  setGenderGroup("male");
                  setNoPreference(false);
                }}
              />
              <label htmlFor="maleCheck">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genderGroup"
                value="female"
                id="femaleCheck"
                checked={genderGroup === "female"}
                onChange={() => {
                  setGenderGroup("female");
                  setNoPreference(false);
                }}
              />
              <label htmlFor="femaleCheck">Female</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="noPreference"
                value="noPreference"
                id="noPreferenceCheck"
                checked={noPreference}
                onChange={() => {
                  setNoPreference(true);
                  setAgeGroup("");
                  setGenderGroup("");
                }}
              />
              <label htmlFor="noPreferenceCheck">No Preference</label>
            </div>

            <div className="personality-traits-cont">
              <label
                className="form-label mt-3"
                htmlFor="personality-traits-txt"
              >
                Personality traits you're hoping for:
              </label>
              <textarea
                className="form-control"
                name="personality-traits-txt"
                id="personality-traits-txt"
              ></textarea>
            </div>

            <div className="why-adopt-cont">
              <label className="form-label mt-3" htmlFor="why-adopt-txt">
                Why do you want to adopt a cat?
              </label>
              <textarea
                className="form-control"
                name="why-adopt-txt"
                id="why-adopt-txt"
              ></textarea>
            </div>

            <div className="cat-placement-cont">
              <label className="form-label mt-3">
                Where will your cat live?
              </label>
              <div className="cat-placement-options">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="catPlacement"
                    id="indoor"
                  />
                  <label htmlFor="indoor">Indoor</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="catPlacement"
                    id="outdoor"
                  />
                  <label htmlFor="outdoor">Outdoor</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="catPlacement"
                    id="both"
                  />
                  <label htmlFor="both">Both</label>
                </div>
              </div>
            </div>

            <div className="cat-company-cont">
              <label className="form-label mt-3" htmlFor="whereCatStays">
                Where will the cat stay when you are not home?
              </label>
              <textarea
                className="form-control"
                name="whereCatStays"
                id="whereCatStays"
              ></textarea>
              <label className="form-label mt-3" htmlFor="hoursAlone">
                How many hours per day will the cat be alone?
              </label>
              <input
                className="form-control"
                type="number"
                name="hoursAlone"
                id="hoursAlone"
              />
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
      </div>
    </>
  );
};

export default PetHistory;
