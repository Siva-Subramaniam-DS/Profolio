import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';

const Summary = () => {
  const { content } = useTheme();
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const statsContainer = statsRef.current;
    if (!statsContainer || hasAnimated) return;

    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    
    // Set up animation after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        
        // Immediately show the target value as fallback
        stat.textContent = target;
        
        // Create an object to animate
        const animObj = { value: 0 };
        
        // Animate from 0 to target
        gsap.to(animObj, {
          value: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: function() {
            if (stat && animObj) {
              stat.textContent = Math.floor(animObj.value);
            }
          },
          onComplete: function() {
            // Ensure final value is exactly the target
            stat.textContent = target;
          }
        });
      });
      
      setHasAnimated(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [hasAnimated]);

  return (
    <section id="summary" className="summary">
      <div className="container">
        <div className="section-title">
          <h2>{content.summaryTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="summary-content">
          <div className="summary-text">
            <p>
              Experienced Artificial Intelligence with over 2 years of professional experience building web applications and Trianed in Machine Learning Models. Proven ability to create efficient, scalable, and maintainable code while staying current with emerging technologies. Strong problem-solving skills and passion for developing elegant solutions to complex challenges.
            </p>
            <p>
              Specializing in Back-end development with expertise in Python and frameworks like Flask and Django and responsive design. Committed to continuous learning and professional growth, with a track record of successful project deliveries across various Clients.
            </p>
          </div>
          <div className="summary-stats stagger-animate" ref={statsRef}>
            <div className="stat-card hover-lift">
              <div className="stat-number" data-count="2">2</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card hover-lift">
              <div className="stat-number" data-count="20">20</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card hover-lift">
              <div className="stat-number" data-count="10">10</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card hover-lift">
              <div className="stat-number" data-count="3">3</div>
              <div className="stat-label">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary; 