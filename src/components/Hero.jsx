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
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { loadSlim } from '@tsparticles/slim';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Grid3DBackground from './Grid3DBackground';
import SectionBackground from './SectionBackground';
import GlassPanel from './GlassPanel';
import useReducedMotion from '../hooks/useReducedMotion';
import { containerVariants, itemVariants } from '../utils/animationVariants';
import { heroSkills, siteMeta } from './siteData';
import { getSectionTheme, getBluePanelWash } from './themeTokens';

const Particles = lazy(() => import('@tsparticles/react'));

const MotionLink = motion.create(Link);

const heroContainerVariants = containerVariants(0.12);

const TYPE_SEQUENCE = [
  siteMeta.name, 3000,
  `a ${siteMeta.title}`, 2200,
  'a Builder', 2000,
  'a Problem Solver', 2000,
  'an Innovator', 2000,
];

const TAGLINE_HIGHLIGHT = /(digital experiences)/i;
const SPRING = { stiffness: 140, damping: 22, mass: 0.6 };
const DESKTOP_MQ = '(min-width: 1024px)';

const ParticleBackground = ({ darkMode, active }) => {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error('Failed to initialize tsParticles:', error);
    }
  }, []);

  const particleOptions = useMemo(() => ({
    fpsLimit: 60,
    fullScreen: { enable: false },
    detectRetina: true,
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 18, density: { enable: true, area: 1250 } },
      color: { value: darkMode ? ['#4F46E5', '#818CF8'] : ['#3B82F6', '#60A5FA'] },
      shape: { type: 'circle' },
      opacity: { value: 0.12, random: true },
      size: { value: { min: 1, max: 2 }, random: true },
      links: {
        enable: true,
        distance: 110,
        color: darkMode ? '#4F46E5' : '#3B82F6',
        opacity: 0.1,
        width: 1,
      },
      move: { enable: true, speed: 0.75, outModes: { default: 'bounce' } },
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 115, links: { opacity: 0.2, color: darkMode ? '#6366F1' : '#60A5FA' } },
        push: { quantity: 2 },
      },
    },
  }), [darkMode]);

  if (!active) return null;

  return (
    <Suspense fallback={<div className="absolute inset-0 z-0" aria-hidden="true" />}>
      <Particles id="tsparticles" init={particlesInit} className="absolute inset-0 z-0" options={particleOptions} />
    </Suspense>
  );
};

ParticleBackground.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

const AmbientOrbs = ({ darkMode, prefersReducedMotion }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className={`absolute -top-24 left-[18%] h-64 w-64 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'}`} />
    <div className={`absolute -bottom-28 right-[14%] h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-purple-500/8' : 'bg-purple-400/16'}`} />
    {!prefersReducedMotion && (
      <motion.div
        className={`absolute top-[24%] right-[14%] h-24 w-24 rounded-full blur-2xl ${darkMode ? 'bg-cyan-400/8' : 'bg-cyan-300/16'}`}
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
    <div
      className={`absolute inset-x-0 bottom-0 h-32 ${
        darkMode
          ? 'bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent'
          : 'bg-gradient-to-t from-slate-100 via-slate-50/60 to-transparent'
      }`}
    />
  </div>
);

AmbientOrbs.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
};

const Hero = ({ darkMode = false }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const y = useTransform(scrollY, [0, 480], prefersReducedMotion ? [0, 0] : [0, 44]);
  const opacity = useTransform(scrollY, [0, 420], [1, prefersReducedMotion ? 1 : 0.92]);

  const panelX = useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-5, 5]);
  const panelY = useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-3, 3]);
  const springX = useSpring(panelX, SPRING);
  const springY = useSpring(panelY, SPRING);

  const [gridMousePos, setGridMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const gridRafRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(nx);
    mouseY.set(ny);

    if (!gridRafRef.current) {
      gridRafRef.current = requestAnimationFrame(() => {
        setGridMousePos({ x: nx, y: ny });
        gridRafRef.current = null;
      });
    }
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGridMousePos({ x: 0, y: 0 });
  }, [mouseX, mouseY]);

  useEffect(() => () => {
    if (gridRafRef.current) cancelAnimationFrame(gridRafRef.current);
  }, []);

  const { panel, topEdge, sectionBg } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);
  const gradientText = darkMode
    ? 'from-blue-300 via-purple-300 to-pink-300'
    : 'from-blue-600 via-purple-600 to-pink-600';
  const bodyText = darkMode ? 'text-slate-300' : 'text-slate-700';
  const headingMuted = darkMode ? 'text-slate-200' : 'text-slate-800';
  const microLabel = darkMode ? 'text-slate-500' : 'text-slate-500';

  const taglineParts = siteMeta.tagline.split(TAGLINE_HIGHLIGHT);
  const showEffects = !prefersReducedMotion && isDesktop && tabVisible;

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      aria-label="Introduction"
      className={`section-shell relative flex w-full min-h-[calc(100dvh-5rem)] items-center overflow-hidden py-10 sm:py-12 md:py-16 ${sectionBg}`}
      initial="hidden"
      animate="visible"
      variants={heroContainerVariants}
      onMouseMove={showEffects ? handleMouseMove : undefined}
      onMouseLeave={showEffects ? handleMouseLeave : undefined}
    >
      <SectionBackground darkMode={darkMode} />
      <AmbientOrbs darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />

      {showEffects && <Grid3DBackground darkMode={darkMode} mousePosition={gridMousePos} />}
      <ParticleBackground darkMode={darkMode} active={showEffects} />

      <motion.div
        className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6"
        style={prefersReducedMotion ? {} : { y, opacity }}
      >
        <motion.div
          className="relative w-full"
          style={showEffects ? { x: springX, y: springY } : undefined}
        >
          <GlassPanel
            darkMode={darkMode}
            prefersReducedMotion={prefersReducedMotion}
            panelClass={panel}
            topEdge={topEdge}
            wash={panelWash}
            edgeInset="inset-x-6 xl:inset-x-10"
            className="px-5 py-9 sm:px-8 sm:py-11 md:px-10 md:py-12 xl:px-12 xl:py-14"
          >
          <div className="mx-auto max-w-3xl text-center">
              <motion.p
                variants={itemVariants(0.3)}
                className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${microLabel}`}
              >
                Welcome
              </motion.p>

              <motion.div variants={itemVariants(0.4)} className="mb-6 md:mb-7">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium ${
                    darkMode ? 'liquid-glass-chip-dark text-blue-300' : 'liquid-glass-chip text-blue-600'
                  }`}
                >
                  <motion.span
                    className={`h-1.5 w-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
                    animate={prefersReducedMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                  {siteMeta.title}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mb-5 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:mb-6 md:text-6xl xl:text-[4.25rem]"
              >
                <span className={`mb-2 block text-2xl font-semibold sm:text-3xl md:text-4xl ${headingMuted}`}>
                  Hi, I'm
                </span>
                <span className="block">
                  <span
                    className={`inline-block min-h-[1.15em] min-w-[11ch] bg-gradient-to-r bg-clip-text text-transparent sm:min-w-[14ch] md:min-w-[16ch] ${gradientText}`}
                  >
                    {prefersReducedMotion ? (
                      siteMeta.name
                    ) : (
                      <TypeAnimation
                        sequence={TYPE_SEQUENCE}
                        wrapper="span"
                        speed={50}
                        deletionSpeed={65}
                        repeat={Infinity}
                        cursor
                        cursorClassName="hero-type-cursor"
                        preRenderFirstString
                      />
                    )}
                  </span>
                  <motion.span
                    className={`mx-auto mt-4 block h-1 w-full max-w-[280px] rounded-full bg-gradient-to-r ${gradientText}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ originX: 0 }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`mx-auto mb-8 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg md:text-xl ${bodyText}`}
              >
                {taglineParts.map((part, index) => (
                  TAGLINE_HIGHLIGHT.test(part) ? (
                    <span key={index} className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {part}
                    </span>
                  ) : (
                    <React.Fragment key={index}>{part}</React.Fragment>
                  )
                ))}
              </motion.p>

              <motion.div variants={itemVariants} className="mb-3">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${microLabel}`}>
                  Core stack
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mb-9 flex flex-wrap justify-center gap-2"
                role="list"
                aria-label="Core skills"
              >
                {heroSkills.map((skill, index) => (
                  <MotionLink
                    key={skill}
                    to="/skills"
                    role="listitem"
                    aria-label={`View ${skill} skills`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 + index * 0.05, duration: 0.32 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium sm:text-sm ${
                      darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                    }`}
                  >
                    {skill}
                  </MotionLink>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
              >
                <MotionLink
                  to="/projects"
                  className="liquid-glass-btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View My Work
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </MotionLink>

                <MotionLink
                  to="/contact"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </MotionLink>
              </motion.div>

              <motion.nav
                variants={itemVariants}
                aria-label="Explore portfolio"
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
              >
                <span className={`mr-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${microLabel}`}>
                  Explore
                </span>
                {[
                  { to: '/about', label: 'About' },
                  { to: '/skills', label: 'Skills' },
                  { to: '/experience', label: 'Experience' },
                  { to: '/education', label: 'Education' },
                ].map((link) => (
                  <MotionLink
                    key={link.to}
                    to={link.to}
                    className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                      darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                    }`}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </MotionLink>
                ))}
              </motion.nav>
          </div>
          </GlassPanel>
        </motion.div>
      </motion.div>

      <MotionLink
        to="/about"
        aria-label="Explore the about section"
        className={`absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45 }}
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Explore</span>
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            darkMode ? 'liquid-glass-chip-dark' : 'liquid-glass-chip'
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.span>
      </MotionLink>
    </motion.section>
  );
};

Hero.propTypes = {
  darkMode: PropTypes.bool,
};

export default React.memo(Hero);
