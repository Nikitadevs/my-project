// Contact.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Card3D from './Card3D';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  }, [formData, validateEmail]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="text-2xl" />,
      url: 'https://github.com/Nikitadevs',
      color: darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-2xl" />,
      url: 'https://www.linkedin.com/in/nikita-veretenko-b502b928a',
      color: 'hover:text-blue-500',
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: 'Email',
      value: 'nikita@example.com',
      link: 'mailto:nikita@example.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: 'Location',
      value: 'United States',
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: 'Phone',
      value: '(123) 456-7890',
      link: 'tel:+11234567890',
    },
  ];

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-100/50 text-gray-900'}`}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
              ${darkMode 
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'}`}>
              Get In Touch
            </h2>
            <div className={`h-1 w-20 mx-auto rounded-full mb-6 bg-gradient-to-r
              ${darkMode
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'}`} />
            <p className={`text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Have a question or want to work together? Let's connect!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card3D darkMode={darkMode}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}
                          ${errors.name ? 'border-2 border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}
                          ${errors.email ? 'border-2 border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}
                          ${errors.subject ? 'border-2 border-red-500' : ''}`}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">{errors.subject}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors resize-none
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}
                          ${errors.message ? 'border-2 border-red-500' : ''}`}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 rounded-2xl font-semibold relative overflow-hidden group backdrop-blur-xl
                      ${darkMode
                        ? 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white border border-white/20'
                        : 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white border border-white/30'} shadow-2xl`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Liquid shimmer effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)`,
                      }}
                      animate={{
                        transform: isSubmitting 
                          ? ['translateX(-100%)', 'translateX(100%)']
                          : 'translateX(-100%)',
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: isSubmitting ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Pulsing glow when submitting */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 blur-xl"
                      animate={{
                        opacity: isSubmitting ? [0, 0.6, 0] : 0,
                        scale: isSubmitting ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isSubmitting ? Infinity : 0,
                      }}
                    />

                    <span className="relative inline-flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ 
                              x: [0, 3, 0],
                              y: [-1, 1, -1],
                            }}
                            transition={{ 
                              duration: 0.8, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          >
                            <FaPaperPlane className="text-lg" />
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <motion.span
                            whileHover={{ 
                              x: 3,
                            }}
                            transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                          >
                            <FaPaperPlane className="text-lg" />
                          </motion.span>
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-500 text-center mt-4 flex items-center justify-center gap-2"
                      role="status"
                      aria-live="polite"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <FaCheckCircle className="text-lg" />
                      </motion.span>
                      Message sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-center mt-4"
                      role="alert"
                      aria-live="assertive"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </form>
              </Card3D>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card3D darkMode={darkMode}>
                <div className="p-6 space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`p-3 rounded-xl
                        ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-60">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-lg font-medium hover:underline"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card3D>

              {/* Social Links */}
              <Card3D darkMode={darkMode}>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-xl transition-colors backdrop-blur-xl relative overflow-hidden shadow-md ${
                          darkMode 
                            ? 'bg-gray-800/50 border border-white/10' 
                            : 'bg-gray-100/50 border border-gray-200/50'
                        } ${social.color}`}
                        whileHover={{ 
                          scale: 1.1,
                          y: -3,
                          boxShadow: darkMode
                            ? '0 12px 24px rgba(59, 130, 246, 0.3)'
                            : '0 12px 24px rgba(59, 130, 246, 0.2)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                      >
                        {/* Ripple effect on hover */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl ${
                            darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
                          }`}
                          initial={{ scale: 0, opacity: 1 }}
                          whileHover={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">{social.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

Contact.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Contact);
