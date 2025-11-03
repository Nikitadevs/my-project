import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ darkMode }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer
      className={`relative py-12 ${
        darkMode
          ? 'bg-gray-800/50 text-white'
          : 'bg-gray-100/50 text-gray-800'
      }`}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 
            ${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 
            ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-400 to-pink-400'}`}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center space-y-8">

          {/* Copyright Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-2"
          >
            <p className="flex items-center justify-center text-base">
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="mx-2 text-red-500"
              >
                <FontAwesomeIcon icon={faHeart} />
              </motion.span>
              <span>by Nikita</span>
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>

          {/* Back to Top Button with liquid effects */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className={`px-6 py-3 rounded-2xl text-sm font-medium flex items-center space-x-2 relative overflow-hidden shadow-lg
              ${darkMode
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-white/10 text-white'
                : 'bg-gradient-to-r from-blue-100/50 to-purple-100/50 border border-gray-200/50 text-gray-800'
              } backdrop-blur-xl`}
          >
            {/* Liquid shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
                transform: 'translateX(-100%)',
              }}
              whileHover={{
                transform: ['translateX(-100%)', 'translateX(100%)'],
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
            
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-0"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10">Back to Top</span>
            <motion.span
              className="relative z-10"
              animate={{ 
                y: [-2, 2, -2],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Footer);
