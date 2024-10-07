import React, { useEffect } from 'react';
import '../Main/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faRobot, faChartLine, faUser, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'; // Import additional icons

const LandingPage = () => {
  useEffect(() => {
    const floatingElements = document.querySelectorAll('.floating-element');

    const handleMouseMove = (event) => {
      const xPos = (event.clientX / window.innerWidth) * 2 - 1;
      const yPos = (event.clientY / window.innerHeight) * 2 - 1;

      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 15;
        const offsetX = xPos * speed;
        const offsetY = yPos * speed;
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-page">
      
      <div className="landing-header">
        <div className="logo">SmartSaleAI</div>
        
      </div>

      <div className="hero-section">
        <h1 className="hero-title">Revolutionize Your Insurance Sales</h1>
        <p className="hero-description">Maximize your potential with intelligent, data-driven sales insights and prediction.</p>
        <a href="/login" className="cta-button">Get Started</a>
      </div>

      <div className="floating-elements">
        <div className="floating-element element-1">
          <FontAwesomeIcon icon={faPhone} size="1x" />
        </div>
        <div className="floating-element element-2">
          <FontAwesomeIcon icon={faClipboardCheck} size="2x" />
        </div>
        <div className="floating-element element-3">
          <FontAwesomeIcon icon={faChartLine} size="1x" /> {/* Sales metrics icon */}
        </div>
        <div className="floating-element element-4">
          <FontAwesomeIcon icon={faUser} size="1x" />
        </div>
        <div className="floating-element element-5">
          <FontAwesomeIcon icon={faRobot} size="2x" /> {/* Checklist icon */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;