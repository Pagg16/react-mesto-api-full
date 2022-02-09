import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({ inputOne: "", inputTwo: "" });
  const [errors, setErrors] = useState({ inputOne: false, inputTwo: false });
  const [isValid, setIsValid] = useState({ inputOne: false, inputTwo: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid({ ...isValid, [name]: e.target.validity.valid });
  };

  const resetForm = useCallback(
    (
      newValues = { inputOne: "", inputTwo: "" },
      newErrors = { inputOne: false, inputTwo: false },
      newIsValid = { inputOne: false, inputTwo: false }
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
