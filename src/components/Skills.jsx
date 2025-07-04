// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faServer,
  faCloud,
  faDatabase,
  faTools,
  faCogs,
  faTerminal,
  faLaptopCode,
  faNetworkWired,
  faRocket,
  faSearch,
  faShieldAlt,
  faStar,
  faCertificate,
  faAward,
  faTrophy,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faNode,
  faPython,
  faAws,
  faDocker,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons';

const Skills = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const controls = useAnimation();

  const categories = [
    { id: 'all', name: 'All Skills', icon: faCode },
    { id: 'frontend', name: 'Frontend', icon: faLaptopCode },
    { id: 'backend', name: 'Backend', icon: faServer },
    { id: 'cloud', name: 'Cloud & Infrastructure', icon: faCloud },
    { id: 'devops', name: 'DevOps & Automation', icon: faTools },
    { id: 'development', name: 'Development', icon: faRocket },
  ];

  const skills = [
    {
      name: 'React',
      category: 'frontend',
      level: 95,
      icon: faReact,
      color: 'from-cyan-500 to-blue-500',
      experience: '4+ years',
      projects: 30,
      details: [
        'Component Architecture',
        'State Management (Redux, Context)',
        'Performance Optimization',
        'Custom Hooks',
      ],
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
      details: [
        'RESTful APIs',
        'GraphQL',
        'Microservices',
        'Real-time Applications',
      ],
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
      details: [
        'EC2 & ECS',
        'Lambda & Serverless',
        'S3 & CloudFront',
        'RDS & DynamoDB',
      ],
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
      details: [
        'Container Orchestration',
        'Multi-stage Builds',
        'Docker Compose',
        'Container Security',
      ],
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
      details: [
        'Data Analysis',
        'Web Scraping',
        'Automation Scripts',
        'Machine Learning',
      ],
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
      details: [
        'Version Control',
        'Branch Management',
        'CI/CD Integration',
        'Team Collaboration',
      ],
      certifications: ['Git Advanced'],
    },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const glassVariants = {
    initial: {
      borderRadius: '24px',
    },
    animate: {
      borderRadius: ['24px', '28px', '24px', '26px', '24px'],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: width => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`py-12 md:py-20 ${
        darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-100/50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
            ${darkMode 
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'}`}>
            Skills & Technologies
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full mb-8 bg-gradient-to-r
            ${darkMode
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'}`} />
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium flex items-center gap-2 transition-all duration-300
                ${selectedCategory === category.id
                  ? darkMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ring-2 ring-offset-2 ring-blue-500'
                  : darkMode
                    ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500'
                    : 'bg-white/80 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                } shadow-lg backdrop-blur-sm focus:outline-none`}
              whileHover={{ scale: 1.05, translateZ: 20 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <FontAwesomeIcon icon={category.icon} className={selectedCategory === category.id ? 'text-white' : ''} />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={skillCardVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedSkill(skill)}
                className={`relative cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 ${
                  darkMode 
                    ? 'focus-within:ring-blue-500 focus-within:ring-offset-gray-800' 
                    : 'focus-within:ring-blue-500'
                } rounded-2xl`}
                style={{ transformStyle: 'preserve-3d' }}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedSkill(skill);
                  }
                }}
              >
                <motion.div
                  variants={glassVariants}
                  initial="initial"
                  animate="animate"
                  className={`p-4 md:p-6 rounded-2xl backdrop-blur-lg shadow-xl border h-full
                    ${darkMode
                      ? 'bg-gray-900/70 border-gray-700 hover:border-blue-500/50'
                      : 'bg-white/70 border-gray-200 hover:border-blue-500/50'
                    } transition-colors duration-300`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${skill.color} shadow-lg`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FontAwesomeIcon icon={skill.icon} className="text-2xl text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {skill.experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {skill.certifications && skill.certifications.length > 0 && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center
                            ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}
                        >
                          <FontAwesomeIcon
                            icon={faCertificate}
                            className={darkMode ? 'text-blue-400' : 'text-blue-600'}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Proficiency
                      </span>
                      <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial="initial"
                        animate="animate"
                        variants={progressBarVariants}
                        custom={skill.level}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faRocket}
                        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.projects} Projects Completed
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.details.slice(0, 2).map((detail, index) => (
                        <span
                          key={index}
                          className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full
                            ${darkMode
                              ? 'bg-gray-800 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {detail}
                        </span>
                      ))}
                      {skill.details.length > 2 && (
                        <span
                          className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full
                            ${darkMode
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-600'
                            }`}
                        >
                          +{skill.details.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-w-2xl w-full p-4 md:p-6 rounded-2xl shadow-2xl ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  className={`w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${selectedSkill.color}`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon icon={selectedSkill.icon} className="text-3xl text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedSkill.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm px-3 py-1 rounded-full
                      ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                      {selectedSkill.experience}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full
                      ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'}`}>
                      {selectedSkill.projects} Projects
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {selectedSkill.certifications && selectedSkill.certifications.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCertificate} className="text-blue-500" />
                      Certifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedSkill.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-xl ${
                            darkMode ? 'bg-gray-800' : 'bg-gray-100'
                          }`}
                        >
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    Key Competencies
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSkill.details.map((detail, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl flex items-center gap-2 ${
                          darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={darkMode ? 'text-green-400' : 'text-green-600'}
                        />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors focus:outline-none
                  ${darkMode
                    ? 'hover:bg-gray-800 text-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500'
                    : 'hover:bg-gray-100 text-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                aria-label="Close details"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Skills;
