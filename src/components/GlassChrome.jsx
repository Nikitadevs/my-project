import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import GlassEdge from './GlassEdge';

export const GlassDotGrid = ({ darkMode, className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 ${
      darkMode
        ? 'opacity-[0.2] [background-image:radial-gradient(rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:22px_22px]'
        : 'opacity-[0.16] [background-image:radial-gradient(rgba(100,116,139,0.18)_1px,transparent_1px)] [background-size:22px_22px]'
    } ${className}`}
    aria-hidden="true"
  />
);

GlassDotGrid.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export const GlassSpecular = ({ darkMode, className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{
      background: darkMode
        ? 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 38%, transparent 62%, rgba(59,130,246,0.04) 100%)'
        : 'linear-gradient(145deg, rgba(255,255,255,0.55) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.12) 100%)',
    }}
    aria-hidden="true"
  />
);

GlassSpecular.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export const GlassBlooms = ({ darkMode, animate = false, className = '' }) => (
  <>
    <div
      className={`pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
        darkMode ? 'bg-blue-500/12' : 'bg-blue-400/20'
      } ${className}`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute -bottom-20 -right-16 h-44 w-44 rounded-full blur-3xl ${
        darkMode ? 'bg-purple-500/10' : 'bg-purple-400/16'
      } ${className}`}
      aria-hidden="true"
    />
    {animate && (
      <motion.div
        className={`pointer-events-none absolute right-[18%] top-[20%] h-20 w-20 rounded-full blur-2xl ${
          darkMode ? 'bg-cyan-400/10' : 'bg-cyan-300/18'
        }`}
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    )}
  </>
);

GlassBlooms.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export const GlassEdges = ({ darkMode, topEdge, inset = 'inset-x-10' }) => {
  const edgeStyle = topEdge
    ? { background: topEdge }
    : undefined;

  return (
  <>
    <GlassEdge darkMode={darkMode} inset={inset} style={edgeStyle} />
    <GlassEdge darkMode={darkMode} position="bottom" inset={inset} style={edgeStyle} />
    {!darkMode && (
      <div
        className={`pointer-events-none absolute ${inset} top-0 z-[2] h-px opacity-60`}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)' }}
        aria-hidden="true"
      />
    )}
  </>
  );
};

GlassEdges.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  topEdge: PropTypes.string,
  inset: PropTypes.string,
};
