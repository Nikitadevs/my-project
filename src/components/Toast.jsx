import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import useReducedMotion from '../hooks/useReducedMotion';

const Toast = ({
  show = false,
  onClose,
  type = 'info',
  message,
  duration = 5000,
  position = 'top-right',
  darkMode = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const toastConfig = {
    success: {
      icon: faCheckCircle,
      accent: 'text-emerald-500',
      ring: darkMode ? 'ring-emerald-400/25' : 'ring-emerald-500/20',
    },
    error: {
      icon: faExclamationCircle,
      accent: 'text-red-500',
      ring: darkMode ? 'ring-red-400/25' : 'ring-red-500/20',
    },
    warning: {
      icon: faExclamationTriangle,
      accent: 'text-amber-500',
      ring: darkMode ? 'ring-amber-400/25' : 'ring-amber-500/20',
    },
    info: {
      icon: faInfoCircle,
      accent: 'text-blue-500',
      ring: darkMode ? 'ring-blue-400/25' : 'ring-blue-500/20',
    },
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const slideVariants = {
    'top-right': { x: 400 },
    'top-left': { x: -400 },
    'bottom-right': { x: 400 },
    'bottom-left': { x: -400 },
    'top-center': { y: -100 },
    'bottom-center': { y: 100 },
  };

  const config = toastConfig[type] || toastConfig.info;
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-900';

  const toastElement = (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-[9999] pointer-events-auto`}
          initial={prefersReducedMotion ? false : { opacity: 0, ...slideVariants[position] }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, ...slideVariants[position] }}
          transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.div
            className={`relative flex min-w-[300px] max-w-md items-center gap-3 overflow-hidden rounded-[var(--radius-glass-lg)] px-5 py-4 shadow-2xl ring-1 ${config.ring} ${
              darkMode ? 'liquid-glass-dark' : 'liquid-glass'
            } ${textColor}`}
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{
                background: darkMode
                  ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
              }}
              aria-hidden="true"
            />

            <motion.div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
              }`}
              initial={prefersReducedMotion ? false : { scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <FontAwesomeIcon icon={config.icon} className={`text-lg ${config.accent}`} />
            </motion.div>

            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              className={`rounded-xl p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-900/5 text-slate-500'
              }`}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              aria-label="Close notification"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </motion.button>

            {duration > 0 && (
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl ${
                  darkMode ? 'bg-blue-400/40' : 'bg-blue-500/35'
                }`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined'
    ? createPortal(toastElement, document.body)
    : null;
};

Toast.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center',
  ]),
  darkMode: PropTypes.bool,
};

export default Toast;
