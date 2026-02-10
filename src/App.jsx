import { useState, useEffect } from 'react';
import './styles.css';
import { ThemeProvider } from './context/ThemeContext';
import SecurityProvider from './components/SecurityProvider';
import { useGSAP } from './hooks/useGSAP';
import GSAPBackground from './components/GSAPBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Additional from './components/Additional';
import Summary from './components/Summary';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Call hook unconditionally at the top level (React Rules of Hooks)
  const { 
    containerRef, 
    initScrollAnimations, 
    animateHero, 
    animateNavbar, 
    initHoverAnimations,
    pageTransition,
    cleanup 
  } = useGSAP();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Initialize animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
      try {
        animateNavbar();
        animateHero();
        initScrollAnimations();
        initHoverAnimations();
        pageTransition();
      } catch (error) {
        console.warn('Animation initialization failed:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      try {
        cleanup();
      } catch (error) {
        console.warn('Animation cleanup failed:', error);
      }
    };
  }, [animateNavbar, animateHero, initScrollAnimations, initHoverAnimations, pageTransition, cleanup]);

  return (
    <SecurityProvider>
      <ThemeProvider>
        <div ref={containerRef} className="app-container">
          <GSAPBackground />
          
          <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          
          <main className={`main-content ${isLoaded ? 'loaded' : ''}`}>
            <div className="animate-on-scroll">
              <Hero />
            </div>
            <div className="animate-on-scroll">
              <About />
            </div>
            <div className="animate-on-scroll">
              <Skills />
            </div>
            <div className="animate-on-scroll">
              <Experience />
            </div>
            <div className="animate-on-scroll">
              <Education />
            </div>
            <div className="animate-on-scroll">
              <Projects />
            </div>
            <div className="animate-on-scroll">
              <Blog />
            </div>
            <div className="animate-on-scroll">
              <Additional />
            </div>
            <div className="animate-on-scroll">
              <Summary />
            </div>
            <div className="animate-on-scroll">
              <Contact />
            </div>
          </main>
          
          <Footer />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </SecurityProvider>
  );
}

export default App;
