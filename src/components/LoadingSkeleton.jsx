import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Loading skeleton component for better perceived performance
 * Shows placeholder content while data is loading
 * 
 * @component
 * @param {Object} props
 * @param {string} props.variant - Skeleton variant: 'text', 'rect', 'circle', 'card'
 * @param {number} props.width - Width in pixels or percentage string
 * @param {number} props.height - Height in pixels  
 * @param {number} props.count - Number of skeleton items to show
 * @param {boolean} props.darkMode - Dark mode flag
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSkeleton = ({
    variant = 'text',
    width,
    height,
    count = 1,
    darkMode = false,
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion();

    const shimmerVariants = {
        initial: { backgroundPosition: '-200% 0' },
        animate: {
            backgroundPosition: '200% 0',
            transition: {
                duration: prefersReducedMotion ? 0 : 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'linear',
            },
        },
    };

    const baseClasses = `
    ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}
    ${prefersReducedMotion ? '' : 'animate-pulse'}
    rounded
  `;

    const shimmerStyle = prefersReducedMotion
        ? {}
        : {
            backgroundImage: darkMode
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            backgroundSize: '200% 100%',
        };

    const variantStyles = {
        text: {
            height: height || 16,
            width: width || '100%',
            borderRadius: '4px',
        },
        rect: {
            height: height || 100,
            width: width || '100%',
            borderRadius: '8px',
        },
        circle: {
            height: height || 48,
            width: width || 48,
            borderRadius: '50%',
        },
        card: {
            height: height || 200,
            width: width || '100%',
            borderRadius: '12px',
        },
    };

    const style = {
        ...variantStyles[variant],
        ...shimmerStyle,
    };

    const skeletons = Array.from({ length: count }, (_, index) => (
        <motion.div
            key={index}
            className={`${baseClasses} ${className}`}
            style={style}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            aria-busy="true"
            aria-label="Loading..."
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </motion.div>
    ));

    return (
        <div className="space-y-3">
            {skeletons}
        </div>
    );
};

LoadingSkeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'rect', 'circle', 'card']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number,
    count: PropTypes.number,
    darkMode: PropTypes.bool,
    className: PropTypes.string,
};

/**
 * Preset skeleton layouts for common use cases
 */
export const SkeletonLayouts = {
    /**
     * Card skeleton with image and text
     */
    Card: ({ darkMode }) => (
        <div className="space-y-4">
            <LoadingSkeleton variant="rect" height={200} darkMode={darkMode} />
            <LoadingSkeleton variant="text" width="80%" darkMode={darkMode} />
            <LoadingSkeleton variant="text" width="60%" darkMode={darkMode} />
        </div>
    ),

    /**
     * Profile skeleton with avatar and text
     */
    Profile: ({ darkMode }) => (
        <div className="flex items-start gap-4">
            <LoadingSkeleton variant="circle" height={64} width={64} darkMode={darkMode} />
            <div className="flex-1 space-y-3">
                <LoadingSkeleton variant="text" width="40%" darkMode={darkMode} />
                <LoadingSkeleton variant="text" width="80%" darkMode={darkMode} />
                <LoadingSkeleton variant="text" width="60%" darkMode={darkMode} />
            </div>
        </div>
    ),

    /**
     * List skeleton with multiple items
     */
    List: ({ count = 3, darkMode }) => (
        <div className="space-y-4">
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                    <LoadingSkeleton variant="circle" height={40} width={40} darkMode={darkMode} />
                    <div className="flex-1 space-y-2">
                        <LoadingSkeleton variant="text" width="70%" darkMode={darkMode} />
                        <LoadingSkeleton variant="text" width="40%" darkMode={darkMode} />
                    </div>
                </div>
            ))}
        </div>
    ),
};

export default LoadingSkeleton;
