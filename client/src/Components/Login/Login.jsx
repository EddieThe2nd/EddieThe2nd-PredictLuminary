import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css';
import video from '../../../src/LoginAssets/future.mp4';
import logo from '../../../src/LoginAssets/thinkBot.gif';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import image from '../../LoginAssets/AI.gif';
import image1 from '../../LoginAssets/logosolidblack.png'

const Login = () => {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');
  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
        const response = await Axios.post('http://localhost:3002/login', {
            entityNumber: loginIdentifier.toLowerCase(),
            password: loginPassword
        });

        if (response.data.success) {
            localStorage.setItem('entityNumber', response.data.entityNumber || '');
            localStorage.setItem('subscriptionStatus', response.data.subscriptionStatus || 'inactive');

            if (response.data.role === 'admin') {
                navigateTo('/dashboard');
            } else {
                navigateTo('/user-page');
            }
        } else {
            setLoginStatus('Invalid entity number or password');
            setTimeout(() => navigateTo('/'), 4000);
        }
    } catch (error) {
        setLoginStatus('Network error, please try again later.');
        setTimeout(() => navigateTo('/'), 4000);
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

  return (
    <section>
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <div className="input-box">
              <input
                type="text"
                required
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value.toLowerCase())}
              />
              <label>Entity Number</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
              />
              <label>Password</label>
            </div>
            <div className="forgot-pass">
              <Link to="/OtpForm">Forgot your password?</Link>
            </div>
            <button type="submit" className="btn">
              Login
              <AiOutlineSwapRight className='icon' />
            </button>
            <div className="signup-link">
              <Link to="/register">Signup</Link>
            </div>
          </form>
        </div>
        <span style={{ '--i': 0 }}></span>
        <span style={{ '--i': 1 }}></span>
        <span style={{ '--i': 2 }}></span>
        <span style={{ '--i': 3 }}></span>
        <span style={{ '--i': 4 }}></span>
        <span style={{ '--i': 5 }}></span>
        <span style={{ '--i': 6 }}></span>
        <span style={{ '--i': 7 }}></span>
        <span style={{ '--i': 8 }}></span>
        <span style={{ '--i': 9 }}></span>
        <span style={{ '--i': 10 }}></span>
        <span style={{ '--i': 11 }}></span>
        <span style={{ '--i': 12 }}></span>
        <span style={{ '--i': 13 }}></span>
        <span style={{ '--i': 14 }}></span>
        <span style={{ '--i': 15 }}></span>
        <span style={{ '--i': 16 }}></span>
        <span style={{ '--i': 17 }}></span>
        <span style={{ '--i': 18 }}></span>
        <span style={{ '--i': 19 }}></span>
        <span style={{ '--i': 20 }}></span>
        <span style={{ '--i': 21 }}></span>
        <span style={{ '--i': 22 }}></span>
        <span style={{ '--i': 23 }}></span>
        <span style={{ '--i': 24 }}></span>
        <span style={{ '--i': 25 }}></span>
        <span style={{ '--i': 26 }}></span>
        <span style={{ '--i': 27 }}></span>
        <span style={{ '--i': 28 }}></span>
        <span style={{ '--i': 29 }}></span>
        <span style={{ '--i': 30 }}></span>
        <span style={{ '--i': 31 }}></span>
        <span style={{ '--i': 32 }}></span>
        <span style={{ '--i': 33 }}></span>
        <span style={{ '--i': 34 }}></span>
        <span style={{ '--i': 35 }}></span>
        <span style={{ '--i': 36 }}></span>
        <span style={{ '--i': 37 }}></span>
        <span style={{ '--i': 38 }}></span>
        <span style={{ '--i': 39 }}></span>
        <span style={{ '--i': 40 }}></span>
        <span style={{ '--i': 41 }}></span>
        <span style={{ '--i': 42 }}></span>
        <span style={{ '--i': 43 }}></span>
        <span style={{ '--i': 44 }}></span>
        <span style={{ '--i': 45 }}></span>
        <span style={{ '--i': 46 }}></span>
        <span style={{ '--i': 47 }}></span>
        <span style={{ '--i': 48 }}></span>
        <span style={{ '--i': 49 }}></span>
      </div>
      <img className='smartAImage' src={image1} alt="Smart A" />
      <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
        <path fill="#69b3e2" fillOpacity="1" d="M0,96L60,90.7C120,85,240,75,360,85.3C480,96,600,128,720,128C840,128,960,96,1080,69.3C1200,43,1320,21,1380,10.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </section>
  );
};

export default Login;
