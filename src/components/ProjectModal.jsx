import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faTimes,
  faExternalLinkAlt,
  faCheck,
  faLayerGroup,
  faWrench,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ProjectThumbnail from './ProjectThumbnail';
import useFocusTrap from './useFocusTrap';

const CATEGORY_LABELS = {
  devops: 'DevOps',
  backend: 'Backend',
  frontend: 'Frontend',
};

const ProjectModal = ({
  project,
  isOpen,
  onClose,
  darkMode = false,
  onPrevious,
  onNext,
  currentIndex = -1,
  totalCount = 0,
}) => {
  const modalRef = useRef(null);
  const open = isOpen ?? Boolean(project);

  const {
    title,
    description,
    details,
    features = [],
    outcomes = [],
    technologies = [],
    accent,
    category,
    highlight,
    links = {},
  } = project || {};

  const liveLink = links.live;
  const codeLink = links.github;

  useFocusTrap(modalRef, open);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!project) return null;

  const canNavigate = totalCount > 1 && currentIndex >= 0 && (onPrevious || onNext);
  const mutedText = darkMode ? 'text-slate-400' : 'text-slate-500';
  const bodyText = darkMode ? 'text-slate-300' : 'text-slate-600';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 liquid-glass-overlay z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              key={project.id ?? title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className={`relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col rounded-t-[var(--radius-glass-xl)] sm:rounded-[var(--radius-glass-xl)] ${
                darkMode ? 'liquid-glass-hero-panel-dark text-white' : 'liquid-glass-hero-panel text-slate-900'
              }`}
            >
              <div
                className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px"
                style={{
                  background: darkMode
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                }}
                aria-hidden="true"
              />

              {/* Sticky header */}
              <div className={`shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-b ${
                darkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <div className="flex min-w-0 items-center gap-2">
                  {canNavigate && onPrevious && (
                    <button
                      type="button"
                      onClick={onPrevious}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                      }`}
                      aria-label="Previous project"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="text-sm" aria-hidden="true" />
                    </button>
                  )}
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      {category && (
                        <span className={`text-xs font-semibold px-2.5 py-0.5 ${
                          darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
                        }`}>
                          {CATEGORY_LABELS[category] || category}
                        </span>
                      )}
                      {canNavigate && (
                        <span className={`text-[10px] font-semibold tabular-nums ${mutedText}`}>
                          {currentIndex + 1} / {totalCount}
                        </span>
                      )}
                    </div>
                    <h2 id="project-modal-title" className="truncate text-lg font-bold sm:text-xl">
                      {title}
                    </h2>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {canNavigate && onNext && (
                    <button
                      type="button"
                      onClick={onNext}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                      }`}
                      aria-label="Next project"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="text-sm" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      darkMode ? 'liquid-glass-icon-dark text-slate-400' : 'liquid-glass-icon text-slate-600'
                    }`}
                    aria-label="Close project details"
                  >
                    <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-5 py-5 sm:px-6 sm:py-6">
                <div className="overflow-hidden mb-6">
                  <ProjectThumbnail title={title} accent={accent} darkMode={darkMode} className="h-48 sm:h-56" />
                </div>

                {highlight && (
                  <p
                    className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                      darkMode ? 'liquid-glass-chip-dark text-blue-300' : 'liquid-glass-chip text-blue-700'
                    }`}
                  >
                    {highlight}
                  </p>
                )}

                <p className={`text-base sm:text-lg leading-relaxed mb-8 ${bodyText}`}>
                  {details || description}
                </p>

                {outcomes.length > 0 && (
                  <div className="mb-8">
                    <h3 className={`mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      <FontAwesomeIcon icon={faCheck} className="text-emerald-500" aria-hidden="true" />
                      Impact
                    </h3>
                    <ul className="space-y-2.5">
                      {outcomes.map((outcome) => (
                        <li key={outcome} className={`flex items-start gap-2.5 text-sm ${bodyText}`}>
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={`text-[10px] ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                              aria-hidden="true"
                            />
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {features.length > 0 && (
                  <div className="mb-8">
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${mutedText}`}>
                      <FontAwesomeIcon icon={faLayerGroup} className="text-blue-500" />
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-2.5 p-3 text-sm ${
                            darkMode ? 'liquid-glass-dark' : 'liquid-glass'
                          } ${bodyText}`}
                        >
                          <span className={`shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 ${
                            darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                          }`}>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={`text-[10px] ${darkMode ? 'text-green-400' : 'text-green-600'}`}
                            />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${mutedText}`}>
                      <FontAwesomeIcon icon={faWrench} className="text-purple-500" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Link
                          key={tech}
                          to="/skills"
                          className={`text-sm px-3 py-1.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
                          }`}
                        >
                          {tech}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky footer actions */}
              <div className={`shrink-0 flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:px-6 ${
                darkMode ? 'border-white/10 bg-slate-950/40' : 'border-slate-200 bg-white/90'
              }`}>
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live demo (opens in a new tab)"
                    className="liquid-glass-btn-primary flex items-center justify-center gap-2 px-6 py-3 font-semibold flex-1"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                    Live Demo
                  </a>
                )}
                {codeLink && (
                  <a
                    href={codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source code (opens in a new tab)"
                    className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold flex-1 ${
                      darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                    }`}
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-sm" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.string,
    highlight: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    outcomes: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    accent: PropTypes.string,
    category: PropTypes.string,
    links: PropTypes.shape({
      live: PropTypes.string,
      github: PropTypes.string,
    }),
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  currentIndex: PropTypes.number,
  totalCount: PropTypes.number,
};

export default React.memo(ProjectModal);
