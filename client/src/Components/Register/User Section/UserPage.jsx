import { Routes, Route, useNavigate } from 'react-router-dom';
import './UserPage.css'; // Create a CSS file for styling
import React from 'react';

// Import pages
import Dashboard from './Pages/Dashboard';
import Mail from './Pages/Mail';
import Home from './Pages/Home'; // Adjust the path as necessary

const UserPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('authToken'); // Example for clearing auth token from localStorage

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a onClick={() => navigate('/user-page')}><i className="fa fa-home"></i> Home</a></li>
            <li><a onClick={() => navigate('/user-page/dashboard')}><i className="fa fa-tachometer-alt"></i> Dashboard</a></li>
            <li><a onClick={() => navigate('/user-page/mail')}><i className="fa fa-envelope"></i> Mail</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mail" element={<Mail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
