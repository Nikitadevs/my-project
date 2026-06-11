import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { getSectionTheme } from './themeTokens';

const SectionHeading = ({
  badge,
  title,
  subtitle,
  darkMode,
  badgeIcon,
  align = 'center',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { nested, radiusXl } = getSectionTheme(darkMode);
  const shellClass = align === 'center' ? 'mx-auto w-full max-w-3xl text-center' : 'w-full text-left';

  return (
    <motion.div
      className={`relative mb-10 block w-full overflow-hidden md:mb-14 ${shellClass} ${nested} ${radiusXl} px-6 py-8 md:px-10 md:py-10`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <motion.div
          className="inline-block mb-4 md:mb-6"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              darkMode
                ? 'liquid-glass-chip-dark text-blue-300'
                : 'liquid-glass-chip text-blue-700'
            }`}
          >
            {badgeIcon}
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        className={`section-heading text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
          darkMode
            ? 'from-blue-400 via-purple-400 to-pink-400'
            : 'from-blue-600 via-purple-600 to-pink-600'
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className={`mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r shadow-lg ${
          align === 'center' ? 'mx-auto' : ''
        } ${
          darkMode
            ? 'from-blue-400 via-purple-400 to-pink-400 shadow-blue-500/50'
            : 'from-blue-600 via-purple-600 to-pink-600 shadow-purple-500/50'
        }`}
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
      />

      {subtitle && (
        <motion.p
          className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

SectionHeading.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  darkMode: PropTypes.bool.isRequired,
  badgeIcon: PropTypes.node,
  align: PropTypes.oneOf(['center', 'left']),
};

export default React.memo(SectionHeading);
