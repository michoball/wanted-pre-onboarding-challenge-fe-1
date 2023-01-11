import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Auth = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Login />
      <SignUp />
    </div>
  );
};

export default Auth;
