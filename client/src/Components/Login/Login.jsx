import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../Login/Login.css';
import image1 from '../../LoginAssets/logo2.jpeg'

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
  <div className="main-containoLog">
    <div className="signin-container">
      <div className="left-section">
        <img src={image1} alt="Logo" className="left-image" />
        <div className="overlay"></div>
      </div>
      <div className="right-section">
        <div className="signin-box">
          <h2>SIGN IN</h2>
          <p>
            Don't have an account? <Link to="/register">Create a new account now!</Link> Takes less than a minute.
          </p>
          <form className="signin-form" onSubmit={loginUser}>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                placeholder="Entity Number"
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value.toLowerCase())}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="signin-button">Login Now</button>
            <div className="forgot-password">
              <Link to="/OtpForm">Forgot password? Click here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Login;
