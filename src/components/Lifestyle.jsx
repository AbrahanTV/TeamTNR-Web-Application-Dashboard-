import { useState, useRef, useCallback, memo } from "react";

const Reference = memo(function Reference({
  index,
  refItem,
  onChange,
  onRemove,
}) {
  return (
    <div
      className="reference-info d-flex flex-column gap-2 mb-4"
      data-ref-id={refItem.id}
    >
      <p className="m-0 h6"> Reference {index}</p>

      <input
        className="form-control"
        type="text"
        placeholder="Reference name"
        value={refItem.name}
        onChange={(e) => onChange(refItem.id, { name: e.target.value })}
      />

      <input
        className="form-control"
        type="tel"
        placeholder="Phone number"
        value={refItem.phone}
        onChange={(e) => onChange(refItem.id, { phone: e.target.value })}
      />

      {refItem.removable && (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={() => onRemove(refItem.id)}
          >
            Remove Reference
          </button>
        </div>
      )}
    </div>
  );
});

const Lifestyle = () => {
  const [references, setReferences] = useState([
    { id: 1, name: "", phone: "", removable: false },
  ]);

  const nextRefId = useRef(2);

  const handleRefChange = useCallback((id, partial) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...partial } : r))
    );
  }, []);

  const handleRemoveRef = useCallback((id) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addReference = useCallback((e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const id = nextRefId.current++;
    setReferences((prev) => [
      ...prev,
      { id, name: "", phone: "", removable: true },
    ]);
  }, []);
  return (
    <>
      <div className="lifestyle-cont bg-sections p-4 rounded-3 mt-3">
        <span className="h5">Lifestyle & Commitment</span>

        <div className="cat-behavior-cont">
          <label className="form-label mt-3" htmlFor="catBehavior">
            How will you handle scratching/unwanted behavior?
          </label>
          <textarea
            className="form-control"
            name="catBehavior"
            id="catBehavior"
          ></textarea>
        </div>

        <div className="declaw-cont">
          <label className="form-label mt-3" htmlFor="">
            Do you plan to declaw?
          </label>
          <div className="declaw-options d-flex gap-5">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="willDeclaw"
                id="declawYes"
              />
              <label htmlFor="declawYes">Yes</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="willDeclaw"
                id="declawNo"
              />
              <label htmlFor="declawNo">No</label>
            </div>
          </div>
        </div>

        <div className="if-moves">
          <label className="form-label mt-3" htmlFor="ifMoves">
            If you move, what will you do with your cat?
          </label>
          <textarea
            className="form-control"
            name="ifMoves"
            id="ifMoves"
          ></textarea>
        </div>

        <div className="finance">
          <label className="form-label mt-3" htmlFor="finance">
            Are you financially prepared for vet care & emergencies?
          </label>
          <div className="finance-options d-flex gap-5">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="financeReady"
                id="financeYes"
              />
              <label htmlFor="financeYes">Yes</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="financeReady"
                id="financeNo"
              />
              <label htmlFor="financeNo">No</label>
            </div>
          </div>
          <label className="form-label mt-3" htmlFor="catCare">
            Who will care for your cat if you are away/unable?
          </label>
          <textarea
            className="form-control"
            name="catCare"
            id="catCare"
          ></textarea>
        </div>

        <div className="references">
          <span className="h5 d-block mt-3">References</span>

          {references.map((r, i) => (
            <Reference
              key={r.id}
              index={i + 1}
              refItem={r}
              onChange={handleRefChange}
              onRemove={handleRemoveRef}
            />
          ))}

          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-md mt-2"
              id="addReferenceBtn"
              onClick={addReference}
            >
              Add Reference
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lifestyle;
