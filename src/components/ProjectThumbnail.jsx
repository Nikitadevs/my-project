import React from 'react';
import PropTypes from 'prop-types';

const ProjectThumbnail = ({
  title,
  accent = 'from-blue-500 to-indigo-600',
  className = '',
  darkMode = false,
}) => {
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const frame = darkMode ? 'liquid-glass-frame-dark' : 'liquid-glass-frame';

  return (
    <div className={`${frame} ${className}`}>
      <div
        className={`relative flex h-full min-h-[12rem] w-full items-center justify-center overflow-hidden rounded-[calc(var(--radius-glass-xl)-2px)] bg-gradient-to-br ${accent}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(135deg,transparent_35%,rgba(255,255,255,0.4)_50%,transparent_65%)]" />
        <span
          className={`relative flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-black tracking-[0.18em] text-white/95 md:text-4xl ${
            darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
          }`}
        >
          {initials}
        </span>
      </div>
    </div>
  );
};

ProjectThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  accent: PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default React.memo(ProjectThumbnail);
