import React, { useRef } from "react";
import styles from "./FormInput.module.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isValid: boolean | null;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, isValid, ...otherProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        className={`${styles.control} ${
          isValid === false ? styles.invalid : ""
        }`}
      >
        {label && <label htmlFor={label}>{label}</label>}
        <input {...otherProps} ref={inputRef} />
      </div>
    );
  }
);

export default FormInput;
