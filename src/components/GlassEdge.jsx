import React from 'react';
import PropTypes from 'prop-types';

const EDGE = {
  light: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.38), transparent)',
  dark: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
};

const GlassEdge = ({
  darkMode,
  position = 'top',
  inset = 'inset-x-10',
  className = '',
  style,
}) => (
  <div
    className={`pointer-events-none absolute z-[1] h-px ${inset} ${
      position === 'top' ? 'top-0' : 'bottom-0 opacity-40'
    } ${className}`}
    style={{ background: darkMode ? EDGE.dark : EDGE.light, ...style }}
    aria-hidden="true"
  />
);

GlassEdge.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']),
  inset: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(GlassEdge);
