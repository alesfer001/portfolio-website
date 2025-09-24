import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className = '', placeholder, fallback }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const renderPlaceholder = () => (
    <div className={`${className} bg-gray-700 animate-pulse flex items-center justify-center`}>
      {placeholder || (
        <div className="text-gray-500">
          <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      )}
    </div>
  );

  const renderFallback = () => (
    <div className={`${className} bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center`}>
      {fallback || (
        <div className="text-center text-gray-400">
          <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-2">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {!isInView && renderPlaceholder()}
      
      {isInView && !hasError && (
        <>
          {!isLoaded && renderPlaceholder()}
          <motion.img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      
      {hasError && renderFallback()}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.node,
  fallback: PropTypes.node
};

export default LazyImage;