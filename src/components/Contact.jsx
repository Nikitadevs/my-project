// Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card3D from './Card3D';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="text-2xl" />,
      url: 'https://github.com/yourusername',
      color: darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-2xl" />,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-500',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-2xl" />,
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400',
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: 'Location',
      value: 'City, Country',
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: 'Phone',
      value: '+1 234 567 890',
      link: 'tel:+1234567890',
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
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
              ${darkMode 
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'}`}>
              Get In Touch
            </h2>
            <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r
              ${darkMode
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'}`} />
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
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}`}
                      />
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
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}`}
                      />
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
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}`}
                      />
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
                        className={`w-full px-4 py-3 rounded-xl outline-none transition-colors
                          ${darkMode
                            ? 'bg-gray-800 text-white focus:bg-gray-700'
                            : 'bg-white text-gray-900 focus:bg-gray-50 border border-gray-200'}`}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 rounded-xl font-semibold relative overflow-hidden group
                      ${darkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500"
                      initial={{ x: '-100%' }}
                      animate={isSubmitting ? { x: '100%' } : { x: '-100%' }}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                    />
                    <span className="relative inline-flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FaPaperPlane className="text-lg" />
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <motion.span
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <FaPaperPlane className="text-lg" />
                          </motion.span>
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-500 text-center mt-4 flex items-center justify-center gap-2"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <FaCheckCircle className="text-lg" />
                      </motion.span>
                      Message sent successfully!
                    </motion.p>
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
                        className={`p-3 rounded-xl transition-colors ${
                          darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        } ${social.color}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {social.icon}
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

export default Contact;
