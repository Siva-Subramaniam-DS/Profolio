import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { content } = useTheme();

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>{content.aboutTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>{content.aboutDescription}</p>
            <p>
              I'm seeking opportunities to apply my knowledge to real-world AI and ML applications,
              contribute to meaningful projects, and continuously grow my skills in software application development.
            </p>
          </div>
          <div className="about-details">
            <div className="detail-item">
              <span className="detail-title">Name:</span>
              <span className="detail-info">Siva Subramanian</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Email:</span>
              <span className="detail-info">sivasubramaniam141@gmail.com</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Phone:</span>
              <span className="detail-info">+91 9150908294</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Location:</span>
              <span className="detail-info">Mylapore, Chennai - 600004</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Languages:</span>
              <span className="detail-info">English, Tamil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 