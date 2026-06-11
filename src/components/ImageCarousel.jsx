import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useReducedMotion from '../hooks/useReducedMotion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const transition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const ImageCarousel = ({ images, darkMode = false }) => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const imageCount = images.length;
  const carouselRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const paginate = useCallback(
    (newDirection) => {
      setCurrent(([prevCurrent]) => [
        (prevCurrent + newDirection + imageCount) % imageCount,
        newDirection,
      ]);
    },
    [imageCount],
  );

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      else if (e.key === 'ArrowRight') paginate(1);
    };

    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const navBtnClass = darkMode
    ? 'liquid-glass-chip-dark text-slate-200 hover:text-white'
    : 'liquid-glass-chip text-slate-700 hover:text-slate-900';

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden rounded-[var(--radius-glass-lg)] ${
        darkMode ? 'liquid-glass-dark' : 'liquid-glass'
      }`}
      tabIndex="0"
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Screenshot ${current + 1} of ${images.length}`}
          className="h-60 w-full object-cover sm:h-80"
          loading="lazy"
          custom={direction}
          variants={prefersReducedMotion ? undefined : variants}
          initial={prefersReducedMotion ? false : 'enter'}
          animate="center"
          exit={prefersReducedMotion ? undefined : 'exit'}
          transition={prefersReducedMotion ? undefined : transition}
        />
      </AnimatePresence>

      {imageCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            className={`absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${navBtnClass}`}
            aria-label="Previous image"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${navBtnClass}`}
            aria-label="Next image"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>

          <div
            className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5"
            role="tablist"
            aria-label="Carousel slides"
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrent([index, index > current ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  index === current
                    ? `w-6 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`
                    : `w-1.5 ${darkMode ? 'bg-white/30' : 'bg-slate-900/25'}`
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  darkMode: PropTypes.bool,
};

export default React.memo(ImageCarousel);
