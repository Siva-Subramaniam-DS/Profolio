import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGalleryState } from '../hooks/useGalleryState';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useImageLoader } from '../hooks/useImageLoader';
import { extractImageMetadata, generateAltText, formatDate } from '../utils/imageUtils';
import { soundManager } from '../utils/soundUtils';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner, { ImagePlaceholder, GalleryLoadingOverlay } from './LoadingSpinner';
import ImageErrorFallback, { NetworkErrorFallback, EmptyGalleryFallback } from './ImageErrorFallback';

// Loads images from src/assets/marathon or src/assets/Marathon using Vite's glob (returns URLs)
const loadMarathonImages = () => {
  try {
    const modules = import.meta.glob('../assets/{marathon,Marathon}/*.{png,jpg,jpeg,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });

    const vals = Object.values(modules || {});
    return vals.map((v) => (typeof v === 'string' ? v : (v && v.default) ? v.default : '')).filter(Boolean);
  } catch (e) {
    return [];
  }
};

const loadSRMImages = () => {
  try {
    const modules = import.meta.glob('../assets/SRM College lecturer/*.{png,jpg,jpeg,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });

    const vals = Object.values(modules || {});
    return vals.map((v) => (typeof v === 'string' ? v : (v && v.default) ? v.default : '')).filter(Boolean);
  } catch (e) {
    return [];
  }
};

const loadPoultryImages = () => {
  try {
    const modules = import.meta.glob('../assets/Poultry Visit/*.{png,jpg,jpeg,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    });

    const vals = Object.values(modules || {});
    return vals.map((v) => (typeof v === 'string' ? v : (v && v.default) ? v.default : '')).filter(Boolean);
  } catch (e) {
    return [];
  }
};

const Blog = () => {
  const { content } = useTheme();

  // If no images exist in the assets folder, generate lightweight SVG placeholders
  const generatePlaceholder = (idx, w = 1200, h = 800) => {
    const bgColors = ['#e6ebe9', '#f6e7e1', '#eef6fb', '#f3eefc', '#fff4e6'];
    const bg = bgColors[idx % bgColors.length];
    const text = `Photo ${idx + 1}`;
    const svg = `<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><rect width='100%' height='100%' fill='${bg}' rx='24' ry='24'/><text x='50%' y='50%' font-size='48' font-family='Poppins, Arial, sans-serif' fill='#333' dominant-baseline='middle' text-anchor='middle'>${text}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const marathonImages = useMemo(() => {
    let imgs = loadMarathonImages();
    if (!imgs || imgs.length === 0) {
      return Array.from({ length: 5 }).map((_, i) => generatePlaceholder(i));
    }
    return imgs;
  }, []);

  const srmImages = useMemo(() => {
    let imgs = loadSRMImages();
    if (!imgs || imgs.length === 0) {
      return Array.from({ length: 2 }).map((_, i) => generatePlaceholder(i, 1200, 800));
    }
    return imgs;
  }, []);

  const poultryImages = useMemo(() => {
    let imgs = loadPoultryImages();
    if (!imgs || imgs.length === 0) {
      return Array.from({ length: 4 }).map((_, i) => generatePlaceholder(i));
    }
    return imgs;
  }, []);

  // Gallery view state - null shows featured cards, 'marathon' or 'srm' shows full gallery
  const [activeGallery, setActiveGallery] = useState(null);

  const images = useMemo(() => {
    if (activeGallery === 'srm') return srmImages;
    if (activeGallery === 'poultry') return poultryImages;
    return marathonImages;
  }, [activeGallery, srmImages, marathonImages, poultryImages]);

  // Enhanced gallery state management
  const galleryState = useGalleryState(images, {
    enablePersistence: true,
    storageKey: activeGallery ? `${activeGallery}-gallery-preferences` : 'marathon-gallery-preferences'
  });

  // Image loading with lazy loading support
  const imageLoader = useImageLoader(images, {
    rootMargin: '200px',
    enablePreloading: true
  });

  // Enhanced keyboard navigation
  const keyboardNav = useKeyboardNavigation({
    isActive: galleryState.isLightboxOpen,
    onPrevious: galleryState.goToPrevious,
    onNext: galleryState.goToNext,
    onClose: galleryState.closeLightbox,
    onToggleSlideshow: galleryState.toggleSlideshow,
    onZoomIn: galleryState.zoomIn,
    onZoomOut: galleryState.zoomOut,
    onFullscreen: galleryState.toggleFullscreen,
    onHome: galleryState.goToFirst,
    onEnd: galleryState.goToLast,
    enableAnnouncements: true,
    trapFocus: true
  });

  // Image metadata state
  const [imageMetadata, setImageMetadata] = useState(new Map());
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [metadataError, setMetadataError] = useState(null);

  // Network status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load metadata for images with error handling
  useEffect(() => {
    const loadMetadata = async () => {
      if (images.length === 0) return;

      setIsLoadingMetadata(true);
      setMetadataError(null);

      try {
        const metadataMap = new Map();

        // Load metadata with retry logic
        for (let i = 0; i < images.length; i++) {
          let retries = 3;
          let metadata = null;

          while (retries > 0 && !metadata) {
            try {
              metadata = await extractImageMetadata(images[i]);
              metadataMap.set(i, metadata);
              break;
            } catch (error) {
              retries--;
              if (retries === 0) {
                console.warn(`Failed to load metadata for image ${i} after 3 attempts:`, error);
                // Set fallback metadata
                metadataMap.set(i, {
                  filename: images[i].split('/').pop(),
                  error: error.message,
                  src: images[i]
                });
              } else {
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
          }
        }

        setImageMetadata(metadataMap);
      } catch (error) {
        console.error('Failed to load image metadata:', error);
        setMetadataError(error.message);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    loadMetadata();
  }, [images.length]); // Changed dependency to images.length to prevent infinite loops

  // Retry metadata loading
  const retryMetadata = useCallback(() => {
    setMetadataError(null);
    setIsLoadingMetadata(true);

    const loadMetadata = async () => {
      try {
        const metadataMap = new Map();
        for (let i = 0; i < images.length; i++) {
          const metadata = await extractImageMetadata(images[i]);
          metadataMap.set(i, metadata);
        }
        setImageMetadata(metadataMap);
      } catch (error) {
        setMetadataError(error.message);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    loadMetadata();
  }, [images.length]);

  // Touch gesture handlers for mobile
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        galleryState.goToNext();
      } else {
        galleryState.goToPrevious();
      }
    }

    setTouchStart(null);
  };

  // Get current image metadata
  const currentMetadata = imageMetadata.get(galleryState.currentIndex);

  // Generate alt text for current image
  const currentAltText = useMemo(() => {
    if (activeGallery === 'srm') {
      return `SRM College photo ${galleryState.currentIndex + 1}`;
    }
    if (currentMetadata) {
      return generateAltText(currentMetadata, galleryState.currentIndex);
    }
    return `Gallery photo ${galleryState.currentIndex + 1}`;
  }, [currentMetadata, galleryState.currentIndex, activeGallery]);

  return (
    <ErrorBoundary>
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-title">
            <h2>{activeGallery ? `${activeGallery === 'srm' ? 'SRM College' : 'Marathon'} Gallery` : (content.blogTitle || "Blog")}</h2>
            <div className="underline"></div>
          </div>

          {!activeGallery && (
            <div className="blog-grid">
              {[
                {
                  id: 5,
                  title: "AI + Agriculture: Rover Field Test at Namakkal Farm 🚜",
                  date: "February 12, 2026",
                  summary: "Our Innova8s team, led by CEO Sashiko Dayani, visited a poultry farm in Namakkal for a groundbreaking field test. We are collaborating on an AI-integrated farming initiative, testing our specialized rover's performance in real-world agricultural conditions with the support of the SRM team.",
                  tags: ["AI", "AgriTech", "Rover", "FieldTest", "Innova8s", "Namakkal", "SRM"],
                  image: poultryImages[0],
                  galleryType: 'poultry',
                  photoCount: poultryImages.length
                },
                {
                  id: 4,
                  title: "Continuous Learning at SRM College 🎓",
                  date: "February 14, 2026",
                  summary: "Balancing full-time work with weekend classes has been a rewarding experience. From Research Methodology to Business Analysis, every session adds new perspectives and connecting theory with real-world application. Continuous learning truly keeps the mind growing!",
                  tags: ["SRM", "GreatLearning", "AI", "DataScience", "ResearchMethodology", "BusinessAnalysis"],
                  image: srmImages[0],
                  galleryType: 'srm',
                  photoCount: srmImages.length
                },
                {
                  id: 1,
                  title: "Chennai Marathon — 10KM Done! 🏃‍♂️",
                  date: "February 10, 2026",
                  summary: "Chennai Runners Marathon – yesterday was all about grit, sweat, and perseverance. Finished 10KM in 1 hr 30 mins, starting from Napier Bridge and ending at CPT Ground.",
                  tags: ["Marathon", "Fitness", "Chennai"],
                  image: marathonImages[0],
                  galleryType: 'marathon',
                  photoCount: marathonImages.length
                },
              ].map(post => (
                <article key={post.id} className="blog-card">
                  {post.image && (
                    <div className="blog-card-image">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="blog-card-content">
                    <div className="date">
                      <i className="far fa-calendar-alt"></i> {post.date}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>

                    {post.galleryType && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setActiveGallery(post.galleryType);
                        }}
                        className="btn-blog-gallery"
                        aria-label={`View photos for ${post.title}`}
                      >
                        <span>{post.galleryType === 'srm' ? '📖' : '🏃‍♂️'}</span>
                        View {post.photoCount} Photos
                      </button>
                    )}

                    <div className="blog-tags">
                      {post.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Network status indicator */}
          {!isOnline && (
            <div style={{
              background: '#ff6b6b',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              📡 You're offline. Some images may not load properly.
            </div>
          )}

          <div className="gallery" style={{ position: 'relative' }}>
            {/* Loading overlay for metadata */}
            {isLoadingMetadata && (
              <GalleryLoadingOverlay message="Loading image information..." />
            )}

            {/* Metadata error */}
            {metadataError && (
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                color: '#856404',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>⚠️ Some image information couldn't be loaded</span>
                <button
                  onClick={retryMetadata}
                  style={{
                    background: '#856404',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {activeGallery && (
              images.length > 0 ? (
                <>
                  <div className="gallery-nav-header">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setActiveGallery(null);
                      }}
                      className="btn-back-blog"
                    >
                      ← Back to Blog
                    </button>

                    <h3 className="gallery-title">
                      {images.length} Photos
                    </h3>
                  </div>

                  <div
                    className="featured"
                    onClick={() => galleryState.openLightbox(0)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    aria-label="Open featured image in lightbox"
                  >
                    {imageLoader.getImageState(0) === 'error' ? (
                      <ImageErrorFallback
                        onRetry={() => imageLoader.retryImage(0)}
                        filename={imageMetadata.get(0)?.filename}
                        height="320px"
                      />
                    ) : imageLoader.getImageState(0) === 'loading' ? (
                      <ImagePlaceholder height="320px" text="Loading..." />
                    ) : (
                      <img
                        src={images[0]}
                        alt={activeGallery ? `${activeGallery.charAt(0).toUpperCase() + activeGallery.slice(1)} Featured` : (imageMetadata.get(0) ? generateAltText(imageMetadata.get(0), 0) : "Featured photo")}
                        loading="eager"
                      />
                    )}
                  </div>

                  <div className="thumb-grid">
                    {images.slice(1).map((src, i) => {
                      const imageIndex = i + 1;
                      const metadata = imageMetadata.get(imageIndex);
                      const altText = metadata ? generateAltText(metadata, imageIndex) : `${activeGallery || 'Gallery'} photo ${imageIndex + 1}`;
                      const imageState = imageLoader.getImageState(imageIndex);

                      return (
                        <button
                          key={i}
                          className="thumb-btn"
                          onClick={() => {
                            soundManager.playClick();
                            galleryState.openLightbox(imageIndex);
                          }}
                          aria-label={`Open ${altText}`}
                          title={metadata?.filename || `Image ${imageIndex + 1}`}
                          disabled={imageState === 'loading'}
                        >
                          {imageState === 'error' ? (
                            <ImageErrorFallback
                              onRetry={() => imageLoader.retryImage(imageIndex)}
                              filename={metadata?.filename}
                              showRetry={false}
                            />
                          ) : imageState === 'loading' ? (
                            <ImagePlaceholder text="Loading..." />
                          ) : (
                            <img
                              src={src}
                              alt={altText}
                              loading="lazy"
                              onError={() => {
                                console.error(`Thumbnail ${imageIndex} failed to load:`, src);
                              }}
                            />
                          )}

                          {imageState === 'loading' && (
                            <div className="loading-indicator" aria-hidden="true">
                              Loading...
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : !isOnline ? (
                <NetworkErrorFallback onRetry={() => window.location.reload()} />
              ) : (
                <EmptyGalleryFallback message={`No ${activeGallery} photos found.`} />
              )
            )}
          </div>

          {galleryState.isLightboxOpen && (
            <div
              className="lightbox-overlay"
              onClick={galleryState.closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              aria-describedby="lightbox-description"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
              }}
            >
              {/* Image counter */}
              <div
                id="lightbox-title"
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '500',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  zIndex: 10001
                }}
              >
                {galleryState.currentIndex + 1} of {images.length}
              </div>

              {/* Slideshow controls */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 80,
                  display: 'flex',
                  gap: '10px',
                  zIndex: 10001
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    galleryState.toggleSlideshow();
                  }}
                  aria-label={galleryState.isSlideshow ? "Pause slideshow" : "Start slideshow"}
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.2rem',
                    padding: '8px 12px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  {galleryState.isSlideshow ? '⏸️' : '▶️'}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    galleryState.toggleFullscreen();
                  }}
                  aria-label="Toggle fullscreen"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.2rem',
                    padding: '8px 12px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  ⛶
                </button>
              </div>

              {/* Navigation buttons */}
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  galleryState.goToPrevious();
                }}
                style={{
                  position: 'absolute',
                  left: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  fontSize: 36,
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '50%',
                  zIndex: 10001
                }}
              >
                ‹
              </button>

              {/* Main image container */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  position: 'relative',
                  transform: `scale(${galleryState.zoomLevel}) translate(${galleryState.panPosition.x}px, ${galleryState.panPosition.y}px)`,
                  transition: galleryState.zoomLevel === 1 ? 'transform 0.3s ease' : 'none'
                }}
              >
                <img
                  src={galleryState.currentImage}
                  alt={currentAltText}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 6,
                    display: 'block'
                  }}
                  onDoubleClick={() => {
                    if (galleryState.zoomLevel === 1) {
                      galleryState.setZoom(2);
                    } else {
                      galleryState.resetZoom();
                    }
                  }}
                />

                {/* Image metadata overlay */}
                {currentMetadata && galleryState.preferences.showMetadata && (
                  <div
                    id="lightbox-description"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: '#fff',
                      padding: '20px',
                      borderRadius: '0 0 6px 6px'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                      {currentMetadata.filename}
                    </div>
                    {currentMetadata.captureDate && (
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {formatDate(currentMetadata.captureDate)}
                      </div>
                    )}
                    {currentMetadata.dimensions && (
                      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {currentMetadata.dimensions.width} × {currentMetadata.dimensions.height}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  galleryState.goToNext();
                }}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  fontSize: 36,
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '50%',
                  zIndex: 10001
                }}
              >
                ›
              </button>

              {/* Zoom controls */}
              {galleryState.zoomLevel !== 1 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '8px',
                    borderRadius: '20px',
                    zIndex: 10001
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      galleryState.zoomOut();
                    }}
                    disabled={!galleryState.canZoomOut}
                    aria-label="Zoom out"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      opacity: galleryState.canZoomOut ? 1 : 0.5
                    }}
                  >
                    −
                  </button>

                  <span style={{ color: '#fff', fontSize: '0.9rem', padding: '5px 10px' }}>
                    {Math.round(galleryState.zoomLevel * 100)}%
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      galleryState.zoomIn();
                    }}
                    disabled={!galleryState.canZoomIn}
                    aria-label="Zoom in"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      opacity: galleryState.canZoomIn ? 1 : 0.5
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      galleryState.resetZoom();
                    }}
                    aria-label="Reset zoom"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: '5px 10px'
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}

              <button
                aria-label="Close gallery"
                onClick={galleryState.closeLightbox}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 20,
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  fontSize: 28,
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '50%',
                  zIndex: 10001
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Blog;
