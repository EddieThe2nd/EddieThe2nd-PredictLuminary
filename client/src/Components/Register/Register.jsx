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

const Register = () => {
  const [entityNumber, setEntityNumber] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
=======
  const [confirmPassword, setConfirmPassword] = useState('');
>>>>>>> themba-ai-section
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate(); // Initialize useNavigate

  const createUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate fields
<<<<<<< HEAD
    if (!entityNumber || !email || !password || !confirmPassword) {
=======
    if (!entityNumber || !password || !confirmPassword) {
>>>>>>> themba-ai-section
      setErrorMessage('Please fill in all fields.');
      return;
    }

<<<<<<< HEAD
    // Password validation: at least 8 characters, with both lowercase and uppercase letters
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and include both lowercase and uppercase letters.');
      return;
    }

=======
    // Check if passwords match
>>>>>>> themba-ai-section
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');

    try {
      // Axios call to create user
      const response = await Axios.post('http://localhost:3002/register', {
        entityNumber,
        password
      });

      if (response.data.success) {
        console.log('User registered successfully');
        navigateTo('/'); // Redirect to login page upon successful registration
        setEntityNumber('');
        setPassword('');
<<<<<<< HEAD
        setConfirmPassword(''); // Clear confirm password field
=======
        setConfirmPassword('');
>>>>>>> themba-ai-section
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
    <div className='registerPage flex register-container'>
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
            {/* <img src={logo} alt="Logo Image"  /> */}
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

            <div className="inputDiv">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
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
