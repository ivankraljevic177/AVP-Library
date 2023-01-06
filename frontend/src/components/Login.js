import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/api";

import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    const user = await loginUser({ username, password });

    console.log(user);
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
