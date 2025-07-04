import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card3D = ({ children, className = '', darkMode = false, disabled = false }) => {
  const content = (
    <motion.div
      className={`rounded-2xl overflow-hidden ${className} ${
        darkMode
          ? 'bg-gray-800/50 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm shadow-lg'
      }`}
      whileHover={!disabled ? {
        scale: 1.01,
        y: -3,
        transition: {
          duration: 0.2,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
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