import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("token");
    if (storedUserInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { token } = await AuthService.logInService(email, password);
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      alert(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
