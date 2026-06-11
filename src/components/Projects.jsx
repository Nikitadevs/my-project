import React, { useState, useEffect, useMemo, useRef, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDocker } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faServer,
  faCode,
  faCubes,
  faCheck,
  faArrowRight,
  faFolderOpen,
  faEye,
  faLayerGroup,
  faMagnifyingGlass,
  faRotateLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import SectionBackground from './SectionBackground';
import SectionHeading from './SectionHeading';
import GlassPanel from './GlassPanel';
import { getSectionTheme, getBluePanelWash } from './themeTokens';
import ProjectThumbnail from './ProjectThumbnail';
import useReducedMotion from '../hooks/useReducedMotion';
import { projects, projectCategories } from './siteData';

const ProjectModal = lazy(() => import('./ProjectModal'));
const MotionLink = motion.create(Link);

const CATEGORY_ICONS = {
  all: faCubes,
  devops: faDocker,
  backend: faServer,
  frontend: faCode,
};

const CATEGORY_LABELS = Object.fromEntries(
  projectCategories.map((category) => [category.id, category.label]),
);

const STAT_ICONS = [faFolderOpen, faLayerGroup, faCode];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const ProjectCell = ({
  project,
  index,
  total,
  darkMode,
  heading,
  body,
  muted,
  accent,
  cellBg,
  cellHover,
  categoryLabel,
  isFeatured,
  isWide,
  prefersReducedMotion,
  onSelect,
}) => (
  <article
    id={`project-${project.id}`}
    className={`group relative flex h-full w-full min-h-[22rem] scroll-mt-28 flex-col overflow-hidden rounded-[var(--radius-glass-lg)] transition-all duration-300 md:min-h-[24rem] ${cellBg} ${cellHover} ${
      isFeatured
        ? darkMode
          ? 'ring-1 ring-inset ring-amber-400/25 bg-amber-500/[0.04]'
          : 'ring-1 ring-inset ring-amber-500/20 bg-amber-50/60'
        : ''
    } ${isWide ? 'lg:min-h-[18rem]' : ''}`}
  >
    <div
      className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b opacity-80 ${project.accent}`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 ${project.accent}`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25 ${project.accent}`}
      aria-hidden="true"
    />

    <div className="liquid-glass-specular pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r ${
        darkMode
          ? 'from-transparent via-white/20 to-transparent'
          : 'from-transparent via-white/80 to-transparent'
      }`}
      aria-hidden="true"
    />

    <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col">
      <div className={`flex w-full min-w-0 flex-1 flex-col ${isWide ? 'lg:flex-row lg:items-stretch' : ''}`}>
        <div className={`relative w-full min-w-0 shrink-0 overflow-hidden ${isWide ? 'lg:w-[44%]' : ''}`}>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          aria-label={`View details for ${project.title}`}
        >
          <ProjectThumbnail
            title={project.title}
            accent={project.accent}
            darkMode={darkMode}
            className={`transition-transform duration-500 ${
              prefersReducedMotion ? '' : 'group-hover:scale-[1.03]'
            } ${isWide ? 'h-44 lg:min-h-[18rem] lg:h-auto' : 'h-40'}`}
          />
        </button>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
              darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-800'
            }`}
          >
            {categoryLabel}
          </span>
          {isFeatured && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                darkMode ? 'liquid-glass-chip-dark text-amber-300' : 'liquid-glass-chip text-amber-700'
              }`}
            >
              <FontAwesomeIcon icon={faStar} className="text-[8px]" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 hidden sm:block">
          <span className={`text-[10px] font-bold tabular-nums tracking-widest px-2 py-1 ${
            darkMode ? 'liquid-glass-chip-dark text-white/80' : 'liquid-glass-chip text-slate-700'
          }`}
          >
            {String(index + 1).padStart(2, '0')}
            <span className="opacity-50">/{String(total).padStart(2, '0')}</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Link
                key={tech}
                to="/skills"
                className="px-2 py-0.5 text-[10px] font-medium liquid-glass-chip-dark text-white/90 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {tech}
              </Link>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium liquid-glass-chip-dark text-white/75">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(project)}
          className={`flex w-full min-w-0 flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
            isWide ? 'lg:justify-between' : ''
          }`}
          aria-label={`View details for ${project.title}`}
        >
        <div className={`flex w-full min-w-0 flex-1 flex-col p-5 md:p-6 ${isWide ? 'lg:justify-between' : ''}`}>
          <div>
            <h3 className={`mb-2 text-lg font-bold leading-tight md:text-xl ${heading}`}>
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${project.accent}`}>
                {project.title}
              </span>
            </h3>
            {project.highlight && (
              <p className={`mb-2 inline-flex items-center gap-1.5 text-xs font-semibold ${accent}`}>
                <FontAwesomeIcon icon={faStar} className="text-[9px] text-amber-400" aria-hidden="true" />
                {project.highlight}
              </p>
            )}
            <p className={`mb-3 line-clamp-3 text-sm leading-relaxed ${body}`}>
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              <span
                className={`inline-flex px-2.5 py-0.5 text-xs font-medium ${
                  darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
                }`}
              >
                {project.technologies.length} technologies
              </span>
              <span
                className={`inline-flex px-2.5 py-0.5 text-xs font-medium ${
                  darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
                }`}
              >
                {project.features.length} features
              </span>
            </div>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.features.slice(0, isWide ? 3 : 2).map((feature) => (
                <span
                  key={feature}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium ${
                    darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-[9px] text-emerald-500" aria-hidden="true" />
                  {feature}
                </span>
              ))}
              {project.features.length > (isWide ? 3 : 2) && (
                <span className={`px-2.5 py-1 text-xs font-semibold ${accent}`}>
                  +{project.features.length - (isWide ? 3 : 2)}
                </span>
              )}
            </div>
          </div>

          <span
            className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold ${accent} opacity-100 transition-opacity sm:opacity-70 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100`}
          >
            View details
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
        </button>
      </div>

      <div
        className={`grid w-full grid-cols-3 gap-2 border-t px-5 pb-5 pt-4 md:px-6 md:pb-6 ${
          darkMode ? 'border-white/10' : 'border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelect(project)}
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm ${
            darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
          }`}
          aria-label={`View details for ${project.title}`}
        >
          <FontAwesomeIcon icon={faEye} className="text-xs" aria-hidden="true" />
          Details
        </button>
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source code for ${project.title} (opens in a new tab)`}
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm ${
            darkMode ? 'liquid-glass-icon-dark text-slate-200' : 'liquid-glass-icon text-slate-700'
          }`}
        >
          <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
          Code
        </a>
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live demo for ${project.title} (opens in a new tab)`}
          className="liquid-glass-btn-primary inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm"
        >
          <FontAwesomeIcon icon={faGlobe} aria-hidden="true" />
          Demo
        </a>
      </div>
    </div>
  </article>
);

ProjectCell.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    highlight: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    outcomes: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.shape({
      github: PropTypes.string.isRequired,
      live: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  muted: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  cellBg: PropTypes.string.isRequired,
  cellHover: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  isWide: PropTypes.bool,
  prefersReducedMotion: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ProjectCell.defaultProps = {
  isFeatured: false,
  isWide: false,
};

const Projects = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () => projectCategories
      .map((category) => ({
        ...category,
        icon: CATEGORY_ICONS[category.id],
        count: category.id === 'all'
          ? projects.length
          : projects.filter((project) => project.category === category.id).length,
      }))
      .filter((category) => category.id === 'all' || category.count > 0),
    [],
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesCategory = filter === 'all' || project.category === filter;
      const matchesSearch = !query
        || project.title.toLowerCase().includes(query)
        || project.description.toLowerCase().includes(query)
        || project.technologies.some((tech) => tech.toLowerCase().includes(query))
        || project.features.some((feature) => feature.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const showHeroLayout = filter === 'all' && !searchQuery.trim();
  const hasActiveFilters = filter !== 'all' || Boolean(searchQuery.trim());
  const visibleGridProjects = showHeroLayout ? filteredProjects.slice(1) : filteredProjects;
  const gridColsClass = useMemo(() => {
    const count = visibleGridProjects.length;
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  }, [visibleGridProjects.length]);

  const summaryStats = useMemo(() => {
    const techSet = new Set(projects.flatMap((project) => project.technologies));
    const categoriesUsed = new Set(projects.map((project) => project.category)).size;
    return [
      { label: 'Projects', value: projects.length, icon: STAT_ICONS[0] },
      { label: 'Categories', value: categoriesUsed, icon: STAT_ICONS[1] },
      { label: 'Technologies', value: techSet.size, icon: STAT_ICONS[2] },
    ];
  }, []);

  const categoryLabel = CATEGORY_LABELS[filter] ?? 'All Projects';

  const resetFilters = useCallback(() => {
    setFilter('all');
    setSearchQuery('');
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    if (categoryId === 'all') {
      setFilter('all');
      return;
    }
    setFilter((current) => (current === categoryId ? 'all' : categoryId));
  }, []);

  const navigateProject = useCallback((direction) => {
    if (!selectedProject || filteredProjects.length <= 1) return;
    const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  }, [selectedProject, filteredProjects]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateProject(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateProject(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, navigateProject]);

  const handleCategoryKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = categories.length - 1;

    const nextCategory = categories[nextIndex];
    setFilter(nextCategory.id);
    tabRefs.current[nextCategory.id]?.focus();
  };

  const {
    muted, body, heading, accent, gradient, panel, inset, nested, divider, topEdge, cellBg, cellHover, sectionBg, gridGap, footerWash,
  } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);

  const modalIndex = selectedProject
    ? filteredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  return (
    <section
      id="projects"
      className={`section-shell relative w-full overflow-hidden py-20 md:py-28 ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <SectionHeading
            badge="My Work"
            title="Featured Projects"
            subtitle="Real solutions across DevOps, backend systems, and full-stack development"
            darkMode={darkMode}
            align="left"
            badgeIcon={<FontAwesomeIcon icon={faFolderOpen} className="h-4 w-4" aria-hidden="true" />}
          />

          <motion.div
            className="relative w-full max-w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          <GlassPanel
            darkMode={darkMode}
            prefersReducedMotion={prefersReducedMotion}
            panelClass={panel}
            topEdge={topEdge}
            wash={panelWash}
            className="w-full max-w-full"
          >
            <div className={`border-b px-6 py-6 md:px-10 md:py-8 ${divider}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>Overview</p>
              </div>
              <div className={`relative overflow-hidden ${nested}`}>
                <div className="liquid-glass-specular pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
                <div className={`relative z-10 grid w-full grid-cols-3 divide-x divide-y sm:divide-y-0 ${divider}`}>
                  {summaryStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className={`group relative px-3 py-4 text-center transition-colors md:px-5 md:py-5 ${
                        cellHover
                      }`}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                    >
                      <span
                        className={`mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                          darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                        }`}
                      >
                        <FontAwesomeIcon icon={stat.icon} className={`text-xs ${accent}`} aria-hidden="true" />
                      </span>
                      <p
                        className={`text-xl font-bold tabular-nums md:text-2xl ${
                          stat.label === 'Projects' || stat.label === 'Technologies'
                            ? `bg-gradient-to-r bg-clip-text text-transparent ${gradient}`
                            : heading
                        }`}
                      >
                        {stat.value}
                      </p>
                      <p className={`mt-1 text-[10px] font-medium md:text-xs ${muted}`}>{stat.label}</p>
                      <div
                        className={`pointer-events-none absolute inset-x-4 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${gradient}`}
                        aria-hidden="true"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`border-b px-6 py-5 md:px-10 md:py-6 ${divider}`}>
              <div className={`relative grid w-full gap-4 overflow-hidden lg:grid-cols-[minmax(220px,320px)_1fr] lg:items-center ${inset} rounded-[var(--radius-glass-lg)] p-4 md:p-5`}>
                <div className="liquid-glass-specular pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
                <label
                  className={`relative z-10 flex min-h-11 w-full min-w-0 items-center gap-3 px-4 py-2.5 ${
                    darkMode ? 'liquid-glass-input-dark' : 'liquid-glass-input'
                  }`}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-sm ${muted}`} aria-hidden="true" />
                  <span className="sr-only">Search projects</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects…"
                    className={`w-full bg-transparent text-sm outline-none placeholder:opacity-60 ${heading}`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className={`shrink-0 rounded-lg px-2 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${accent}`}
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  )}
                </label>

                <div className="relative z-10 flex w-full min-w-0 flex-col gap-3 lg:items-end">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className={`inline-flex min-h-9 items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:self-end ${
                        darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                      }`}
                    >
                      <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" aria-hidden="true" />
                      Reset filters
                    </button>
                  )}
                  <div
                    className="relative flex w-full flex-wrap items-center justify-start gap-2 lg:justify-end"
                    role="tablist"
                    aria-label="Filter projects by category"
                  >
                    {categories.map((category, index) => {
                      const isActive = filter === category.id;
                      return (
                        <button
                          key={category.id}
                          ref={(node) => {
                            tabRefs.current[category.id] = node;
                          }}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleCategorySelect(category.id)}
                          onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                          className={`relative min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isActive
                              ? 'text-white'
                              : darkMode
                                ? 'liquid-glass-chip-dark text-slate-200'
                                : 'liquid-glass-chip text-slate-700'
                          }`}
                        >
                          {isActive && !prefersReducedMotion && (
                            <motion.span
                              layoutId="projects-active-tab"
                              className="liquid-glass-btn-primary absolute inset-0 rounded-[inherit]"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              aria-hidden="true"
                            />
                          )}
                          {isActive && prefersReducedMotion && (
                            <span className="liquid-glass-btn-primary absolute inset-0 rounded-[inherit]" aria-hidden="true" />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-2">
                            <FontAwesomeIcon icon={category.icon} className="text-xs" aria-hidden="true" />
                            {category.label}
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : darkMode
                                    ? 'bg-white/10 text-slate-300'
                                    : 'bg-slate-900/8 text-slate-600'
                              }`}
                              aria-hidden="true"
                            >
                              {category.count}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="w-full p-6 md:p-10"
              role="region"
              aria-label={`${filteredProjects.length} projects`}
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                      Project grid
                    </p>
                  </div>
                  <p className={`text-sm ${body}`} aria-live="polite">
                    <span className={`font-semibold ${heading}`}>{filteredProjects.length}</span> of{' '}
                    <span className={`font-semibold ${heading}`}>{projects.length}</span> shown
                    {filter !== 'all' ? (
                      <> in <span className={`font-semibold ${accent}`}>{categoryLabel}</span></>
                    ) : null}
                    {searchQuery.trim() ? (
                      <> · matching <span className={`font-semibold ${accent}`}>"{searchQuery.trim()}"</span></>
                    ) : null}
                  </p>
                </div>
                <p className={`text-xs ${muted}`}>
                  {showHeroLayout
                    ? 'Featured project shown above · remaining projects in the grid below'
                    : 'Open a project for details · use arrow keys in the modal to browse'}
                </p>
              </div>

              {filteredProjects.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-full rounded-[var(--radius-glass-lg)] px-6 py-14 text-center ${cellBg}`}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={`mx-auto mb-4 text-3xl ${muted}`}
                    aria-hidden="true"
                  />
                  <p className={`mb-2 text-lg font-semibold ${heading}`}>No projects found</p>
                  <p className={`mx-auto mb-6 max-w-md text-sm ${body}`}>
                    Try a different search term or category to explore the full portfolio.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="liquid-glass-btn-primary inline-flex min-h-11 items-center gap-2 px-5 py-2.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" />
                    Reset all filters
                  </button>
                </motion.div>
              ) : (
                <div key={`${filter}-${searchQuery.trim()}`} className="w-full max-w-full">
                  {showHeroLayout && (
                    <div className="mb-4 w-full">
                      <ProjectCell
                        project={filteredProjects[0]}
                        index={0}
                        total={filteredProjects.length}
                        darkMode={darkMode}
                        heading={heading}
                        body={body}
                        muted={muted}
                        accent={accent}
                        cellBg={cellBg}
                        cellHover={cellHover}
                        categoryLabel={CATEGORY_LABELS[filteredProjects[0].category] || filteredProjects[0].category}
                        isFeatured
                        isWide
                        prefersReducedMotion={prefersReducedMotion}
                        onSelect={setSelectedProject}
                      />
                    </div>
                  )}

                  <div
                    className={`grid w-full gap-4 ${gridColsClass} ${gridGap} ${
                      visibleGridProjects.length === 1 ? 'mx-auto max-w-2xl' : ''
                    }`}
                  >
                    {visibleGridProjects.map((project, index) => {
                      const gridIndex = showHeroLayout ? index + 1 : index;
                      return (
                        <div key={project.id} className="h-full w-full min-w-0">
                          <ProjectCell
                            project={project}
                            index={gridIndex}
                            total={filteredProjects.length}
                            darkMode={darkMode}
                            heading={heading}
                            body={body}
                            muted={muted}
                            accent={accent}
                            cellBg={cellBg}
                            cellHover={cellHover}
                            categoryLabel={CATEGORY_LABELS[project.category] || project.category}
                            prefersReducedMotion={prefersReducedMotion}
                            onSelect={setSelectedProject}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            <div
              className={`flex flex-col items-center justify-between gap-5 border-t px-6 py-8 sm:flex-row md:px-10 lg:px-12 ${divider} ${footerWash}`}
            >
              <p className={`max-w-md text-center text-sm sm:text-left md:text-base ${body}`}>
                Have a project in mind? I'd love to hear about it and help bring it to life.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <MotionLink
                  to="/contact"
                  className="liquid-glass-btn-primary group inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start a Conversation
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </MotionLink>
                <MotionLink
                  to="/skills"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold sm:flex-none ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse Skills
                </MotionLink>
                <MotionLink
                  to="/experience"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold sm:flex-none ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Experience
                </MotionLink>
              </div>
            </div>
          </GlassPanel>
          </motion.div>
      </div>

      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen
            onClose={() => setSelectedProject(null)}
            darkMode={darkMode}
            onPrevious={filteredProjects.length > 1 ? () => navigateProject(-1) : undefined}
            onNext={filteredProjects.length > 1 ? () => navigateProject(1) : undefined}
            currentIndex={modalIndex}
            totalCount={filteredProjects.length}
          />
        )}
      </Suspense>
    </section>
  );
};

Projects.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Projects);
