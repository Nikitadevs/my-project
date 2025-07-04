import React from 'react';
import { motion } from 'framer-motion';

const Card3D = ({ children, darkMode, className = '' }) => {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className} ${
        darkMode
          ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/50'
          : 'bg-white/80 backdrop-blur-xl border border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {/* Gradient border effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: darkMode
            ? 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)'
            : 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)'
        }}
      />

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D; 