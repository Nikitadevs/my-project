// ProjectModal.jsx
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExternalLinkAlt,
  faCode,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from './ImageCarousel';
import useFocusTrap from './useFocusTrap';

const ProjectModal = ({ project, isOpen = false, onClose, darkMode = false }) => {
  const modalRef = useRef(null);
  const { title, description, images = [], technologies = [], liveLink, codeLink } = project || {};
  useFocusTrap(modalRef, isOpen);

  // Guard against undefined project
  if (!project) return null;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto
                ${darkMode
                  ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 text-white'
                  : 'bg-gradient-to-br from-white/95 via-blue-50/95 to-blue-100/95 text-gray-900'}
                backdrop-blur-xl shadow-2xl border ${
                  darkMode ? 'border-blue-500/20' : 'border-blue-200/40'
                }`}
            >
              {/* Close Button */}
              <motion.button
                className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors duration-300
                  ${darkMode
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </motion.button>

              {/* Content */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="p-6 sm:p-8"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                  {title}
                </h2>

                {/* Image Carousel */}
                {images && images.length > 0 && (
                  <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
                    <ImageCarousel images={images} darkMode={darkMode} />
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className={`text-lg leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {description}
                  </p>
                </div>

                {/* Technologies */}
                {technologies && technologies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className={`text-sm font-semibold px-3 py-1 rounded-full 
                            ${darkMode
                              ? 'bg-blue-600/30 text-blue-200 border border-blue-500/30'
                              : 'bg-blue-100/80 text-blue-800 border border-blue-200/50'} 
                            backdrop-blur-sm transition-colors duration-300`}
                          whileHover={{ scale: 1.05, backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {liveLink && (
                    <motion.a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold transition-colors duration-300
                        ${darkMode
                          ? 'bg-white text-gray-900 hover:bg-gray-100'
                          : 'bg-gray-900 text-white hover:bg-gray-800'}
                        shadow-lg hover:shadow-xl`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                      View Live Demo
                    </motion.a>
                  )}

                  {codeLink && (
                    <motion.a
                      href={codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold transition-colors duration-300
                        ${darkMode
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'}
                        backdrop-blur-sm`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faCode} className="mr-2" />
                      View Source Code
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    liveLink: PropTypes.string,
    codeLink: PropTypes.string,
    links: PropTypes.shape({
      live: PropTypes.string,
      github: PropTypes.string,
    }),
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default React.memo(ProjectModal);
