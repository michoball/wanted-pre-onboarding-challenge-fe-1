import { api } from "../utill/apiConfig";

interface IUser {
  message: string;
  token: string;
}

const logInService = async (email: string, password: string) => {
  const res = await api.post<IUser>(
    "/users/login",
    JSON.stringify({ email, password })
  );
  return res.data;
};

const signUpService = async (email: string, password: string) => {
  const res = await api.post<IUser>(
    "/users/create",
    JSON.stringify({ email, password })
  );
  return res.data;
};

const AuthService = {
  logInService,
  signUpService,
};

export default AuthService;
