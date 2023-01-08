import React, { useState } from 'react';
import '../styles/Login.css';
import { createUser } from '../utils/api/axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/helpers/auth-helpers";
import { useUserContext } from "../utils/context/UserContextProvider";

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password === confirmPassword){
      const response = await createUser({ email, password, name });
      setUser(response.data);
      setAuthToken(response.data.token); 
      navigate("/");
    }else{
      alert("Passwords don't match");
    }    
  };

  return (
    <div className='login-form'>

    <form onSubmit={handleSubmit}>
    <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>

    </div>
  );
}

export default RegistrationForm;
