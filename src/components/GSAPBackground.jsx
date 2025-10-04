import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GSAPBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const numParticles = 20;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'gsap-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 40 + 20}px;
        height: ${Math.random() * 40 + 20}px;
        border-radius: 50%;
        background: linear-gradient(135deg, 
          rgba(67, 97, 238, ${Math.random() * 0.6 + 0.3}), 
          rgba(76, 201, 240, ${Math.random() * 0.6 + 0.3})
        );
        backdrop-filter: blur(1px);
        pointer-events: none;
      `;
      
      // Random starting position
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      });

      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      tl.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.8 + 0.6,
        duration: Math.random() * 10 + 5,
        ease: "power1.inOut",
        delay: index * 0.1
      });

      // Floating animation
      gsap.to(particle, {
        y: `+=${Math.random() * 100 - 50}`,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      });

      // Opacity pulse
      gsap.to(particle, {
        opacity: Math.random() * 0.7 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 1
      });
    });

    // Create geometric shapes
    const numShapes = 5;
    for (let i = 0; i < numShapes; i++) {
      const shape = document.createElement('div');
      shape.className = 'gsap-shape';
      
      const isCircle = Math.random() > 0.5;
      const size = Math.random() * 100 + 50;
      
      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border: 2px solid rgba(67, 97, 238, 0.3);
        background: rgba(76, 201, 240, 0.2);
        ${isCircle ? 'border-radius: 50%;' : `border-radius: ${Math.random() * 20}px;`}
        pointer-events: none;
      `;

      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360
      });

      container.appendChild(shape);

      // Animate shapes
      gsap.to(shape, {
        rotation: 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        ease: "none"
      });

      gsap.to(shape, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Responsive cleanup
    const handleResize = () => {
      particles.forEach(particle => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        gsap.set(particle, { x, y });
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.innerHTML = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="gsap-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -10,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(67, 97, 238, 0.03) 0%, rgba(76, 201, 240, 0.02) 50%, transparent 100%)'
      }}
    />
  );
};

export default GSAPBackground; 