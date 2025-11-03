// src/components/ErrorBoundary.jsx

import React, { Component, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faHome, faChevronDown, faChevronUp, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

/**
 * **ErrorDetails Component**
 * A custom expandable panel to display error details with enhanced UI/UX.
 */
class ErrorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleDetails = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { error, errorInfo, darkMode } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="w-full max-w-2xl mt-6">
        <motion.button
          onClick={this.toggleDetails}
          className={`flex items-center justify-between w-full px-4 py-3 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            darkMode
              ? 'bg-red-700 text-red-200 hover:bg-red-600 focus:ring-red-500'
              : 'bg-red-200 text-red-700 hover:bg-red-300 focus:ring-red-500'
          }`}
          aria-expanded={isOpen}
          aria-controls="error-details-content"
          initial={false}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">View Error Details</span>
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
                  Error Details
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
  }
}

ErrorDetails.propTypes = {
  error: PropTypes.object.isRequired,
  errorInfo: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

/**
 * **FallbackUI Component**
 * The UI displayed when an error is caught by the ErrorBoundary with enhanced UI/UX.
 */
const FallbackUI = React.forwardRef(
  (
    {
      darkMode,
      handleReload,
      handleGoHome,
      error,
      errorInfo,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        className={`min-h-screen flex items-center justify-center p-4 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-2xl w-full p-8 rounded-3xl shadow-2xl text-center ${
            darkMode
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
              : 'bg-gradient-to-br from-red-50 to-white text-gray-900'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-6xl text-red-500 animate-pulse"
            />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600">
            Oops! Something went wrong.
          </h2>

          <p className={`text-lg sm:text-xl mb-8 font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Sorry, an unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <motion.button
              onClick={handleReload}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Reload page"
            >
              <FontAwesomeIcon icon={faRedo} />
              <span>Reload Page</span>
            </motion.button>

            <motion.button
              onClick={handleGoHome}
              className={`flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
                  : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to home page"
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Go Home</span>
            </motion.button>
          </div>

          {error && errorInfo && (
            <ErrorDetails error={error} errorInfo={errorInfo} darkMode={darkMode} />
          )}
        </motion.div>
      </div>
    );
  }
);

FallbackUI.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  handleReload: PropTypes.func.isRequired,
  handleGoHome: PropTypes.func.isRequired,
  error: PropTypes.object,
  errorInfo: PropTypes.object,
};

FallbackUI.defaultProps = {
  error: null,
  errorInfo: null,
};

FallbackUI.displayName = 'FallbackUI';

/**
 * **ErrorBoundary Component**
 * Catches errors in its child components and displays a fallback UI.
 * Now without external dependencies like Sentry, react-toastify, or i18next.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    const storedTheme = typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true';
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
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // You can add your own error reporting service here
    // For example: logErrorToService(error, errorInfo);
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
