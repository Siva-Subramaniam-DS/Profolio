import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Education = () => {
  const { content } = useTheme();

  const educationData = [
    {
      icon: 'graduation-cap',
      title: "Master's Degree",
      subtitle: 'Artificial Intelligence & Data Science',
      institution: 'SRM University, Kattankulathur',
      date: '2023 - 2026',
      description: 'Specialized in Software Engineering with a focus on AI technologies and database management. Graduated with honors.'
    },
    {
      icon: 'graduation-cap',
      title: "Bachelor's Degree",
      subtitle: 'Mechanical Engineering',
      institution: 'Loyola Institute of Technology',
      date: '2019 - 2023',
      description: 'Studied fundamentals of Mechanical Engineering with a focus on manufacturing processes.'
    },
    {
      icon: 'certificate',
      title: 'Patent',
      subtitle: 'Mechanical Engineering',
      institution: 'Certification Provider',
      date: '2024',
      description: 'Developed a Machine Learning model for real-time fire and smoke detection.'
    }
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-title">
          <h2>{content.educationTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="education-cards stagger-animate">
          {educationData.map((edu, index) => (
            <div key={index} className="education-card hover-lift">
              <div className="education-icon">
                <i className={`fas fa-${edu.icon}`}></i>
              </div>
              <div className="education-details">
                <h3>{edu.title}</h3>
                <h4>{edu.subtitle}</h4>
                <p>{edu.institution}</p>
                <span className="date">{edu.date}</span>
                <p className="education-desc">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 