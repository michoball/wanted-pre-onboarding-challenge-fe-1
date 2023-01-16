import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import FormInput from "../UI/FormInput";
import { emailReducer, passwordReducer } from "./Login";
import styles from "./Login.module.css";
import useAuthMutation from "../hooks/services/mutations/useAuthMutation";

const SignUp = () => {
  const [formIsValid, setFormIsValid] = useState(false);

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
  const { useSignUpMutate } = useAuthMutation();
  const { mutate: signinMutate } = useSignUpMutate(emailState.value);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        !!emailIsValid && !!passwordIsValid && !!confirmPasswordIsValid
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      signinMutate({
        email: emailState.value,
        password: passwordState.value,
      });
    }
    dispatchEmail({ type: "RESET" });
    dispatchPassword({ type: "RESET" });
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
          type="email"
          name="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
        />
        <FormInput
          label="confirm password"
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
