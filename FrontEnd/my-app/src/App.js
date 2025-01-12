// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Common/Navbar';

function App() {
  const [auth, setAuth] = useState(() => ({
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || ''
  }));

  console.log('Auth state in App:', auth);

  const handleSetAuth = (authData) => {
    // authData should be an object with { token, userId }
    setAuth(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userId', authData.userId);
  };

  const handleLogout = () => {
    setAuth({ token: '', userId: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <Router>
      <Navbar token={auth.token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={<LoginPage setAuth={handleSetAuth} />}
        />
        <Route
          path="/dashboard"
          element={
            auth.token ? (
              <DashboardPage
                token={auth.token}
                userId={auth.userId}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;