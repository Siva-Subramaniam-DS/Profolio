import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { soundManager } from '../utils/soundUtils';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const handleToggleMenu = () => {
    soundManager.playClick();
    toggleMenu();
  };

  const handleLinkClick = () => {
    soundManager.playClick();
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <h2>Portfolio</h2>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
            <li><a href="#about" onClick={handleLinkClick}>About</a></li>
            <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
            <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
            <li><a href="#education" onClick={handleLinkClick}>Education</a></li>
            <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#blog" onClick={handleLinkClick}>Blog</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          </ul>
          <div className="hamburger" onClick={handleToggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
      <ThemeSwitcher />
    </>
  );
};

export default Navbar; 