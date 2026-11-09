import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiArrowRight, FiChevronDown, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { navItems, siteMeta } from './siteData';

const moreItems = [
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
];

function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const moreButtonRef = useRef(null);
  const moreRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen && !moreOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        } else {
          setMoreOpen(false);
          moreButtonRef.current?.focus();
        }
      }
    };
    const onPointerDown = (event) => {
      if (menuOpen && !headerRef.current?.contains(event.target)) setMenuOpen(false);
      if (moreOpen && !moreRef.current?.contains(event.target)) setMoreOpen(false);
    };
    const desktopQuery = window.matchMedia?.('(min-width: 721px)');
    const onViewportChange = (event) => {
      if (event.matches) setMenuOpen(false);
      else setMoreOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktopQuery?.addEventListener('change', onViewportChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktopQuery?.removeEventListener('change', onViewportChange);
    };
  }, [menuOpen, moreOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner container">
        <Link className="brand" to="/" aria-label={siteMeta.name + ', home'}>
          <span className="brand-mark" aria-hidden="true">N<span>.</span></span>
          <span className="brand-name">{siteMeta.name}<span> / PORTFOLIO</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="nav-more" ref={moreRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false);
          }}>
            <button
              ref={moreButtonRef}
              className={'nav-link nav-more-toggle' + (moreItems.some((item) => item.href === location.pathname) ? ' is-active' : '')}
              type="button"
              aria-expanded={moreOpen}
              aria-controls="desktop-more-menu"
              onClick={() => setMoreOpen((open) => !open)}
            >
              More <FiChevronDown aria-hidden="true" />
            </button>
            <div id="desktop-more-menu" className="nav-more-panel" hidden={!moreOpen}>
              {moreItems.map((item) => (
                <NavLink key={item.href} to={item.href} onClick={() => setMoreOpen(false)}>
                  {item.label}<FiArrowRight aria-hidden="true" />
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <NavLink className="header-contact" to="/contact">
            Let’s talk <FiArrowRight aria-hidden="true" />
          </NavLink>
          <button
            ref={menuButtonRef}
            className="icon-button mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="mobile-nav container" aria-label="Mobile navigation" hidden={!menuOpen}>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' is-active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}<FiArrowRight aria-hidden="true" />
          </NavLink>
        ))}
        <p className="mobile-nav-heading">Explore more</p>
        {moreItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' is-active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}<FiArrowRight aria-hidden="true" />
          </NavLink>
        ))}
        <NavLink
          className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' is-active' : '')}
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact<FiArrowRight aria-hidden="true" />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
