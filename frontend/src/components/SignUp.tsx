import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import FormInput from "../UI/FormInput";
import { emailReducer, passwordReducer } from "./Login";
import styles from "./Login.module.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const { onSignUp } = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState<
    boolean | null
  >(null);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        !!emailIsValid && !!passwordIsValid && !!confirmPasswordIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      onSignUp(emailState.value, passwordState.value);
      dispatchEmail({ type: "RESET" });
      dispatchPassword({ type: "RESET" });
      navigate("/");
      return;
    }
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>Already have an account </h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          ref={emailInputRef}
          type="email"
          name="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="password"
          ref={passwordInputRef}
          type="password"
          name="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
        />
        <FormInput
          label="confirm password"
          ref={confirmPasswordInputRef}
          type="password"
          name="confirm password"
          isValid={confirmPasswordIsValid}
          onChange={(e) =>
            setConfirmPasswordIsValid(e.target.value === passwordState.value)
          }
        />
        <div className={styles.buttons}>
          <button type="submit" disabled={formIsValid ? false : true}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
