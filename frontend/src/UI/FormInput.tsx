import React from "react";
import styles from "./FormInput.module.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isValid: boolean | null;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, isValid, ...otherProps }, ref) => {
    return (
      <div
        className={`${styles.control} ${
          isValid === false ? styles.invalid : ""
        }`}
      >
        {label && <label htmlFor={label}>{label}</label>}
        <input {...otherProps} ref={ref} />
      </div>
    );
  }
);

export default FormInput;
