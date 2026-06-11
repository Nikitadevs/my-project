import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faServer,
  faCloud,
  faTools,
  faLaptopCode,
  faRocket,
  faStar,
  faCertificate,
  faCheck,
  faTimes,
  faArrowRight,
  faLayerGroup,
  faChartLine,
  faFolderOpen,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faNode,
  faPython,
  faAws,
  faDocker,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons';
import SectionBackground from './SectionBackground';
import SectionHeading from './SectionHeading';
import GlassPanel from './GlassPanel';
import { getSectionTheme, getBluePanelWash } from './themeTokens';
import useReducedMotion from '../hooks/useReducedMotion';

const MotionLink = motion.create(Link);

const CATEGORIES = [
  { id: 'all', name: 'All', icon: faCode },
  { id: 'frontend', name: 'Frontend', icon: faLaptopCode },
  { id: 'backend', name: 'Backend', icon: faServer },
  { id: 'cloud', name: 'Cloud', icon: faCloud },
  { id: 'devops', name: 'DevOps', icon: faTools },
  { id: 'development', name: 'Development', icon: faRocket },
];

const SKILLS = [
  {
    name: 'React',
    category: 'frontend',
    level: 95,
    icon: faReact,
    color: 'from-cyan-500 to-blue-500',
    experience: '4+ years',
    projects: 30,
    details: ['Component Architecture', 'State Management (Redux, Context)', 'Performance Optimization', 'Custom Hooks'],
    certifications: ['Meta React Developer'],
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 92,
    icon: faNode,
    color: 'from-green-500 to-emerald-600',
    experience: '3+ years',
    projects: 25,
    details: ['RESTful APIs', 'GraphQL', 'Microservices', 'Real-time Applications'],
    certifications: ['Node.js Services Developer'],
  },
  {
    name: 'AWS',
    category: 'cloud',
    level: 90,
    icon: faAws,
    color: 'from-orange-500 to-yellow-500',
    experience: '3+ years',
    projects: 20,
    details: ['EC2 & ECS', 'Lambda & Serverless', 'S3 & CloudFront', 'RDS & DynamoDB'],
    certifications: ['AWS Certified Solutions Architect'],
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 88,
    icon: faDocker,
    color: 'from-blue-500 to-cyan-500',
    experience: '2+ years',
    projects: 15,
    details: ['Container Orchestration', 'Multi-stage Builds', 'Docker Compose', 'Container Security'],
    certifications: ['Docker Certified Associate'],
  },
  {
    name: 'Python',
    category: 'development',
    level: 89,
    icon: faPython,
    color: 'from-blue-600 to-indigo-600',
    experience: '4+ years',
    projects: 35,
    details: ['Data Analysis', 'Web Scraping', 'Automation Scripts', 'Machine Learning'],
    certifications: ['Python Professional'],
  },
  {
    name: 'Git',
    category: 'development',
    level: 94,
    icon: faGitAlt,
    color: 'from-red-500 to-orange-500',
    experience: '5+ years',
    projects: 50,
    details: ['Version Control', 'Branch Management', 'CI/CD Integration', 'Team Collaboration'],
    certifications: ['Git Advanced'],
  },
];

const STAT_ICONS = [faLayerGroup, faChartLine, faFolderOpen, faCertificate];

const getCategoryName = (categoryId) =>
  CATEGORIES.find((category) => category.id === categoryId)?.name ?? categoryId;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SkillCell = ({
  skill,
  darkMode,
  heading,
  muted,
  accent,
  gradient,
  cellBg,
  cellHover,
  prefersReducedMotion,
  isFeatured,
  isWide,
  getCategoryName,
  onSelect,
}) => (
  <button
    type="button"
    onClick={() => onSelect(skill)}
    className={`group relative flex h-full min-h-[16rem] w-full flex-col overflow-hidden p-5 text-left transition-all duration-300 active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 md:p-6 ${
      isWide ? 'md:min-h-[14rem] lg:min-h-[12.5rem]' : 'md:min-h-[17rem]'
    } rounded-[var(--radius-glass-lg)] ${cellBg} ${cellHover} ${
      isFeatured
        ? darkMode
          ? 'ring-1 ring-inset ring-amber-400/25 bg-amber-500/[0.04]'
          : 'ring-1 ring-inset ring-amber-500/20 bg-amber-50/60'
        : ''
    }`}
    aria-label={`View details for ${skill.name}, ${skill.level}% proficiency`}
  >
    <div
      className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b opacity-80 ${skill.color}`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${skill.color}`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25 group-focus-visible:opacity-25 ${skill.color}`}
      aria-hidden="true"
    />

    <div className={`relative z-10 flex flex-1 flex-col pl-2 ${isWide ? 'lg:flex-row lg:items-stretch lg:gap-8' : ''}`}>
      <div className={`${isWide ? 'lg:flex lg:min-w-0 lg:flex-1 lg:flex-col' : ''}`}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`rounded-[14px] p-[1.5px] bg-gradient-to-br ${skill.color} shadow-md`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-r ${skill.color}`}>
                <FontAwesomeIcon icon={skill.icon} className="text-xl text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className={`truncate text-lg font-bold ${heading}`}>{skill.name}</h3>
              <p className={`text-xs font-medium ${muted}`}>
                {skill.experience}
                <span className="mx-1.5 opacity-40" aria-hidden="true">·</span>
                {getCategoryName(skill.category)}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {isFeatured && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  darkMode ? 'liquid-glass-chip-dark text-amber-300' : 'liquid-glass-chip text-amber-700'
                }`}
              >
                <FontAwesomeIcon icon={faStar} className="text-[8px]" aria-hidden="true" />
                Top
              </span>
            )}
            {skill.certifications?.length > 0 && (
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                }`}
                title="Certified"
              >
                <FontAwesomeIcon icon={faCertificate} className={`text-xs ${accent}`} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>

        {isWide && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {skill.details.slice(0, 3).map((detail) => (
              <span
                key={detail}
                className={`px-2.5 py-1 text-xs font-medium ${
                  darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
                }`}
              >
                {detail}
              </span>
            ))}
            {skill.details.length > 3 && (
              <span className={`px-2.5 py-1 text-xs font-semibold ${accent}`}>
                +{skill.details.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={`${isWide ? 'lg:flex lg:min-w-[42%] lg:max-w-md lg:flex-col lg:justify-between' : 'flex flex-1 flex-col'}`}>
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${muted}`}>
              Proficiency
            </span>
            <span className={`bg-gradient-to-r bg-clip-text text-sm font-bold tabular-nums text-transparent ${gradient}`}>
              {skill.level}%
            </span>
          </div>
          <div
            className={`h-2.5 overflow-hidden rounded-full ${darkMode ? 'liquid-glass-progress-dark' : 'liquid-glass-progress'}`}
            role="progressbar"
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} proficiency`}
          >
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: 'easeOut' }}
            />
          </div>
        </div>

        {!isWide && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {skill.details.slice(0, 2).map((detail) => (
              <span
                key={detail}
                className={`px-2.5 py-1 text-xs font-medium ${
                  darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
                }`}
              >
                {detail}
              </span>
            ))}
            {skill.details.length > 2 && (
              <span className={`px-2.5 py-1 text-xs font-semibold ${accent}`}>
                +{skill.details.length - 2}
              </span>
            )}
          </div>
        )}

        <div className={`mt-auto flex items-center justify-between gap-3 pt-2 text-xs ${muted}`}>
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon icon={faRocket} aria-hidden="true" />
            {skill.projects} projects
          </span>
          <span
            className={`inline-flex items-center gap-1.5 font-semibold opacity-100 transition-opacity sm:opacity-60 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 ${accent}`}
          >
            Details
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  </button>
);

SkillCell.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    icon: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    projects: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
    certifications: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  muted: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  cellBg: PropTypes.string.isRequired,
  cellHover: PropTypes.string.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool,
  isWide: PropTypes.bool,
  getCategoryName: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

SkillCell.defaultProps = {
  isFeatured: false,
  isWide: false,
};

const Skills = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const tabRefs = useRef({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => {
    const counts = { all: SKILLS.length };
    CATEGORIES.forEach((category) => {
      if (category.id !== 'all') {
        counts[category.id] = SKILLS.filter((skill) => skill.category === category.id).length;
      }
    });
    return counts;
  }, []);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let skills = selectedCategory === 'all'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === selectedCategory);

    if (query) {
      skills = skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query)
          || skill.details.some((detail) => detail.toLowerCase().includes(query))
          || getCategoryName(skill.category).toLowerCase().includes(query),
      );
    }

    return [...skills].sort((a, b) => b.level - a.level);
  }, [selectedCategory, searchQuery]);

  const featuredSkillNames = useMemo(
    () => new Set([...SKILLS].sort((a, b) => b.level - a.level).slice(0, 3).map((skill) => skill.name)),
    [],
  );

  const showHeroLayout = selectedCategory === 'all' && !searchQuery.trim();
  const hasActiveFilters = selectedCategory !== 'all' || Boolean(searchQuery.trim());

  const resetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSearchQuery('');
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategory('all');
      return;
    }
    setSelectedCategory((current) => (current === categoryId ? 'all' : categoryId));
  }, []);

  const navigateSkill = useCallback((direction) => {
    if (!selectedSkill || filteredSkills.length <= 1) return;
    const currentIndex = filteredSkills.findIndex((skill) => skill.name === selectedSkill.name);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredSkills.length) % filteredSkills.length;
    setSelectedSkill(filteredSkills[nextIndex]);
  }, [selectedSkill, filteredSkills]);

  const summaryStats = useMemo(() => {
    const totalProjects = SKILLS.reduce((sum, s) => sum + s.projects, 0);
    const avgLevel = Math.round(SKILLS.reduce((sum, s) => sum + s.level, 0) / SKILLS.length);
    const certified = SKILLS.filter((s) => s.certifications?.length).length;
    return [
      { label: 'Technologies', value: SKILLS.length, icon: STAT_ICONS[0] },
      { label: 'Avg. Proficiency', value: `${avgLevel}%`, icon: STAT_ICONS[1] },
      { label: 'Projects Built', value: totalProjects, icon: STAT_ICONS[2] },
      { label: 'Certified', value: certified, icon: STAT_ICONS[3] },
    ];
  }, []);

  const categoryLabel = useMemo(
    () => CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? 'All',
    [selectedCategory],
  );

  useEffect(() => {
    if (!selectedSkill) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedSkill(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateSkill(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateSkill(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedSkill, navigateSkill]);

  useEffect(() => {
    tabRefs.current[selectedCategory]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [selectedCategory, prefersReducedMotion]);

  const handleCategoryKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % CATEGORIES.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = CATEGORIES.length - 1;

    const nextCategory = CATEGORIES[nextIndex];
    setSelectedCategory(nextCategory.id);
    tabRefs.current[nextCategory.id]?.focus();
  };

  const {
    muted, body, heading, accent, gradient, panel, inset, nested, divider, topEdge, cellBg, cellHover, sectionBg, gridGap, footerWash,
  } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);

  return (
    <section
      id="skills"
      className={`section-shell relative w-full overflow-hidden py-20 md:py-28 ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <SectionHeading
            badge="My Expertise"
            title="Skills & Technologies"
            subtitle="Tools and frameworks I use to ship reliable, polished products"
            darkMode={darkMode}
            align="left"
            badgeIcon={<FontAwesomeIcon icon={faCode} className="h-4 w-4" aria-hidden="true" />}
          />

          <motion.div
            className="relative w-full"
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
          >
            <div className={`border-b px-6 py-6 md:px-10 md:py-8 ${divider}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                  Overview
                </p>
              </div>
              <div className={`overflow-hidden ${nested}`}>
                <div className={`grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0 ${divider}`}>
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
                      <p className={`text-xl font-bold tabular-nums md:text-2xl ${
                        stat.label === 'Avg. Proficiency'
                          ? `bg-gradient-to-r bg-clip-text text-transparent ${gradient}`
                          : heading
                      }`}
                      >
                        {stat.value}
                      </p>
                      <p className={`mt-1 text-[10px] font-medium md:text-xs ${muted}`}>{stat.label}</p>
                      <div
                        className={`pointer-events-none absolute inset-x-4 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 ${gradient}`}
                        aria-hidden="true"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`border-b px-6 py-5 md:px-10 md:py-6 ${divider}`}>
              <div className={`flex flex-col gap-4 lg:flex-row lg:items-center ${inset} rounded-[var(--radius-glass-lg)] p-4 md:p-5`}>
                <label className={`flex min-h-11 flex-1 items-center gap-3 px-4 py-2.5 ${
                  darkMode ? 'liquid-glass-input-dark' : 'liquid-glass-input'
                }`}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-sm ${muted}`} aria-hidden="true" />
                  <span className="sr-only">Search skills</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search skills…"
                    className={`w-full bg-transparent text-sm outline-none placeholder:opacity-60 ${heading}`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className={`shrink-0 rounded-lg px-2 py-1 text-xs font-semibold ${accent}`}
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  )}
                </label>

                <div className="flex flex-col gap-3 lg:max-w-[58%] lg:items-end">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className={`inline-flex min-h-9 items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold lg:self-end ${
                      darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" aria-hidden="true" />
                    Reset filters
                  </button>
                )}
                <div
                  className="relative flex w-full flex-wrap gap-2 overflow-x-auto scroll-px-2 pb-1 snap-x snap-mandatory scrollbar-none lg:justify-end lg:overflow-visible lg:pb-0"
                  role="tablist"
                  aria-label="Filter skills by category"
                >
                  {CATEGORIES.map((category, index) => {
                    const isActive = selectedCategory === category.id;
                    const count = categoryCounts[category.id];
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
                        className={`relative snap-start shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-11 ${
                          isActive
                            ? 'text-white'
                            : darkMode
                              ? 'liquid-glass-chip-dark text-slate-200'
                              : 'liquid-glass-chip text-slate-700'
                        }`}
                      >
                        {isActive && !prefersReducedMotion && (
                          <motion.span
                            layoutId="skills-active-tab"
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
                          {category.name}
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
                            {count}
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
              className="p-6 md:p-10"
              role="region"
              aria-label={`${filteredSkills.length} skills`}
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                      Skill stack
                    </p>
                  </div>
                  <p className={`text-sm ${body}`} aria-live="polite">
                    <span className={`font-semibold ${heading}`}>{filteredSkills.length}</span> of{' '}
                    <span className={`font-semibold ${heading}`}>{SKILLS.length}</span> shown
                    {selectedCategory !== 'all' ? (
                      <> in <span className={`font-semibold ${accent}`}>{categoryLabel}</span></>
                    ) : null}
                    {searchQuery.trim() ? (
                      <> · matching <span className={`font-semibold ${accent}`}>"{searchQuery.trim()}"</span></>
                    ) : null}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`text-xs ${muted}`}>
                    {showHeroLayout ? 'Strongest skill featured · Top 3 highlighted' : 'Sorted by proficiency'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className={`text-xs font-semibold underline-offset-2 hover:underline ${accent}`}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
                  gridGap
                }`}
              >
              <AnimatePresence mode="popLayout">
                {filteredSkills.length === 0 ? (
                  <motion.div
                    key="empty"
                    layout={!prefersReducedMotion}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`col-span-full px-6 py-12 text-center ${cellBg}`}
                  >
                    <p className={`mb-2 text-lg font-semibold ${heading}`}>No matching skills</p>
                    <p className={`mb-6 text-sm ${body}`}>
                      No skills match your current filters. Try a different category or reset everything.
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
                  filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      layout={!prefersReducedMotion}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.97 }}
                      className={`h-full ${showHeroLayout && index === 0 ? 'sm:col-span-2' : ''}`}
                    >
                      <SkillCell
                        skill={skill}
                        darkMode={darkMode}
                        heading={heading}
                        muted={muted}
                        accent={accent}
                        gradient={gradient}
                        cellBg={cellBg}
                        cellHover={cellHover}
                        prefersReducedMotion={prefersReducedMotion}
                        isFeatured={featuredSkillNames.has(skill.name)}
                        isWide={showHeroLayout && index === 0}
                        getCategoryName={getCategoryName}
                        onSelect={setSelectedSkill}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              </div>
            </motion.div>

            <div
              className={`flex flex-col items-center justify-between gap-5 border-t px-6 py-8 sm:flex-row md:px-10 lg:px-12 ${
                divider
              } ${footerWash}`}
            >
              <p className={`max-w-md text-center text-sm sm:text-left md:text-base ${body}`}>
                See these skills applied in real-world projects.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <MotionLink
                  to="/projects"
                  className="liquid-glass-btn-primary group inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
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

      <AnimatePresence>
        {selectedSkill && (() => {
          const modalIndex = filteredSkills.findIndex((skill) => skill.name === selectedSkill.name);
          const canNavigate = filteredSkills.length > 1 && modalIndex !== -1;

          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="liquid-glass-overlay fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
            onClick={() => setSelectedSkill(null)}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-modal-title"
              aria-describedby="skill-modal-desc"
              initial={{ scale: 0.96, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassPanel
                darkMode={darkMode}
                prefersReducedMotion={prefersReducedMotion}
                panelClass={panel}
                topEdge={topEdge}
                wash={panelWash}
                edgeInset="inset-x-8"
                scrollable
                className="max-h-[92vh] rounded-t-[28px] sm:rounded-[28px]"
              >
              <div className="flex items-center justify-center pt-3 sm:hidden" aria-hidden="true">
                <span className={`h-1 w-10 rounded-full ${darkMode ? 'bg-white/20' : 'bg-slate-300'}`} />
              </div>

              <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3">
                {canNavigate ? (
                  <button
                    type="button"
                    onClick={() => navigateSkill(-1)}
                    className={`flex min-h-11 min-w-11 items-center justify-center ${
                      darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                    }`}
                    aria-label="Previous skill"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
                  </button>
                ) : (
                  <span className="min-w-11" aria-hidden="true" />
                )}

                {canNavigate ? (
                  <p className={`text-xs font-medium tabular-nums ${muted}`}>
                    {modalIndex + 1} / {filteredSkills.length}
                  </p>
                ) : (
                  <span aria-hidden="true" />
                )}

                <div className="flex items-center gap-2">
                  {canNavigate && (
                    <button
                      type="button"
                      onClick={() => navigateSkill(1)}
                      className={`hidden min-h-11 min-w-11 items-center justify-center sm:flex ${
                        darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                      }`}
                      aria-label="Next skill"
                    >
                      <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
                    </button>
                  )}
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className={`flex min-h-11 min-w-11 items-center justify-center ${
                      darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                    }`}
                    aria-label="Close skill details"
                  >
                    <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden px-6 pb-6 pt-16 md:px-8 md:pb-8 md:pt-20">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b opacity-25 ${selectedSkill.color}`}
                  aria-hidden="true"
                />
                <div className="relative mb-6 flex items-start gap-4 pr-12">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r shadow-lg ring-4 ring-white/10 ${selectedSkill.color}`}>
                    <FontAwesomeIcon icon={selectedSkill.icon} className="text-2xl text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 id="skill-modal-title" className={`mb-2 text-2xl font-bold ${heading}`}>
                      {selectedSkill.name}
                    </h3>
                    <p id="skill-modal-desc" className={`mb-3 text-sm ${body}`}>
                      {selectedSkill.experience} experience across {selectedSkill.projects} projects.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold ${
                          darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-600'
                        }`}
                      >
                        {getCategoryName(selectedSkill.category)}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold ${
                          darkMode ? 'liquid-glass-chip-dark text-emerald-300' : 'liquid-glass-chip text-emerald-700'
                        }`}
                      >
                        {selectedSkill.level}% proficiency
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold ${
                          darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-600'
                        }`}
                      >
                        {selectedSkill.projects} projects
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${muted}`}>
                      Proficiency
                    </span>
                    <span className={`bg-gradient-to-r bg-clip-text text-lg font-bold tabular-nums text-transparent ${gradient}`}>
                      {selectedSkill.level}%
                    </span>
                  </div>
                  <div
                    className={`h-3 overflow-hidden rounded-full ${darkMode ? 'liquid-glass-progress-dark' : 'liquid-glass-progress'}`}
                    role="progressbar"
                    aria-valuenow={selectedSkill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${selectedSkill.name} proficiency`}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${selectedSkill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {selectedSkill.certifications?.length > 0 && (
                  <div className="mb-8">
                    <h4 className={`mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                      <FontAwesomeIcon icon={faCertificate} className={accent} aria-hidden="true" />
                      Certifications
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {selectedSkill.certifications.map((cert) => (
                        <div
                          key={cert}
                          className={`flex items-center gap-2.5 rounded-xl p-3 text-sm ${body} ${inset}`}
                        >
                          <FontAwesomeIcon icon={faCertificate} className={`shrink-0 text-xs ${accent}`} aria-hidden="true" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className={`mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" aria-hidden="true" />
                    Key competencies
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {selectedSkill.details.map((detail) => (
                      <div
                        key={detail}
                        className={`flex items-center gap-2.5 rounded-xl p-3 text-sm ${body} ${inset}`}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={`shrink-0 text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                          aria-hidden="true"
                        />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`sticky bottom-0 -mx-6 border-t px-6 py-4 backdrop-blur-md md:-mx-8 md:px-8 ${divider} ${
                    darkMode ? 'bg-slate-950/80' : 'bg-white/80'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {canNavigate && (
                      <button
                        type="button"
                        onClick={() => navigateSkill(1)}
                        className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold sm:hidden ${
                          darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                        }`}
                      >
                        Next skill
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs" aria-hidden="true" />
                      </button>
                    )}
                    <MotionLink
                      to="/projects"
                      onClick={() => setSelectedSkill(null)}
                      className="liquid-glass-btn-primary group inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold"
                      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      See projects using {selectedSkill.name}
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </MotionLink>
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(null)}
                      className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold sm:flex-none ${
                        darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                      }`}
                    >
                      Close
                    </button>
                  </div>
                  {canNavigate && (
                    <p className={`mt-3 hidden text-center text-[11px] sm:block ${muted}`}>
                      Use arrow keys to browse skills in this view
                    </p>
                  )}
                </div>
              </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

Skills.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Skills);
