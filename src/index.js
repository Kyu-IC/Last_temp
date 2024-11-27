import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './LoginPage'; // Import the LoginPage component
import { BrowserRouter as Router } from 'react-router-dom'; // Router for navigation

// Render LoginPage component inside the div with id 'root'
ReactDOM.render(
  <Router>
    <LoginPage />  {/* This should be your entry point */}
  </Router>,
  document.getElementById('root')
);
