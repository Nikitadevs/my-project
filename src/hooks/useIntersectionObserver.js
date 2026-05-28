import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for observing element intersection with viewport
 * More performant than scroll event listeners for scroll-triggered animations
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (0-1) when callback triggers
 * @param {string} options.rootMargin - Margin around root (e.g., "0px 0px -100px 0px")
 * @param {boolean} options.triggerOnce - Only trigger once when element enters viewport
 * 
 * @returns {[React.Ref, boolean]} Tuple of [ref to attach to element, isIntersecting flag]
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });
 * 
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0 }}
 *   animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
 * />
 */
const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    // Check if IntersectionObserver is supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Fallback: assume element is visible
      setIsIntersecting(true);
      return;
    }

    // If triggerOnce and already triggered, don't observe
    if (triggerOnce && hasTriggered) {
      return;
    }

    const observerCallback = (entries) => {
      const [entry] = entries;
      const isCurrentlyIntersecting = entry.isIntersecting;
      
      setIsIntersecting(isCurrentlyIntersecting);
      
      if (triggerOnce && isCurrentlyIntersecting) {
        setHasTriggered(true);
      }
    };

    const observerOptions = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(element);

    // Cleanup
    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;
