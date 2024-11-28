import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct imports for navigation
import './login.css'; // Ensure CSS file is correctly applied

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if email and password are entered
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Make POST request to login API
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response status is OK (200-299)
      if (response.ok) {
        const data = await response.json();

        // Store JWT token and user info if login is successful
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', data.username);

        // Navigate to the main page after successful login
        navigate('/main');
      } else {
        // Handle failed login attempt (invalid credentials, etc.)
        const data = await response.json();
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      // Handle network errors
      setError('Network error. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page__container">
      <div className="login-page__section">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit">Sign in</button>

          {error && <div className="login-page__error-message">{error}</div>}

          <div className="login-page__signup-text">
            <span className="login-page__dont-have-account">Don't have an account?</span>
            <Link to="/register" className="login-page__sign-up">Sign up</Link>
          </div>
        </form>
      </div>

      <div className="login-page__branding-section">
        <div className="login-page__logo">
          <span className="login-page__highlight">N</span>otA<span>Facebook</span>
        </div>
        <div className="login-page__bottom-right-text">
          <p>AIE222 - Final Project</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
