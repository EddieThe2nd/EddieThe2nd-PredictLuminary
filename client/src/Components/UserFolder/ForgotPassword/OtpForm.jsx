import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import './forgotpassword.css';

const OtpForm = () => {
    const [otp, setOtp] = useState('');
    const [entityNumber, setEntityNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const navigate = useNavigate();

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendOtpEmail = (e) => {
        e.preventDefault();

        if (!entityNumber) {
            alert('Please enter a valid entity number.');
            return;
        }

        // Fetch email by entity number from the server
        fetch('http://localhost:3002/api/check-entity', { // Updated endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ entityNumber }), // Send entity number to server
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                const otp = generateOtp();
                setGeneratedOtp(otp);
                setOtpSent(true);

                const templateParams = {
                    to_email: data.email,
                    message: `Greetings, your OTP to reset your password is: ${otp}`,
                };

                emailjs.send('service_ycjh4df', 'template_oy000vq', templateParams, 'Ik3MvrTvMbVx7rHR5')
                .then(response => {
                    console.log('OTP sent successfully!', response.status, response.text);
                    alert('OTP sent to the associated email!');
                })
                .catch(err => {
                    console.error('Failed to send OTP. Error:', err);
                    alert('Failed to send OTP. Please try again.');
                });
            } else {
                alert('Entity number does not exist or has no associated email.');
            }
        })
        .catch(err => {
            console.error('Error fetching email by entity number:', err);
            alert('Error checking entity number. Please try again.');
        });
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        if (otp === generatedOtp) {
            alert('OTP Verified!');
            // Navigate to reset password page, passing the entity number
            navigate('/ResetPassword', { state: { entityNumber } });
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    };

    return (
        <div id="otp-form-container">
            <div id="otp-form">
                <h2 className="forgot-pass">Forgot Password</h2>
                <form onSubmit={sendOtpEmail}>
                    <label className="entity-label">Entity Number:
                        <input className="input-box"
                            type="text"
                            placeholder='Entity Number'
                            value={entityNumber}
                            onChange={(e) => setEntityNumber(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Send OTP</button>
                </form>

                {otpSent && (
                    <form onSubmit={verifyOtp}>
                        <label>OTP:
                            <input 
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OtpForm;