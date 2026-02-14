import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    icon: 'fas fa-sun',
    colors: {
      '--primary-color': '#4361ee',
      '--secondary-color': '#3a0ca3',
      '--accent-color': '#4cc9f0',
      '--background-color': '#ffffff',
      '--surface-color': '#f8f9fa',
      '--text-color': '#333333',
      '--text-secondary': '#666666',
      '--border-color': '#e9ecef',
      '--shadow': '0 5px 15px rgba(0, 0, 0, 0.1)',
      '--navbar-bg': 'rgba(255, 255, 255, 0.98)',
      '--card-bg': '#ffffff',
      '--overlay-bg': 'rgba(67, 97, 238, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #4361ee, #4cc9f0)',
      '--secondary-gradient': 'linear-gradient(135deg, #3a0ca3, #4361ee)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(76, 201, 240, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Hi, I'm Siva Subramanian R",
      heroSubtitle: "Professional AI & ML Engineer specializing in creating exceptional digital experiences.",
      aboutTitle: "PERSONAL PROFILE",
      aboutDescription: "I am a recent graduate with a strong academic foundation in Artificial Intelligence and Python programming. I have developed a solid understanding of AI concepts and hands-on experience with key Python libraries and frameworks.",
      skillsTitle: "SOFTWARE SKILLS",
      experienceTitle: "PROFESSIONAL EXPERIENCE",
      educationTitle: "EDUCATION",
      projectsTitle: "PROJECTS",
      additionalTitle: "ADDITIONAL INFORMATION",
      summaryTitle: "SUMMARY",
      blogTitle: "BLOG & EVENTS",
      contactTitle: "CONTACT ME",
      footerTagline: "AI & ML Engineer"
    }
  },
  dark: {
    name: 'Dark',
    icon: 'fas fa-moon',
    colors: {
      '--primary-color': '#6c5ce7',
      '--secondary-color': '#a29bfe',
      '--accent-color': '#74b9ff',
      '--background-color': '#1a1a1a',
      '--surface-color': '#2d2d2d',
      '--text-color': '#ffffff',
      '--text-secondary': '#b3b3b3',
      '--border-color': '#404040',
      '--shadow': '0 5px 15px rgba(0, 0, 0, 0.3)',
      '--navbar-bg': 'rgba(26, 26, 26, 0.95)',
      '--card-bg': '#2d2d2d',
      '--overlay-bg': 'rgba(108, 92, 231, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #6c5ce7, #74b9ff)',
      '--secondary-gradient': 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(116, 185, 255, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Welcome, I'm Siva Subramanian R",
      heroSubtitle: "Innovative AI & ML Engineer crafting intelligent solutions in the digital realm.",
      aboutTitle: "DEVELOPER PROFILE",
      aboutDescription: "I am a passionate technologist with deep expertise in Artificial Intelligence and Machine Learning. My journey involves creating intelligent systems and exploring the frontiers of modern technology.",
      skillsTitle: "TECHNICAL EXPERTISE",
      experienceTitle: "CAREER JOURNEY",
      educationTitle: "ACADEMIC FOUNDATION",
      projectsTitle: "INNOVATIONS",
      additionalTitle: "TECH INSIGHTS",
      summaryTitle: "DEVELOPER OVERVIEW",
      blogTitle: "TECH INSIGHTS",
      contactTitle: "GET IN TOUCH",
      footerTagline: "Innovation Through Code"
    }
  },
  ocean: {
    name: 'Ocean',
    icon: 'fas fa-water',
    colors: {
      '--primary-color': '#0984e3',
      '--secondary-color': '#00b894',
      '--accent-color': '#00cec9',
      '--background-color': '#f1f8ff',
      '--surface-color': '#e3f2fd',
      '--text-color': '#1e3a8a',
      '--text-secondary': '#475569',
      '--border-color': '#bfdbfe',
      '--shadow': '0 5px 15px rgba(9, 132, 227, 0.2)',
      '--navbar-bg': 'rgba(241, 248, 255, 0.95)',
      '--card-bg': '#ffffff',
      '--overlay-bg': 'rgba(9, 132, 227, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #0984e3, #00cec9)',
      '--secondary-gradient': 'linear-gradient(135deg, #00b894, #0984e3)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(9, 132, 227, 0.1), rgba(0, 206, 201, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Dive Deep, I'm Siva Subramanian R",
      heroSubtitle: "AI & ML Engineer navigating the vast ocean of data and intelligent solutions.",
      aboutTitle: "NAVIGATOR'S PROFILE",
      aboutDescription: "Like an ocean explorer, I dive deep into the world of Artificial Intelligence and Machine Learning, discovering new patterns and creating waves of innovation in the tech industry.",
      skillsTitle: "NAVIGATION SKILLS",
      experienceTitle: "VOYAGE EXPERIENCE",
      educationTitle: "LEARNING DEPTHS",
      projectsTitle: "DISCOVERIES",
      additionalTitle: "TREASURE CHEST",
      summaryTitle: "CAPTAIN'S LOG",
      blogTitle: "STORY BOARD",
      contactTitle: "CHART A COURSE",
      footerTagline: "Navigating AI Waters"
    }
  },
  sunset: {
    name: 'Sunset',
    icon: 'fas fa-sun',
    colors: {
      '--primary-color': '#fd79a8',
      '--secondary-color': '#fdcb6e',
      '--accent-color': '#e84393',
      '--background-color': '#fff5f5',
      '--surface-color': '#fef7f0',
      '--text-color': '#2d1b69',
      '--text-secondary': '#6c5ce7',
      '--border-color': '#fed7d7',
      '--shadow': '0 5px 15px rgba(253, 121, 168, 0.2)',
      '--navbar-bg': 'rgba(255, 245, 245, 0.95)',
      '--card-bg': '#ffffff',
      '--overlay-bg': 'rgba(253, 121, 168, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #fd79a8, #fdcb6e)',
      '--secondary-gradient': 'linear-gradient(135deg, #e84393, #fd79a8)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(253, 121, 168, 0.1), rgba(253, 203, 110, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Golden Hour, I'm Siva Subramanian R",
      heroSubtitle: "Creative AI & ML Engineer painting the future with intelligent algorithms.",
      aboutTitle: "ARTIST'S CANVAS",
      aboutDescription: "I blend creativity with technology, painting beautiful solutions with AI and Machine Learning. Each project is a masterpiece of innovation and artistic problem-solving.",
      skillsTitle: "CREATIVE PALETTE",
      experienceTitle: "ARTISTIC JOURNEY",
      educationTitle: "CREATIVE FOUNDATION",
      projectsTitle: "MASTERPIECES",
      additionalTitle: "INSPIRATION GALLERY",
      summaryTitle: "ARTIST'S STATEMENT",
      blogTitle: "CREATIVE THOUGHTS",
      contactTitle: "COMMISSION WORK",
      footerTagline: "Artistry in AI"
    }
  },
  forest: {
    name: 'Forest',
    icon: 'fas fa-tree',
    colors: {
      '--primary-color': '#00b894',
      '--secondary-color': '#55a3ff',
      '--accent-color': '#fdcb6e',
      '--background-color': '#f0fff4',
      '--surface-color': '#e6fffa',
      '--text-color': '#1a202c',
      '--text-secondary': '#4a5568',
      '--border-color': '#c6f6d5',
      '--shadow': '0 5px 15px rgba(0, 184, 148, 0.2)',
      '--navbar-bg': 'rgba(240, 255, 244, 0.95)',
      '--card-bg': '#ffffff',
      '--overlay-bg': 'rgba(0, 184, 148, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #00b894, #fdcb6e)',
      '--secondary-gradient': 'linear-gradient(135deg, #55a3ff, #00b894)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(0, 184, 148, 0.1), rgba(253, 203, 110, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Growing Naturally, I'm Siva Subramanian R",
      heroSubtitle: "Sustainable AI & ML Engineer cultivating organic tech solutions for tomorrow.",
      aboutTitle: "GROWTH PROFILE",
      aboutDescription: "I believe in sustainable technology growth, nurturing AI and Machine Learning solutions that benefit both humanity and our environment. My approach is rooted in ethical innovation.",
      skillsTitle: "CULTIVATION SKILLS",
      experienceTitle: "GROWTH TIMELINE",
      educationTitle: "ROOTS & BRANCHES",
      projectsTitle: "HARVEST",
      additionalTitle: "ECOSYSTEM",
      summaryTitle: "FOREST OVERVIEW",
      blogTitle: "GROWTH STORIES",
      contactTitle: "PLANT SEEDS",
      footerTagline: "Growing Green Tech"
    }
  },
  midnight: {
    name: 'Midnight',
    icon: 'fas fa-star',
    colors: {
      '--primary-color': '#9c88ff',
      '--secondary-color': '#ffeaa7',
      '--accent-color': '#fd79a8',
      '--background-color': '#0f0f23',
      '--surface-color': '#1e1e3f',
      '--text-color': '#ffffff',
      '--text-secondary': '#a0aec0',
      '--border-color': '#2d3748',
      '--shadow': '0 5px 15px rgba(0, 0, 0, 0.5)',
      '--navbar-bg': 'rgba(15, 15, 35, 0.95)',
      '--card-bg': '#1e1e3f',
      '--overlay-bg': 'rgba(156, 136, 255, 0.9)',
      '--primary-gradient': 'linear-gradient(135deg, #9c88ff, #fd79a8)',
      '--secondary-gradient': 'linear-gradient(135deg, #ffeaa7, #9c88ff)',
      '--subtle-gradient': 'linear-gradient(135deg, rgba(156, 136, 255, 0.1), rgba(253, 121, 168, 0.1))',
      '--light-color': '#ffffff',
      '--transition': 'all 0.3s ease',
    },
    content: {
      heroTitle: "Under the Stars, I'm Siva Subramanian R",
      heroSubtitle: "Visionary AI & ML Engineer illuminating the path to tomorrow's technology.",
      aboutTitle: "COSMIC PROFILE",
      aboutDescription: "I reach for the stars in AI and Machine Learning, creating solutions that transcend earthly limitations. My vision extends beyond the horizon of current possibilities.",
      skillsTitle: "STELLAR ABILITIES",
      experienceTitle: "COSMIC JOURNEY",
      educationTitle: "STELLAR KNOWLEDGE",
      projectsTitle: "CONSTELLATIONS",
      additionalTitle: "GALACTIC INFO",
      summaryTitle: "COSMIC OVERVIEW",
      blogTitle: "ASTRO CHRONICLES",
      contactTitle: "SIGNAL THE STARS",
      footerTagline: "Reaching for the Stars"
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Auto-detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Set data-theme attribute for CSS fallbacks
    root.setAttribute('data-theme', currentTheme);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    themes,
    switchTheme,
    theme: themes[currentTheme],
    content: themes[currentTheme].content
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 