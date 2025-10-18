import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  sanitizeInput, 
  validateEmail, 
  formRateLimiter, 
  generateCSRFToken,
  escapeHtml,
  createHoneypot,
  logSecurityEvent
} from '../utils/security';

const Contact = () => {
  const { content } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [rateLimitMessage, setRateLimitMessage] = useState('');

  const honeypot = createHoneypot();

  useEffect(() => {
    // Generate CSRF token on component mount
    setCsrfToken(generateCSRFToken());
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Check honeypot (bot detection)
    if (formData.website) {
      logSecurityEvent('Bot detected', { honeypot: formData.website });
      return false;
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2 || formData.name.length > 50) {
      newErrors.name = 'Name must be between 2 and 50 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 3 || formData.subject.length > 100) {
      newErrors.subject = 'Subject must be between 3 and 100 characters';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10 || formData.message.length > 1000) {
      newErrors.message = 'Message must be between 10 and 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check rate limiting
    const userIdentifier = `${formData.email}_${Date.now().toString().slice(0, -4)}`; // 10-second window identifier
    if (!formRateLimiter.isAllowed(userIdentifier)) {
      const remainingTime = Math.ceil(formRateLimiter.getRemainingTime(userIdentifier) / 1000);
      setRateLimitMessage(`Too many attempts. Please wait ${remainingTime} seconds before trying again.`);
      logSecurityEvent('Rate limit exceeded', { email: formData.email });
      return;
    }

    setRateLimitMessage('');

    if (!validateForm()) {
      logSecurityEvent('Form validation failed', { errors: Object.keys(errors) });
      return;
    }

    setIsSubmitting(true);

    try {
      const phoneNumber = "919150908294";
      
      // Escape HTML to prevent XSS in WhatsApp message
      const secureMessage = `Name: ${escapeHtml(formData.name)}\nEmail: ${escapeHtml(formData.email)}\nSubject: ${escapeHtml(formData.subject)}\nMessage: ${escapeHtml(formData.message)}`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(secureMessage)}`;
      
      // Security: Validate URL before opening
      if (whatsappUrl.startsWith('https://wa.me/')) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        // Log successful submission
        logSecurityEvent('Form submitted successfully', { 
          email: formData.email,
          timestamp: new Date().toISOString()
        });

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: ''
        });
        
        // Show success message
        alert('Message sent successfully! You will be redirected to WhatsApp.');
      } else {
        throw new Error('Invalid WhatsApp URL generated');
      }
    } catch (error) {
      logSecurityEvent('Form submission error', { error: error.message });
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>{content.contactTitle}</h2>
          <div className="underline"></div>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Mylapore, Chennai - 600004</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>sivasubramaniam141@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91 9150908294</p>
              </div>
            </div>
            <div className="contact-social">
              <h3>Follow Me</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/r-siva-subramanaiam/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Siva-Subramaniam-DS" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://x.com/SivaSubbu1_4_1" target="_blank" rel="noopener noreferrer" title="Twitter Profile">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/_siva_hokage_/?__pwa=1" rel="noopener noreferrer" target="_blank" title="Instagram Profile">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            {rateLimitMessage && (
              <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                {rateLimitMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Hidden CSRF token */}
              <input type="hidden" name="csrf_token" value={csrfToken} />
              
              {/* Honeypot field - hidden from users but visible to bots */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={honeypot.style}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  maxLength="50"
                  autoComplete="name"
                />
                {errors.name && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  maxLength="254"
                  autoComplete="email"
                />
                {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  maxLength="100"
                  autoComplete="off"
                />
                {errors.subject && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  maxLength="1000"
                  rows="5"
                  autoComplete="off"
                ></textarea>
                {errors.message && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;