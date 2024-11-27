import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import RegisterPage from './RegisterPage'; // Assuming you have a RegisterPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
