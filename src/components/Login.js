import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    // validate with backend
    if (username === 'admin' && password === 'password') {
      history.push('/home');
    } else {
      // error username and pass are invalid
      alert('Invalid username or password');
    }
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
      <button type="submit" className='loginbutton'>Login</button>
    </form>
      
    </div>
  );
}

export default Login;
