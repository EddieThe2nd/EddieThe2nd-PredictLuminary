// ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:3002/update-password', { email, newPassword });
            if (response.data.status === 1) {
                setMessage('Password updated successfully.');
            } else {
                setError('Failed to update password.');
            }
        } catch (err) {
            setError('An error occurred.');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Reset Password</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
