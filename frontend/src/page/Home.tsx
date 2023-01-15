import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  return (
    <div className="App">
      <div className="App-default">
        <header className="App-header">
          <p>프리온보딩 사전과제</p>
        </header>
        {isLoggedIn ? (
          <button onClick={() => onLogout()}>로그아웃</button>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <button onClick={() => navigate("/login")}>로그인</button>
            )}
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
