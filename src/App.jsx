// src/App.jsx

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Education from './components/Education';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const App = () => {
  // Initialize darkMode state based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    } else {
      // Optional: Default to system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  // Function to toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Apply or remove the 'dark' class on the root element based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Optional: Listen to system preference changes and update darkMode state
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
      localStorage.setItem('darkMode', JSON.stringify(e.matches));
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary darkMode={darkMode}>
        <div className={`min-h-screen transition-colors duration-500 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}>
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          
          <main className="pt-20"> {/* Added padding-top to account for fixed header */}
            <Routes>
              <Route path="/" element={<Hero darkMode={darkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/skills" element={<Skills darkMode={darkMode} />} />
              <Route path="/experience" element={<Experience darkMode={darkMode} />} />
              <Route path="/projects" element={<Projects darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
              <Route path="/education" element={<Education darkMode={darkMode} />} />
              <Route path="/thank-you" element={<ThankYou darkMode={darkMode} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer darkMode={darkMode} />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
