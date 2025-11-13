import { useState } from "react";

export function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const newErrors = {};
    for (const [key, value] of Object.entries(fields)) {
      // Handle booleans, strings, numbers, and nulls
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (typeof value === "boolean" && value === false)
      ) {
        newErrors[key] = "This field is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ return true if no errors
  };

  return { errors, setErrors, validate };
}
