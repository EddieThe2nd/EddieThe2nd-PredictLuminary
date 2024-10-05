import React, { useEffect } from 'react';
import '../CSS/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faRobot, faChartLine, faCar } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  useEffect(() => {
    const floatingElements = document.querySelectorAll('.floating-element');

    const handleMouseMove = (event) => {
      const xPos = (event.clientX / window.innerWidth) * 2 - 1;
      const yPos = (event.clientY / window.innerHeight) * 2 - 1;

      floatingElements.forEach((element) => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="about-container">
      <div className="about-grid">
        {/* Section 1 */}
        <div className="grid-section">
          <h2 className="section-title">Data Upload</h2>
          <p className="section-description">
            Easily upload real-world data to enable predictive insights. SmartSaleAI allows seamless integration of datasets for analysis.
          </p>
          <FontAwesomeIcon icon={faUpload} className="section-icon" />
        </div>

        {/* Section 2 */}
        <div className="grid-section">
          <h2 className="section-title">AI-Powered Predictions</h2>
          <p className="section-description">
            Leverage cutting-edge AI algorithms to predict which customers are most likely to purchase insurance. 
          </p>
          <FontAwesomeIcon icon={faRobot} className="section-icon" />
        </div>

        {/* Central Animation */}
        <div className="center-animation">
          <FontAwesomeIcon icon={faCar} className="floating-element" data-speed="2" />
          <FontAwesomeIcon icon={faChartLine} className="floating-element" data-speed="1" />
          {/* Add more floating icons here */}
        </div>

        {/* Section 3 */}
        <div className="grid-section">
        <h2 className="section-title">Trends & Insights</h2>
        <p className="section-description">
          The access to insights such as conversion rates, site activity, and trends to provide a clear view of customer behavior. Our data-driven approach helps you make informed decisions, offering valuable insights into what drives engagement and sales.
        </p>
        <FontAwesomeIcon icon={faChartLine} className="section-icon" />
      </div>


        {/* Section 4 */}
        <div className="grid-section">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-description">
            SmartSaleAI aims to revolutionize insurance sales by combining human intuition with machine learning to deliver smarter, more efficient strategies.
          </p>
          <FontAwesomeIcon icon={faCar} className="section-icon" />
        </div>
      </div>
    </div>
  );
};

export default About;
