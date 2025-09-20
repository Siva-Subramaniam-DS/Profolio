import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { content } = useTheme();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Siva Subramaniam</h2>
            <p>{content.footerTagline}</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/r-siva-subramanaiam/" target="_blank" rel="noopener" title="LinkedIn Profile">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Siva-Subramaniam-DS" target="_blank" rel="noopener" title="GitHub Profile">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://x.com/SivaSubbu1_4_1" target="_blank" rel="noopener" title="Twitter Profile">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/_siva_hokage_/?__pwa=1" rel="noopener" target="_blank" title="Instagram Profile">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Siva Subramaniam. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 