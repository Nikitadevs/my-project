import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

const pageTitles = {
  '/': 'Nikita | Computer Engineer',
  '/about': 'About | Nikita',
  '/projects': 'Work | Nikita',
  '/skills': 'Skills | Nikita',
  '/experience': 'Experience | Nikita',
  '/education': 'Education | Nikita',
  '/contact': 'Contact | Nikita',
};

function getThemePreference() {
  try {
    const saved = window.localStorage.getItem('darkMode');
    if (saved === 'true' || saved === 'false') {
      return { dark: saved === 'true', manual: true };
    }
  } catch {
    // The site remains usable when browser storage is unavailable.
  }
  return {
    dark: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
    manual: false,
  };
}

function RouteEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    document.title = pageTitles[pathname] || 'Page not found | Nikita';
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}

function App() {
  const [initialTheme] = useState(getThemePreference);
  const [darkMode, setDarkMode] = useState(initialTheme.dark);
  const [manualTheme, setManualTheme] = useState(initialTheme.manual);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#0b1020' : '#f7f8fc');
  }, [darkMode]);

  useEffect(() => {
    if (manualTheme || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setDarkMode(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [manualTheme]);

  const toggleDarkMode = useCallback(() => {
    setManualTheme(true);
    setDarkMode((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem('darkMode', String(next));
      } catch {
        // Keep the selected theme for this session even if storage is blocked.
      }
      return next;
    });
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <RouteEffects />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-shell">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main id="main-content" tabIndex="-1">
            <Suspense fallback={<div className="page-loading" role="status">Loading page…</div>}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/thank-you" element={<Navigate to="/contact" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
