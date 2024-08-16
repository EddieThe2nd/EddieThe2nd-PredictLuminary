import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './sidebar.css'; // Import your CSS file here

// Imported Images
//import  from './../../Assets/logo.jpg';
import logo from './../../Assets/logosolid.jpeg';
// Imported icons
import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BsTrophy } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('authToken'); // Example for clearing auth token from localStorage

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='sideBar grid'>
      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>SmartSale AI</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href='#' className='menuLink flex' onClick={() => navigate('/dashboard')}>
              <IoMdSpeedometer className='icon' />
              <span className="smallText">DashBoard</span>
            </a>
          </li>
          <li className="listItem">
            <a href='#' className='menuLink flex' onClick={() => navigate('/register-company')}>
              <MdDeliveryDining className='icon' />
              <span className="smallText">Register Comp</span>
            </a>
          </li>
          <li className="listItem">
            <a href='#' className='menuLink flex' onClick={() => navigate('/registered-companies')}>
              <BsTrophy className='icon' />
              <span className="smallText">Registered</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="settingsDiv">
        <h3 className="divTitle">SETTINGS</h3>
        <ul className="menuLists grid">
          <li className="listItem">
          <a href='#' className='menuLink flex' onClick={() => navigate('/transactions')}>
              <AiOutlinePieChart className='icon' />
              <span className="smallText">Charts</span>
            </a>
          </li>
          <li className="listItem">
            <a href='#' className='menuLink flex'>
              <BiTrendingUp className='icon' />
              <span className="smallText">Trends</span>
            </a>
          </li>
          <li className="listItem">
            <a href='#' className='menuLink flex'>
              <MdOutlinePermContactCalendar className='icon' />
              <span className="smallText">Contact</span>
            </a>
          </li>
          <li className="listItem">
            <a href='#' className='menuLink flex'>
              <BsCreditCard2Front className='icon' />
              <span className="smallText">Billing</span>
            </a>
          </li>
          <li className="listItem logout" onClick={handleLogout}>
            <a href='#' className='menuLink flex'>
              <FiLogOut className='icon' />
              <span className="smallText">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className='icon' />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p>Having trouble with SmartSaleAI, please contact us for more questions</p>
          <button className='btn'>Go to help center</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
