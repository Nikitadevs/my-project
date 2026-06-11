import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faLightbulb,
  faRocket,
  faCode,
  faHeart,
  faDownload,
  faBriefcase,
  faGraduationCap,
  faCheck,
  faUser,
  faArrowRight,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faQuoteLeft,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import SectionBackground from './SectionBackground';
import SectionHeading from './SectionHeading';
import GlassPanel from './GlassPanel';
import { getSectionTheme, getAboutPanelWash } from './themeTokens';
import useReducedMotion from '../hooks/useReducedMotion';
import {
  aboutHighlights,
  contactInfo,
  heroSkills,
  resumeDetails,
  siteMeta,
  socialLinks,
} from './siteData';

const MotionLink = motion.create(Link);

const HIGHLIGHT_ICONS = [faLightbulb, faRocket, faCode, faHeart];
const STAT_ICONS = [faBriefcase, faGraduationCap, faCode];
const STAT_LINKS = ['/experience', '/education', '/projects'];
const SOCIAL_ICONS = { GitHub: faGithub, LinkedIn: faLinkedin };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const ProfilePortrait = ({ darkMode, prefersReducedMotion, accent, gradient, heading }) => {
  const initial = siteMeta.name.charAt(0);
  const hasPhoto = Boolean(siteMeta.profileImage);
  const topEdge = darkMode
    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.92), transparent)';
  const frameGradient = darkMode
    ? 'linear-gradient(145deg, rgba(96,165,250,0.55), rgba(168,85,247,0.45), rgba(244,114,182,0.4))'
    : 'linear-gradient(145deg, rgba(59,130,246,0.45), rgba(147,51,234,0.35), rgba(236,72,153,0.3))';

  return (
    <div className="mx-auto w-full max-w-[360px] lg:mx-0 lg:max-w-none">
      <div
        className="w-full rounded-[30px] p-[1.5px] shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
        style={{ background: frameGradient }}
      >
        <div className="overflow-hidden rounded-[28px]">
          <div className="relative aspect-[4/5] w-full">
            {hasPhoto ? (
              <img
                src={siteMeta.profileImage}
                alt={`Portrait of ${siteMeta.name}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(255,255,255,0.34),transparent_48%)]"
                  aria-hidden="true"
                />
                <div
                  className={`absolute inset-0 opacity-[0.22] ${
                    darkMode
                      ? '[background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px]'
                      : '[background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:28px_28px]'
                  }`}
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative aspect-square w-[42%] min-w-[7.5rem] max-w-[11rem]">
                    {!prefersReducedMotion && (
                      <>
                        <motion.div
                          className={`absolute inset-[10%] rounded-full ${darkMode ? 'bg-blue-500/14' : 'bg-white/20'}`}
                          animate={{ scale: [1, 1.05, 1], opacity: [0.45, 0.75, 0.45] }}
                          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                          aria-hidden="true"
                        />
                        <motion.div
                          className={`absolute inset-0 rounded-full border ${darkMode ? 'border-white/14' : 'border-white/55'}`}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <div
                      className={`absolute inset-[14%] flex items-center justify-center rounded-[24%] ${
                        darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                      }`}
                    >
                      <span className={`bg-gradient-to-br bg-clip-text text-[clamp(3rem,11vw,4.5rem)] font-black leading-none text-transparent ${gradient}`}>
                        {initial}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div
              className="pointer-events-none absolute inset-x-6 top-0 z-[2] h-px"
              style={{ background: topEdge }}
              aria-hidden="true"
            />

            <div className="absolute left-4 top-4 z-[3] sm:left-5 sm:top-5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${
                  darkMode ? 'liquid-glass-chip-dark text-emerald-300' : 'liquid-glass-chip text-emerald-700'
                }`}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
                Open to work
              </span>
            </div>
          </div>

          <div
            className={`border-t px-5 py-4 sm:px-6 sm:py-5 ${
              darkMode ? 'border-white/10 liquid-glass-cell-dark' : 'border-slate-200/80 liquid-glass-cell'
            }`}
          >
            <p className={`text-xl font-bold leading-tight tracking-tight sm:text-2xl ${heading}`}>
              {siteMeta.name}
            </p>
            <p className={`mt-1 text-sm font-medium sm:text-base ${accent}`}>
              {siteMeta.title}
            </p>
            <div
              className={`mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r ${gradient}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilePortrait.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  prefersReducedMotion: PropTypes.bool.isRequired,
  accent: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

const ProfileContact = ({ darkMode, inset, accent, muted, cellHover, email, location, phone }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    if (!email?.value) return;
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = email.link;
    }
  }, [email]);

  const rows = [
    email?.link && { icon: faEnvelope, label: 'Email', value: email.value, href: email.link },
    location && { icon: faMapMarkerAlt, label: 'Location', value: location },
    phone?.link && { icon: faPhone, label: 'Phone', value: phone.value, href: phone.link },
  ].filter(Boolean);

  if (rows.length === 0) return null;

  return (
    <div className={`w-full space-y-1 rounded-[var(--radius-glass-lg)] p-3 md:p-4 ${inset}`}>
      {rows.map((row) => {
        const content = (
          <>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'}`}>
              <FontAwesomeIcon icon={row.icon} className={`text-xs ${accent}`} aria-hidden="true" />
            </span>
            <span className="min-w-0 text-left">
              <span className={`block text-[10px] font-semibold uppercase tracking-wider ${muted}`}>{row.label}</span>
              <span className={`block truncate text-sm font-medium ${row.href ? accent : darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {row.value}
              </span>
            </span>
          </>
        );

        return row.href ? (
          <div
            key={row.label}
            className={`flex min-h-11 items-center gap-2 rounded-xl px-2 py-2.5 transition-colors ${
              cellHover
            }`}
          >
            <a
              href={row.href}
              className="flex min-w-0 flex-1 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {content}
            </a>
            {row.label === 'Email' && (
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'liquid-glass-icon-dark text-slate-300' : 'liquid-glass-icon text-slate-600'
                }`}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" aria-hidden="true" />
              </button>
            )}
          </div>
        ) : (
          <div key={row.label} className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-2.5">
            {content}
          </div>
        );
      })}
    </div>
  );
};

ProfileContact.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  inset: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  muted: PropTypes.string.isRequired,
  cellHover: PropTypes.string.isRequired,
  email: PropTypes.shape({ value: PropTypes.string, link: PropTypes.string }),
  location: PropTypes.string,
  phone: PropTypes.shape({ value: PropTypes.string, link: PropTypes.string }),
};

const About = ({ darkMode }) => {
  const prefersReducedMotion = useReducedMotion();
  const downloadStateRef = useRef('idle');
  const [downloadState, setDownloadState] = useState('idle');

  const highlights = useMemo(
    () => aboutHighlights.map((item, index) => ({ ...item, icon: HIGHLIGHT_ICONS[index] })),
    [],
  );

  const resumeStats = useMemo(
    () => resumeDetails.map((detail, index) => ({
      ...detail,
      icon: STAT_ICONS[index],
      href: STAT_LINKS[index],
    })),
    [],
  );

  const contactLocation = contactInfo.find((info) => info.label === 'Location')?.value;
  const email = contactInfo.find((info) => info.label === 'Email');
  const phone = contactInfo.find((info) => info.label === 'Phone');

  const handleDownload = useCallback((e) => {
    e.preventDefault();
    if (downloadStateRef.current !== 'idle') return;

    downloadStateRef.current = 'downloading';
    setDownloadState('downloading');

    const link = document.createElement('a');
    link.href = siteMeta.resumePath;
    link.download = 'resume.pdf';
    link.click();

    window.setTimeout(() => {
      downloadStateRef.current = 'completed';
      setDownloadState('completed');
      window.setTimeout(() => {
        downloadStateRef.current = 'idle';
        setDownloadState('idle');
      }, 1800);
    }, 350);
  }, []);

  const {
    muted, body, accent, heading, gradient, panel, inset, nested, topEdge, divider, cellBg, cellHover, sectionBg, footerWash,
  } = getSectionTheme(darkMode);
  const panelWash = getAboutPanelWash(darkMode);
  const identityWash = darkMode
    ? 'lg:bg-gradient-to-b lg:from-blue-500/[0.07] lg:via-transparent lg:to-purple-500/[0.05]'
    : 'lg:bg-gradient-to-b lg:from-blue-500/[0.05] lg:via-transparent lg:to-purple-500/[0.04]';
  const dropCap = darkMode
    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:font-black first-letter:text-5xl first-letter:leading-none first-letter:text-blue-300'
    : 'first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:font-black first-letter:text-5xl first-letter:leading-none first-letter:text-blue-600';

  return (
    <section
      id="about"
      className={`section-shell relative w-full overflow-hidden py-20 md:py-28 ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <SectionHeading
            badge="About Me"
            title="Who I Am"
            subtitle={siteMeta.tagline}
            darkMode={darkMode}
            align="left"
            badgeIcon={<FontAwesomeIcon icon={faUser} className="h-4 w-4" aria-hidden="true" />}
          />

          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, y: 24 }}
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
            <div className="grid w-full lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:gap-0 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
              <motion.aside
                className={`flex w-full flex-col items-center gap-5 p-6 text-center md:gap-6 md:p-8 lg:items-stretch lg:border-r lg:p-10 lg:text-left ${divider} ${identityWash}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${muted}`}>
                    Profile
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <ProfilePortrait
                    darkMode={darkMode}
                    prefersReducedMotion={prefersReducedMotion}
                    accent={accent}
                    gradient={gradient}
                    heading={heading}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <ProfileContact
                    darkMode={darkMode}
                    inset={inset}
                    accent={accent}
                    muted={muted}
                    cellHover={cellHover}
                    email={email}
                    location={contactLocation}
                    phone={phone}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="grid w-full grid-cols-2 gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} profile`}
                      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        darkMode ? 'liquid-glass-icon-dark text-slate-200' : 'liquid-glass-icon text-slate-700'
                      }`}
                    >
                      <FontAwesomeIcon icon={SOCIAL_ICONS[social.name] ?? faUser} aria-hidden="true" />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </motion.div>
              </motion.aside>

              <motion.div
                className="min-w-0 space-y-7 p-6 md:space-y-8 md:p-11 lg:p-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...containerVariants, visible: { ...containerVariants.visible, transition: { staggerChildren: 0.06, delayChildren: 0.06 } } }}
              >
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${muted}`}>
                    Background
                  </p>
                </motion.div>

                <motion.blockquote
                  variants={itemVariants}
                  className={`relative overflow-hidden rounded-[var(--radius-glass-lg)] px-5 py-4 pl-6 text-lg font-medium leading-snug md:px-6 md:py-5 md:pl-7 md:text-[1.35rem] ${nested} ${body}`}
                >
                  <span
                    className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b ${gradient}`}
                    aria-hidden="true"
                  />
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className={`pointer-events-none absolute right-4 top-3 text-3xl opacity-[0.12] md:text-4xl ${accent}`}
                    aria-hidden="true"
                  />
                  Building products that are{' '}
                  <span className={`bg-gradient-to-r bg-clip-text font-semibold text-transparent ${gradient}`}>
                    fast, accessible, and polished
                  </span>
                  .
                </motion.blockquote>

                <div className="w-full space-y-5">
                  <motion.p variants={itemVariants} className={`text-base leading-[1.8] md:text-lg ${body} ${dropCap}`}>
                    I'm a passionate computer engineer focused on intuitive, performant web
                    applications. I enjoy turning complex problems into simple, polished solutions
                    that feel great to use.
                  </motion.p>

                  <motion.p variants={itemVariants} className={`text-base leading-[1.8] md:text-lg ${body}`}>
                    Outside of shipping features, I explore new technologies, contribute to
                    open-source, and share what I learn through writing and mentoring.
                  </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                  <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                    Core stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {heroSkills.map((skill, index) => (
                      <MotionLink
                        key={skill}
                        to="/skills"
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium sm:text-sm ${
                          darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'
                        }`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
                        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {skill}
                      </MotionLink>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                    At a glance
                  </p>
                  <div className={`overflow-hidden ${nested}`}>
                    <div className={`grid grid-cols-3 divide-x divide-y sm:divide-y-0 ${divider}`}>
                      {resumeStats.map((stat) => (
                        <MotionLink
                          key={stat.label}
                          to={stat.href}
                          className={`group relative px-2 py-5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:px-3 ${
                            darkMode ? 'hover:bg-white/[0.05]' : 'hover:brightness-[1.015]'
                          }`}
                          whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                          aria-label={`${stat.value} ${stat.label}`}
                        >
                          <div
                            className={`pointer-events-none absolute inset-x-3 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${gradient}`}
                            aria-hidden="true"
                          />
                          <span
                            className={`mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                              darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'
                            }`}
                          >
                            <FontAwesomeIcon icon={stat.icon} className={`text-xs ${accent}`} aria-hidden="true" />
                          </span>
                          <p
                            className={`text-lg font-bold tabular-nums leading-none sm:text-xl md:text-2xl ${
                              stat.label === 'Experience' || stat.label === 'Education' || stat.label === 'Projects'
                                ? `bg-gradient-to-r bg-clip-text text-transparent ${gradient}`
                                : heading
                            }`}
                          >
                            {stat.value}
                          </p>
                          <p className={`mt-1.5 text-[10px] font-medium sm:text-[11px] ${muted}`}>{stat.label}</p>
                          <span
                            className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 ${accent}`}
                          >
                            Open
                            <FontAwesomeIcon icon={faArrowRight} className="text-[8px]" aria-hidden="true" />
                          </span>
                        </MotionLink>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row" aria-live="polite">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloadState === 'downloading'}
                    aria-label="Download resume"
                    aria-busy={downloadState === 'downloading'}
                    className={`liquid-glass-btn-primary inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-70 sm:flex-none ${
                      downloadState === 'completed' ? '!from-emerald-600 !to-green-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={downloadState === 'completed' ? faCheck : faDownload}
                      className={downloadState === 'downloading' ? 'animate-pulse' : ''}
                      aria-hidden="true"
                    />
                    {downloadState === 'idle' && 'Download Resume'}
                    {downloadState === 'downloading' && 'Downloading…'}
                    {downloadState === 'completed' && 'Downloaded!'}
                  </button>

                  <MotionLink
                    to="/contact"
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 py-3.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none ${
                      darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                    }`}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get in Touch
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" aria-hidden="true" />
                  </MotionLink>
                </motion.div>
              </motion.div>
            </div>

            <div className={`border-t ${divider}`}>
              <motion.div
                className={`border-b px-6 py-7 md:px-10 md:py-8 lg:px-12 ${divider}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
                      Principles
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold tracking-tight md:text-3xl ${heading}`}>What drives me</h3>
                  <p className={`mt-2 max-w-2xl text-base ${body}`}>
                    The values behind how I design, build, and ship.
                  </p>
                </div>
              </motion.div>

              <div
                className="px-6 md:px-10 lg:px-12"
                role="region"
                aria-label="What drives me highlights"
              >
                <div className="grid w-full grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 md:py-8">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={`group relative min-w-0 rounded-[var(--radius-glass-lg)] p-6 transition-all duration-300 md:p-7 lg:p-8 ${cellBg} ${cellHover}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.38 }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b opacity-70 ${item.color}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`pointer-events-none absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 ${item.color}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`pointer-events-none absolute bottom-0 right-0 h-20 w-20 bg-gradient-to-tl opacity-[0.07] ${item.color}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25 ${item.color}`}
                      aria-hidden="true"
                    />

                    <div className="mb-5 flex items-start justify-between gap-3 pl-2">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r shadow-lg transition-transform duration-300 group-hover:scale-105 ${item.color}`}>
                        <FontAwesomeIcon icon={item.icon} className="text-white" aria-hidden="true" />
                      </div>
                      <span className={`text-[10px] font-bold tabular-nums tracking-widest ${muted}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h4 className={`mb-2 pl-2 text-base font-bold md:text-lg ${heading}`}>{item.title}</h4>
                    <p className={`mb-5 pl-2 text-sm leading-relaxed ${muted}`}>{item.description}</p>
                    <span
                      className={`ml-2 inline-flex px-3 py-1.5 text-xs font-semibold ${
                        darkMode ? 'liquid-glass-tag-dark text-slate-200' : 'liquid-glass-tag text-slate-700'
                      }`}
                    >
                      {item.stats}
                    </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className={`relative flex flex-col items-center justify-between gap-5 border-t px-6 py-8 sm:flex-row md:px-10 lg:px-12 ${divider} ${
                  footerWash
                }`}
              >
                <p className={`max-w-md text-center text-sm sm:text-left md:text-base ${body}`}>
                  Want to see these principles in action?
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
            </div>
          </GlassPanel>
          </motion.div>
      </div>
    </section>
  );
};

About.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(About);
