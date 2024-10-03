import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Ensure the correct path to your CSS file
import axios from 'axios';

const Register = () => {
    const [entityNumber, setEntityNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Password validation regex (8 characters, numbers, special characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validateForm = () => {
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one number and one special character');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const checkEntityNumber = async () => {
        try {
            const response = await axios.post('http://localhost:3002/register', { entityNumber,email,password });
            if (!response.data.success) {
                console.log('User Succesfully Registered');
                navigateTo('/');
                return false; // Entity exists
            }
            return true; // Entity number is available
        } catch (err) {
            console.error('Error checking entity number:', err);
            setError('Error checking entity number');
            return false; // Indicate an error occurred
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

       

        // Proceed with registration
        try {
            const response = await axios.post('http://localhost:3002/register', {
                entityNumber,
                email, // Include email in request
                password
            });
            if (response.data.success) {
                setSuccess(response.data.message);
                setEntityNumber('');
                setEmail(''); // Clear email after success
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response) {
                setError(err.response.data.message || 'Registration failed with an unknown error');
            } else if (err.request) {
                setError('No response received from the server. Please try again later.');
            } else {
                setError('Error in setting up registration request: ' + err.message);
            }
        }

        setLoading(false);
    };
    const handleLoginClick = () => {
        navigate('/'); // Navigate to the login page
    };


    return (
        <div className="register-container">
            <div className="container">
                {/* Left side with the video */}
                <div className="videoDiv">
                    <video autoPlay muted loop>
                        <source src="your-video-url.mp4" type="video/mp4" />
                    </video>
                    <div className="textDiv">
                        <h1 className="title">Welcome</h1>
                        <p>Join us today and start your journey</p>
                    </div>
                    <div className="footerDiv">
                        <span className="text">Already have an account?</span>
                        <button className="btn" onClick={handleLoginClick}>Login</button>
                    </div>
                </div>

                {/* Right side with the registration form */}
                <div className="formDiv-container">
                    <div className="headerDiv">
                        <h3>Register</h3>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="inputDiv">
                            <label>Entity Number</label>
                            <div className="input">
                                <input
                                    type="text"
                                    value={entityNumber}
                                    onChange={(e) => setEntityNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label>Email</label>
                            <div className="input">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label>Password</label>
                            <div className="input">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label>Confirm Password</label>
                            <div className="input">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="error">{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="forgotPassword">
                        Forgot your password? <a href="#">Reset it here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
