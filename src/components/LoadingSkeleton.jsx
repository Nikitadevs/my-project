import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useReducedMotion from '../hooks/useReducedMotion';

const VARIANT_STYLES = {
  text: { height: 16, width: '100%', borderRadius: '10px' },
  rect: { height: 100, width: '100%', borderRadius: '20px' },
  circle: { height: 48, width: 48, borderRadius: '9999px' },
  card: { height: 200, width: '100%', borderRadius: '24px' },
  chip: { height: 28, width: 72, borderRadius: '9999px' },
};

const glassClasses = (darkMode) =>
  darkMode
    ? 'border border-white/[0.06] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
    : 'border border-slate-200/90 bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]';

const SkeletonBone = ({
  darkMode,
  variant,
  width,
  height,
  className = '',
  delay = 0,
  animate = true,
}) => {
  const base = VARIANT_STYLES[variant] ?? VARIANT_STYLES.text;
  const size = {
    ...base,
    ...(width != null ? { width } : {}),
    ...(height != null ? { height } : {}),
  };

  return (
    <div
      className={`relative overflow-hidden backdrop-blur-[2px] ${glassClasses(darkMode)} ${className}`}
      style={size}
      aria-hidden="true"
    >
      {animate && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.14) 42%, rgba(168,85,247,0.12) 58%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 42%, rgba(59,130,246,0.1) 58%, transparent 100%)',
          }}
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'linear',
            delay,
          }}
        />
      )}
    </div>
  );
};

SkeletonBone.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  className: PropTypes.string,
  delay: PropTypes.number,
  animate: PropTypes.bool,
};

const LoadingSkeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  darkMode = false,
  className = '',
  gap = 12,
  wrapperClassName = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const bones = Array.from({ length: count }, (_, index) => (
    <SkeletonBone
      key={index}
      darkMode={darkMode}
      variant={variant}
      width={width}
      height={height}
      className={className}
      delay={index * 0.12}
      animate={shouldAnimate}
    />
  ));

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={wrapperClassName}
      style={{ display: 'flex', flexDirection: 'column', gap }}
    >
      <span className="sr-only">Loading content</span>
      {bones}
    </div>
  );
};

LoadingSkeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rect', 'circle', 'card', 'chip']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  count: PropTypes.number,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  gap: PropTypes.number,
  wrapperClassName: PropTypes.string,
};

export const SkeletonLayouts = {
  Card: ({ darkMode = false }) => (
    <div className={`space-y-4 p-5 md:p-6 ${darkMode ? 'liquid-glass-dark' : 'liquid-glass'}`}>
      <LoadingSkeleton variant="rect" height={180} darkMode={darkMode} />
      <LoadingSkeleton variant="text" width="78%" height={18} darkMode={darkMode} />
      <LoadingSkeleton variant="text" count={2} darkMode={darkMode} gap={10} />
    </div>
  ),

  Profile: ({ darkMode = false }) => (
    <div className={`flex items-start gap-4 p-5 ${darkMode ? 'liquid-glass-dark' : 'liquid-glass'}`}>
      <LoadingSkeleton variant="circle" height={64} width={64} darkMode={darkMode} />
      <div className="flex-1">
        <LoadingSkeleton variant="text" width="42%" height={18} darkMode={darkMode} />
        <LoadingSkeleton variant="text" count={2} darkMode={darkMode} gap={10} wrapperClassName="mt-3" />
      </div>
    </div>
  ),

  List: ({ count = 3, darkMode = false }) => (
    <div className={`space-y-3 p-4 ${darkMode ? 'liquid-glass-dark' : 'liquid-glass'}`}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center gap-3">
          <LoadingSkeleton variant="circle" height={40} width={40} darkMode={darkMode} />
          <div className="flex-1">
            <LoadingSkeleton variant="text" width="72%" darkMode={darkMode} />
            <LoadingSkeleton
              variant="text"
              width="46%"
              darkMode={darkMode}
              wrapperClassName="mt-2"
            />
          </div>
        </div>
      ))}
    </div>
  ),

  ProjectCard: ({ darkMode = false }) => (
    <div className={`overflow-hidden rounded-[var(--radius-glass-lg)] ${darkMode ? 'liquid-glass-dark' : 'liquid-glass'}`}>
      <LoadingSkeleton
        variant="rect"
        height={192}
        darkMode={darkMode}
        className="rounded-t-[var(--radius-glass-lg)] border-x-0 border-t-0"
      />
      <div className="space-y-3 p-5 md:p-6">
        <LoadingSkeleton variant="text" width="68%" height={20} darkMode={darkMode} />
        <LoadingSkeleton variant="text" count={2} darkMode={darkMode} gap={10} />
        <div className="flex flex-wrap gap-2 pt-1">
          <LoadingSkeleton variant="chip" width={64} darkMode={darkMode} />
          <LoadingSkeleton variant="chip" width={56} darkMode={darkMode} />
          <LoadingSkeleton variant="chip" width={72} darkMode={darkMode} />
        </div>
        <div className="flex gap-2 pt-2">
          <LoadingSkeleton variant="text" width={88} height={36} darkMode={darkMode} className="rounded-xl" />
          <LoadingSkeleton variant="text" width={88} height={36} darkMode={darkMode} className="rounded-xl" />
        </div>
      </div>
    </div>
  ),

  ProjectGrid: ({ count = 3, darkMode = false }) => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonLayouts.ProjectCard key={index} darkMode={darkMode} />
      ))}
    </div>
  ),
};

SkeletonLayouts.Card.propTypes = { darkMode: PropTypes.bool };
SkeletonLayouts.Profile.propTypes = { darkMode: PropTypes.bool };
SkeletonLayouts.List.propTypes = { count: PropTypes.number, darkMode: PropTypes.bool };
SkeletonLayouts.ProjectCard.propTypes = { darkMode: PropTypes.bool };
SkeletonLayouts.ProjectGrid.propTypes = { count: PropTypes.number, darkMode: PropTypes.bool };

export default React.memo(LoadingSkeleton);
