import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

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
