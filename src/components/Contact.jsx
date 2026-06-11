import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faPaperPlane,
  faCheckCircle,
  faClock,
  faArrowRight,
  faComments,
  faCheck,
  faFolderOpen,
  faUser,
  faTag,
  faHandshake,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import SectionBackground from './SectionBackground';
import SectionHeading from './SectionHeading';
import GlassPanel from './GlassPanel';
import GlassCell from './GlassCell';
import { getSectionTheme, getBluePanelWash } from './themeTokens';
import useReducedMotion from '../hooks/useReducedMotion';
import { contactInfo, siteMeta, socialLinks } from './siteData';

const MotionLink = motion.create(Link);
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;

const SUBJECT_PRESETS = [
  'Project inquiry',
  'Collaboration',
  'Job opportunity',
  'Just saying hi',
];

const STAT_ICONS = [faComments, faClock, faHandshake];
const FORM_FIELDS = ['name', 'email', 'subject', 'message'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

const Contact = ({ darkMode }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const emailItem = contactInfo.find((i) => i.label === 'Email');
  const phoneItem = contactInfo.find((i) => i.label === 'Phone');
  const locationItem = contactInfo.find((i) => i.label === 'Location');

  const validateField = useCallback((name, value) => {
    const trimmed = value.trim();
    switch (name) {
      case 'name':
        return !trimmed ? 'Name is required' : '';
      case 'email': {
        if (!trimmed) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email';
        return '';
      }
      case 'subject':
        return !trimmed ? 'Subject is required' : '';
      case 'message':
        if (!trimmed) return 'Message is required';
        if (trimmed.length < MESSAGE_MIN) return `Message must be at least ${MESSAGE_MIN} characters`;
        if (trimmed.length > MESSAGE_MAX) return `Message must be under ${MESSAGE_MAX} characters`;
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const fields = ['name', 'email', 'subject', 'message'];
    return fields.reduce((acc, field) => {
      const err = validateField(field, formData[field]);
      if (err) acc[field] = err;
      return acc;
    }, {});
  }, [formData, validateField]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const handleSubjectPreset = useCallback((preset) => {
    setFormData((prev) => ({ ...prev, subject: preset }));
    setTouched((prev) => ({ ...prev, subject: true }));
    setErrors((prev) => ({ ...prev, subject: validateField('subject', preset) }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstInvalid = FORM_FIELDS.find((field) => newErrors[field]);
      if (firstInvalid) {
        requestAnimationFrame(() => {
          const el = document.getElementById(firstInvalid);
          el?.focus({ preventScroll: true });
          el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
        });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      navigate('/thank-you');
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, navigate, prefersReducedMotion]);

  const quickActions = useMemo(() => [
    ...(emailItem?.link ? [{
      label: 'Email Me',
      href: emailItem.link,
      icon: faEnvelope,
      primary: true,
    }] : []),
    ...(phoneItem?.link ? [{
      label: 'Call Me',
      href: phoneItem.link,
      icon: faPhone,
      primary: false,
    }] : []),
  ], [emailItem, phoneItem]);

  const contactDetails = [
    { ...emailItem, icon: faEnvelope },
    { ...locationItem, icon: faMapMarkerAlt },
    { ...phoneItem, icon: faPhone },
  ].filter((item) => item?.label);

  const isFieldValid = useCallback((field) => (
    touched[field] && !validateField(field, formData[field])
  ), [touched, formData, validateField]);

  const messageProgress = Math.min((formData.message.trim().length / MESSAGE_MIN) * 100, 100);
  const messageReady = formData.message.trim().length >= MESSAGE_MIN;

  const completedFields = FORM_FIELDS.filter(
    (field) => formData[field].trim() && !validateField(field, formData[field]),
  ).length;
  const formProgress = (completedFields / FORM_FIELDS.length) * 100;

  const summaryStats = useMemo(() => [
    { label: 'Channels', value: contactDetails.length, icon: STAT_ICONS[0] },
    { label: 'Response', value: '<24h', icon: STAT_ICONS[1] },
    { label: 'Availability', value: 'Open', icon: STAT_ICONS[2] },
  ], [contactDetails.length]);

  const {
    muted, body, heading, accent, gradient, panel, inset, topEdge, divider, cellBg, cellHover, sectionBg, footerWash, nested,
  } = getSectionTheme(darkMode);
  const panelWash = getBluePanelWash(darkMode);

  const inputClass = (field) => {
    const hasError = errors[field] && touched[field];
    const isValid = isFieldValid(field);
    const hasIcon = field !== 'message';
    return `w-full rounded-xl py-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 ${
      hasIcon ? 'pl-11 pr-10' : 'px-4'
    } ${
      darkMode ? 'liquid-glass-input-dark text-white placeholder-slate-500' : 'liquid-glass-input text-slate-900 placeholder-slate-400'
    } ${hasError ? 'ring-2 ring-red-500/80' : ''} ${isValid ? 'ring-1 ring-emerald-500/40' : ''}`;
  };

  const fieldIcons = {
    name: faUser,
    email: faEnvelope,
    subject: faTag,
  };

  return (
    <section
      id="contact"
      className={`section-shell relative w-full overflow-hidden py-20 md:py-28 ${sectionBg}`}
    >
      <SectionBackground darkMode={darkMode} />
      <div className="page-wrap relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <SectionHeading
            badge="Let's Connect"
            title="Get In Touch"
            subtitle="Whether it's a project, collaboration, or just a hello — I'd love to hear from you"
            darkMode={darkMode}
            align="left"
            badgeIcon={<FontAwesomeIcon icon={faComments} className="h-4 w-4" aria-hidden="true" />}
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
                      className={`group relative px-3 py-4 text-center transition-colors md:px-5 md:py-5 ${cellHover}`}
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
                          stat.label === 'Availability'
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
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'}`}>
                  <FontAwesomeIcon icon={faBolt} className={`text-[10px] ${accent}`} aria-hidden="true" />
                  Freelance & full-time
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${darkMode ? 'liquid-glass-chip-dark text-slate-200' : 'liquid-glass-chip text-slate-700'}`}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={`text-[10px] ${accent}`} aria-hidden="true" />
                  {locationItem?.value || 'Remote friendly'}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)]">
              <motion.aside
                className={`order-2 flex flex-col gap-3 p-6 md:p-8 lg:order-1 lg:border-r lg:p-10 ${divider}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GlassCell as={motion.div} variants={itemVariants} darkMode={darkMode} accent={`bg-gradient-to-b ${gradient}`} className="p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`h-px w-8 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>Direct</p>
                  </div>
                  <h3 className={`mb-2 text-lg font-bold ${heading}`}>Contact channels</h3>
                  <p className={`mb-5 text-sm ${body}`}>
                    Reach out directly — I typically reply within a day.
                  </p>

                  <div className="space-y-2">
                    {contactDetails.map((info) => (
                      <GlassCell
                        key={info.label}
                        as={info.link ? 'a' : 'div'}
                        darkMode={darkMode}
                        accent={`bg-gradient-to-b ${gradient}`}
                        href={info.link || undefined}
                        className={`flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${
                          info.link ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500' : ''
                        } ${cellHover}`}
                      >
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode ? 'liquid-glass-icon-dark' : 'liquid-glass-icon'}`}>
                            <FontAwesomeIcon icon={info.icon} className={`text-sm ${accent}`} aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className={`text-[10px] font-semibold uppercase tracking-wider ${muted}`}>{info.label}</p>
                            <p className={`text-sm font-semibold break-all ${info.link ? `${accent} group-hover:underline` : heading}`}>
                              {info.value}
                            </p>
                          </div>
                          {info.link && (
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className={`mt-2 shrink-0 text-[10px] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 ${muted}`}
                              aria-hidden="true"
                            />
                          )}
                      </GlassCell>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    {quickActions.map((action) => (
                      <motion.a
                        key={action.label}
                        href={action.href}
                        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                          action.primary
                            ? 'liquid-glass-btn-primary'
                            : darkMode
                              ? 'liquid-glass-btn-secondary-dark text-white'
                              : 'liquid-glass-btn-secondary text-slate-900'
                        }`}
                        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FontAwesomeIcon icon={action.icon} className="text-sm" aria-hidden="true" />
                        {action.label}
                      </motion.a>
                    ))}
                  </div>
                </GlassCell>

                <GlassCell as={motion.div} variants={itemVariants} darkMode={darkMode} accent={`bg-gradient-to-b ${gradient}`} className="p-5 md:p-6">
                  <h3 className={`mb-4 text-lg font-bold ${heading}`}>Connect online</h3>
                  <div className="mb-4 flex gap-2">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit my ${social.name} profile (opens in a new tab)`}
                        className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                          darkMode ? 'liquid-glass-icon-dark text-slate-200' : 'liquid-glass-icon text-slate-700'
                        }`}
                        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FontAwesomeIcon icon={social.name === 'GitHub' ? faGithub : faLinkedin} aria-hidden="true" />
                        <span className="hidden sm:inline">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed ${body}`}>
                    Based in {locationItem?.value || 'the US'}, collaborating with teams worldwide on
                    accessible, high-performance products.
                  </p>
                </GlassCell>

                <GlassCell as={motion.div} variants={itemVariants} darkMode={darkMode} accent={`bg-gradient-to-b ${gradient}`} className="p-5 md:p-6">
                  <p className={`text-sm ${body}`}>
                    Want to see the work first?{' '}
                    <MotionLink
                      to="/projects"
                      className={`inline-flex items-center gap-1 font-semibold hover:underline ${accent}`}
                      whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                    >
                      Browse projects
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" aria-hidden="true" />
                    </MotionLink>
                  </p>
                </GlassCell>
              </motion.aside>

              <motion.div
                className="order-1 p-6 md:p-10 lg:order-2"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <form onSubmit={handleSubmit} noValidate className={`p-5 md:p-8 ${nested}`}>
                  <div className="mb-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`h-px w-10 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${muted}`}>Message</p>
                      </div>
                      <span className={`text-xs font-medium tabular-nums ${formProgress === 100 ? 'text-emerald-500' : muted}`} aria-live="polite">
                        {completedFields}/{FORM_FIELDS.length} complete
                      </span>
                    </div>
                    <div
                      className={`mb-4 h-1 overflow-hidden rounded-full ${darkMode ? 'liquid-glass-progress-dark' : 'liquid-glass-progress'}`}
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          formProgress === 100 ? 'bg-emerald-500' : `bg-gradient-to-r ${gradient}`
                        }`}
                        style={{ width: `${formProgress}%` }}
                      />
                    </div>
                    <h3 className={`text-xl font-bold md:text-2xl ${heading}`}>Send a message</h3>
                    <p className={`mt-2 text-sm ${body}`}>
                      Fill out the form and I'll get back to you at {emailItem?.value || 'your email'}.
                    </p>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {['name', 'email'].map((field) => (
                      <div key={field}>
                        <label htmlFor={field} className={`mb-1.5 block text-sm font-medium ${body}`}>
                          {field === 'name' ? 'Name' : 'Email'}{' '}
                          <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                          <span className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${muted}`} aria-hidden="true">
                            <FontAwesomeIcon icon={fieldIcons[field]} className="text-sm" />
                          </span>
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            autoComplete={field === 'email' ? 'email' : 'name'}
                            inputMode={field === 'email' ? 'email' : undefined}
                            placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-required="true"
                            aria-invalid={!!(errors[field] && touched[field])}
                            aria-describedby={errors[field] && touched[field] ? `${field}-error` : undefined}
                            className={inputClass(field)}
                          />
                          {isFieldValid(field) && (
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true">
                              <FontAwesomeIcon icon={faCheck} className="text-xs" />
                            </span>
                          )}
                        </div>
                        {errors[field] && touched[field] && (
                          <p id={`${field}-error`} className="mt-1.5 text-xs text-red-500" role="alert">{errors[field]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className={`mb-1.5 block text-sm font-medium ${body}`}>
                      Subject <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {SUBJECT_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSubjectPreset(preset)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            formData.subject === preset
                              ? 'liquid-glass-btn-primary text-white'
                              : darkMode
                                ? 'liquid-glass-chip-dark text-slate-200'
                                : 'liquid-glass-chip text-slate-700'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${muted}`} aria-hidden="true">
                        <FontAwesomeIcon icon={fieldIcons.subject} className="text-sm" />
                      </span>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        autoComplete="off"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={!!(errors.subject && touched.subject)}
                        aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                        className={inputClass('subject')}
                      />
                      {isFieldValid('subject') && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true">
                          <FontAwesomeIcon icon={faCheck} className="text-xs" />
                        </span>
                      )}
                    </div>
                    {errors.subject && touched.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.subject}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="mb-1.5 flex items-center justify-between">
                      <label htmlFor="message" className={`text-sm font-medium ${body}`}>
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <span className={`text-xs tabular-nums ${messageReady ? 'text-emerald-500' : muted}`} aria-live="polite">
                        {formData.message.length}/{MESSAGE_MAX}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      placeholder={`Tell me about your project or idea (min. ${MESSAGE_MIN} characters)…`}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      maxLength={MESSAGE_MAX}
                      aria-required="true"
                      aria-invalid={!!(errors.message && touched.message)}
                      aria-describedby={errors.message && touched.message ? 'message-error' : 'message-hint'}
                      className={`${inputClass('message')} min-h-[140px] resize-y`}
                    />
                    <div
                      className={`mt-2 h-1 overflow-hidden rounded-full ${darkMode ? 'liquid-glass-progress-dark' : 'liquid-glass-progress'}`}
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          messageReady ? 'bg-emerald-500' : `bg-gradient-to-r ${gradient}`
                        }`}
                        style={{ width: `${messageProgress}%` }}
                      />
                    </div>
                    <p id="message-hint" className={`mt-1.5 text-xs ${muted}`}>
                      {messageReady ? 'Message length looks good' : `At least ${MESSAGE_MIN} characters required`}
                    </p>
                    {errors.message && touched.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="liquid-glass-btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    whileHover={prefersReducedMotion || isSubmitting ? undefined : { y: -2 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className={`text-sm ${isSubmitting ? 'animate-pulse' : ''}`} aria-hidden="true" />
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </motion.button>

                  {submitStatus === 'error' && (
                    <p className="mt-4 text-center text-sm text-red-500" role="alert" aria-live="assertive">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}
                  {submitStatus === 'success' && (
                    <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-emerald-500" role="status">
                      <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
                      Message sent!
                    </p>
                  )}

                  <p className={`mt-4 text-center text-xs ${muted}`}>
                    By submitting, you agree to be contacted about your inquiry. No spam, ever.
                  </p>
                </form>
              </motion.div>
            </div>

            <div
              className={`flex flex-col items-center justify-between gap-5 border-t px-6 py-8 sm:flex-row md:px-10 lg:px-12 ${divider} ${
                footerWash
              }`}
            >
              <p className={`max-w-md text-center text-sm sm:text-left md:text-base ${body}`}>
                Not sure what to write? Mention your timeline, goals, and how {siteMeta.name} can help.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <MotionLink
                  to="/projects"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold sm:flex-none ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" />
                  View Projects
                </MotionLink>
                <MotionLink
                  to="/skills"
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold sm:flex-none ${
                    darkMode ? 'liquid-glass-btn-secondary-dark text-white' : 'liquid-glass-btn-secondary text-slate-900'
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Skills
                </MotionLink>
                <MotionLink
                  to="/about"
                  className="liquid-glass-btn-primary group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn About Me
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </MotionLink>
              </div>
            </div>
          </GlassPanel>
          </motion.div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Contact);
