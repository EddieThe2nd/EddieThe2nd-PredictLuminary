import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Import assets
import video from '../../../src/LoginAssets/future.mp4';
import logo from '../../../src/LoginAssets/thinkBot.gif';

// Imported Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { HiMail } from "react-icons/hi"; // Add icon for email

const Register = () => {
  const [entityNumber, setEntityNumber] = useState('');
  const [email, setEmail] = useState(''); // Add state for email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate(); // Initialize useNavigate

  const createUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate fields
    if (!entityNumber || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');

    try {
      // Axios call to create user
      const response = await Axios.post('http://localhost:3002/register', {
        entityNumber,
        email, // Include email in the POST request
        password
      });

      if (response.data.success) {
        console.log('User registered successfully');
        navigateTo('/'); // Redirect to login page upon successful registration
        setEntityNumber('');
        setEmail(''); // Clear email field
        setPassword('');
      } else {
        console.log('Error registering user:', response.data.message);
        setErrorMessage(response.data.message || 'Error creating user. Please try again.');
      }
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setErrorMessage('Error creating user. Please try again.');
    }
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className='title'>ForeSight AI</h2>
            <p>Embrace the Clarity of ForeSight!</p>
          </div>
          <div className="footerDiv flex">
            <span className='text'>Have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" style={{ width: '100px', height: '100px' }} />
            <h3>Let Us Know You</h3>
          </div>

          <form className='form grid' onSubmit={createUser}>
            {errorMessage && <span className='error'>{errorMessage}</span>}

            <div className="inputDiv">
              <label htmlFor="entityNumber">Entity Number</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input
                  type="text"
                  id='entityNumber'
                  placeholder='Enter Entity Number'
                  onChange={(event) => setEntityNumber(event.target.value)}
                  value={entityNumber}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <HiMail className='icon' /> {/* Email icon */}
                <input
                  type="email"
                  id='email'
                  placeholder='Enter Email'
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  id='password'
                  placeholder='Enter Password'
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
