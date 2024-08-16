import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import OtpForm from './OtpForm';
import ResetPassword from './ResetPassword';

const ForgotPasswordProcess = () => {
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
    const [email, setEmail] = useState('');

    const handleEmailSubmit = async (email) => {
        setEmail(email);
        setStep(2); // Move to OTP form
    };

    const handleOtpSubmit = () => {
        setStep(3); // Move to Reset Password form
    };

    return (
        <div>
            {step === 1 && <ForgotPassword onNext={handleEmailSubmit} />}
            {step === 2 && <OtpForm email={email} onNext={handleOtpSubmit} />}
            {step === 3 && <ResetPassword email={email} />}
        </div>
    );
};

export default ForgotPasswordProcess;
