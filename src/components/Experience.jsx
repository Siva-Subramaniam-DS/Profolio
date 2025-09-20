import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const { content } = useTheme();

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-title">
          <h2>{content.experienceTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <div className="timeline-content">
              <span className="date">2024 - 2025</span>
              <h3>Internship & Employment</h3>
              <h4>Inodesys Technologies</h4>
              <ul>
                <li><strong>Domain:</strong> Manufacturing (JD Edwards)</li>
                <li><strong>Responsibilities:</strong> Covering administration works in JD Edwards</li>
                <li>
                  <ul>
                    <li>RPG 3 program analysis and development</li>
                  </ul>
                </li>
                <li><strong>Client:</strong> Caterpillar, Netherlands</li>
              </ul>
              <div className="tags">
                <span>AS400</span>
                <span>DB2</span>
                <span>JD Edwards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 