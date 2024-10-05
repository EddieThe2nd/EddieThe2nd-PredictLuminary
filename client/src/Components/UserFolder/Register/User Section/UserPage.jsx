import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import './UserPage.css'; // External CSS for styling
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../../../LoginAssets/transheadlog.png';
import sales from '../../../../LoginAssets/salesGraphics.jpg';

// Import pages
import Dashboard from './Pages/Dashboard';
import Mail from './Pages/Mail';
import Home from './Pages/Home'; // Adjust the path as necessary
import Subscriptions from '../Subscriptions/Subscriptions';
import About from './Pages/About';

const UserPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('authToken'); // Example for clearing auth token from localStorage

    // Redirect to the login page
    navigate('/')
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <img className='userPage-logo' src={logo} alt="Example Image" />
        <p className='logo-name'>SMART SALE AI</p>
        <nav>
          <ul className='userPageSideNav'>
            <li><a onClick={() => navigate('/user-page')}><i className="fa fa-home" style={{ color: '#31a2f2' }}></i> Home</a></li>
            <li><a onClick={() => navigate('/user-page/dashboard')}><i className="fa fa-tachometer-alt" style={{ color: '#31a2f2' }}></i> Dashboard</a></li>
            <li><a onClick={() => navigate('/user-page/mail')}><i className="fa fa-envelope" style={{ color: '#31a2f2' }}></i> Mail</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="header">     
          <nav>
            <ul>
              <li><button className="logout-button" onClick={() => navigate('/user-page/About')}>About</button></li>
              <li><button className="logout-button" onClick={() => navigate('/user-page/subscription-page')}>Subscription</button></li>
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mail" element={<Mail />} />
            <Route path="subscription-page" element={<Subscriptions />} />
            <Route path="About" element={<About />} />
          </Routes>

          {/* Conditionally render graphics and quick tips based on the current path */}
          {location.pathname === '/user-page' && (
            <div className="graphics-and-tips">
              <div className="graphics-container">
                <img
                  src={sales} 
                  alt="AI and Sales"
                  className="graphics-image" // Applying the CSS class
                />
                <h2 className="powered-title" >AI-Powered Sales Predictions</h2>
                <h5 className="tools">Utilize smart AI tools to analyze data and make efficient use of resources.</h5>
              </div>
              <div className="tips-container">
                <h3>Quick Tips for File Uploads</h3>
                <ul>
                  <li>Ensure your file is formatted correctly (CSV, EXCEL).</li>
                  <li>Use the latest sales data for the best predictions.</li>
                  <li>Keep your file size manageable for quick uploads.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;