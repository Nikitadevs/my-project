// src/components/ErrorBoundary.jsx

import React, { Component, memo, createRef, forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faHome, faSun, faMoon, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * **ActionButton Component**
 * A memoized button component with enhanced animations and ripple effect.
 */
const ActionButton = memo(
  ({
    onClick,
    icon,
    label,
    bgColor,
    ariaLabel,
    disabled,
    isLoading,
  }) => {
    const [rippleArray, setRippleArray] = React.useState([]);

    const addRipple = (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(button.clientWidth, button.clientHeight);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const newRipple = { x, y, size };
      setRippleArray((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRippleArray((prev) => prev.slice(1));
      }, 600);
    };

    return (
      <motion.button
        onClick={(e) => {
          if (!disabled) {
            addRipple(e);
            onClick();
          }
        }}
        className={`relative overflow-hidden ${bgColor} text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow flex items-center shadow-md ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        whileHover={
          !disabled
            ? {
                scale: 1.05,
                boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3 },
              }
            : {}
        }
        whileTap={
          !disabled
            ? {
                scale: 0.95,
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2 },
              }
            : {}
        }
        disabled={disabled}
      >
        {rippleArray.map((ripple, index) => (
          <span
            key={index}
            className="absolute bg-white opacity-20 rounded-full animate-ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          ></span>
        ))}

        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        )}

        {icon && !isLoading && (
          <motion.div
            className="mr-3 text-lg"
            whileHover={{ rotate: 15, scale: 1.2 }}
            whileTap={{ rotate: -15, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FontAwesomeIcon icon={icon} aria-hidden="true" />
          </motion.div>
        )}

        <span className="text-base">{label}</span>
      </motion.button>
    );
  }
);

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ActionButton.defaultProps = {
  icon: null,
  disabled: false,
  isLoading: false,
};

/**
 * **ThemeToggle Component**
 * A button to toggle between dark and light modes with smooth icon transitions.
 */
const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <motion.button
    onClick={toggleDarkMode}
    className={`absolute top-6 right-6 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      darkMode ? 'bg-gray-700' : 'bg-yellow-400'
    }`}
    aria-label="Toggle Dark Mode"
    whileTap={{ scale: 0.85 }}
  >
    <motion.div
      animate={{ rotate: darkMode ? 0 : 180 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.span
        className={`absolute inset-0 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-yellow-400'
        } opacity-50`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      ></motion.span>
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        className="relative text-xl text-yellow-500 dark:text-gray-200"
      />
    </motion.div>
  </motion.button>
);

ThemeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

/**
 * **ErrorIllustration Component**
 * An inline SVG illustration representing an error with responsive sizing.
 */
const ErrorIllustration = ({ className, ariaHidden }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    aria-hidden={ariaHidden}
    role={ariaHidden ? 'presentation' : 'img'}
  >
    {!ariaHidden && <title>Error Illustration</title>}
    <path
      fill="currentColor"
      d="M320 32C132.3 32 0 164.3 0 352s132.3 320 320 320 320-132.3 320-320S507.7 32 320 32zm0 528c-132.3 0-240-107.7-240-240S187.7 80 320 80s240 107.7 240 240-107.7 240-240 240zm96-304c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32v-32c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v32zm0 96c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32v-160c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v160z"
    />
  </svg>
);

ErrorIllustration.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

ErrorIllustration.defaultProps = {
  className: '',
  ariaHidden: true,
};

/**
 * **ErrorDetails Component**
 * A custom expandable panel to display error details with enhanced UI/UX.
 */
const ErrorDetails = ({ error, errorInfo, darkMode }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full max-w-2xl mt-6">
      <motion.button
        onClick={toggleDetails}
        className={`flex items-center justify-between w-full px-4 py-3 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          darkMode
            ? 'bg-red-700 text-red-200 hover:bg-red-600'
            : 'bg-red-200 text-red-700 hover:bg-red-300'
        }`}
        aria-expanded={isOpen}
        aria-controls="error-details-content"
        initial={false}
        animate={{ backgroundColor: isOpen ? (darkMode ? '#e53e3e' : '#feb2b2') : undefined }}
      >
        <span className="font-medium">
          {t('clickForDetails', 'View Error Details')}
        </span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="error-details-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`mt-2 p-4 rounded-md overflow-hidden ${
              darkMode ? 'bg-gray-800 text-red-300' : 'bg-red-100 text-red-700'
            }`}
          >
            <details open>
              <summary className="cursor-pointer font-semibold underline mb-2">
                {t('errorDetails', 'Error Details')}
              </summary>
              <p className="whitespace-pre-wrap">{error.toString()}</p>
              <br />
              <p className="whitespace-pre-wrap">{errorInfo.componentStack}</p>
            </details>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ErrorDetails.propTypes = {
  error: PropTypes.object.isRequired,
  errorInfo: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

/**
 * **FallbackUI Component**
 * The UI displayed when an error is caught by the ErrorBoundary with enhanced UI/UX.
 */
const FallbackUI = forwardRef(
  (
    {
      darkMode,
      toggleDarkMode,
      handleReload,
      handleGoHome,
      error,
      errorInfo,
    },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-red-100 via-white to-red-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-2xl rounded-3xl shadow-2xl text-center">
        <svg className="w-16 h-16 text-red-500 animate-pulse mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600 drop-shadow-lg">
          Oops! Something went wrong.
        </h2>
        <p className="text-lg sm:text-xl mb-6 font-medium text-gray-700 dark:text-gray-200">
          Sorry, an unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    );
  }
);

FallbackUI.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
  handleGoHome: PropTypes.func.isRequired,
  error: PropTypes.object,
  errorInfo: PropTypes.object,
};

FallbackUI.defaultProps = {
  error: null,
  errorInfo: null,
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    const storedTheme = localStorage.getItem('darkMode') === 'true';
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      darkMode: storedTheme,
    };
    this.errorRef = createRef();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    Sentry.captureException(error, { extra: errorInfo });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasError && this.state.hasError) {
      this.errorRef.current?.focus();
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    const { homePath } = this.props;
    window.location.href = homePath;
  };

  toggleDarkMode = () => {
    this.setState(
      (prevState) => ({ darkMode: !prevState.darkMode }),
      () => {
        localStorage.setItem('darkMode', this.state.darkMode);
      }
    );
  };

  render() {
    const { hasError, darkMode, error, errorInfo } = this.state;
    const { customFallback, customFallbackProps } = this.props;

    if (hasError) {
      if (customFallback) {
        return React.cloneElement(customFallback, { ...customFallbackProps });
      }

      return (
        <FallbackUI
          ref={this.errorRef}
          darkMode={darkMode}
          toggleDarkMode={this.toggleDarkMode}
          handleReload={this.handleReload}
          handleGoHome={this.handleGoHome}
          error={error}
          errorInfo={errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  customFallback: PropTypes.element,
  customFallbackProps: PropTypes.object,
  homePath: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  customFallback: null,
  customFallbackProps: {},
  homePath: '/',
};

export default ErrorBoundary;
