import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import { StorageControl } from "../utill/localStorage";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  onSignUp: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = StorageControl.storageGetter("token");
    const userEmail = StorageControl.storageGetter("email");
    if (userToken && userEmail) {
      setCurrentUser({ email: userEmail, token: userToken });
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    const { token } = await AuthService.logInService(email, password);
    StorageControl.storageSetter(token, email);
    setCurrentUser({ email, token });
    setIsLoggedIn(true);
  };

  const signUpHandler = async (email: string, password: string) => {
    const { token } = await AuthService.signUpService(email, password);
    StorageControl.storageSetter(token, email);
    setCurrentUser({ email, token });
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    StorageControl.storageRemover();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: currentUser,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignUp: signUpHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
