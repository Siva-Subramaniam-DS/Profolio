import React from 'react';

/**
 * Error fallback component for individual image loading failures
 */
const ImageErrorFallback = ({ 
  onRetry, 
  filename, 
  width, 
  height,
  showRetry = true 
}) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '200px',
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
      }}
      role="img"
      aria-label={`Failed to load image: ${filename || 'Unknown'}`}
    >
      <div
        style={{
          fontSize: '2rem',
          color: 'var(--text-secondary)',
          marginBottom: '10px'
        }}
        aria-hidden="true"
      >
        🖼️
      </div>
      
      <p 
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: showRetry ? '15px' : '0',
          lineHeight: 1.4
        }}
      >
        Failed to load image
        {filename && (
          <>
            <br />
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              {filename}
            </span>
          </>
        )}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'var(--secondary-color)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'var(--primary-color)';
          }}
          aria-label={`Retry loading ${filename || 'image'}`}
        >
          Retry
        </button>
      )}
    </div>
  );
};

/**
 * Network error component for offline scenarios
 */
export const NetworkErrorFallback = ({ onRetry }) => {
  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        background: 'var(--surface-color)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        margin: '20px 0'
      }}
    >
      <div
        style={{
          fontSize: '3rem',
          marginBottom: '15px'
        }}
        aria-hidden="true"
      >
        📡
      </div>
      
      <h3 style={{ color: 'var(--text-color)', marginBottom: '10px' }}>
        Connection Error
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Unable to load images. Please check your internet connection and try again.
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary"
          style={{ fontSize: '0.9rem', padding: '10px 20px' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

/**
 * Empty gallery fallback component
 */
export const EmptyGalleryFallback = ({ message }) => {
  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center',
        background: 'var(--surface-color)',
        borderRadius: '10px',
        border: '1px dashed var(--border-color)',
        margin: '20px 0'
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '20px',
          opacity: 0.5
        }}
        aria-hidden="true"
      >
        📷
      </div>
      
      <h3 style={{ color: 'var(--text-color)', marginBottom: '10px' }}>
        No Images Found
      </h3>
      
      <p style={{ color: 'var(--text-secondary)' }}>
        {message || 'Add images to the Marathon folder to see them here.'}
      </p>
    </div>
  );
};

export default ImageErrorFallback;