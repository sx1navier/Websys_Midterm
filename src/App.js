import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import './App.css';
import backgroundImg from './assets/aristocats.jpg';

function App() {
  return (
    <Router>
      <div className="app" style={{ minHeight: '100vh' }}>
        <div 
          className="background-image"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }} 
        />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;