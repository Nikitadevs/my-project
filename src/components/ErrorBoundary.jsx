import React, { Component, createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRedo,
  faHome,
  faChevronDown,
  faChevronUp,
  faTriangleExclamation,
  faCopy,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import useReducedMotion from '../hooks/useReducedMotion';
import GlassPanel from './GlassPanel';
import SectionBackground from './SectionBackground';
import { siteMeta } from './siteData';
import { getSectionTheme, getBluePanelWash } from './themeTokens';

const isDev = import.meta.env.DEV;

const ErrorDetails = ({ error, errorInfo, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const errorText = `${error?.toString() ?? 'Unknown error'}\n\n${errorInfo?.componentStack ?? ''}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full mt-8 text-left">
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
          darkMode
            ? 'liquid-glass-btn-secondary-dark text-red-200'
            : 'liquid-glass-btn-secondary text-red-700'
        }`}
        aria-expanded={isOpen}
        aria-controls="error-details-content"
        whileHover={prefersReducedMotion ? undefined : { y: -1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <span>{isOpen ? 'Hide technical details' : 'View technical details'}</span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-xs" />
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="error-details-content"
            role="region"
            aria-label="Error details"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className={`mt-3 rounded-2xl p-4 ${
                darkMode ? 'liquid-glass-dark' : 'liquid-glass'
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  darkMode ? 'text-red-300' : 'text-red-600'
                }`}
                >
                  Stack trace
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                    darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                  }`}
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre
                className={`max-h-56 overflow-auto rounded-xl p-4 text-xs leading-relaxed ${
                  darkMode
                    ? 'bg-slate-950/60 text-red-200'
                    : 'bg-red-50/80 text-red-800'
                }`}
              >
                {errorText}
              </pre>
            </div>
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

const FallbackUI = React.forwardRef(
  (
    {
      darkMode,
      handleRetry,
      handleReload,
      error,
      errorInfo,
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const { panel, topEdge, sectionBg } = getSectionTheme(darkMode);
    const panelWash = getBluePanelWash(darkMode);

    return (
      <section
        ref={ref}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        aria-labelledby="error-boundary-heading"
        className={`section-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 ${sectionBg}`}
      >
        <SectionBackground darkMode={darkMode} />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className={`absolute left-[12%] top-[18%] h-56 w-56 rounded-full blur-3xl ${
              darkMode ? 'bg-blue-500/10' : 'bg-blue-400/15'
            }`}
          />
          <div
            className={`absolute bottom-[16%] right-[10%] h-64 w-64 rounded-full blur-3xl ${
              darkMode ? 'bg-purple-500/10' : 'bg-purple-400/12'
            }`}
          />
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-2xl"
        >
          <GlassPanel
            darkMode={darkMode}
            prefersReducedMotion={prefersReducedMotion}
            panelClass={panel}
            topEdge={topEdge}
            wash={panelWash}
            className="p-8 text-center md:p-12"
          >
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08, type: 'spring', stiffness: 220, damping: 18 }}
            className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center ${
              darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
            }`}
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className={`text-4xl ${darkMode ? 'text-amber-300' : 'text-amber-500'}`}
            />
          </motion.div>

          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Unexpected error
          </p>

          <h1
            id="error-boundary-heading"
            className={`mb-4 text-3xl font-extrabold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r ${
              darkMode
                ? 'from-blue-300 via-purple-300 to-pink-300'
                : 'from-blue-600 via-purple-600 to-pink-600'
            }`}
          >
            Something went wrong
          </h1>

          <p className={`mx-auto mb-8 max-w-xl text-base sm:text-lg ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
          >
            This page hit a snag while loading. Try again first — if the issue persists, refresh the page or return home.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <motion.button
              type="button"
              onClick={handleRetry}
              className="liquid-glass-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faRedo} />
              Try again
            </motion.button>

            <motion.button
              type="button"
              onClick={handleReload}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold ${
                darkMode
                  ? 'liquid-glass-btn-secondary-dark text-white'
                  : 'liquid-glass-btn-secondary text-slate-900'
              }`}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faRedo} />
              Reload page
            </motion.button>

            <Link
              to="/"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold ${
                darkMode
                  ? 'liquid-glass-btn-secondary-dark text-white'
                  : 'liquid-glass-btn-secondary text-slate-900'
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
              Go home
            </Link>
          </div>

          <p className={`mt-6 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Need help? Reach out through the{' '}
            <Link
              to="/contact"
              className={`font-medium underline-offset-4 hover:underline ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            >
              contact page
            </Link>
            {' '}on {siteMeta.name}&apos;s portfolio.
          </p>

          {isDev && error && errorInfo && (
            <ErrorDetails error={error} errorInfo={errorInfo} darkMode={darkMode} />
          )}
          </GlassPanel>
        </motion.div>
      </section>
    );
  },
);

FallbackUI.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  handleRetry: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
  error: PropTypes.object,
  errorInfo: PropTypes.object,
};

FallbackUI.defaultProps = {
  error: null,
  errorInfo: null,
};

FallbackUI.displayName = 'FallbackUI';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
    this.errorRef = createRef();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    if (isDev) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasError && this.state.hasError) {
      this.errorRef.current?.focus();
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, customFallback, customFallbackProps, darkMode = false } = this.props;

    if (hasError) {
      if (customFallback) {
        return React.cloneElement(customFallback, { ...customFallbackProps });
      }

      return (
        <FallbackUI
          ref={this.errorRef}
          darkMode={darkMode}
          handleRetry={this.handleRetry}
          handleReload={this.handleReload}
          error={error}
          errorInfo={errorInfo}
        />
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool,
  customFallback: PropTypes.element,
  customFallbackProps: PropTypes.object,
};

ErrorBoundary.defaultProps = {
  darkMode: false,
  customFallback: null,
  customFallbackProps: {},
};

export default ErrorBoundary;
