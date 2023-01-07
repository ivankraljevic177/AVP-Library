import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { useUserContext } from "../utils/context/UserContextProvider";

import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await loginUser({ email: username, password });
    setUser(user);
    navigate("/");
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" className="loginbutton">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
