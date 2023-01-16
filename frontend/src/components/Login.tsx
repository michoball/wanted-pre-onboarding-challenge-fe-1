import { useState, FormEvent, ChangeEvent, useReducer, useEffect } from "react";
import FormInput from "../UI/FormInput";
import styles from "./Login.module.css";
import useAuthMutation from "../hooks/services/mutations/useAuthMutation";

interface State {
  value: string;
  isValid: boolean | null;
}

interface ActionType {
  type: string;
  val?: string;
}

export const emailReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return {
        value: action.val,
        isValid: action.val.includes("@") && action.val.includes("."),
      };
  }
  return { value: "", isValid: null };
};

export const passwordReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  return { value: "", isValid: null };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const { useLoginMutate } = useAuthMutation();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { mutate: loginMutate } = useLoginMutate(emailState.value);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!!emailIsValid && !!passwordIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      loginMutate({
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
          // ref={emailInputRef}
          type="email"
          name="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="password"
          // ref={passwordInputRef}
          type="password"
          name="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
        />
        <div className={styles.buttons}>
          <button type="submit" disabled={!formIsValid}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
