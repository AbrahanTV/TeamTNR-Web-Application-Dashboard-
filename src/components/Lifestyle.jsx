import {
  useState,
  useRef,
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormValidation } from "../hooks/useFormValidation";

// ----- Reference Item -----
const Reference = memo(function Reference({
  index,
  refItem,
  onChange,
  onRemove,
  errors,
}) {
  return (
    <div
      className="reference-info d-flex flex-column gap-2 mb-4 border rounded-3 p-3"
      data-ref-id={refItem.id}
    >
      <p className="m-0 h6">Reference {index}</p>

      <input
        className={`form-control ${
          errors[`ref-${refItem.id}-name`] ? "is-invalid" : ""
        }`}
        type="text"
        placeholder="Reference name"
        value={refItem.name}
        onChange={(e) => onChange(refItem.id, { name: e.target.value })}
      />
      {errors[`ref-${refItem.id}-name`] && (
        <div className="invalid-feedback d-block">
          {errors[`ref-${refItem.id}-name`]}
        </div>
      )}

      <input
        className={`form-control ${
          errors[`ref-${refItem.id}-phone`] ? "is-invalid" : ""
        }`}
        type="tel"
        placeholder="Phone number"
        value={refItem.phone}
        onChange={(e) => onChange(refItem.id, { phone: e.target.value })}
      />
      {errors[`ref-${refItem.id}-phone`] && (
        <div className="invalid-feedback d-block">
          {errors[`ref-${refItem.id}-phone`]}
        </div>
      )}

      {refItem.removable && (
        <div className="d-flex justify-content-end">
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

// ----- Main Component -----
const Lifestyle = forwardRef(({ householdId }, ref) => {
  const { errors, validate, setErrors } = useFormValidation();
  const [references, setReferences] = useState([
    { id: 1, name: "", phone: "", removable: false },
  ]);
  const nextRefId = useRef(2);

  // State
  const [behavior, setBehavior] = useState("");
  const [declaw, setDeclaw] = useState("");
  const [ifMoves, setIfMoves] = useState("");
  const [finance, setFinance] = useState("");
  const [catCare, setCatCare] = useState("");

  // --- Handlers ---
  const clearError = (key) =>
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

  const handleRefChange = useCallback((id, partial) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...partial } : r)),
    );
    const changedField = Object.keys(partial)[0];
    if (changedField) clearError(`ref-${id}-${changedField}`);
  }, []);

  const handleRemoveRef = useCallback(
    (id) => setReferences((prev) => prev.filter((r) => r.id !== id)),
    [],
  );

  const addReference = useCallback(() => {
    const id = nextRefId.current++;
    setReferences((prev) => [
      ...prev,
      { id, name: "", phone: "", removable: true },
    ]);
  }, []);

  // --- Validation & Data for parent ---
  useImperativeHandle(ref, () => ({
    validateStep: () => {
      const required = {
        behavior,
        declaw,
        ifMoves,
        finance,
        catCare,
      };

      const isValid = validate(required);

      const refErrors = {};
      references.forEach((r) => {
        if (!r.name)
          refErrors[`ref-${r.id}-name`] = "Reference name is required.";
        if (!r.phone)
          refErrors[`ref-${r.id}-phone`] = "Reference phone is required.";
      });

      setErrors((prev) => ({ ...prev, ...refErrors }));

      return Object.keys(refErrors).length === 0 && isValid;
    },

    getFormData: () => ({
      householdId: householdId?.current,
      behavior,
      declaw,
      ifMoves,
      finance,
      catCare,
      references,
    }),

    setBackendErrors: (backendErrors) => setErrors(backendErrors),
  }));

  // --- Render ---
  return (
    <div className="lifestyle-cont bg-sections d-flex flex-column p-4 rounded-3 mt-3">
      <span className="h5">Lifestyle & Commitment</span>

      {/* ---------- Cat Behavior ---------- */}
      <label className="form-label mt-3" htmlFor="catBehavior">
        How will you handle scratching/unwanted behavior?
      </label>
      <textarea
        id="catBehavior"
        className={`form-control ${errors.behavior ? "is-invalid" : ""}`}
        value={behavior}
        onChange={(e) => {
          setBehavior(e.target.value);
          clearError("behavior");
        }}
      />
      {errors.behavior && (
        <div className="invalid-feedback d-block">{errors.behavior}</div>
      )}

      {/* ---------- Declaw ---------- */}
      <label className="form-label mt-3">Do you plan to declaw?</label>
      <div className="d-flex gap-5">
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            name="declaw"
            checked={declaw === "yes"}
            onChange={() => {
              setDeclaw("yes");
              clearError("declaw");
            }}
          />
          Yes
        </label>
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            name="declaw"
            checked={declaw === "no"}
            onChange={() => {
              setDeclaw("no");
              clearError("declaw");
            }}
          />
          No
        </label>
      </div>
      {errors.declaw && (
        <div className="invalid-feedback d-block">{errors.declaw}</div>
      )}

      {/* ---------- If Moves ---------- */}
      <label className="form-label mt-3" htmlFor="ifMoves">
        If you move, what will you do with your cat?
      </label>
      <textarea
        id="ifMoves"
        className={`form-control ${errors.ifMoves ? "is-invalid" : ""}`}
        value={ifMoves}
        onChange={(e) => {
          setIfMoves(e.target.value);
          clearError("ifMoves");
        }}
      />
      {errors.ifMoves && (
        <div className="invalid-feedback d-block">{errors.ifMoves}</div>
      )}

      {/* ---------- Finance ---------- */}
      <label className="form-label mt-3">
        Are you financially prepared for vet care & emergencies?
      </label>
      <div className="d-flex gap-5">
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            name="finance"
            checked={finance === "yes"}
            onChange={() => {
              setFinance("yes");
              clearError("finance");
            }}
          />
          Yes
        </label>
        <label>
          <input
            className="form-check-input me-1"
            type="radio"
            name="finance"
            checked={finance === "no"}
            onChange={() => {
              setFinance("no");
              clearError("finance");
            }}
          />
          No
        </label>
      </div>
      {errors.finance && (
        <div className="invalid-feedback d-block">{errors.finance}</div>
      )}

      {/* ---------- Cat Care ---------- */}
      <label className="form-label mt-3" htmlFor="catCare">
        Who will care for your cat if you are away/unable?
      </label>
      <textarea
        id="catCare"
        className={`form-control ${errors.catCare ? "is-invalid" : ""}`}
        value={catCare}
        onChange={(e) => {
          setCatCare(e.target.value);
          clearError("catCare");
        }}
      />
      {errors.catCare && (
        <div className="invalid-feedback d-block">{errors.catCare}</div>
      )}

      {/* ---------- References ---------- */}
      <span className="h5 d-block mt-4">References</span>
      {references.map((r, i) => (
        <Reference
          key={r.id}
          index={i + 1}
          refItem={r}
          onChange={handleRefChange}
          onRemove={handleRemoveRef}
          errors={errors}
        />
      ))}

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary btn-sm mt-2"
          onClick={addReference}
        >
          Add Reference
        </button>
      </div>
    </div>
  );
});

export default Lifestyle;
