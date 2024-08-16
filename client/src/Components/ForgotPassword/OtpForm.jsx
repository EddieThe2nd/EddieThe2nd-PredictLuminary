// OtpForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = ({ email, onNext }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // For simplicity, assuming OTP verification is handled server-side
        try {
            const response = await axios.post('http://localhost:3002/verify-otp', { email, otp });
            if (response.data.success) {
                onNext(); // Move to password reset form
            } else {
                setError('Invalid OTP.');
            }
        } catch (err) {
            setError('An error occurred.');
        }
    };

    return (
        <div>
            <h2>Enter OTP</h2>
            <form onSubmit={handleSubmit}>
                <label>OTP:
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Verify OTP</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default OtpForm;
