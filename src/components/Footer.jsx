import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ darkMode }) => {

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

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center space-x-2
              ${darkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-800'
              } backdrop-blur-sm`}
          >
            <span>Back to Top</span>
            <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
