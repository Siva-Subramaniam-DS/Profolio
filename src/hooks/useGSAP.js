import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useGSAP = () => {
  const containerRef = useRef(null);

  // Initialize scroll-triggered animations
  const initScrollAnimations = () => {
    // Fade up animation for sections
    gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
      gsap.fromTo(element, 
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger animation for cards
    gsap.utils.toArray('.stagger-animate').forEach((container) => {
      const children = container.children;
      gsap.fromTo(children,
        {
          y: 40,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for backgrounds
    gsap.utils.toArray('.parallax-bg').forEach((element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Scale animation for images
    gsap.utils.toArray('.scale-on-scroll').forEach((element) => {
      gsap.fromTo(element,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  };

  // Animate statistics counter
  const animateStats = (statsContainer) => {
    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count'));
      gsap.fromTo({ value: 0 }, 
        {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            stat.textContent = Math.floor(this.targets()[0].value);
          },
          scrollTrigger: {
            trigger: statsContainer,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  };

  // Animate hero section
  const animateHero = () => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-content h1', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo('.hero-content h3', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('.hero-content p', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo('.cta-buttons', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo('.social-icons', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    return tl;
  };

  // Animate navigation
  const animateNavbar = () => {
    gsap.fromTo('.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );
  };

  // Hover animations
  const initHoverAnimations = () => {
    // Card hover animations
    gsap.utils.toArray('.hover-lift').forEach((card) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });

    // Button hover animations
    gsap.utils.toArray('.btn, .gallery-btn').forEach((btn) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        y: -3,
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    });
  };

  // Page transitions
  const pageTransition = () => {
    const tl = gsap.timeline();
    
    tl.from('main', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });

    return tl;
  };

  // Loading animation
  const loadingAnimation = () => {
    const tl = gsap.timeline();
    
    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector('.loading-screen')?.remove();
      }
    });

    return tl;
  };

  // Cleanup function
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };

  return {
    containerRef,
    initScrollAnimations,
    animateStats,
    animateHero,
    animateNavbar,
    initHoverAnimations,
    pageTransition,
    loadingAnimation,
    cleanup
  };
}; 