import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ForgotPassword/ResetPassword.css';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [entityNumber, setEntityNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Automatically set entityNumber from location.state (OTP form)
    useEffect(() => {
        if (location.state && location.state.entityNumber) {
            setEntityNumber(location.state.entityNumber);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3002/reset-password', {
                entityNumber, // Use entityNumber passed from OTP form
                newPassword,
            });

            if (response.data.success) {
                setMessage('Password has been reset successfully.');

                // Redirect to the login page after a delay
                setTimeout(() => {
                    navigate('/'); // Adjust the path as per your routing structure
                }, 3000); // 3-second delay
            } else {
                setError('Failed to reset password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div id="reset-password-container">
            <div id="reset-password-form">
                <h2 className="password-reset">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Entity Number:
                        <input
                            type="text"
                            value={entityNumber}
                            readOnly // Make the entity number read-only
                        />
                    </label>
                    <label>New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button  type="submit">Reset Password</button>
                    {error && <p id="error-message">{error}</p>}
                    {message && <p id="success-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;