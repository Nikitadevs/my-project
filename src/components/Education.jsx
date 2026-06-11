import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faCheck,
  faArrowRight,
  faCalendar,
  faTrophy,
  faBook,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import SectionBackground from './SectionBackground';
import SectionHeading from './SectionHeading';
import GlassPanel from './GlassPanel';
import { getSectionTheme, getVioletPanelWash } from './themeTokens';
import useReducedMotion from '../hooks/useReducedMotion';
import { education } from './siteData';

const MotionLink = motion.create(Link);
const STAT_ICONS = [faGraduationCap, faTrophy, faBook];
const ACCENT_GRADIENTS = ['from-violet-500 to-purple-500', 'from-blue-500 to-indigo-500'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const getEntryId = (edu) => `${edu.school}-${edu.period}`;

const EducationEntryDetails = ({
  edu,
  darkMode,
  body,
  muted,
  divider,
}) => (
  <div className={`border-t px-5 pb-5 pt-4 md:px-7 md:pb-7 md:pt-5 ${divider}`}>
    <p className={`mb-6 pl-2 text-sm leading-relaxed md:text-base ${body}`}>{edu.description}</p>

    <div className="mb-6 pl-2">
      <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
        Key achievements
      </p>
      <ul className="space-y-2.5">
        {edu.achievements.map((achievement) => (
          <li key={achievement} className="flex items-start gap-2.5">
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
            <span className={`text-sm leading-relaxed md:text-base ${body}`}>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="pl-2">
      <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
        Key courses
      </p>
      <div className="flex flex-wrap gap-2">
        {edu.courses.map((course) => (
          <Link
            key={course}
            to="/skills"
            className={`px-2.5 py-1 text-xs font-medium transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:text-sm ${
              darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            {course}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

EducationEntryDetails.propTypes = {
  edu: PropTypes.shape({
    description: PropTypes.string.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  body: PropTypes.string.isRequired,
  muted: PropTypes.string.isRequired,
  divider: PropTypes.string.isRequired,
};

const EducationEntry = ({
  edu,
  index,
  darkMode,
  heading,
  body,
  muted,
  accent,
  accentColor,
  cellBg,
  cellHover,
  divider,
  prefersReducedMotion,
  isExpanded,
  onToggle,
  alwaysExpanded = false,
}) => {
  const showDetails = alwaysExpanded || isExpanded;

  const header = (
    <>
      <div className="flex items-start gap-4 pl-2">
        <div className={`rounded-[14px] p-[1.5px] bg-gradient-to-br ${accentColor} shadow-md`}>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-br text-lg font-bold text-white md:h-14 md:w-14 md:text-xl ${accentColor}`}
          >
            {edu.school.charAt(0)}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className={`text-lg font-bold leading-tight md:text-2xl ${heading}`}>{edu.degree}</h3>
            {edu.current && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold ${
                  darkMode ? 'liquid-glass-chip-dark text-amber-300' : 'liquid-glass-chip text-amber-700'
                }`}
              >
                {!prefersReducedMotion && (
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-amber-400"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                )}
                In progress
              </span>
            )}
          </div>
          <p className={`text-base font-semibold md:text-lg ${accent}`}>{edu.school}</p>
        </div>
        {!alwaysExpanded && (
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className={`hidden text-[10px] font-bold tabular-nums tracking-widest md:inline ${muted}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
              }`}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform duration-300 ${accent} ${isExpanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 pl-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm ${
            darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
          }`}
        >
          <FontAwesomeIcon icon={faCalendar} className="text-xs" aria-hidden="true" />
          {edu.period}
        </span>
        {!showDetails && (
          <>
            <span
              className={`inline-flex px-2.5 py-0.5 text-xs font-medium ${
                darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
              }`}
            >
              {edu.achievements.length} achievements
            </span>
            <span
              className={`inline-flex px-2.5 py-0.5 text-xs font-medium ${
                darkMode ? 'liquid-glass-chip-dark text-slate-300' : 'liquid-glass-chip text-slate-600'
              }`}
            >
              {edu.courses.length} courses
            </span>
          </>
        )}
      </div>

      {!showDetails && (
        <>
          <p className={`mt-4 line-clamp-2 pl-2 text-sm leading-relaxed md:text-base ${body}`}>
            {edu.description}
          </p>
          <span className={`mt-3 inline-flex items-center gap-1.5 pl-2 text-xs font-semibold ${accent}`}>
            View details
            <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" aria-hidden="true" />
          </span>
        </>
      )}
    </>
  );

  return (
    <div className="pl-10 md:col-start-2 md:pl-0">
      <div
        id={`education-${index}`}
        className={`group relative scroll-mt-28 overflow-hidden rounded-[var(--radius-glass-lg)] transition-all duration-300 ${cellBg} ${alwaysExpanded ? '' : cellHover} ${
          showDetails
            ? darkMode
              ? 'bg-white/[0.05] ring-1 ring-inset ring-white/10'
              : 'bg-slate-50/90 ring-1 ring-inset ring-slate-200/90'
            : ''
        } ${
          edu.current
            ? darkMode
              ? 'ring-1 ring-inset ring-amber-400/20'
              : 'ring-1 ring-inset ring-amber-500/15'
            : ''
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b opacity-80 ${accentColor}`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 ${accentColor}`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20 ${accentColor}`}
          aria-hidden="true"
        />

        {alwaysExpanded ? (
          <div className="relative z-10 p-5 md:p-7">{header}</div>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={`education-panel-${index}`}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${edu.degree} at ${edu.school}`}
            className="relative z-10 w-full p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 md:p-7"
          >
            {header}
          </button>
        )}

        {alwaysExpanded ? (
          <EducationEntryDetails edu={edu} darkMode={darkMode} body={body} muted={muted} divider={divider} />
        ) : (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={`education-panel-${index}`}
                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <EducationEntryDetails edu={edu} darkMode={darkMode} body={body} muted={muted} divider={divider} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

EducationEntry.propTypes = {
  edu: PropTypes.shape({
    school: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    current: PropTypes.bool,
    description: PropTypes.string.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  muted: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  accentColor: PropTypes.string.isRequired,
  cellBg: PropTypes.string.isRequired,
  cellHover: PropTypes.string.isRequired,
  divider: PropTypes.string.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  alwaysExpanded: PropTypes.bool,
};

const Education = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();
  const [expandedIds, setExpandedIds] = useState(() => {
    const current = education.find((edu) => edu.current) ?? education[0];
    return new Set([getEntryId(current)]);
  });

  const toggleEntry = useCallback((entryId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) next.delete(entryId);
      else next.add(entryId);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedIds(new Set(education.map(getEntryId)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  const jumpToEntry = useCallback((index, entryId) => {
    setExpandedIds((prev) => new Set(prev).add(entryId));
    document.getElementById(`education-${index}`)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [prefersReducedMotion]);

  const summaryStats = useMemo(() => {
    const achievements = education.reduce((sum, edu) => sum + edu.achievements.length, 0);
    const courses = education.reduce((sum, edu) => sum + edu.courses.length, 0);
    return [
      { label: 'Institutions', value: education.length, icon: STAT_ICONS[0] },
      { label: 'Achievements', value: achievements, icon: STAT_ICONS[1] },
      { label: 'Courses', value: courses, icon: STAT_ICONS[2] },
    ];
  }, []);

  const {
    muted, body, heading, panel, inset, nested, divider, topEdge, cellBg, cellHover, sectionBg, gridGap, footerWash,
  } = getSectionTheme(darkMode);
  const accent = darkMode ? 'text-purple-300' : 'text-purple-600';
  const gradient = darkMode
    ? 'from-violet-300 via-purple-300 to-pink-300'
    : 'from-violet-600 via-purple-600 to-pink-600';
  const panelWash = getVioletPanelWash(darkMode);

  return (
    <section
      id="education"
      className={`section-shell relative w-full overflow-hidden py-20 md:py-28 ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <SectionHeading
            badge="Education Journey"
            title="Education & Learning"
            subtitle="Academic foundation, coursework, and milestones along the way"
            darkMode={darkMode}
            align="left"
            badgeIcon={<FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4" aria-hidden="true" />}
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
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>Overview</p>
              </div>
              <div className={`overflow-hidden ${nested}`}>
                <div className={`grid grid-cols-3 divide-x divide-y sm:divide-y-0 ${divider}`}>
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
                          stat.label === 'Achievements'
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

            <motion.div
              className="relative px-6 py-8 md:px-10 md:py-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                    Timeline
                    <span className={`ml-2 normal-case tracking-normal ${body}`}>
                      · {education.length} {education.length === 1 ? 'institution' : 'institutions'}
                    </span>
                  </p>
                </div>
                {education.length === 1 ? (
                  <p className={`text-xs ${muted}`}>Academic details below</p>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={expandAll}
                      className={`rounded-full px-3 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                      }`}
                    >
                      Expand all
                    </button>
                    <button
                      type="button"
                      onClick={collapseAll}
                      className={`rounded-full px-3 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                      }`}
                    >
                      Collapse all
                    </button>
                  </div>
                )}
              </div>

              {education.length > 1 && (
                <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {education.map((edu, index) => (
                    <button
                      key={getEntryId(edu)}
                      type="button"
                      onClick={() => jumpToEntry(index, getEntryId(edu))}
                      className={`shrink-0 rounded-[var(--radius-glass-lg)] px-3.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        expandedIds.has(getEntryId(edu))
                          ? 'liquid-glass-btn-primary text-white'
                          : darkMode
                            ? 'liquid-glass-chip-dark text-slate-200'
                            : 'liquid-glass-chip text-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-semibold leading-tight">{edu.school}</span>
                      <span className={`mt-0.5 block text-[10px] font-medium ${
                        expandedIds.has(getEntryId(edu)) ? 'text-white/75' : muted
                      }`}
                      >
                        {edu.degree}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div
                className={`absolute left-[15px] top-[4.5rem] bottom-8 w-1 overflow-hidden rounded-full md:left-1/2 md:w-0.5 md:-translate-x-1/2 ${
                  darkMode ? 'liquid-glass-progress-dark' : 'liquid-glass-progress'
                }`}
                aria-hidden="true"
              >
                <motion.div
                  className={`absolute top-0 w-full rounded-full ${
                    darkMode
                      ? 'bg-gradient-to-b from-violet-400 via-purple-400 to-pink-400'
                      : 'bg-gradient-to-b from-violet-600 via-purple-600 to-pink-600'
                  }`}
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: 'easeInOut' }}
                />
              </div>

              <div className="space-y-4 md:space-y-8">
                {education.map((edu, index) => {
                  const accentColor = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];

                  return (
                    <motion.article
                      key={getEntryId(edu)}
                      variants={itemVariants}
                      className={`relative md:grid md:grid-cols-2 md:gap-x-14 ${
                        index > 0 ? `border-t md:border-t-0 ${divider}` : ''
                      } ${gridGap} md:bg-transparent`}
                      aria-label={`${edu.degree} at ${edu.school}`}
                    >
                      <motion.div
                        className={`absolute left-[11px] top-8 z-10 h-3.5 w-3.5 -translate-x-0 rounded-full md:left-1/2 md:top-10 md:h-4 md:w-4 md:-translate-x-1/2 bg-gradient-to-br shadow-lg ${accentColor} ${
                          darkMode ? 'shadow-purple-500/20' : 'shadow-purple-500/15'
                        }`}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.25 }}
                        transition={{ duration: 0.25 }}
                      >
                        {!prefersReducedMotion && edu.current && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${darkMode ? 'bg-violet-400' : 'bg-violet-500'}`}
                            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            aria-hidden="true"
                          />
                        )}
                      </motion.div>

                      <div className="hidden md:block" aria-hidden="true" />

                      <EducationEntry
                        edu={edu}
                        index={index}
                        darkMode={darkMode}
                        heading={heading}
                        body={body}
                        muted={muted}
                        accent={accent}
                        accentColor={accentColor}
                        cellBg={cellBg}
                        cellHover={cellHover}
                        divider={divider}
                        prefersReducedMotion={prefersReducedMotion}
                        isExpanded={expandedIds.has(getEntryId(edu))}
                        onToggle={() => toggleEntry(getEntryId(edu))}
                        alwaysExpanded={education.length === 1}
                      />
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>

            <div
              className={`flex flex-col items-center justify-between gap-5 border-t px-6 py-8 sm:flex-row md:px-10 lg:px-12 ${divider} ${
                darkMode
                  ? 'bg-gradient-to-r from-violet-500/[0.04] via-transparent to-purple-500/[0.04]'
                  : 'bg-gradient-to-r from-violet-500/[0.03] via-transparent to-purple-500/[0.03]'
              }`}
            >
              <p className={`max-w-md text-center text-sm sm:text-left md:text-base ${body}`}>
                Want to see how my education connects to hands-on technical skills?
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <MotionLink
                  to="/skills"
                  className="liquid-glass-btn-primary group inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Skills
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
                <MotionLink
                  to="/contact"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3 font-semibold sm:flex-none ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </MotionLink>
              </div>
            </div>
          </GlassPanel>
          </motion.div>
      </div>
    </section>
  );
};

Education.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Education);
