import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, themes, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    switchTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch Theme"
      >
        <i className={themes[currentTheme].icon}></i>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <h4>Choose Theme</h4>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="theme-options">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => handleThemeChange(key)}
              >
                <div className="theme-preview">
                  <div 
                    className="theme-color-primary" 
                    style={{ backgroundColor: theme.colors['--primary-color'] }}
                  ></div>
                  <div 
                    className="theme-color-secondary" 
                    style={{ backgroundColor: theme.colors['--secondary-color'] }}
                  ></div>
                  <div 
                    className="theme-color-accent" 
                    style={{ backgroundColor: theme.colors['--accent-color'] }}
                  ></div>
                </div>
                <div className="theme-info">
                  <i className={theme.icon}></i>
                  <span>{theme.name}</span>
                </div>
                {currentTheme === key && (
                  <div className="theme-active-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && <div className="theme-overlay" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default ThemeSwitcher; 