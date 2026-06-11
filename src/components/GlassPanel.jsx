import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { GlassBlooms, GlassDotGrid, GlassEdges, GlassSpecular } from './GlassChrome';

const DESKTOP_MQ = '(min-width: 1024px)';
const GLOW_SPRING = { stiffness: 200, damping: 28 };

const GlassPanel = ({
  children,
  className = '',
  darkMode,
  prefersReducedMotion,
  panelClass,
  topEdge,
  wash,
  edgeInset = 'inset-x-10',
  scrollable = false,
}) => {
  const panelRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, GLOW_SPRING);
  const springY = useSpring(mouseY, GLOW_SPRING);
  const interactive = !prefersReducedMotion && isDesktop;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);
  const glowBlue = useMotionTemplate`radial-gradient(circle 420px at ${glowX} ${glowY}, ${
    darkMode ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.14)'
  }, transparent 68%)`;
  const glowPurple = useMotionTemplate`radial-gradient(circle 320px at ${glowX} ${glowY}, ${
    darkMode ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.09)'
  }, transparent 72%)`;

  const handleMove = useCallback((e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={panelRef}
      className={`relative w-full ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'} ${panelClass} ${className}`}
      onMouseMove={interactive ? handleMove : undefined}
      onMouseLeave={interactive ? handleLeave : undefined}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: wash }} aria-hidden="true" />
      <GlassBlooms darkMode={darkMode} animate={interactive} />
      <GlassDotGrid darkMode={darkMode} />
      <GlassSpecular darkMode={darkMode} />

      {interactive && (
        <>
          <motion.div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: glowBlue }} aria-hidden="true" />
          <motion.div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: glowPurple }} aria-hidden="true" />
        </>
      )}

      <GlassEdges darkMode={darkMode} topEdge={topEdge} inset={edgeInset} />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

GlassPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  darkMode: PropTypes.bool.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
  panelClass: PropTypes.string.isRequired,
  topEdge: PropTypes.string.isRequired,
  wash: PropTypes.string.isRequired,
  edgeInset: PropTypes.string,
  scrollable: PropTypes.bool,
};

export default React.memo(GlassPanel);
