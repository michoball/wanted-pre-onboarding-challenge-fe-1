import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/authService";
import AuthContext from "../../../context/authContext";
import { StorageControl } from "../../../utill/localStorage";

const useAuthMutation = () => {
  const navigate = useNavigate();
  const { onLogin, onSignUp } = useContext(AuthContext);

  const useLoginMutate = (email: string) => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.logInService(email, password);
      },
      onSuccess: (user) => {
        StorageControl.storageSetter(user.token, email);
        onLogin(user.token, email);
        navigate("/");
      },
    });
  };

  const useSignUpMutate = (email: string) => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.signUpService(email, password);
      },
      onSuccess: (user) => {
        StorageControl.storageSetter(user.token, email);
        onSignUp(user.token, email);
        navigate("/");
      },
    });
  };

  return { useLoginMutate, useSignUpMutate };
};

export default useAuthMutation;
