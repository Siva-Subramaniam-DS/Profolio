import { useEffect, useCallback, useRef } from 'react';

/**
 * Enhanced keyboard navigation hook with accessibility support
 * Handles gallery navigation, focus management, and ARIA announcements
 */
export const useKeyboardNavigation = (options = {}) => {
  const {
    isActive = false,
    onPrevious,
    onNext,
    onClose,
    onToggleSlideshow,
    onZoomIn,
    onZoomOut,
    onFullscreen,
    onHome,
    onEnd,
    enableAnnouncements = true,
    trapFocus = true,
    focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  } = options;

  const focusableElementsRef = useRef([]);
  const lastFocusedElementRef = useRef(null);
  const announcementRef = useRef(null);

  // Create ARIA live region for announcements
  useEffect(() => {
    if (!enableAnnouncements) return;

    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    
    document.body.appendChild(liveRegion);
    announcementRef.current = liveRegion;

    return () => {
      if (liveRegion && liveRegion.parentNode) {
        try {
          liveRegion.parentNode.removeChild(liveRegion);
        } catch (error) {
          console.warn('Failed to remove ARIA live region:', error);
        }
      }
      announcementRef.current = null;
    };
  }, [enableAnnouncements]);

  // Announce message to screen readers
  const announce = useCallback((message) => {
    if (!enableAnnouncements || !announcementRef.current) return;
    
    announcementRef.current.textContent = message;
    
    // Clear after announcement to allow repeated messages
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);
  }, [enableAnnouncements]);

  // Get all focusable elements within the active container
  const updateFocusableElements = useCallback(() => {
    if (!isActive || !trapFocus) return;

    const container = document.querySelector('[role="dialog"], .lightbox-overlay');
    if (!container) return;

    const elements = container.querySelectorAll(focusableSelectors);
    focusableElementsRef.current = Array.from(elements).filter(
      el => !el.disabled && el.offsetParent !== null
    );
  }, [isActive, trapFocus, focusableSelectors]);

  // Handle focus trapping
  const handleFocusTrap = useCallback((event) => {
    if (!trapFocus || !isActive || focusableElementsRef.current.length === 0) return;

    const firstElement = focusableElementsRef.current[0];
    const lastElement = focusableElementsRef.current[focusableElementsRef.current.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [trapFocus, isActive]);

  // Main keyboard event handler
  const handleKeyDown = useCallback((event) => {
    if (!isActive) return;

    // Handle focus trapping first
    handleFocusTrap(event);

    // Prevent default for handled keys
    const handledKeys = [
      'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Space', 'Enter', '+', '=', '-', 'f', 'F'
    ];

    if (handledKeys.includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'Escape':
        onClose?.();
        announce('Gallery closed');
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        onPrevious?.();
        announce('Previous image');
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        onNext?.();
        announce('Next image');
        break;

      case 'Home':
        onHome?.();
        announce('First image');
        break;

      case 'End':
        onEnd?.();
        announce('Last image');
        break;

      case ' ': // Spacebar
      case 'Space':
        onToggleSlideshow?.();
        announce('Slideshow toggled');
        break;

      case '+':
      case '=':
        onZoomIn?.();
        announce('Zoomed in');
        break;

      case '-':
        onZoomOut?.();
        announce('Zoomed out');
        break;

      case 'f':
      case 'F':
        onFullscreen?.();
        announce('Fullscreen toggled');
        break;

      case 'Enter':
        // Handle enter on focused elements
        if (document.activeElement && document.activeElement.click) {
          document.activeElement.click();
        }
        break;

      default:
        // Don't prevent default for unhandled keys
        break;
    }
  }, [
    isActive,
    handleFocusTrap,
    onClose,
    onPrevious,
    onNext,
    onHome,
    onEnd,
    onToggleSlideshow,
    onZoomIn,
    onZoomOut,
    onFullscreen,
    announce
  ]);

  // Set up keyboard event listeners
  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('keydown', handleKeyDown);
    updateFocusableElements();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown, updateFocusableElements]);

  // Manage focus when gallery opens/closes
  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      lastFocusedElementRef.current = document.activeElement;
      
      // Focus the gallery container or first focusable element
      setTimeout(() => {
        updateFocusableElements();
        const container = document.querySelector('[role="dialog"], .lightbox-overlay');
        if (container && typeof container.focus === 'function') {
          container.focus();
        } else if (focusableElementsRef.current.length > 0) {
          const firstElement = focusableElementsRef.current[0];
          if (firstElement && typeof firstElement.focus === 'function') {
            firstElement.focus();
          }
        }
      }, 100);
    } else {
      // Return focus to the previously focused element
      if (lastFocusedElementRef.current && 
          typeof lastFocusedElementRef.current.focus === 'function' &&
          document.contains(lastFocusedElementRef.current)) {
        try {
          lastFocusedElementRef.current.focus();
        } catch (error) {
          console.warn('Failed to restore focus:', error);
        }
      }
    }
  }, [isActive, updateFocusableElements]);

  // Provide keyboard shortcuts info
  const getKeyboardShortcuts = useCallback(() => {
    return {
      navigation: {
        'Arrow Keys': 'Navigate between images',
        'Home': 'Go to first image',
        'End': 'Go to last image',
        'Escape': 'Close gallery'
      },
      controls: {
        'Space': 'Toggle slideshow',
        '+/=': 'Zoom in',
        '-': 'Zoom out',
        'F': 'Toggle fullscreen'
      },
      accessibility: {
        'Tab': 'Navigate between controls',
        'Enter': 'Activate focused control'
      }
    };
  }, []);

  return {
    announce,
    getKeyboardShortcuts,
    updateFocusableElements
  };
};