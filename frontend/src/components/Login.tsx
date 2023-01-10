import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useReducer,
  useRef,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import FormInput from "../UI/FormInput";

import styles from "./Login.module.css";

interface State {
  value: string;
  isValid: boolean | null;
}

interface ActionType {
  type: string;
  val?: string;
}

const emailReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return {
        value: action.val,
        isValid: action.val.includes("@") && action.val.includes("."),
      };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@") && state.value.includes("."),
    };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  return { value: "", isValid: null };
};

const Login = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState<boolean | null>(false);
  const { onLogin } = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      onLogin(emailState.value, passwordState.value);
      dispatchEmail({ type: "RESET" });
      dispatchPassword({ type: "RESET" });
      navigate("/");
    } else if (!emailIsValid && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
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
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="password"
          ref={passwordInputRef}
          type="password"
          name="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
        />
        <div className={styles.buttons}>
          <button
            type="submit"
            disabled={(formIsValid as boolean) ? false : true}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
