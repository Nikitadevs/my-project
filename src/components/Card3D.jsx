import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card3D = ({ children, className = '', darkMode = false, disabled = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const content = (
    <motion.div
      className={`rounded-2xl overflow-hidden relative ${className} ${
        darkMode
          ? 'bg-gray-800/30 backdrop-blur-xl'
          : 'bg-white/40 backdrop-blur-xl shadow-2xl'
      }`}
      style={{
        border: darkMode 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: darkMode
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      whileHover={!disabled ? {
        scale: 1.02,
        y: -5,
        rotateX: (mousePosition.y - 0.5) * 10,
        rotateY: (mousePosition.x - 0.5) * 10,
        transition: {
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Liquid gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        animate={{
          opacity: isHovered ? [0, 0.3, 0] : 0,
          background: [
            `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(147, 51, 234, 0.3), transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
          ],
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
          transform: 'translateX(-100%)',
        }}
        animate={isHovered ? {
          transform: ['translateX(-100%)', 'translateX(100%)'],
        } : {}}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `linear-gradient(${mousePosition.x * 360}deg, 
            rgba(59, 130, 246, 0.5), 
            rgba(147, 51, 234, 0.5), 
            rgba(236, 72, 153, 0.5))`,
          opacity: 0,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );

  return content;
};

Card3D.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(Card3D); 