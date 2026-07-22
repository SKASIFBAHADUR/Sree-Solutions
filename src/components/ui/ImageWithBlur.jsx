import React, { useState } from 'react';

const ImageWithBlur = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // If a very low-res base64 is not provided, we can simulate blur using CSS scaling and filters.
  // In a real app we'd pass a placeholder prop. For now, it will use a blurred background state until load.
  
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Placeholder that fades out once the actual image loads */}
      <div 
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-700 ease-in-out z-0 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      ></div>
      
      {/* The main image */}
      <img
        src={src}
        alt={alt}
        loading={loading} // lazy load by default
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
          isLoaded ? 'blur-0 opacity-100' : 'blur-md opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default ImageWithBlur;
