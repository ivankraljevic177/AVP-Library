import React, { useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import { loginUser } from "../utils/api/axios.js";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  


  const fetchUser=async()=>{
     const data= await loginUser(username,password);
     return data.data;
     };

const handleSubmit=async(event)=>
  { event.preventDefault();
    const data=await fetchUser();

    if (username === data.email && password === data.password) {
      history.push('/home');
    } else {alert('Invalid username or password'); }
  }
  
  return (
    <div className='login-form'>
    
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
      <button type="submit" className='loginbutton'onSubmit={handleSubmit}>Login</button>
    </form>
      
    </div>
  );
}

export default Login;
