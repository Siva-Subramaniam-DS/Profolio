import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for lazy loading images with caching and preloading
 * Implements Intersection Observer API for efficient viewport detection
 */
export const useImageLoader = (images = [], options = {}) => {
  const {
    rootMargin = '200px',
    threshold = 0.1,
    enablePreloading = true,
    cacheSize = 50
  } = options;

  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [errorImages, setErrorImages] = useState(new Set());
  const [imageCache] = useState(new Map());
  const observerRef = useRef(null);
  const imageRefs = useRef(new Map());

  // Initialize Intersection Observer
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately for older browsers
      images.forEach((_, index) => {
        loadImage(index);
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.imageIndex, 10);
            if (!isNaN(index)) {
              loadImage(index);
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [images, rootMargin, threshold]);

  // Load image with caching and error handling
  const loadImage = useCallback((index) => {
    const imageSrc = images[index];
    if (!imageSrc || loadedImages.has(index) || loadingImages.has(index)) {
      return;
    }

    // Check cache first
    if (imageCache.has(imageSrc)) {
      setLoadedImages(prev => new Set([...prev, index]));
      return;
    }

    setLoadingImages(prev => new Set([...prev, index]));
    setErrorImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });

    const img = new Image();
    
    img.onload = () => {
      // Add to cache (with size limit)
      if (imageCache.size >= cacheSize) {
        const firstKey = imageCache.keys().next().value;
        imageCache.delete(firstKey);
      }
      imageCache.set(imageSrc, img);

      setLoadedImages(prev => new Set([...prev, index]));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });

      // Preload adjacent images if enabled
      if (enablePreloading) {
        preloadAdjacentImages(index);
      }
    };

    img.onerror = () => {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      setErrorImages(prev => new Set([...prev, index]));
    };

    img.src = imageSrc;
  }, [images, loadedImages, loadingImages, imageCache, cacheSize, enablePreloading]);

  // Preload adjacent images for better UX
  const preloadAdjacentImages = useCallback((currentIndex) => {
    const indicesToPreload = [
      currentIndex - 1,
      currentIndex + 1
    ].filter(index => 
      index >= 0 && 
      index < images.length && 
      !loadedImages.has(index) && 
      !loadingImages.has(index)
    );

    indicesToPreload.forEach(index => {
      setTimeout(() => loadImage(index), 100);
    });
  }, [images.length, loadedImages, loadingImages, loadImage]);

  // Register element for lazy loading observation
  const registerElement = useCallback((element, index) => {
    if (!element || !observerRef.current) return;

    element.dataset.imageIndex = index.toString();
    imageRefs.current.set(index, element);
    observerRef.current.observe(element);
  }, []);

  // Unregister element from observation
  const unregisterElement = useCallback((index) => {
    const element = imageRefs.current.get(index);
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
      imageRefs.current.delete(index);
    }
  }, []);

  // Force load image (for lightbox or immediate needs)
  const forceLoadImage = useCallback((index) => {
    loadImage(index);
  }, [loadImage]);

  // Get image loading state
  const getImageState = useCallback((index) => {
    if (errorImages.has(index)) return 'error';
    if (loadedImages.has(index)) return 'loaded';
    if (loadingImages.has(index)) return 'loading';
    return 'pending';
  }, [loadedImages, loadingImages, errorImages]);

  // Retry loading failed image
  const retryImage = useCallback((index) => {
    setErrorImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    loadImage(index);
  }, [loadImage]);

  return {
    registerElement,
    unregisterElement,
    forceLoadImage,
    getImageState,
    retryImage,
    loadedImages,
    loadingImages,
    errorImages,
    preloadAdjacentImages
  };
};