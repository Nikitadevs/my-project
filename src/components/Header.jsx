// src/components/Header.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
  faHome,
  faUser,
  faCode,
  faBriefcase,
  faGraduationCap,
  faProjectDiagram,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

// Animation variants
const navItemHoverVariants = {
  initial: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    scale: 1,
    y: 0,
    boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
    border: "1px solid transparent"
  },
  hover: {
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    scale: 1.05,
    y: -3,
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.25), 0 2px 8px rgba(59, 130, 246, 0.15)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 15
      },
      boxShadow: {
        duration: 0.4
      }
    }
  },
  tap: {
    scale: 0.97,
    y: 1,
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

const toggleContainerVariants = {
  light: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  dark: {
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const toggleIconVariants = {
  light: {
    rotate: 0,
    scale: 1,
    filter: "drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  dark: {
    rotate: 360,
    scale: 1,
    filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  tap: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const darkModeTextVariants = {
  hidden: { 
    opacity: 0, 
    x: -10, 
    width: 0 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    width: 'auto',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: 10, 
    width: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const CustomIcons = {
  Home: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 3L5 10V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V10L12 3Z"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </svg>
  ),
  About: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, y: 10 }}
        animate={{ pathLength: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </svg>
  ),
  Skills: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M12 15L8.5 12M12 15L15.5 12M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.path
        d="M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: { duration: 0.3, delay: 0.6 }
        }}
      />
    </svg>
  ),
  Experience: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M21 13.2537C18.7505 15.3205 15.9084 16.5 12.8031 16.5C9.69774 16.5 6.85562 15.3205 4.60617 13.2537M12.8031 16.5V20M4.60617 13.2537L3 16.5M4.60617 13.2537L7.80309 11.3769M21 13.2537L22.6061 16.5M21 13.2537L17.8031 11.3769M12.8031 3V7.5M7.80309 11.3769L6.19691 8.13084M7.80309 11.3769L12.8031 7.5M17.8031 11.3769L19.4092 8.13084M17.8031 11.3769L12.8031 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  ),
  Education: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M12 14L3 7L12 0L21 7L12 14ZM12 14V21M5 9.5V16.5L12 21L19 16.5V9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, y: -5 }}
        animate={{ pathLength: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  ),
  Projects: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M12 10V14M10 12H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </svg>
  ),
  Contact: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  ),
  DarkMode: ({ className, isDark }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sun/Moon Base */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        initial={false}
        animate={isDark ? {
          fill: "currentColor",
          scale: [1, 1.2, 0.9, 1],
          filter: "url(#glow)"
        } : {
          fill: "none",
          scale: 1,
          filter: "none"
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Sun Rays */}
      {[...Array(12)].map((_, i) => (
        <motion.line
          key={i}
          x1="12"
          y1="3"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 12 12)`}
          initial={false}
          animate={isDark ? {
            scale: 0,
            opacity: 0
          } : {
            scale: [1, 1.2, 1],
            opacity: 1
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "center" }}
        />
      ))}

      {/* Moon Crater Effects */}
      {isDark && (
        <>
          <motion.circle
            cx="9"
            cy="10"
            r="1.5"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.circle
            cx="15"
            cy="11"
            r="1"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.circle
            cx="11"
            cy="14"
            r="1.2"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </>
      )}

      {/* Stars (visible in dark mode) */}
      {isDark && (
        <g>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${18 + i * 1.5} ${6 + i * 1.2}L${18.5 + i * 1.5} ${5 + i * 1.2}L${19 + i * 1.5} ${6 + i * 1.2}L${18.5 + i * 1.5} ${7 + i * 1.2}Z`}
              fill="currentColor"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1],
                scale: [0, 1, 0.8, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3
                }
              }}
            />
          ))}
        </g>
      )}

      {/* Moon Shadow Effect */}
      <motion.path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={isDark ? {
          opacity: 1,
          pathLength: 1,
          transition: { duration: 0.7, ease: "easeInOut" }
        } : {
          opacity: 0,
          pathLength: 0,
          transition: { duration: 0.3 }
        }}
      />
    </svg>
  ),
};

// Add hover animation variants for all icons
const iconHoverVariants = {
  initial: { scale: 1 },
  hover: (i) => ({
    scale: 1.1,
    rotate: i % 2 === 0 ? 10 : -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  })
};

// Add a new variant for the text inside nav items
const navTextVariants = {
  initial: {
    letterSpacing: "0em",
    y: 0
  },
  hover: {
    letterSpacing: "0.02em",
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const navIconVariants = {
  initial: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  tap: {
    scale: 0.9,
    rotate: -5
  }
};

// Add styles for the gradient background
const gradientStyle = {
  background: "linear-gradient(120deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))",
  backgroundSize: "200% 100%",
  backgroundPosition: "100% 0",
  transition: "background-position 0.3s ease"
};

const hoverGradientStyle = {
  backgroundPosition: "0 0"
};

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDarkModeText, setShowDarkModeText] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the navItems map to include custom hover effects
  const navItems = [
    {
      href: '/',
      id: 'hero',
      label: 'Home',
      Icon: CustomIcons.Home,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? [1, 1.1, 1.05] : 1,
        filter: isHovered ? "drop-shadow(0 0 8px currentColor)" : "none",
        transition: { duration: 0.3 }
      })
    },
    {
      href: '/about',
      id: 'about',
      label: 'About',
      Icon: CustomIcons.About,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 15 : 0,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      })
    },
    {
      href: '/skills',
      id: 'skills',
      label: 'Skills',
      Icon: CustomIcons.Skills,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 360 : 0,
        transition: { duration: 0.3 }
      })
    },
    {
      href: '/experience',
      id: 'experience',
      label: 'Experience',
      Icon: CustomIcons.Experience,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? 1.1 : 1,
        x: isHovered ? [0, -5, 5, 0] : 0,
        transition: { duration: 0.5 }
      })
    },
    {
      href: '/education',
      id: 'education',
      label: 'Education',
      Icon: CustomIcons.Education,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? 1.2 : 1,
        y: [-2, 2, -2],
        transition: { 
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.3
          }
        }
      })
    },
    {
      href: '/projects',
      id: 'projects',
      label: 'Projects',
      Icon: CustomIcons.Projects,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? [1, 1.2, 0.9, 1.1] : 1,
        transition: { duration: 0.4 }
      })
    },
    {
      href: '/contact',
      id: 'contact',
      label: 'Contact',
      Icon: CustomIcons.Contact,
      hoverEffect: (isHovered) => ({
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [-10, 10, -10, 0] : 0,
        transition: { duration: 0.5 }
      })
    },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const liquidVariants = {
    initial: {
      borderRadius: '40px',
    },
    animate: {
      borderRadius: ['40px', '45px', '40px', '43px', '40px'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const mobileTextVariants = {
    enter: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    center: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    light: {
      rotate: 0,
      scale: 1,
      filter: "drop-shadow(0 0 3px rgba(59, 130, 246, 0.6))",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          duration: 0.3
        }
      }
    },
    dark: {
      rotate: 180,
      scale: 0.9,
      filter: "drop-shadow(0 0 3px rgba(250, 204, 21, 0.6))",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          duration: 0.3
        }
      }
    },
    clicked: {
      scale: [1, 0.7, 1.3, 0.9],
      rotate: [0, 180, 360, 180],
      transition: {
        duration: 0.5,
        times: [0, 0.3, 0.6, 1],
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const sunburstVariants = {
    light: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.7, 0.5],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    },
    dark: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    clicked: {
      scale: [1, 1.5, 0],
      opacity: [0.7, 0.3, 0],
      rotate: [0, 90, 180],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const rayVariants = {
    light: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    dark: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    },
    clicked: {
      scale: [1, 1.3, 0],
      opacity: [0.5, 0.2, 0],
      transition: {
        duration: 0.4
      }
    }
  };

  const starVariants = {
    light: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    },
    dark: {
      scale: 1,
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    clicked: {
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const morphCircleVariants = {
    light: {
      scale: 0,
      opacity: 0
    },
    dark: {
      scale: 0,
      opacity: 0
    },
    clicked: {
      scale: [0, 4, 0],
      opacity: [0, 0.5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Liquid Glass Background */}
      <motion.div
        className={`absolute inset-0 backdrop-blur-lg ${
          darkMode
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        }`}
        variants={liquidVariants}
        initial="initial"
        animate="animate"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: darkMode
            ? '0 4px 30px rgba(0, 0, 0, 0.3)'
            : '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Enhanced Liquid Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute w-64 h-64 rounded-full blur-3xl opacity-30 mix-blend-multiply ${
              darkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-300 to-cyan-300'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ left: '10%', top: '-150%' }}
          />
          <motion.div
            className={`absolute w-64 h-64 rounded-full blur-3xl opacity-30 mix-blend-multiply ${
              darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-300 to-pink-300'
            }`}
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ right: '10%', top: '-150%' }}
          />
        </div>
      </motion.div>

      <nav className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="relative group"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 relative z-10">
                Portfolio
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-6"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={navItemHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative rounded-xl overflow-hidden"
              >
                <Link
                  to={item.href}
                  className={`text-base font-medium transition-all duration-300 relative group flex items-center gap-2 px-4 py-2.5 rounded-xl
                    ${isActive(item.href)
                      ? darkMode
                        ? 'text-blue-300 bg-blue-500/10'
                        : 'text-blue-600 bg-blue-50'
                      : darkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    custom={index}
                    className="relative"
                    animate={item.hoverEffect(hoveredItem === item.id)}
                  >
                    <item.Icon
                      className={`w-[18px] h-[18px] ${
                        isActive(item.href)
                          ? darkMode
                            ? 'text-blue-300'
                            : 'text-blue-500'
                          : darkMode
                            ? 'text-gray-400'
                            : 'text-gray-500'
                      }`}
                    />
                    {/* Enhanced icon glow effect */}
                    <motion.div
                      className={`absolute inset-0 blur-md rounded-full ${
                        darkMode ? 'bg-blue-400/30' : 'bg-blue-500/30'
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isActive(item.href) || hoveredItem === item.id ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  {item.label}
                  {/* Enhanced hover background effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0'
                        : 'bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.2
                      }
                    }}
                  />
                  {/* Active indicator with enhanced animation */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          darkMode ? 'bg-blue-400/50' : 'bg-blue-500/50'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          darkMode ? 'bg-blue-300' : 'bg-blue-400'
                        }`}
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Enhanced Dark Mode Toggle */}
            <motion.div
              className="relative flex items-center"
              onMouseEnter={() => setShowDarkModeText(true)}
              onMouseLeave={() => setShowDarkModeText(false)}
            >
              <motion.button
                onClick={toggleDarkMode}
                variants={toggleContainerVariants}
                initial={darkMode ? "dark" : "light"}
                animate={darkMode ? "dark" : "light"}
                whileHover="hover"
                whileTap="tap"
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl`}
              >
                <motion.div
                  className="relative"
                  variants={toggleIconVariants}
                  initial={darkMode ? "dark" : "light"}
                  animate={darkMode ? "dark" : "light"}
                  whileTap="tap"
                >
                  <motion.div
                    className="relative z-10"
                    initial={false}
                    animate={darkMode ? {
                      rotate: [0, 45, 90, 180, 270, 360],
                      scale: [1, 0.8, 1.2, 0.9, 1.1, 1]
                    } : {
                      rotate: [360, 315, 270, 180, 90, 0],
                      scale: [1, 1.2, 0.9, 1.1, 0.8, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                    }}
                  >
                    <FontAwesomeIcon
                      icon={darkMode ? faMoon : faSun}
                      className={`text-lg ${
                        darkMode 
                          ? 'text-blue-300' 
                          : 'text-yellow-500'
                      }`}
                    />
                  </motion.div>
                  {/* Enhanced glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full blur-lg ${
                      darkMode 
                        ? 'bg-blue-400/30' 
                        : 'bg-yellow-400/30'
                    }`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Particle effects */}
                  {darkMode ? (
                    <motion.div
                      className="absolute inset-[-100%]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-300 rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3],
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="absolute inset-[-50%]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-yellow-400/30 h-px"
                          style={{
                            width: '100%',
                            transformOrigin: 'center',
                            rotate: `${i * 45}deg`
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
                <AnimatePresence mode="wait">
                  {showDarkModeText && (
                    <motion.span
                      variants={darkModeTextVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`text-sm font-medium ${
                        darkMode ? 'text-blue-300' : 'text-yellow-600'
                      }`}
                    >
                      {darkMode ? 'Light' : 'Dark'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button - Enhanced touch target and feedback */}
          <motion.button
            className="md:hidden p-3 rounded-xl -mr-2 touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}
            />
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation - Improved performance and touch interactions */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
              className={`md:hidden mt-4 rounded-xl overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ 
                willChange: 'opacity, height',
                touchAction: 'pan-y pinch-zoom'
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-6 py-4 transition-all duration-200 touch-manipulation
                      ${isActive(item.href)
                        ? darkMode
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-blue-50 text-blue-600'
                        : darkMode
                          ? 'text-gray-300 active:bg-gray-700/50'
                          : 'text-gray-700 active:bg-gray-50'
                      }`}
                    onClick={() => setIsOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <item.Icon
                      className={`w-5 h-5 ${isActive(item.href)
                        ? 'text-blue-500'
                        : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                    />
                    <motion.span
                      variants={navTextVariants}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Dark Mode Toggle - Simplified but enhanced */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                className="border-t border-gray-200 dark:border-gray-700 md:hidden"
              >
                <motion.button
                  onClick={() => {
                    toggleDarkMode();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 touch-manipulation
                    ${darkMode
                      ? 'text-yellow-400 active:bg-gray-700/50'
                      : 'text-blue-600 active:bg-gray-50'
                    }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="relative">
                    <motion.div
                      variants={iconVariants}
                      animate={darkMode ? "dark" : "light"}
                    >
                      <FontAwesomeIcon
                        icon={darkMode ? faMoon : faSun}
                        className={`text-xl ${
                          darkMode 
                            ? 'text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)]' 
                            : 'text-blue-600 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                        }`}
                      />
                    </motion.div>

                    {/* Sunburst Effect */}
                    <motion.div
                      className="absolute inset-0 z-10"
                      variants={sunburstVariants}
                      animate={darkMode ? "dark" : "light"}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200 rounded-full blur-[2px]" />
                    </motion.div>

                    {/* Sun Rays */}
                    <motion.div
                      className="absolute inset-[-50%] z-0"
                      variants={rayVariants}
                      animate={darkMode ? "dark" : "light"}
                    >
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-orange-300/30"
                          style={{
                            transform: `rotate(${i * 45}deg)`,
                            clipPath: 'polygon(50% 50%, 45% -20%, 55% -20%)'
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Stars Effect for Dark Mode */}
                    <motion.div
                      className="absolute inset-[-100%] z-0"
                      variants={starVariants}
                      animate={darkMode ? "dark" : "light"}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-yellow-200 rounded-full w-1 h-1"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                  <span className="text-base font-medium">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default React.memo(Header);
