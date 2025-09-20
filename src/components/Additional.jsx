import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Additional = () => {
  const { content } = useTheme();

  const additionalInfo = [
    {
      icon: 'language',
      title: 'Languages',
      items: ['English (Fluent)', 'Tamil (Fluent)', 'German (Basic)']
    },
    {
      icon: 'award',
      title: 'Certifications',
      items: ['Industry 4.0', 'Analyzing and Visualizing Data with Microsoft Power BI', 'Tableau Certified']
    },
    {
      icon: 'heart',
      title: 'Interests',
      items: ['Open Source Contributing', 'Music', 'Social Volunteer']
    },
    {
      icon: 'users',
      title: 'Memberships',
      items: ['Leo Club Volunteer', 'Event Organiser', 'Local Developer Meetup']
    }
  ];

  return (
    <section id="additional" className="additional">
      <div className="container">
        <div className="section-title">
          <h2>{content.additionalTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="additional-content stagger-animate">
          {additionalInfo.map((info, index) => (
            <div key={index} className="info-card hover-lift">
              <div className="info-icon">
                <i className={`fas fa-${info.icon}`}></i>
              </div>
              <h3>{info.title}</h3>
              <ul>
                {info.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Additional; 