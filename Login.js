import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('userEmail');
    const storedMobile = localStorage.getItem('userMobile');
    const storedPassword = localStorage.getItem('userPassword');

    const isEmailOrMobileMatch = (identifier === storedEmail || identifier === storedMobile);

    if (isEmailOrMobileMatch && password === storedPassword) {
      alert("Login successful!");
      navigate('/dashboard');
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-container" style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter email or mobile number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
