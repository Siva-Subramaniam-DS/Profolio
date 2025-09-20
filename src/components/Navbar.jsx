import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <h2>Portfolio</h2>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
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