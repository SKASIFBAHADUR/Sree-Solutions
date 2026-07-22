import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime = null;
                    const start = 0;

                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = currentTime - startTime;

                        // Ease out function (easeOutExpo)
                        const easeOut = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

                        const percentage = Math.min(progress / duration, 1);
                        const easeProgress = easeOut(percentage);

                        const currentCount = Math.floor(start + (end - start) * easeProgress);
                        setCount(currentCount);

                        if (progress < duration) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [end, duration]);

    return (
        <span ref={elementRef}>
            {prefix}{count}{suffix}
        </span>
    );
};

export default CountUp;
