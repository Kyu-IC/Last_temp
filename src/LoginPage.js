import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use Link instead of <a> and add useNavigate
import './login.css'; // Import the CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if email and password are provided
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Send login request to the backend API
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store token, username, and authentication flag
        localStorage.setItem('token', data.token); // Save JWT token in localStorage
        localStorage.setItem('isAuthenticated', 'true'); // Mark user as authenticated
        localStorage.setItem('username', data.username); // Save username

        // Use navigate() to redirect to the main page
        navigate('/main');  // This will allow React Router to handle the routing
      } else {
        // Show error message if login fails
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
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
            {/* Use React Router's <Link> instead of <a> */}
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
