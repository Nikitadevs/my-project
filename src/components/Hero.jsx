import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  lazy,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { loadSlim } from "@tsparticles/slim";
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCode, faRocket, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Card3D from './Card3D';

// Lazy load components
const Typewriter = lazy(() => import('typewriter-effect'));
const Particles = lazy(() => import('@tsparticles/react'));

/**
 * ErrorBoundary Component
 * Catches errors in its child components and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/*error*/) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error loading component:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const floatingIconVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * ParticleBackground Component
 * Renders the particle effect using react-tsparticles.
 */
const ParticleBackground = ({ darkMode, particleCount, isMobile }) => {
  const particlesInit = useCallback(async (engine) => {
    try {
      console.log("Initializing tsParticles");
      await loadSlim(engine);
    } catch (error) {
      console.error("Failed to initialize tsParticles:", error);
    }
  }, []);

  const particleOptions = useMemo(() => ({
    fpsLimit: isMobile ? 40 : 60,
    fullScreen: { enable: false },
    detectRetina: true,
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: {
        value: isMobile ? 20 : 35,
        density: {
          enable: true,
          area: isMobile ? 800 : 1000,
        },
      },
      color: {
        value: darkMode ? ['#4F46E5', '#818CF8'] : ['#3B82F6', '#60A5FA'],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: isMobile ? 0.5 : 0.3,
        random: true,
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.2,
          sync: false,
        },
      },
      size: {
        value: isMobile ? 3 : { min: 1, max: 3 },
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: isMobile ? 120 : 150,
        color: darkMode ? "#4F46E5" : "#3B82F6",
        opacity: isMobile ? 0.5 : 0.3,
        width: isMobile ? 2 : 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 1 : 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce",
          top: "bounce",
          left: "bounce",
          right: "bounce",
          bottom: "bounce",
        },
        attract: {
          enable: true,
          rotateX: isMobile ? 200 : 600,
          rotateY: isMobile ? 400 : 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: isMobile ? "bubble" : ["grab", "bubble"],
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: isMobile ? 140 : 180,
          links: {
            opacity: isMobile ? 0.6 : 0.4,
            color: darkMode ? "#6366F1" : "#60A5FA",
          },
        },
        bubble: {
          distance: isMobile ? 150 : 200,
          size: isMobile ? 6 : 4,
          duration: 2,
          opacity: isMobile ? 0.8 : 0.6,
        },
        push: {
          quantity: isMobile ? 3 : 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 20,
            },
          },
        },
      },
      {
        maxWidth: 425,
        options: {
          particles: {
            number: {
              value: 15,
            },
          },
        },
      },
    ],
  }), [darkMode, isMobile]);

  return (
    <Suspense fallback={<div className="absolute inset-0 z-0 bg-transparent" />}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={particleOptions}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      />
    </Suspense>
  );
};

ParticleBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  particleCount: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

/**
 * Hero Component
 * Main hero section with animated text, particle background, and scroll down arrow.
 */
const Hero = ({
  darkMode = false,
  backgroundImage = '/path-to-your-image.jpg',
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Enhanced scroll-driven animations
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const rotate = useTransform(scrollY, [0, 500], [0, -5]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 300]);

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Optimized particle count calculation
  const getParticleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 10;
      if (window.innerWidth < 768) return 15;
      if (window.innerWidth < 1024) return 25;
      return 35;
    }
    return 35;
  }, []);

  const [particleCount, setParticleCount] = useState(getParticleCount);

  // Debounced resize handler with RAF
  useEffect(() => {
    let rafId;
    let timeoutId;
    
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsMobile(window.innerWidth < 768);
          setParticleCount(getParticleCount);
        }, 150);
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [getParticleCount]);

  // Memoize the mouse movement handler
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  }, []);

  // Enhanced 3D grid background with interactive cells
  const Grid3DBackground = () => {
    // Calculate grid size based on screen width
    const gridSize = useMemo(() => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) return { cols: 4, total: 16 };
        if (window.innerWidth < 768) return { cols: 6, total: 24 };
        if (window.innerWidth < 1024) return { cols: 8, total: 32 };
        return { cols: 10, total: 40 };
      }
      return { cols: 8, total: 32 };
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            perspective: '2000px',
            transform: `rotateX(${mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div 
            className={`absolute inset-0 grid gap-4 p-4`}
            style={{
              gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
              transform: 'translateZ(-150px)',
              transformStyle: 'preserve-3d'
            }}
          >
            {Array.from({ length: gridSize.total }).map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-lg backdrop-blur-sm ${
                  darkMode 
                    ? `bg-gradient-to-br from-blue-500/5 to-purple-500/5`
                    : `bg-gradient-to-br from-blue-300/10 to-purple-300/10`
                }`}
                initial={{ opacity: 0, z: -150 }}
                animate={{ 
                  opacity: 1,
                  z: Math.sin((i % gridSize.cols) * 0.5 + (mousePosition.x * 1.2)) * 40,
                  rotateX: Math.cos((i % gridSize.cols) * 0.5 + (mousePosition.y * 1.2)) * 15,
                  rotateY: Math.sin((i % gridSize.cols) * 0.5 + (mousePosition.x * 1.2)) * 15,
                }}
                transition={{
                  duration: 5,
                  delay: i * 0.04,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{
                  boxShadow: darkMode 
                    ? '0 0 15px rgba(59, 130, 246, 0.1)'
                    : '0 0 15px rgba(59, 130, 246, 0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Floating elements animation
  const FloatingElements = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-${Math.floor(Math.random() * 4 + 2)} h-${Math.floor(Math.random() * 4 + 2)} rounded-full
            ${darkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
            : 'bg-gradient-to-r from-blue-300/10 to-purple-300/10'}`}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: 0,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 0.8, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );

  // Memoize Grid3DBackground
  const MemoizedGrid3DBackground = useMemo(() => {
    return !isMobile && <Grid3DBackground />;
  }, [isMobile, mousePosition.x, mousePosition.y]);

  // Memoize FloatingElements
  const MemoizedFloatingElements = useMemo(() => {
    return <FloatingElements />;
  }, [darkMode]);

  // Memoize ParticleBackground
  const MemoizedParticleBackground = useMemo(() => {
    return (
      <ParticleBackground 
        darkMode={darkMode} 
        particleCount={particleCount}
        isMobile={isMobile}
      />
    );
  }, [darkMode, particleCount, isMobile]);

  return (
    <motion.section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced background effects */}
      {MemoizedGrid3DBackground}
      {MemoizedFloatingElements}
      {MemoizedParticleBackground}
      
      <motion.div 
        className="container mx-auto px-4 z-10"
        style={{ y, opacity, scale, rotateX: rotate }}
      >
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
        >
          {/* Role badge with enhanced animation */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card3D darkMode={darkMode} className="inline-block">
              <motion.span 
                className={`px-6 py-2 rounded-full text-sm font-medium inline-block
                  ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}
                  transition-all duration-300`}
                whileHover={{
                  backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                }}
              >
                Full Stack Developer
              </motion.span>
            </Card3D>
          </motion.div>

          {/* Enhanced heading with dynamic typing */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span 
              className="block"
              animate={{
                y: [0, -10, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Hi, I'm
            </motion.span>
            <span className={`bg-gradient-to-r bg-clip-text text-transparent
              ${darkMode 
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
              }`}>
              <TypeAnimation
                sequence={[
                  ' Nikita', 2000,
                  ' a Developer', 1500,
                  ' a Designer', 1500,
                  ' an Innovator', 1500,
                  ' a Problem Solver', 1500,
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
                cursor={true}
                style={{ display: 'inline-block' }}
              />
            </span>
          </motion.h1>

          {/* Enhanced description */}
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Crafting digital experiences with modern technologies and creative solutions.
            Turning ideas into reality through clean code and elegant design.
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Card3D darkMode={darkMode}>
              <Link
                to="/projects"
                className={`px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 relative overflow-hidden group
                  ${darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500"
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovered ? '100%' : '-100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <motion.div
                  className="relative z-10 flex items-center gap-2"
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span>View My Work</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ 
                      x: isHovered ? 5 : 0,
                      rotate: isHovered ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </motion.div>
              </Link>
            </Card3D>

            <Card3D darkMode={darkMode}>
              <Link
                to="/contact"
                className={`px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 relative overflow-hidden
                  ${darkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                  } transition-all duration-300`}
              >
                <motion.div
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Contact Me</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ 
                      y: [0, -2, 0],
                      rotate: [0, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </motion.svg>
                </motion.div>
              </Link>
            </Card3D>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

Hero.propTypes = {
  darkMode: PropTypes.bool,
  backgroundImage: PropTypes.string,
};

export default React.memo(Hero);
