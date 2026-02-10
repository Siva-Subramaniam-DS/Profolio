/**
 * Utility functions for image processing and optimization
 */

/**
 * Extract metadata from image file
 * @param {string} imageSrc - Image source URL
 * @returns {Promise<Object>} Image metadata
 */
export const extractImageMetadata = async (imageSrc) => {
  try {
    // Extract filename from path
    const filename = imageSrc.split('/').pop().split('?')[0];
    
    // Create image element to get dimensions
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        const metadata = {
          filename,
          dimensions: {
            width: img.naturalWidth,
            height: img.naturalHeight
          },
          aspectRatio: img.naturalWidth / img.naturalHeight,
          src: imageSrc
        };

        // Try to extract date from filename if it follows common patterns
        const dateMatch = filename.match(/(\d{4}[-_]\d{2}[-_]\d{2})/);
        if (dateMatch) {
          const dateStr = dateMatch[1].replace(/_/g, '-');
          metadata.captureDate = new Date(dateStr);
        }

        // Extract additional info from WhatsApp image pattern
        const whatsappMatch = filename.match(/WhatsApp Image (\d{4}-\d{2}-\d{2}) at (\d{2}\.\d{2}\.\d{2})/);
        if (whatsappMatch) {
          const [, date, time] = whatsappMatch;
          const timeFormatted = time.replace(/\./g, ':');
          metadata.captureDate = new Date(`${date}T${timeFormatted}`);
          metadata.source = 'WhatsApp';
        }

        // Extract from photo pattern
        const photoMatch = filename.match(/photo_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/);
        if (photoMatch) {
          const [, date, time] = photoMatch;
          const timeFormatted = time.replace(/-/g, ':');
          metadata.captureDate = new Date(`${date}T${timeFormatted}`);
        }

        resolve(metadata);
      };

      img.onerror = () => {
        resolve({
          filename,
          error: 'Failed to load image',
          src: imageSrc
        });
      };

      img.src = imageSrc;
    });
  } catch (error) {
    return {
      filename: imageSrc.split('/').pop(),
      error: error.message,
      src: imageSrc
    };
  }
};

/**
 * Generate optimized image URLs for different sizes
 * @param {string} originalSrc - Original image source
 * @param {Object} options - Optimization options
 * @returns {Object} Optimized image URLs
 */
export const generateOptimizedImages = (originalSrc, options = {}) => {
  const {
    thumbnailWidth = 150,
    mediumWidth = 600,
    quality = 80
  } = options;

  // For now, return the original source since we don't have a backend image service
  // In a real application, this would generate different sized versions
  return {
    thumbnail: originalSrc,
    medium: originalSrc,
    full: originalSrc,
    original: originalSrc
  };
};

/**
 * Check if WebP format is supported
 * @returns {boolean} WebP support status
 */
export const supportsWebP = () => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch (error) {
    return false;
  }
};

/**
 * Get appropriate image format based on browser support
 * @param {string} originalSrc - Original image source
 * @returns {string} Optimized image source
 */
export const getOptimizedImageSrc = (originalSrc) => {
  // For static assets, return as-is
  // In a real application, this would check for WebP versions
  return originalSrc;
};

/**
 * Preload image
 * @param {string} src - Image source to preload
 * @returns {Promise<HTMLImageElement>} Loaded image element
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Calculate responsive image sizes
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @param {number} imageAspectRatio - Image aspect ratio
 * @returns {Object} Calculated dimensions
 */
export const calculateResponsiveSize = (containerWidth, containerHeight, imageAspectRatio) => {
  const containerAspectRatio = containerWidth / containerHeight;
  
  let width, height;
  
  if (imageAspectRatio > containerAspectRatio) {
    // Image is wider than container
    width = containerWidth;
    height = containerWidth / imageAspectRatio;
  } else {
    // Image is taller than container
    height = containerHeight;
    width = containerHeight * imageAspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height),
    scale: Math.min(containerWidth / width, containerHeight / height)
  };
};

/**
 * Generate placeholder image data URL
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @param {string} text - Placeholder text
 * @param {string} backgroundColor - Background color
 * @returns {string} Data URL for placeholder
 */
export const generatePlaceholder = (width = 400, height = 300, text = 'Loading...', backgroundColor = '#f0f0f0') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date || !(date instanceof Date)) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Get image alt text based on metadata
 * @param {Object} metadata - Image metadata
 * @param {number} index - Image index
 * @returns {string} Alt text for accessibility
 */
export const generateAltText = (metadata, index) => {
  if (metadata.customDescription) {
    return metadata.customDescription;
  }
  
  let altText = `Marathon photo ${index + 1}`;
  
  if (metadata.captureDate) {
    const dateStr = formatDate(metadata.captureDate);
    altText += ` taken on ${dateStr}`;
  }
  
  if (metadata.source) {
    altText += ` from ${metadata.source}`;
  }
  
  return altText;
};