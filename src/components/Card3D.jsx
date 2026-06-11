import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const POINTER_SPRING = { stiffness: 260, damping: 32 };

const Card3D = ({ children, className = '', darkMode = false, disabled = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const interactive = !disabled && !prefersReducedMotion;
  const [shimmerKey, setShimmerKey] = useState(0);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const springX = useSpring(pointerX, POINTER_SPRING);
  const springY = useSpring(pointerY, POINTER_SPRING);

  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);

  const glowInner = darkMode ? 'rgba(59, 130, 246, 0.34)' : 'rgba(59, 130, 246, 0.24)';
  const glowOuter = darkMode ? 'rgba(168, 85, 247, 0.12)' : 'rgba(59, 130, 246, 0.08)';
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${glowInner}, ${glowOuter}, transparent 68%)`;

  const borderAngle = useTransform(springX, [0, 1], [130, 490]);
  const borderBackground = useMotionTemplate`linear-gradient(${borderAngle}deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.42), rgba(236, 72, 153, 0.38), rgba(59, 130, 246, 0.5))`;

  const glowOpacity = useTransform(hover, [0, 1], [0.12, 0.82]);
  const borderOpacity = useTransform(hover, [0, 1], [0.1, 0.52]);
  const shimmerOpacity = useTransform(hover, [0, 0.08, 1], [0, 0, 0.9]);

  const handleMouseMove = useCallback((e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }, [interactive, pointerX, pointerY]);

  const activate = useCallback(() => {
    if (!interactive) return;
    hover.set(1);
    setShimmerKey((k) => k + 1);
  }, [interactive, hover]);

  const resetPointer = useCallback(() => {
    hover.set(0);
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [hover, pointerX, pointerY]);

  const topHighlight = darkMode
    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.88), transparent)';

  const shimmer = darkMode
    ? 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.1) 45%, transparent 70%)'
    : 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 45%, transparent 70%)';

  return (
    <motion.div
      className={`group/card relative overflow-hidden rounded-[inherit] ${
        darkMode ? 'liquid-glass-dark' : 'liquid-glass'
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={activate}
      onMouseLeave={resetPointer}
      onFocusCapture={activate}
      onBlurCapture={resetPointer}
      whileHover={interactive ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.996 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        style={{ background: topHighlight }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: glowBackground, opacity: glowOpacity }}
      />

      {interactive && (
        <motion.div
          key={shimmerKey}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: shimmer, opacity: shimmerOpacity }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      )}

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: 'inherit',
          background: borderBackground,
          opacity: borderOpacity,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-8 ${
          darkMode
            ? 'bg-gradient-to-t from-slate-950/20 to-transparent'
            : 'bg-gradient-to-t from-slate-900/[0.03] to-transparent'
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

Card3D.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(Card3D);
