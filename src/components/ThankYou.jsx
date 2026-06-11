import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight, faComments } from '@fortawesome/free-solid-svg-icons';
import SectionBackground from './SectionBackground';
import GlassPanel from './GlassPanel';
import useReducedMotion from '../hooks/useReducedMotion';
import { siteMeta } from './siteData';
import { getSectionTheme, getBluePanelWash } from './themeTokens';

const MotionLink = motion.create(Link);

const ThankYou = ({ darkMode = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const {
    muted, body, gradient, panel, topEdge, sectionBg,
  } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`section-shell relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden py-20 md:py-28 ${sectionBg}`}
      aria-labelledby="thank-you-heading"
    >
      <SectionBackground darkMode={darkMode} />

      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto max-w-2xl"
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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 18 }}
              className="mb-6"
            >
              <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${
                darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
              }`}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-emerald-500" aria-hidden="true" />
              </span>
            </motion.div>

            <div className="mb-4 flex items-center justify-center gap-3">
              <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>Message sent</p>
              <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
            </div>

            <h1
              id="thank-you-heading"
              className={`mb-4 text-3xl font-extrabold sm:text-4xl bg-gradient-to-r bg-clip-text text-transparent ${gradient}`}
            >
              Thank You!
            </h1>

            <p className={`mb-3 text-lg font-medium sm:text-xl ${body}`}>
              Your message has been sent successfully. I'll get back to you soon.
            </p>

            <p className={`mx-auto mb-8 max-w-lg text-sm ${muted}`}>
              While you wait, explore recent projects or learn more about how {siteMeta.name} builds polished digital experiences.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <MotionLink
                to="/"
                className="liquid-glass-btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </MotionLink>
              <MotionLink
                to="/projects"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                }`}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" aria-hidden="true" />
              </MotionLink>
              <MotionLink
                to="/contact"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                }`}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faComments} className="text-sm" aria-hidden="true" />
                Contact
              </MotionLink>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.section>
  );
};

ThankYou.propTypes = {
  darkMode: PropTypes.bool,
};

export default React.memo(ThankYou);
