import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim input values to ensure no extra spaces are causing validation issues
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    console.log('Username:', trimmedUsername);
    console.log('Email:', trimmedEmail);
    console.log('Password:', trimmedPassword);
    console.log('Confirm Password:', trimmedConfirmPassword);

    // Validate inputs: ensure all fields are filled and passwords match
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    const userData = { username: trimmedUsername, email: trimmedEmail, password: trimmedPassword, confirmPassword: trimmedConfirmPassword };

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Registration successful! Please log in.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="register-page__container">
      <div className="register-page__logo">
        <span className="highlight">N</span>otA<span>Facebook</span>
      </div>

      <div className="register-page__section">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
          <button type="submit">Register</button>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
