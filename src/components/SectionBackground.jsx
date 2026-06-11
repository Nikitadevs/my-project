import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const SectionBackground = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${
          darkMode
            ? 'bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20'
            : 'bg-gradient-to-br from-slate-100/50 via-transparent to-purple-100/35'
        }`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-gradient-to-b from-blue-500/[0.04] via-transparent to-purple-500/[0.04]'
            : 'bg-gradient-to-b from-blue-100/35 via-transparent to-purple-100/25'
        }`}
      />
      <div
        className={`absolute inset-0 ${darkMode ? 'liquid-glass-wash-dark' : 'liquid-glass-wash'}`}
      />
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'opacity-[0.14] [background-image:radial-gradient(rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px]'
            : 'opacity-[0.1] [background-image:radial-gradient(rgba(100,116,139,0.16)_1px,transparent_1px)] [background-size:24px_24px]'
        }`}
        aria-hidden="true"
      />

      <motion.div
        className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-500/12' : 'bg-blue-300/35'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`absolute bottom-40 -left-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/12' : 'bg-purple-300/30'
        }`}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] ${
          darkMode ? 'bg-indigo-500/[0.06]' : 'bg-indigo-200/25'
        }`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

SectionBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(SectionBackground);
