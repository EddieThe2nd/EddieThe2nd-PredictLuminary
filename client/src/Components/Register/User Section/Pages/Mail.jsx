import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../CSS/Mail.css';

function Mail() {
  const form = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Your EmailJS service ID, template ID, and public API key
  const service_id = "service_w02brkp";
  const template_id = "template_e0twm1j";
  const api_key = "Q0RIB2kH9M7QkCk54";

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.user_name.value.trim();
    const userEmail = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!userName || !userEmail || !message) {
      setError('Please fill out all fields.');
      return;
    }

    emailjs.sendForm(service_id, template_id, form.current, api_key)
      .then((result) => {
        console.log(result.text);
        setError(''); // Clear error if the email is sent successfully
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Reset success message after 3 seconds
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        setError('An error occurred while sending the email. Please try again.');
        form.current.reset();
      });
  };

  return (
    <div className='MailContainer'>
      <h2>Contact Us</h2>
      <p>If you would like to deactivate your account or report any bugs, please send us an email using the form below:</p>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Email sent successfully!</p>}
      <form ref={form} onSubmit={sendEmail}>
        <label>Username</label>
        <input type="text" name="user_name" required />
        <label>Enter your email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Mail;
