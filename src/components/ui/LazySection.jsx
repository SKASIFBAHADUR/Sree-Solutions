import React, { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, threshold = 0.05, className = '', minHeight = '50vh' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Save a reference to the current DOM node
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    // Use IntersectionObserver to wait for the element to come into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When it interacts with the viewport (or slightly before based on rootMargin)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, stop observing to prevent extra renders
        }
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before the element enters the screen
        threshold: threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div 
      ref={sectionRef} 
      className={`w-full ${className}`} 
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? (
        <div className="w-full animate-fade-in-up duration-700">
          {children}
        </div>
      ) : (
        // Provide a lightweight skeleton or transparent block
        <div className="w-full h-full flex items-center justify-center opacity-0"></div>
      )}
    </div>
  );
};

export default LazySection;
