// Shared animation variants for consistent animations across components
// Reduces code duplication and ensures consistent UX

/**
 * Container variants with staggered children animation
 * @param {number} staggerDelay - Delay between child animations (default: 0.2)
 */
export const containerVariants = (staggerDelay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

/**
 * Item variants for fade in with slide up effect
 * @param {number} duration - Animation duration (default: 0.5)
 */
export const itemVariants = (duration = 0.5) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: "easeOut",
    },
  },
});

/**
 * Button variants for hover and tap interactions
 */
export const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Floating animation for decorative elements
 * @param {number} distance - Float distance in pixels (default: 10)
 * @param {number} duration - Animation duration in seconds (default: 2)
 */
export const floatingVariants = (distance = 10, duration = 2) => ({
  animate: {
    y: [0, -distance, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

/**
 * Pulsing animation for attention-grabbing elements
 * @param {number} scale - Scale factor (default: 1.05)
 * @param {number} duration - Animation duration in seconds (default: 2)
 */
export const pulsingVariants = (scale = 1.05, duration = 2) => ({
  animate: {
    scale: [1, scale, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

/**
 * Fade in animation
 * @param {number} duration - Animation duration (default: 0.6)
 */
export const fadeInVariants = (duration = 0.6) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration },
  },
});

/**
 * Scale in animation
 * @param {number} duration - Animation duration (default: 0.4)
 */
export const scaleInVariants = (duration = 0.4) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
});

/**
 * Slide in from direction
 * @param {string} direction - 'left', 'right', 'top', 'bottom'
 * @param {number} distance - Slide distance in pixels (default: 30)
 */
export const slideInVariants = (direction = 'bottom', distance = 30) => {
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Stagger animation for list items
 * @param {number} index - Item index for delay calculation
 * @param {number} staggerDelay - Delay multiplier (default: 0.1)
 */
export const staggerItemVariants = (index, staggerDelay = 0.1) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * staggerDelay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});
