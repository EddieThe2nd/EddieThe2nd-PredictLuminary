import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            setError('');
            setMessage('');
            const response = await axios.post('http://localhost:3002/check-email', { email });
            if (!response.data.exists) {
                setError('Email not found');
                return;
            }

            const otpResponse = await axios.post('http://localhost:3002/send-otp', { email, otp: generateOtp() });
            if (otpResponse.data.success) {
                setStep(2);
                setMessage('OTP sent to your email.');
            } else {
                setError('Error sending OTP');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setError('');
            setMessage('');
            // Here you should send the OTP for verification, this can be done in another endpoint
            const otpResponse = await axios.post('http://localhost:3002/verify-otp', { email, otp });
            if (otpResponse.data.success) {
                setStep(3);
                setMessage('OTP verified. You can now reset your password.');
            } else {
                setError('Invalid OTP');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            setError('');
            setMessage('');
            const response = await axios.post('http://localhost:3002/update-password', { email, newPassword });
            if (response.data.status === 1) {
                setMessage('Password updated successfully.');
            } else {
                setError('Error updating password');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const generateOtp = () => {
        // This is a simple OTP generator for demo purposes; consider using a more robust solution
        return Math.floor(100000 + Math.random() * 900000);
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            {step === 1 && (
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendOtp}>Send OTP</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
