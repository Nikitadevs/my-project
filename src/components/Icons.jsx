import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const STROKE = {
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
};

const EASE = [0.4, 0, 0.2, 1];

const iconPropTypes = {
  className: PropTypes.string,
  animated: PropTypes.bool,
};

const Path = ({ d, delay = 0, animate = true, strokeWidth, ...rest }) => {
  if (!animate) {
    return <path d={d} {...STROKE} strokeWidth={strokeWidth ?? STROKE.strokeWidth} {...rest} />;
  }

  return (
    <motion.path
      d={d}
      {...STROKE}
      strokeWidth={strokeWidth ?? STROKE.strokeWidth}
      initial={{ pathLength: 0, opacity: 0.4 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...rest}
    />
  );
};

Path.propTypes = {
  d: PropTypes.string.isRequired,
  delay: PropTypes.number,
  animate: PropTypes.bool,
  strokeWidth: PropTypes.number,
};

const IconBase = ({ className = '', animated = true, children }) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className="opacity-[0.14]"
        fill="currentColor"
        stroke="none"
      />
      {children(shouldAnimate)}
    </svg>
  );
};

IconBase.propTypes = {
  className: PropTypes.string,
  animated: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

const Home = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19v-8.5z" delay={0} animate={a} />
        <Path d="M9.5 20.5v-5a2.5 2.5 0 015 0v5" delay={0.1} animate={a} />
        <Path d="M12 4v3" delay={0.18} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
Home.propTypes = iconPropTypes;

const About = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" delay={0} animate={a} />
        <Path d="M6.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" delay={0.1} animate={a} />
        <Path d="M12 5v1.5" delay={0.16} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
About.propTypes = iconPropTypes;

const Skills = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M12 3L3.5 7.5 12 12l8.5-4.5L12 3z" delay={0} animate={a} />
        <Path d="M3.5 12.5L12 17l8.5-4.5" delay={0.08} animate={a} />
        <Path d="M3.5 17.5L12 22l8.5-4.5" delay={0.16} animate={a} />
        <Path d="M12 12v5" delay={0.22} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
Skills.propTypes = iconPropTypes;

const Experience = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M8 7V5.5A2 2 0 0110 3.5h4A2 2 0 0116 5.5V7" delay={0} animate={a} />
        <Path d="M4.5 7h15A1.5 1.5 0 0121 8.5v10A1.5 1.5 0 0119.5 20h-15A1.5 1.5 0 013 18.5v-10A1.5 1.5 0 014.5 7z" delay={0.08} animate={a} />
        <Path d="M9 12h6" delay={0.16} animate={a} />
        <Path d="M12 10.5v4.5" delay={0.2} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
Experience.propTypes = iconPropTypes;

const Education = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M12 3L3 8.5 12 14l9-5.5L12 3z" delay={0} animate={a} />
        <Path d="M6 11v4.5c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5V11" delay={0.1} animate={a} />
        <Path d="M20.5 9v5.5" delay={0.18} animate={a} />
        <Path d="M20.5 14.5l1.5 1" delay={0.22} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
Education.propTypes = iconPropTypes;

const Projects = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M3 7.5A1.5 1.5 0 014.5 6H9l2 2.5h8.5A1.5 1.5 0 0121 10v8.5A1.5 1.5 0 0119.5 20h-15A1.5 1.5 0 013 18.5V7.5z" delay={0} animate={a} />
        <Path d="M9 6V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6" delay={0.08} animate={a} />
        <Path d="M8.5 14h7" delay={0.16} animate={a} />
        <Path d="M8.5 17h4.5" delay={0.2} animate={a} />
      </>
    )}
  </IconBase>
);
Projects.propTypes = iconPropTypes;

const Contact = ({ className, animated = true }) => (
  <IconBase className={className} animated={animated}>
    {(a) => (
      <>
        <Path d="M4 7.5h16a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0120 17.5H4A1.5 1.5 0 012.5 16V9A1.5 1.5 0 014 7.5z" delay={0} animate={a} />
        <Path d="M4 8l8 5.5L20 8" delay={0.12} animate={a} />
        <Path d="M12 13.5V20" delay={0.18} animate={a} strokeWidth={2} />
      </>
    )}
  </IconBase>
);
Contact.propTypes = iconPropTypes;

const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

const DarkMode = ({ className, isDark = false, animated = true }) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" className="opacity-[0.12]" fill="currentColor" stroke="none" />

      {SUN_RAYS.map((angle, i) => (
        <motion.line
          key={angle}
          x1="12"
          y1="2"
          x2="12"
          y2="4.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          transform={`rotate(${angle} 12 12)`}
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.3 : 1,
          }}
          transition={
            shouldAnimate
              ? { duration: 0.32, delay: i * 0.015, ease: EASE }
              : { duration: 0 }
          }
          style={{ transformOrigin: '12px 12px' }}
        />
      ))}

      <motion.circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity={0.15}
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.5 : 1,
        }}
        transition={{ duration: shouldAnimate ? 0.35 : 0, ease: EASE }}
      />

      <motion.path
        d="M20.5 12.2a8.5 8.5 0 11-9.2-9.2 6.5 6.5 0 009.2 9.2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity={0.12}
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          pathLength: isDark ? 1 : 0,
          rotate: isDark ? 0 : -25,
        }}
        transition={{ duration: shouldAnimate ? 0.42 : 0, ease: EASE }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </svg>
  );
};
DarkMode.propTypes = {
  ...iconPropTypes,
  isDark: PropTypes.bool,
};

export const Icons = {
  Home: React.memo(Home),
  About: React.memo(About),
  Skills: React.memo(Skills),
  Experience: React.memo(Experience),
  Education: React.memo(Education),
  Projects: React.memo(Projects),
  Contact: React.memo(Contact),
  DarkMode: React.memo(DarkMode),
};
