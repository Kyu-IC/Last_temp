import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />   {/* Login Page */}
        <Route path="/main" element={<MainPage />} />  {/* Main Page */}
      </Routes>
    </Router>
  );
}

export default App;