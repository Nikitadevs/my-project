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
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { loadFull } from 'tsparticles';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCode } from '@fortawesome/free-solid-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import Card3D from './Card3D';

// Lazy load components
const Typewriter = lazy(() => import('typewriter-effect'));
const Particles = lazy(() => import('react-tsparticles'));

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
const ParticleBackground = ({ darkMode, particleCount }) => {
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  return (
    <Suspense fallback={<div className="absolute inset-0 z-0 bg-transparent" />}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: {
              value: particleCount,
              density: { enable: true, area: 800 },
            },
            color: { 
              value: darkMode ? ['#4F46E5', '#818CF8', '#C7D2FE'] : ['#3B82F6', '#60A5FA', '#93C5FD']
            },
            shape: { 
              type: ["circle", "triangle", "square"],
              options: {
                triangle: {
                  sides: 3
                }
              }
            },
            opacity: { 
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: { 
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false
              }
            },
            links: {
              enable: true,
              distance: 150,
              color: darkMode ? "#4F46E5" : "#3B82F6",
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
          },
          interactivity: {
            events: {
              onHover: { 
                enable: true,
                mode: ["grab", "bubble"]
              },
              onClick: { 
                enable: true,
                mode: "push"
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5
                }
              },
              bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8
              },
              push: {
                quantity: 4
              }
            }
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
    </Suspense>
  );
};

ParticleBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  particleCount: PropTypes.number.isRequired,
};

/**
 * Hero Component
 * Main hero section with animated text, particle background, and scroll down arrow.
 */
const Hero = ({
  darkMode = false,
  backgroundImage = '/path-to-your-image.jpg', // Configurable background image
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Determine particle count based on window width
  const getParticleCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 20;
      if (window.innerWidth < 768) return 30;
      return 50;
    }
    return 50;
  }, []);

  const [particleCount, setParticleCount] = useState(getParticleCount());

  // Handle window resize with debounce
  useEffect(() => {
    let debounceTimeout;

    const handleResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setParticleCount(getParticleCount());
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(debounceTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [getParticleCount]);

  // Start animations when component is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to the About section smoothly
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Particle effect
  const ParticlesComponent = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              darkMode ? 'bg-blue-500/30' : 'bg-blue-300/30'
            }`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 3D Grid */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: '1000px',
            transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="absolute inset-0 grid grid-cols-8 gap-4 p-4"
            style={{
              transform: 'translateZ(-100px)',
              transformStyle: 'preserve-3d'
            }}
          >
            {Array.from({ length: 64 }).map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-lg ${darkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'}`}
                initial={{ opacity: 0, z: -100 }}
                animate={{ 
                  opacity: 1,
                  z: Math.sin((i % 8) * 0.5) * 50,
                  rotateX: Math.cos((i % 8) * 0.5) * 20,
                  rotateY: Math.sin((i % 8) * 0.5) * 20
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated Gradient Spheres */}
        <motion.div
          className={`absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-20
            ${darkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'}`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
          }}
        />
        <motion.div
          className={`absolute w-[600px] h-[600px] rounded-full blur-[80px] opacity-20
            ${darkMode ? 'bg-purple-600/20' : 'bg-purple-400/20'}`}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`,
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 z-10"
        style={{ y, opacity }}
      >
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Card3D darkMode={darkMode} className="inline-block">
              <span className={`px-6 py-2 rounded-full text-sm font-medium inline-block
                ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                Full Stack Developer
              </span>
            </Card3D>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block">Hi, I'm</span>
            <span className={`bg-gradient-to-r bg-clip-text text-transparent
              ${darkMode 
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
              }`}>
              <TypeAnimation
                sequence={[
                  'Nikita',
                  2000,
                  'a Developer',
                  2000,
                  'a Designer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Crafting digital experiences with modern technologies and creative solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Card3D darkMode={darkMode}>
              <motion.a
                href="#projects"
                className={`px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 relative overflow-hidden group
                  ${darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">View My Work</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.a>
            </Card3D>

            <Card3D darkMode={darkMode}>
              <motion.a
                href="#contact"
                className={`px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 relative overflow-hidden
                  ${darkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className={`absolute inset-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Contact Me</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </motion.svg>
              </motion.a>
            </Card3D>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <motion.button
              onClick={scrollToAbout}
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
            </motion.button>
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
