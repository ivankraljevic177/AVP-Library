import React, { useState } from 'react';
import '../styles/Login.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Validate form fields
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Submit form data to server
  }

  return (
    <div className='login-form'>

    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
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
