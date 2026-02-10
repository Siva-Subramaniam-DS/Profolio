import { useState, useCallback, useEffect } from 'react';

/**
 * Centralized gallery state management hook with persistence
 * Handles gallery state, user preferences, and localStorage integration
 */
export const useGalleryState = (images = [], options = {}) => {
  const {
    enablePersistence = true,
    storageKey = 'marathon-gallery-preferences',
    defaultPreferences = {
      slideshowInterval: 3000,
      zoomLevel: 1,
      autoSlideshow: false,
      showMetadata: true,
      enableKeyboardShortcuts: true
    }
  } = options;

  // Core gallery state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // User preferences with persistence
  const [preferences, setPreferences] = useState(() => {
    if (!enablePersistence) return defaultPreferences;

    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.warn('Failed to load gallery preferences:', error);
      return defaultPreferences;
    }
  });

  // Persist preferences to localStorage
  useEffect(() => {
    if (!enablePersistence) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch (error) {
      console.warn('Failed to save gallery preferences:', error);
    }
  }, [preferences, enablePersistence, storageKey]);

  // Navigation functions
  const goToImage = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      // Reset zoom and pan when changing images
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    goToImage(newIndex);
  }, [currentIndex, images.length, goToImage]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    goToImage(newIndex);
  }, [currentIndex, images.length, goToImage]);

  const goToFirst = useCallback(() => {
    goToImage(0);
  }, [goToImage]);

  const goToLast = useCallback(() => {
    goToImage(images.length - 1);
  }, [images.length, goToImage]);

  // Lightbox controls
  const openLightbox = useCallback((index = currentIndex) => {
    goToImage(index);
    setIsLightboxOpen(true);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }, [currentIndex, goToImage]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setIsSlideshow(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    
    // Restore body scroll
    document.body.style.overflow = '';
  }, []);

  // Slideshow controls
  const toggleSlideshow = useCallback(() => {
    setIsSlideshow(prev => !prev);
  }, []);

  const startSlideshow = useCallback(() => {
    setIsSlideshow(true);
  }, []);

  const stopSlideshow = useCallback(() => {
    setIsSlideshow(false);
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const setZoom = useCallback((level) => {
    setZoomLevel(Math.max(0.5, Math.min(5, level)));
    if (level === 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  }, []);

  // Pan controls
  const updatePanPosition = useCallback((deltaX, deltaY) => {
    if (zoomLevel <= 1) return;

    setPanPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
  }, [zoomLevel]);

  const resetPan = useCallback(() => {
    setPanPosition({ x: 0, y: 0 });
  }, []);

  // Fullscreen controls
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        const element = document.querySelector('.lightbox-overlay') || document.documentElement;
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen not supported or failed:', error);
    }
  }, []);

  // Preference management
  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, [defaultPreferences]);

  // Slideshow effect
  useEffect(() => {
    if (!isSlideshow || !isLightboxOpen) return;

    const interval = setInterval(() => {
      goToNext();
    }, preferences.slideshowInterval);

    return () => clearInterval(interval);
  }, [isSlideshow, isLightboxOpen, preferences.slideshowInterval, goToNext]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Restore body scroll if component unmounts while lightbox is open
      document.body.style.overflow = '';
    };
  }, []);

  // Computed values
  const currentImage = images[currentIndex];
  const hasImages = images.length > 0;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;
  const canZoomIn = zoomLevel < 5;
  const canZoomOut = zoomLevel > 0.5;

  return {
    // State
    currentIndex,
    currentImage,
    isLightboxOpen,
    isSlideshow,
    zoomLevel,
    panPosition,
    isFullscreen,
    preferences,
    
    // Computed
    hasImages,
    isFirstImage,
    isLastImage,
    canZoomIn,
    canZoomOut,
    
    // Navigation
    goToImage,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    
    // Lightbox
    openLightbox,
    closeLightbox,
    
    // Slideshow
    toggleSlideshow,
    startSlideshow,
    stopSlideshow,
    
    // Zoom
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    
    // Pan
    updatePanPosition,
    resetPan,
    
    // Fullscreen
    toggleFullscreen,
    
    // Preferences
    updatePreference,
    resetPreferences
  };
};