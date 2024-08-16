import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Import assets
import video from '../../../src/LoginAssets/future.mp4';
import logo from '../../../src/LoginAssets/thinkBot.gif';

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const [loginIdentifier, setLoginIdentifier] = useState(''); // state for entity number or username
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();

  // Predefined admin usernames
  const adminUsernames = ['adminrandy', 'admineddie', 'adminthemba']; // Ensure all are lowercase

  // Let us now show the message to the user
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:3002/login', {
        entityNumber: loginIdentifier.toLowerCase(), // Ensure it's lowercase
        password: loginPassword
      });

      console.log('Server response:', response);

      if (response.data.success) {
        console.log('Logged in identifier:', loginIdentifier.toLowerCase());
        if (response.data.role === 'admin') {
          console.log('Navigating to /dashboard');
          navigateTo('/dashboard'); // Navigate to the admin dashboard
        } else {
          console.log('Navigating to /user-page');
          navigateTo('/user-page'); // Navigate to the user page
        }
      } else {
        console.log(response.data.message || loginIdentifier === '' || loginPassword === '');
        setLoginStatus('Invalid entity number or password');
        setTimeout(() => navigateTo('/'), 4000); // Navigate to the same page after showing the message
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      console.log('Error details:', error.response ? error.response.data : error.message);
      setLoginStatus('Network error, please try again later.');
      setTimeout(() => navigateTo('/'), 4000); // Navigate to the same page after showing the message
    }
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  }, [loginStatus]);

  // Clear the form on submission
  const onSubmit = () => {
    setLoginIdentifier('');
    setLoginPassword('');
  };

  return (
    <div className='loginPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className='title'>Foresight AI</h2>
            <p>Embrace the Clarity of ForeSight!</p>
          </div>
          <div className="footerDiv flex">
            <span className='text'>Don't have an account?</span>
            <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" style={{ width: '100px', height: '100px' }} />
            <h3>Welcome Back!</h3>
          </div>

          <form className='form grid' onSubmit={loginUser}>
            <span className={statusHolder}>{loginStatus}</span> 
            <div className="inputDiv">
              <label htmlFor="identifier">Username/Entity Number</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='identifier' placeholder='Enter Username or Entity Number' value={loginIdentifier} onChange={(event) => { setLoginIdentifier(event.target.value.toLowerCase()) }} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' placeholder='Enter Password' value={loginPassword} onChange={(event) => { setLoginPassword(event.target.value) }} />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon' />
            </button>
            
            <span className='forgotPassword'>
              Forgot your password? <Link to="/forgot-password">Click Here</Link> {/* Correct route for forgot password */}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
