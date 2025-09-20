import React, { useState } from 'react';
import faceRecognitionImage from '../assets/Intelligent Face Recognition.png';
import faceRegisteredImage from '../assets/Face Registered.png';
import faceDetectingImage from '../assets/Face Detecting.png';
import staticPageImage from '../assets/Static Page.png';
import trainingHistoryImage from '../assets/training_history.png';
import registeredCompletedImage from '../assets/Registered Completed.png';
import loanBankImage from '../assets/Loan Bank.png';
import loanBank1Image from '../assets/Loan Bank1.png';
import loanBank2Image from '../assets/Loan Bank2.png';
import bezalelInteriorsImage from '../assets/bezalel-interiors.png';
import solarImage from '../assets/Solar.png';
import appStoreImage from '../assets/app store.png';
import rajaRanjiVideo from '../assets/RajaRanj.mp4';
import rajaRanjiPoster from '../assets/Raja Ranji Poster.png';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { content } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  // Function to show image gallery
  const showDemoOptions = (demoOptions, e) => {
    e.preventDefault();
    
    let currentImageIndex = 0;
    
    // Create gallery overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
    `;
    
    const updateGallery = () => {
      const currentImage = demoOptions[currentImageIndex];
      overlay.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; display: flex; flex-direction: column; align-items: center;">
          <!-- ESC Button -->
          <button id="escButton" style="
            position: absolute;
            top: -50px;
            right: 0;
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          ">
            <i class="fas fa-times"></i> ESC
          </button>
          
          <!-- Main Image Container -->
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <!-- Previous Button -->
            <button id="prevBtn" style="
              position: absolute;
              left: -60px;
              background: rgba(255, 255, 255, 0.2);
              border: 2px solid rgba(255, 255, 255, 0.3);
              color: white;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              font-size: 1.2rem;
              cursor: pointer;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <!-- Image -->
            <img src="${currentImage.image}" alt="${currentImage.name}" style="
              max-width: 800px;
              max-height: 600px;
              width: auto;
              height: auto;
              border-radius: 15px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
              object-fit: contain;
            ">
            
            <!-- Next Button -->
            <button id="nextBtn" style="
              position: absolute;
              right: -60px;
              background: rgba(255, 255, 255, 0.2);
              border: 2px solid rgba(255, 255, 255, 0.3);
              color: white;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              font-size: 1.2rem;
              cursor: pointer;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <!-- Image Info -->
          <div style="margin-top: 30px; text-align: center;">
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 10px; font-weight: 600;">
              ${currentImage.name}
            </h3>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 1rem; margin-bottom: 20px;">
              Image ${currentImageIndex + 1} of ${demoOptions.length}
            </p>
            
            <!-- Thumbnail Navigation -->
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
              ${demoOptions.map((option, index) => `
                <img src="${option.image}" alt="${option.name}" 
                     onclick="changeImage(${index})"
                     style="
                       width: 60px;
                       height: 40px;
                       object-fit: cover;
                       border-radius: 5px;
                       cursor: pointer;
                       border: 2px solid ${index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.3)'};
                       opacity: ${index === currentImageIndex ? '1' : '0.6'};
                       transition: all 0.3s ease;
                     "
                     onmouseover="this.style.opacity='1'; this.style.transform='scale(1.1)'"
                     onmouseout="this.style.opacity='${index === currentImageIndex ? '1' : '0.6'}'; this.style.transform='scale(1)'"
                >
              `).join('')}
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners
      overlay.querySelector('#escButton').onclick = () => overlay.remove();
      overlay.querySelector('#prevBtn').onclick = () => {
        currentImageIndex = (currentImageIndex - 1 + demoOptions.length) % demoOptions.length;
        updateGallery();
      };
      overlay.querySelector('#nextBtn').onclick = () => {
        currentImageIndex = (currentImageIndex + 1) % demoOptions.length;
        updateGallery();
      };
      
      // Add hover effects
      const buttons = overlay.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
          this.style.background = 'rgba(255, 255, 255, 0.3)';
          this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
          this.style.background = 'rgba(255, 255, 255, 0.2)';
          this.style.transform = 'scale(1)';
        });
      });
    };
    
    // Global function to change image (accessible from onclick)
    window.changeImage = (index) => {
      currentImageIndex = index;
      updateGallery();
    };
    
    // Keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleKeyPress);
      } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + demoOptions.length) % demoOptions.length;
        updateGallery();
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % demoOptions.length;
        updateGallery();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial gallery setup
    updateGallery();
    document.body.appendChild(overlay);
    
    // Cleanup when overlay is removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (node === overlay) {
              document.removeEventListener('keydown', handleKeyPress);
              delete window.changeImage;
              observer.disconnect();
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true });
  };

  // Function to handle external demo links with notification
  const handleExternalDemo = (url, e) => {
    e.preventDefault();
    
    // Show loading notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 25px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: 'Poppins', sans-serif;
      max-width: 350px;
      animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px;"></div>
        <strong>Opening App Store Analysis...</strong>
      </div>
      <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
        If the app doesn't load, it might be temporarily down. 
        <br><strong>Wait 1 minute and try again!</strong>
      </p>
      <button onclick="this.parentElement.remove()" 
              style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.7;"
              onmouseover="this.style.opacity='1'" 
              onmouseout="this.style.opacity='0.7'">×</button>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Open the link after a short delay
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Update notification after opening
      notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 20px; height: 20px; background: #4CAF50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
            <span style="color: white; font-size: 12px;">✓</span>
          </div>
          <strong>App Opened Successfully!</strong>
        </div>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
          If you see a blank page or error:
          <br>• Wait 1 minute for the app to wake up
          <br>• Refresh the page
          <br>• Streamlit apps may take time to load
        </p>
        <button onclick="this.parentElement.remove()" 
                style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.7;"
                onmouseover="this.style.opacity='1'" 
                onmouseout="this.style.opacity='0.7'">×</button>
      `;
      
      // Auto remove notification after 8 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.style.animation = 'slideOutRight 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }
      }, 8000);
    }, 1000);
    
    // Add slideOutRight animation
    style.textContent += `
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
  };

  // Function to show video demo
  const showVideoDemo = (videoSrc, projectTitle, e) => {
    e.preventDefault();
    
    // Create video overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
    `;
    
    overlay.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 90%; display: flex; flex-direction: column; align-items: center;">
        <!-- Close Button -->
        <button id="closeVideoBtn" style="
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        ">
          <i class="fas fa-times"></i> Close
        </button>
        
        <!-- Video Container -->
        <div style="position: relative; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); max-width: 100%; max-height: 80vh;">
          <video 
            controls 
            autoplay 
            style="
              width: 100%;
              height: auto;
              max-height: 80vh;
              border-radius: 15px;
            "
          >
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        
        <!-- Video Info -->
        <div style="margin-top: 20px; text-align: center;">
          <h3 style="color: white; font-size: 1.5rem; margin-bottom: 10px; font-weight: 600;">
            ${projectTitle} - Demo Video
          </h3>
          <p style="color: rgba(255, 255, 255, 0.8); font-size: 1rem;">
            Click outside or press ESC to close
          </p>
        </div>
      </div>
    `;
    
    // Add event listeners
    overlay.querySelector('#closeVideoBtn').onclick = () => overlay.remove();
    
    // Close on click outside video
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
    
    // Keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // Add hover effect to close button
    const closeBtn = overlay.querySelector('#closeVideoBtn');
    closeBtn.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255, 255, 255, 0.3)';
      this.style.transform = 'scale(1.05)';
    });
    closeBtn.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(overlay);
    
    // Cleanup when overlay is removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (node === overlay) {
              document.removeEventListener('keydown', handleKeyPress);
              observer.disconnect();
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true });
  };

  // Function to show code protection message
  const showCodeProtectionMessage = (e) => {
    e.preventDefault();
    
    // Create warning overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
      backdrop-filter: blur(10px);
    `;
    
    overlay.innerHTML = `
      <div style="max-width: 500px; padding: 40px; border-radius: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <div style="font-size: 4rem; margin-bottom: 20px;">🔐</div>
        <h2 style="color: white; font-size: 1.8rem; margin-bottom: 20px; font-weight: 600;">Code Protected!</h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px;">
          Sorry! The source code for this project is private and confidential. 
          It contains proprietary algorithms and sensitive business logic.
        </p>
        <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin-bottom: 30px;">
          📧 For collaboration or code access inquiries, please contact me directly.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: rgba(255,255,255,0.2); 
                       color: white; 
                       border: 2px solid rgba(255,255,255,0.3); 
                       padding: 12px 30px; 
                       border-radius: 25px; 
                       font-size: 1rem; 
                       cursor: pointer; 
                       font-weight: 500;
                       transition: all 0.3s ease;
                       backdrop-filter: blur(10px);"
                onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='scale(1.05)'"
                onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1)'">
          I Understand
        </button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
      if (overlay.parentElement) {
        overlay.remove();
      }
    }, 10000);
  };

  const projects = [
    {
      category: 'web',
      image: rajaRanjiPoster,
      title: 'Raja Ranji',
      description: 'Raja Ranji is a traditional South Indian game brought to life through modern web technology. This interactive web application features engaging gameplay with authentic cultural elements and responsive design.',
      tags: ['React', 'JavaScript', 'CSS'],
      demoLink: 'video',
      videoSrc: rajaRanjiVideo,
      codeLink: 'protected'
    },
    {
      category: 'web',
      image: faceRecognitionImage,
      title: 'Intelligent Face Recognition',
      description: 'This Intelligent Face Recognition System project provides a comprehensive, modular, and scalable solution for real-time face detection, recognition, and user registration.',
      tags: ['Python', 'OpenCV', 'TensorFlow'],
      demoLink: 'multiple',
      demoOptions: [
        { name: 'Main Interface', image: faceRecognitionImage },
        { name: 'Face Registration', image: faceRegisteredImage },
        { name: 'Face Detection', image: faceDetectingImage },
        { name: 'Static Page', image: staticPageImage },
        { name: 'Training History', image: trainingHistoryImage },
        { name: 'Registration Complete', image: registeredCompletedImage }
      ],
      codeLink: '#'
    },
    {
      category: 'mobile',
      image: loanBankImage,
      title: 'Loan Approval Prediction System',
      description: 'This project is a Loan Approval Prediction System that predicts whether a loan will be approved or rejected based on various financial and personal factors',
      tags: ['Python', 'Streamlit', 'Machine Learning'],
      demoLink: 'multiple',
      demoOptions: [
        { name: 'Loan Bank', image: loanBankImage },
        { name: 'Loan Bank1', image: loanBank1Image },
        { name: 'Loan Bank2', image: loanBank2Image }
      ],
      codeLink: '#'
    },
    {
      category: 'design',
      image: bezalelInteriorsImage,
      title: 'Interior Design',
      description: 'Comprehensive design system with reusable components for consistent branding across platforms.',
      tags: ['HTML', 'React', 'JavaScript'],
      demoLink: 'https://bezalelinterior.com/#home',
      codeLink: '#'
    },
    {
      category: 'design',
      image: solarImage,
      title: 'Solar Energy Dashboard',
      description: 'Interactive solar energy monitoring dashboard with real-time data visualization and energy efficiency analytics.',
      tags: ['React', 'JavaScript', 'CSS'],
      demoLink: 'http://konsunenergy.in',
      codeLink: '#'
    },
    {
      category: 'web',
      image: appStoreImage,
      title: 'App Store Analysis',
      description: 'This Flask application is designed for exploring and analyzing app data from the Google Play Store and Apple App Store, leveraging MongoDB for data storage',
      tags: ['Python', 'MongoDB', 'Streamlit'],
      demoLink: 'https://ds-app-sentiment.streamlit.app/',
      codeLink: '#'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-title">
          <h2>{content.projectsTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="project-filters">
          <button 
            className={`filter-btn hover-lift ${activeFilter === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn hover-lift ${activeFilter === 'web' ? 'active' : ''}`} 
            onClick={() => setActiveFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn hover-lift ${activeFilter === 'mobile' ? 'active' : ''}`} 
            onClick={() => setActiveFilter('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`filter-btn hover-lift ${activeFilter === 'design' ? 'active' : ''}`} 
            onClick={() => setActiveFilter('design')}
          >
            Design
          </button>
        </div>
        <div className="projects-gallery stagger-animate">
          {filteredProjects.map((project, index) => (
            <div key={index} className="gallery-item hover-lift" data-category={project.category}>
              <div className="gallery-image">
                <img src={project.image} alt={`${project.title} Project`} />
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>{tag}</span>
                      ))}
                    </div>
                    <div className="gallery-links">
                      {project.demoLink === 'multiple' ? (
                        <button onClick={(e) => showDemoOptions(project.demoOptions, e)} className="gallery-btn demo-btn hover-lift" style={{border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer'}}>
                          <i className="fas fa-eye"></i> View Demo
                        </button>
                      ) : project.demoLink === 'video' ? (
                        <button onClick={(e) => showVideoDemo(project.videoSrc, project.title, e)} className="gallery-btn demo-btn hover-lift" style={{border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer'}}>
                          <i className="fas fa-play"></i> View Demo
                        </button>
                      ) : project.title === 'App Store Analysis' ? (
                        <button onClick={(e) => handleExternalDemo(project.demoLink, e)} className="gallery-btn demo-btn hover-lift" style={{border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer'}}>
                          <i className="fas fa-eye"></i> View Demo
                        </button>
                      ) : (
                        <a href={project.demoLink} className="gallery-btn demo-btn hover-lift" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-eye"></i> View Demo
                        </a>
                      )}
                      {project.codeLink === 'protected' ? (
                        <button onClick={showCodeProtectionMessage} className="gallery-btn code-btn hover-lift" style={{border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer'}}>
                          <i className="fas fa-lock"></i> View Code
                        </button>
                      ) : (
                        <button onClick={showCodeProtectionMessage} className="gallery-btn code-btn hover-lift" style={{border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', cursor: 'pointer'}}>
                          <i className="fab fa-github"></i> View Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 