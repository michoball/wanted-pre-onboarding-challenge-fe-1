import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/authContext";
import Auth from "./page/Auth";
import Home from "./page/Home";
import PrivateRoute from "./page/PrivateRoute";
import Todo from "./page/Todo";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/login" element={<PrivateRoute />}>
          <Route path="/login" element={<Auth />} />
        </Route>
        {isLoggedIn && <Route path="/" element={<Todo />} />}
      </Route>
    </Routes>
  );
}

export default App;
