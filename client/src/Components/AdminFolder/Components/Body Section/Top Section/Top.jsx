import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './top.css';
import { IoNotificationsOutline } from "react-icons/io5";

const Top = () => {
  const navigate = useNavigate(); // Initialize navigate

  function HandleClick() {
    navigate('/gmail-notification'); // Use navigate to route
  }

  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Smart Sale AI</h1>
          <p>Hello Admin, Welcome back!</p>
        </div>

       

        <div className="adminDiv flex">
          <IoNotificationsOutline className='icon' onClick={HandleClick} style={{ cursor: 'pointer' }} />
        </div>
      </div>

    
    </div>
  );
}

export default Top;
