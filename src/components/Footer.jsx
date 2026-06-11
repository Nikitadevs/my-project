import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useReducedMotion from '../hooks/useReducedMotion';
import { siteMeta } from './siteData';
import GlassPanel from './GlassPanel';
import SectionBackground from './SectionBackground';
import { getSectionTheme, getBluePanelWash } from './themeTokens';

const MotionLink = motion.create(Link);

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
];

const Footer = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();
  const { muted, body, accent, gradient, panel, topEdge, sectionBg } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [prefersReducedMotion]);

  return (
    <footer
      className={`relative border-t py-10 md:py-14 ${
        darkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-900'
      } ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-32 right-0 h-64 w-64 rounded-full blur-3xl opacity-15 ${
          darkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'
        }`} />
        <div className={`absolute -bottom-32 left-0 h-64 w-64 rounded-full blur-3xl opacity-15 ${
          darkMode ? 'bg-purple-500/15' : 'bg-purple-300/25'
        }`} />
      </div>

      <div className="page-wrap relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto max-w-2xl"
        >
          <GlassPanel
            darkMode={darkMode}
            prefersReducedMotion={prefersReducedMotion}
            panelClass={panel}
            topEdge={topEdge}
            wash={panelWash}
            className="px-6 py-8 md:px-10 md:py-10"
          >
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2">
              {FOOTER_LINKS.map((link) => (
                <MotionLink
                  key={link.to}
                  to={link.to}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </MotionLink>
              ))}
            </div>

            <div className="space-y-1.5 text-center">
              <p className={`flex items-center justify-center gap-2 text-sm font-medium sm:text-base ${body}`}>
                <span>Made with</span>
                <motion.span
                  className="text-red-500"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-sm" />
                </motion.span>
                <span>
                  by{' '}
                  <span className={`bg-gradient-to-r bg-clip-text font-semibold text-transparent ${gradient}`}>
                    {siteMeta.name}
                  </span>
                </span>
              </p>
              <p className={`text-xs sm:text-sm ${muted}`}>
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>

            <div className={`h-px w-16 bg-gradient-to-r ${gradient} opacity-60`} aria-hidden="true" />

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Back to top"
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
              }`}
            >
              Back to Top
              <FontAwesomeIcon icon={faArrowUp} className={`text-xs ${accent}`} aria-hidden="true" />
            </motion.button>
          </div>
          </GlassPanel>
        </motion.div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Footer);
