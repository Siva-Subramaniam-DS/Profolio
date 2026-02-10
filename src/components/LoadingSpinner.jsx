import React from 'react';

/**
 * Loading spinner component for gallery loading states
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'var(--primary-color)', 
  message = 'Loading...',
  showMessage = true 
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div
        className="loading-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%'
        }}
      />
      
      {showMessage && (
        <p 
          style={{
            marginTop: '10px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * Image loading placeholder component
 */
export const ImagePlaceholder = ({ width, height, text = 'Loading image...' }) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '200px',
        background: 'var(--surface-color)',
        border: '1px dashed var(--border-color)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      role="img"
      aria-label={text}
    >
      <LoadingSpinner size="small" showMessage={false} />
      <span 
        style={{
          position: 'absolute',
          bottom: '10px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}
      >
        {text}
      </span>
    </div>
  );
};

/**
 * Gallery loading overlay component
 */
export const GalleryLoadingOverlay = ({ message = 'Loading gallery...' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        borderRadius: '10px'
      }}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner message={message} />
    </div>
  );
};

export default LoadingSpinner;