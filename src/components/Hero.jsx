import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { gsap } from 'gsap';
import P1Image from '../assets/P1.png';

const Hero = () => {
  const { content } = useTheme();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  
  const roles = [
    "AI & ML Engineer",
    "Python Developer", 
    "Data Scientist",
    "Full Stack Developer",
    "Problem Solver"
  ];
  
  const typewriterText = useTypewriter(roles, 100, 1000);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    
    if (!hero || !image) return;

    // Image hover animation
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mouseleave', handleMouseLeave);

    // Floating animation for the image
    gsap.to(image, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      image.removeEventListener('mouseenter', handleMouseEnter);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <h1>{content.heroTitle}</h1>
            <div className="typewriter-container">
              <span className="typewriter-text">{typewriterText}</span>
              <span className="cursor">|</span>
            </div>
            <p>{content.heroSubtitle}</p>
            <div className="cta-buttons hover-lift">
              <a href="#contact" className="btn primary">Get In Touch</a>
              <a href="#projects" className="btn secondary">View My Work</a>
            </div>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/r-siva-subramanaiam/" target="_blank" rel="noopener" className="hover-lift">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/Siva-Subramaniam-DS" target="_blank" rel="noopener" className="hover-lift">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://x.com/SivaSubbu1_4_1" target="_blank" rel="noopener" className="hover-lift">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/_siva_hokage_/?__pwa=1" target="_blank" rel="noopener" className="hover-lift">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="hero-image scale-on-scroll">
            <div className="image-container" ref={imageRef}>
              <img src={P1Image} alt="Siva Subramanian R" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 