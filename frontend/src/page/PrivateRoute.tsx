import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/authContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
