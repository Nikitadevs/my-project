import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Icons } from './Icons';
import { navItems as navConfig, siteMeta } from './siteData';
import { GlassBlooms, GlassDotGrid, GlassSpecular } from './GlassChrome';
import GlassEdge from './GlassEdge';
import { getSectionTheme } from './themeTokens';

const SCROLL_HIDE_THRESHOLD = 72;
const PRIMARY_NAV_IDS = new Set(['hero', 'about', 'skills', 'experience', 'education', 'projects']);

const navLinkMotion = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 420, damping: 28 },
};

const ThemeToggle = React.memo(({
  darkMode,
  toggleDarkMode,
  prefersReducedMotion,
  showLabel = false,
  className = '',
  onAfterToggle,
}) => (
  <motion.button
    type="button"
    onClick={() => {
      toggleDarkMode();
      onAfterToggle?.();
    }}
    aria-pressed={darkMode}
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 ${
      darkMode ? 'liquid-glass-chip-dark text-blue-200' : 'liquid-glass-chip text-amber-600'
    } ${className}`}
    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
  >
    <Icons.DarkMode
      isDark={darkMode}
      animated={!prefersReducedMotion}
      className="h-[18px] w-[18px]"
    />
    {showLabel && (
      <span className="text-sm font-medium">
        {darkMode ? 'Light mode' : 'Dark mode'}
      </span>
    )}
  </motion.button>
));

ThemeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  onAfterToggle: PropTypes.func,
};

const NavLink = React.memo(({
  item,
  mobile = false,
  active,
  darkMode,
  onNavigate,
  variant = 'default',
}) => {
  const isContact = item.id === 'contact';
  const inactiveText = darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900';
  const inactiveIcon = darkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-700';
  const activeIcon = darkMode ? 'text-blue-200' : 'text-blue-700';
  const activeText = darkMode ? 'text-white' : 'text-slate-900';
  const hoverBg = darkMode ? 'hover:bg-white/[0.06]' : 'hover:bg-slate-100/90';
  const mobileAccent = darkMode ? 'bg-blue-400' : 'bg-blue-500';
  const gradient = darkMode
    ? 'from-blue-300 via-purple-300 to-pink-300'
    : 'from-blue-600 via-purple-600 to-pink-600';

  if (mobile) {
    return (
      <Link
        to={item.href}
        title={item.label}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
        className={`group relative flex items-center gap-3 px-5 py-3.5 text-base font-medium touch-manipulation transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-inset ${
          active
            ? activeText
            : `${inactiveText} ${hoverBg}`
        } ${isContact && !active ? (darkMode ? 'bg-blue-500/[0.08]' : 'bg-blue-500/[0.05]') : ''}`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {active && (
          <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${mobileAccent}`} aria-hidden="true" />
        )}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            active
              ? 'liquid-glass-btn-primary text-white'
              : darkMode
                ? 'liquid-glass-icon-dark'
                : 'liquid-glass-icon'
          }`}
        >
          <item.Icon
            animated={false}
            className={`h-4 w-4 ${active ? 'text-white' : inactiveIcon}`}
          />
        </span>
        <span className="min-w-0 flex-1">{item.label}</span>
        {active ? (
          <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
            darkMode ? 'text-blue-300/80' : 'text-blue-500/80'
          }`}
          >
            Current
          </span>
        ) : isContact ? (
          <FontAwesomeIcon icon={faArrowRight} className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} aria-hidden="true" />
        ) : null}
      </Link>
    );
  }

  if (variant === 'cta') {
    return (
      <motion.li {...navLinkMotion} className="list-none">
        <Link
          to={item.href}
          title={item.label}
          aria-current={active ? 'page' : undefined}
          onClick={onNavigate}
          className={`group relative inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-glass)] px-4 py-2 text-sm font-semibold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 ${
            active ? 'liquid-glass-btn-primary text-white' : 'liquid-glass-btn-primary text-white'
          }`}
        >
          <span className="liquid-glass-specular pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
          <item.Icon animated={false} className="relative z-10 h-4 w-4" aria-hidden="true" />
          <span className="relative z-10">{item.label}</span>
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li {...navLinkMotion} className="list-none">
      <Link
        to={item.href}
        title={item.label}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
        className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 ${
          active ? activeText : `${inactiveText} ${hoverBg}`
        }`}
      >
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            className={`absolute inset-0 rounded-xl liquid-glass-active ${
              darkMode ? 'liquid-glass-nested-dark' : 'liquid-glass-nested'
            }`}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            aria-hidden="true"
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          <item.Icon
            animated={false}
            className={`h-4 w-4 shrink-0 ${active ? activeIcon : inactiveIcon}`}
          />
          <span className="hidden lg:inline">{item.label}</span>
        </span>

        {active && (
          <span
            className={`relative z-10 hidden h-1.5 w-1.5 rounded-full bg-gradient-to-r lg:inline ${gradient}`}
            aria-hidden="true"
          />
        )}
      </Link>
    </motion.li>
  );
});

NavLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
  mobile: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'cta']),
};

const MobileMenuPortal = ({ children, isOpen }) => {
  if (!isOpen || typeof document === 'undefined') return null;
  return createPortal(children, document.body);
};

MobileMenuPortal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [panelTop, setPanelTop] = useState(80);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { topEdge, inset, divider, muted, gradient } = getSectionTheme(darkMode);
  const shellRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastScrollY = useRef(0);

  const navItems = useMemo(
    () =>
      navConfig.map((item) => ({
        ...item,
        Icon: Icons[item.icon],
      })),
    [],
  );

  const primaryNavItems = useMemo(
    () => navItems.filter((item) => PRIMARY_NAV_IDS.has(item.id)),
    [navItems],
  );

  const contactItem = useMemo(
    () => navItems.find((item) => item.id === 'contact'),
    [navItems],
  );

  const activeItem = useMemo(
    () => navItems.find((item) => {
      if (item.href === '/') return location.pathname === '/';
      return location.pathname.startsWith(item.href);
    }),
    [navItems, location.pathname],
  );

  const isActive = useCallback(
    (path) => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    },
    [location.pathname],
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const updatePanelPosition = useCallback(() => {
    if (!shellRef.current) return;
    const { bottom } = shellRef.current.getBoundingClientRect();
    setPanelTop(bottom + 10);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHeaderHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100))
          : 0;
        const delta = scrollTop - lastScrollY.current;

        setScrolled(scrollTop > 12);
        setScrollProgress(progress);

        if (!isOpen) {
          if (scrollTop < SCROLL_HIDE_THRESHOLD) {
            setHeaderHidden(false);
          } else if (delta > 10) {
            setHeaderHidden(true);
          } else if (delta < -10) {
            setHeaderHidden(false);
          }
        }

        lastScrollY.current = scrollTop;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isOpen]);

  useEffect(() => {
    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    return () => window.removeEventListener('resize', updatePanelPosition);
  }, [scrolled, isOpen, updatePanelPosition]);

  useEffect(() => {
    if (!isOpen) return undefined;

    setHeaderHidden(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }

      if (e.key === 'Tab' && mobilePanelRef.current) {
        const focusable = mobilePanelRef.current.querySelectorAll(
          'a[href], button:not([disabled])',
        );
        const nodes = Array.from(focusable);
        if (!nodes.length) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      mobilePanelRef.current?.querySelector('a[href]')?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  const shellClass = scrolled
    ? darkMode
      ? 'shadow-[0_14px_44px_rgba(0,0,0,0.42)]'
      : 'shadow-[0_14px_40px_rgba(15,23,42,0.14)]'
    : '';

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-[padding] duration-300 ${scrolled ? 'py-1.5' : 'py-3'}`}
      initial={prefersReducedMotion ? false : { y: -100 }}
      animate={{ y: headerHidden && !isOpen ? '-120%' : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.4, 0, 0.2, 1] }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="page-wrap page-wrap--wide relative mx-auto w-full max-w-7xl px-3 md:px-5">
        <div
          ref={shellRef}
          className={`relative overflow-hidden rounded-[var(--radius-glass-lg)] transition-shadow duration-300 ${
            darkMode ? 'liquid-glass-hero-panel-dark' : 'liquid-glass-hero-panel'
          } ${shellClass}`}
        >
          <div className="liquid-glass-specular pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
          <GlassDotGrid darkMode={darkMode} className="z-[1]" />
          <GlassSpecular darkMode={darkMode} className="z-[1]" />
          <GlassBlooms darkMode={darkMode} animate={!prefersReducedMotion && !scrolled} className="z-[1]" />
          <GlassEdge darkMode={darkMode} inset="inset-x-4" style={{ background: topEdge }} />
          <GlassEdge darkMode={darkMode} position="bottom" inset="inset-x-4" style={{ background: topEdge }} />

          <motion.div
            className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left rounded-full"
            initial={false}
            animate={{ scaleX: scrollProgress / 100 }}
            style={{
              background: darkMode
                ? 'linear-gradient(90deg, rgba(59,130,246,0.95), rgba(168,85,247,0.95))'
                : 'linear-gradient(90deg, rgba(59,130,246,0.95), rgba(109,40,217,0.95))',
              boxShadow: '0 0 10px rgba(59,130,246,0.2)',
            }}
            aria-hidden="true"
          />

          <nav
            role="navigation"
            aria-label="Main navigation"
            className="relative z-10 px-3 md:px-4"
          >
            <div className={`flex items-center justify-between gap-3 ${scrolled ? 'py-2' : 'py-2.5 md:py-3'}`}>
              <Link
                to="/"
                className="group relative inline-flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-xl"
                aria-label={`${siteMeta.name} home`}
              >
                <span className="relative shrink-0 rounded-[14px] p-[1.5px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-md transition-transform group-hover:scale-105">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-[12px] text-sm font-bold ${
                      darkMode ? 'liquid-glass-icon-dark text-blue-200' : 'liquid-glass-icon text-blue-600'
                    }`}
                  >
                    {siteMeta.name.charAt(0)}
                  </span>
                </span>
                <span className="hidden min-w-0 flex-col leading-tight min-[420px]:flex">
                  <span className={`truncate bg-gradient-to-r bg-clip-text text-base font-bold text-transparent sm:text-lg ${gradient}`}>
                    {siteMeta.name}
                  </span>
                  <span className={`truncate text-[11px] font-medium ${muted}`}>
                    {siteMeta.title}
                  </span>
                </span>
              </Link>

              <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 lg:flex xl:gap-3">
                <div className={`flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-[var(--radius-glass-lg)] p-1 scrollbar-none ${inset}`}>
                  <ul className="flex items-center gap-0.5">
                    {primaryNavItems.map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        active={isActive(item.href)}
                        darkMode={darkMode}
                        onNavigate={closeMenu}
                      />
                    ))}
                  </ul>
                </div>

                {contactItem && (
                  <ul className="list-none">
                    <NavLink
                      item={contactItem}
                      active={isActive(contactItem.href)}
                      darkMode={darkMode}
                      onNavigate={closeMenu}
                      variant="cta"
                    />
                  </ul>
                )}

                <ThemeToggle
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              <div className="flex shrink-0 items-center gap-2 lg:hidden">
                {activeItem && (
                  <span className={`hidden max-w-[8rem] truncate text-xs font-medium sm:inline sm:max-w-[10rem] ${muted}`}>
                    {activeItem.label}
                  </span>
                )}
                <ThemeToggle
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <motion.button
                  ref={menuButtonRef}
                  type="button"
                  className={`rounded-xl p-2.5 touch-manipulation ${
                    darkMode ? 'liquid-glass-chip-dark text-white' : 'liquid-glass-chip text-slate-900'
                  } ${isOpen ? (darkMode ? 'text-blue-200 ring-1 ring-blue-400/40' : 'text-blue-600 ring-1 ring-blue-500/30') : ''}`}
                  onClick={() => setIsOpen((open) => !open)}
                  aria-expanded={isOpen}
                  aria-controls="mobile-nav-panel"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  whileTap={{ scale: 0.96 }}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isOpen ? 'close' : 'open'}
                      initial={prefersReducedMotion ? false : { opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                      className="block"
                    >
                      <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-5 w-5" />
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <MobileMenuPortal isOpen={isOpen}>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                type="button"
                className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[6px] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
                aria-label="Close menu"
              />

              <motion.div
                ref={mobilePanelRef}
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                className={`fixed left-3 right-3 z-[70] mx-auto max-w-lg overflow-hidden rounded-[var(--radius-glass-lg)] lg:hidden ${
                  darkMode ? 'liquid-glass-hero-panel-dark' : 'liquid-glass-hero-panel'
                }`}
                style={{
                  top: panelTop,
                  maxHeight: `calc(100dvh - ${panelTop}px - 1rem)`,
                }}
              >
                <div className="liquid-glass-specular pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
                <GlassDotGrid darkMode={darkMode} className="z-[1]" />
                <GlassSpecular darkMode={darkMode} className="z-[1]" />
                <GlassEdge darkMode={darkMode} inset="inset-x-4" style={{ background: topEdge }} />
                <GlassEdge darkMode={darkMode} position="bottom" inset="inset-x-4" style={{ background: topEdge }} />

                <div className={`relative z-10 flex items-center justify-between border-b px-5 py-4 ${divider}`}>
                  <div>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                      Menu
                    </p>
                    {activeItem && (
                      <p className={`mt-0.5 text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent ${gradient}`}>
                        {activeItem.label}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeMenu}
                    className={`rounded-xl p-2 ${darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'}`}
                    aria-label="Close menu"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                  </button>
                </div>

                <ul className={`relative z-10 max-h-[min(52dvh,420px)] overflow-y-auto overscroll-contain ${
                  darkMode ? 'divide-y divide-white/8' : 'divide-y divide-slate-200'
                }`}
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      className="list-none"
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <NavLink
                        item={item}
                        mobile
                        active={isActive(item.href)}
                        darkMode={darkMode}
                        onNavigate={closeMenu}
                      />
                    </motion.li>
                  ))}
                </ul>

                <div className={`relative z-10 space-y-3 border-t px-5 py-4 ${divider}`}>
                  {contactItem && (
                    <Link
                      to={contactItem.href}
                      onClick={closeMenu}
                      className="liquid-glass-btn-primary group flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {contactItem.label}
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                  <ThemeToggle
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    prefersReducedMotion={prefersReducedMotion}
                    showLabel
                    className="w-full justify-center"
                    onAfterToggle={closeMenu}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MobileMenuPortal>
    </motion.header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default React.memo(Header);
