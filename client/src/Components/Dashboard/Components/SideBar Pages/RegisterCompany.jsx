import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SideBar-CSS/RegisterCompany.css'; // Import the CSS file for styling

// Imported video
import video from '../../../../LoginAssets/futuristic.mp4';

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    contactPersonSurname: '',
    contactPersonNumber: '',
    email: '',
    entityNumber: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    return formData.companyName && formData.contactPersonName && formData.contactPersonSurname && formData.contactPersonNumber && formData.email;
  };

  const generateEntityNumber = () => {
    if (!validateForm()) {
      alert('Please fill out all fields before generating an entity number.');
      return;
    }

    const { companyName, contactPersonName, contactPersonSurname } = formData;
    let baseString = `${companyName}${contactPersonName}${contactPersonSurname}`.replace(/\s+/g, '');
    const randomString = Math.random().toString(36).substring(2, 12);

    baseString += randomString;

    if (baseString.length < 20) {
      baseString += '0'.repeat(20 - baseString.length);
    } else {
      baseString = baseString.substring(0, 20);
    }

    setFormData({
      ...formData,
      entityNumber: baseString
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('http://localhost:3002/register-company', formData);

      if (response.data.success) {
        alert('Company registered successfully!');
        navigate('/dashboard');
      } else {
        alert(`Failed to register company: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error registering company:', error);
      alert('Error registering company. Please check the console for more details.');
    }
  };

  return (
    <div className="register-company-container">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-wrapper">
        <h1>Register Company</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPersonName">Contact Person Name:</label>
            <input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPersonSurname">Contact Person Surname:</label>
            <input
              type="text"
              id="contactPersonSurname"
              name="contactPersonSurname"
              value={formData.contactPersonSurname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPersonNumber">Contact Person Number:</label>
            <input
              type="text"
              id="contactPersonNumber"
              name="contactPersonNumber"
              value={formData.contactPersonNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="entityNumber">Entity Number:</label>
            <input
              type="text"
              id="entityNumber"
              name="entityNumber"
              value={formData.entityNumber}
              readOnly
            />
            <button type="button" onClick={generateEntityNumber}>
              Generate Entity Number
            </button>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompany;
