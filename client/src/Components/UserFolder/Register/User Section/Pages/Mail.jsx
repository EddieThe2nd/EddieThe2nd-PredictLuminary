import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../CSS/Mail.css';

function Mail() {
  const form = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Your EmailJS service ID, template ID, and public API key
  const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const api_key = import.meta.env.VITE_EMAILJS_API_KEY;

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
    <div className='backround-div'>
    <div className='MailContainer'>
      <h1 className="contactus"> CONTACT US</h1>
      <p>Please send us an email using the form below for any enquires and and support:</p>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Email sent successfully!</p>}
      <form ref={form} onSubmit={sendEmail}>
        <label>Entity Number</label>
        <input type="text" name="user_name" required />
        <label >Enter your email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" required />
        <input className='send-emailbtn' type="submit" value="Send" />
      </form>
    </div>
    </div>
  );
}

export default Mail;
