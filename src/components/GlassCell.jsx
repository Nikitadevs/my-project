import React from 'react';
import PropTypes from 'prop-types';

const GlassCell = ({
  children,
  darkMode,
  className = '',
  accent = 'from-blue-500 via-purple-500 to-pink-500',
  as: Component = 'div',
  ...props
}) => (
  <Component
    className={`group relative overflow-hidden rounded-[var(--radius-glass-lg)] transition-all duration-300 ${
      darkMode ? 'liquid-glass-cell-dark' : 'liquid-glass-cell'
    } ${className}`}
    {...props}
  >
    <span
      className={`pointer-events-none absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${accent}`}
      aria-hidden="true"
    />
    <span
      className={`pointer-events-none absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 ${accent}`}
      aria-hidden="true"
    />
    <span
      className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25 ${accent}`}
      aria-hidden="true"
    />
    <div className="liquid-glass-specular pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="relative z-10">{children}</div>
  </Component>
);

GlassCell.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  accent: PropTypes.string,
  as: PropTypes.elementType,
};

export default React.memo(GlassCell);
