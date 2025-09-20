import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { content } = useTheme();

  const softSkills = [
    { icon: 'users', title: 'Team Collaboration' },
    { icon: 'lightbulb', title: 'Problem Solving' },
    { icon: 'comments', title: 'Communication' },
    { icon: 'tasks', title: 'Project Management' },
    { icon: 'clock', title: 'Time Management' },
    { icon: 'brain', title: 'Adaptability' }
  ];

  const technicalSkills = [
    { icon: 'brain', title: 'Machine Learning Tools' },
    { icon: 'code', title: 'Programming Languages' },
    { icon: 'chart-bar', title: 'Data Analysis & Visualization' },
    { icon: 'database', title: 'Big Data Technologies' },
    { icon: 'film', title: 'Media' }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>{content.skillsTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="skills-content">
          <div className="skill-category">
            <h3>Soft Skills</h3>
            <div className="soft-skills stagger-animate">
              {softSkills.map((skill, index) => (
                <div key={index} className="soft-skill hover-lift">
                  <div className="soft-skill-icon">
                    <i className={`fas fa-${skill.icon}`}></i>
                  </div>
                  <h4>{skill.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3>Technical Skills</h3>
            <div className="soft-skills stagger-animate">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="soft-skill hover-lift">
                  <div className="soft-skill-icon">
                    <i className={`fas fa-${skill.icon}`}></i>
                  </div>
                  <h4>{skill.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 