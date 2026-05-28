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

/**
 * Toast notification component
 * Displays temporary notifications with auto-dismiss functionality
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.show - Controls visibility of toast
 * @param {Function} props.onClose - Callback when toast is closed
 * @param {string} props.type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {string} props.message - Message to display
 * @param {number} props.duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @param {string} props.position - Toast position: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
 */
const Toast = ({
    show = false,
    onClose,
    type = 'info',
    message,
    duration = 5000,
    position = 'top-right',
}) => {
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
            bgClass: 'from-green-500 to-emerald-500',
            iconColor: 'text-white',
        },
        error: {
            icon: faExclamationCircle,
            bgClass: 'from-red-500 to-rose-500',
            iconColor: 'text-white',
        },
        warning: {
            icon: faExclamationTriangle,
            bgClass: 'from-yellow-500 to-orange-500',
            iconColor: 'text-white',
        },
        info: {
            icon: faInfoCircle,
            bgClass: 'from-blue-500 to-indigo-500',
            iconColor: 'text-white',
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

    const toastElement = (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div
                    className={`fixed ${positionClasses[position]} z-[9999] pointer-events-auto`}
                    initial={{ opacity: 0, ...slideVariants[position] }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, ...slideVariants[position] }}
                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                    role="alert"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <motion.div
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl
              bg-gradient-to-r ${config.bgClass} text-white min-w-[300px] max-w-md`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        >
                            <FontAwesomeIcon
                                icon={config.icon}
                                className={`text-2xl ${config.iconColor}`}
                            />
                        </motion.div>

                        {/* Message */}
                        <div className="flex-1">
                            <p className="font-medium text-sm leading-relaxed">{message}</p>
                        </div>

                        {/* Close button */}
                        <motion.button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Close notification"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-lg" />
                        </motion.button>

                        {/* Progress bar (if duration is set) */}
                        {duration > 0 && (
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
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

    // Render in portal for proper z-index stacking
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
};

export default Toast;
