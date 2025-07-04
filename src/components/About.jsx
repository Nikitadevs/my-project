import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faRocket,
  faCode,
  faHeart,
  faDownload,
  faExternalLinkAlt,
  faBriefcase,
  faGraduationCap,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Card3D from './Card3D';

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 5 }
};

const About = ({ darkMode }) => {
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'downloading' | 'completed'
  const [downloadProgress, setDownloadProgress] = useState(0);

  const highlights = [
    {
      icon: faLightbulb,
      title: 'Problem Solver',
      description: 'Passionate about finding elegant solutions to complex problems.',
      color: 'from-yellow-400 to-orange-500',
      stats: '50+ Projects Completed',
    },
    {
      icon: faRocket,
      title: 'Fast Learner',
      description: 'Quick to adapt and master new technologies and frameworks.',
      color: 'from-blue-400 to-purple-500',
      stats: '10+ Technologies Mastered',
    },
    {
      icon: faCode,
      title: 'Clean Code',
      description: 'Committed to writing maintainable and efficient code.',
      color: 'from-green-400 to-emerald-500',
      stats: '1000+ Commits',
    },
    {
      icon: faHeart,
      title: 'Passionate',
      description: 'Deeply passionate about creating impactful software solutions.',
      color: 'from-red-400 to-pink-500',
      stats: '100% Client Satisfaction',
    },
  ];

  const resumeDetails = [
    { icon: faBriefcase, label: 'Experience', value: '5+ Years' },
    { icon: faGraduationCap, label: 'Education', value: 'Computer Science' },
    { icon: faCode, label: 'Projects', value: '50+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloadState('downloading');
    
    // Simulate download progress
    const duration = 2000; // 2 seconds
    const steps = 20;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setDownloadProgress(i * increment);
    }
    
    // Trigger the actual download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    link.click();
    
    setDownloadState('completed');
    setTimeout(() => {
      setDownloadState('idle');
      setDownloadProgress(0);
    }, 3000);
  };

  const downloadVariants = {
    idle: {
      width: 'auto',
      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    },
    downloading: {
      width: 'auto',
      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    },
    completed: {
      width: 'auto',
      background: 'linear-gradient(to right, #059669, #10b981)',
    },
  };

  const progressVariants = {
    idle: {
      width: '0%',
      opacity: 0,
    },
    downloading: {
      width: `${downloadProgress}%`,
      opacity: 0.2,
    },
    completed: {
      width: '100%',
      opacity: 0,
    },
  };

  const iconVariants = {
    idle: {
      scale: 1,
      y: 0,
      rotate: 0,
    },
    downloading: {
      scale: [1, 0.8, 1],
      y: [0, -2, 0],
      rotate: [0, 0, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
      },
    },
    completed: {
      scale: [1, 1.5, 1],
      rotate: [0, 360, 360],
      transition: {
        duration: 0.5,
      },
    },
  };

  const textVariants = {
    idle: {
      x: 0,
    },
    downloading: {
      x: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
      },
    },
    completed: {
      x: 0,
    },
  };

  return (
      <motion.section
        id="about"
        className={`min-h-screen py-20 ${
          darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-100/50 text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                ${darkMode 
                  ? 'from-blue-400 via-purple-400 to-pink-400'
                  : 'from-blue-600 via-purple-600 to-pink-600'}`}
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            <motion.div 
              className={`h-1 w-20 mx-auto rounded-full mb-8 bg-gradient-to-r
                ${darkMode
                  ? 'from-blue-400 via-purple-400 to-pink-400'
                  : 'from-blue-600 via-purple-600 to-pink-600'}`}
              variants={itemVariants}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <Card3D darkMode={darkMode}>
              <motion.div
                className="relative overflow-hidden rounded-2xl group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/path-to-your-image.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    darkMode
                      ? 'bg-gradient-to-t from-blue-600/90 via-blue-600/40 to-transparent'
                      : 'bg-gradient-to-t from-blue-500/90 via-blue-500/40 to-transparent'
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Nikita</h3>
                    <p className="text-sm">Full Stack Developer</p>
                  </div>
                </div>
              </motion.div>
            </Card3D>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-4"
              >
                Hi, I'm <span className="text-blue-500">NIkita</span>
              </motion.h3>
              
              <motion.p
                variants={itemVariants}
                className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                I'm a passionate full-stack developer with a strong focus on creating
                intuitive and performant web applications. With several years of
                experience in modern web technologies, I enjoy turning complex
                problems into simple, beautiful, and intuitive solutions.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className={`text-lg leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through technical writing and mentoring.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 space-y-6"
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {resumeDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      className={`p-4 rounded-xl ${
                        darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                      }`}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FontAwesomeIcon
                        icon={detail.icon}
                        className={`text-2xl mb-2 ${
                          darkMode ? 'text-blue-400' : 'text-blue-500'
                        }`}
                      />
                      <h4 className="font-semibold">{detail.label}</h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{detail.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="#"
                    onClick={handleDownload}
                    className="flex-1 px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-3 relative overflow-hidden text-white shadow-lg"
                    variants={downloadVariants}
                    animate={downloadState}
                    whileHover={downloadState === 'idle' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={downloadState === 'idle' ? { scale: 0.98 } : {}}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-white"
                      variants={progressVariants}
                      animate={downloadState}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="relative z-10 flex items-center gap-2"
                      variants={textVariants}
                      animate={downloadState}
                    >
                      <motion.span
                        variants={iconVariants}
                        animate={downloadState}
                        className="relative"
                      >
                        <FontAwesomeIcon 
                          icon={downloadState === 'completed' ? faCheck : faDownload} 
                          className={`text-lg transition-all duration-300`}
                        />
                        {downloadState === 'downloading' && (
                          <motion.span 
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-normal"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {Math.round(downloadProgress)}%
                          </motion.span>
                        )}
                      </motion.span>
                      <span className="relative">
                        {downloadState === 'idle' && "Download Resume"}
                        {downloadState === 'downloading' && "Downloading..."}
                        {downloadState === 'completed' && "Downloaded!"}
                      </span>
                    </motion.span>
                  </motion.a>

                  <div className="flex gap-4">
                    {[
                      { icon: faGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
                      { icon: faLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-xl font-semibold inline-flex items-center justify-center relative overflow-hidden
                          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className={`absolute inset-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                        <FontAwesomeIcon icon={social.icon} className="text-xl relative z-10" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="h-full"
              >
                <Card3D darkMode={darkMode} className="h-full">
                  <motion.div
                    className="p-6 text-center relative overflow-hidden group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-2xl text-white"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      {item.description}
                    </p>
                    <div className={`text-sm font-semibold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {item.stats}
                    </div>
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
  );
};

export default About;
