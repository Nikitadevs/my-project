// Projects.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faDocker,
  faAws,
} from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faServer,
  faCode,
  faArrowRight,
  faSearch,
  faFilter,
  faCubes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Tilt } from 'react-tilt';
import Card3D from './Card3D';

// Lazy load ProjectModal
const ProjectModal = lazy(() => import('./ProjectModal'));

const Projects = ({ darkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Cloud Infrastructure Automation',
      description:
        'Automated cloud infrastructure deployment using Terraform and AWS CloudFormation. Implemented CI/CD pipelines and monitoring solutions.',
      image: '/path-to-project-1-image.jpg',
      technologies: ['AWS', 'Terraform', 'Docker', 'Jenkins'],
      category: 'devops',
      links: {
        github: 'https://github.com/yourusername/project1',
        live: 'https://project1.example.com',
      },
      features: [
        'Multi-region deployment',
        'Auto-scaling configurations',
        'Infrastructure as Code',
        'Monitoring and alerting',
      ],
      details:
        'Developed a comprehensive cloud infrastructure automation solution that reduced deployment time by 70% and improved reliability through standardized processes.',
    },
    {
      id: 2,
      title: 'Kubernetes Cluster Management',
      description:
        'Built a scalable Kubernetes cluster management system with automated deployment, scaling, and monitoring capabilities.',
      image: '/path-to-project-2-image.jpg',
      technologies: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
      category: 'devops',
      links: {
        github: 'https://github.com/yourusername/project2',
        live: 'https://project2.example.com',
      },
      features: [
        'Custom controllers',
        'Auto-healing',
        'Performance monitoring',
        'Cost optimization',
      ],
      details:
        'Implemented a Kubernetes-based container orchestration platform that improved application availability to 99.9% and reduced operational costs by 40%.',
    },
    {
      id: 3,
      title: 'Microservices Architecture',
      description:
        'Designed and implemented a microservices-based application architecture with service mesh and API gateway integration.',
      image: '/path-to-project-3-image.jpg',
      technologies: ['Go', 'gRPC', 'Istio', 'MongoDB'],
      category: 'backend',
      links: {
        github: 'https://github.com/yourusername/project3',
        live: 'https://project3.example.com',
      },
      features: [
        'Service discovery',
        'Load balancing',
        'Circuit breaking',
        'Distributed tracing',
      ],
      details:
        'Created a scalable microservices architecture that handles over 1M requests per day with 99.99% uptime and sub-100ms response times.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'devops', label: 'DevOps' },
    { id: 'backend', label: 'Backend' },
    { id: 'frontend', label: 'Frontend' },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory = filter === 'all' || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [filter, searchQuery]);

  // Simplified animations for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = isMobile ? {
    rest: { scale: 1 },
    hover: { scale: 1 },
    tap: { scale: 0.98 }
  } : {
    rest: { 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: { 
      scale: 1.03,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Lazy loading image component
  const LazyImage = ({ src, alt, className }) => {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} transition-opacity duration-300`}
        onLoad={(e) => e.target.classList.remove('opacity-0')}
        style={{ minHeight: '200px' }}
      />
    );
  };

  LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  const getTechnologyIcon = (tech) => {
    switch (tech.toLowerCase()) {
      case 'github':
        return faGithub;
      case 'docker':
        return faDocker;
      case 'aws':
        return faAws;
      case 'kubernetes':
        return faCubes;
      default:
        return faCode;
    }
  };

  return (
    <section
      id="projects"
      className={`py-20 ${
        darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-100/50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
            ${darkMode 
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'}`}>
            Featured Projects
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full mb-8 bg-gradient-to-r
            ${darkMode
              ? 'from-blue-400 via-purple-400 to-pink-400'
              : 'from-blue-600 via-purple-600 to-pink-600'}`} />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <Card3D darkMode={darkMode} className="flex-1">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-6 py-4 pr-12 rounded-2xl outline-none transition-all duration-300
                    ${darkMode
                      ? 'bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800/70'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white'
                    } focus:shadow-lg`}
                />
                <motion.span
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2
                    ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  animate={{
                    scale: searchQuery ? [1.2, 1] : 1,
                    rotate: searchQuery ? [0, -360] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </motion.span>
              </div>
            </Card3D>

            <Card3D darkMode={darkMode}>
              <div className="flex items-center gap-4 p-2 overflow-x-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap
                      ${filter === category.id
                        ? darkMode
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-800/50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={category.icon} className="text-sm" />
                      {category.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </Card3D>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout={!isMobile}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full"
                >
                  <Card3D darkMode={darkMode} className="h-full group flex flex-col" disabled={isMobile}>
                    <motion.div
                      className="relative overflow-hidden rounded-t-2xl"
                      whileHover={!isMobile && "hover"}
                      initial="rest"
                      animate="rest"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover opacity-0"
                      />
                      <motion.div
                        className="absolute inset-x-0 bottom-0 p-4 z-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ scale: 1.1 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="px-2 py-1 rounded-lg text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    <div className="p-6 flex flex-col flex-grow">
                      <motion.h3
                        className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.features.slice(0, 2).map((feature, index) => (
                          <motion.span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                              ${darkMode
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-blue-100 text-blue-600'
                              }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                            {feature}
                          </motion.span>
                        ))}
                        {project.features.length > 2 && (
                          <motion.span
                            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer
                              ${darkMode
                                ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                              }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            onClick={() => setSelectedProject(project)}
                          >
                            +{project.features.length - 2} more
                          </motion.span>
                        )}
                      </div>

                      <div className="flex justify-between items-center gap-4 mt-auto">
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 flex-1 justify-center
                            ${darkMode
                              ? 'bg-gray-800 hover:bg-gray-700 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                            }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FontAwesomeIcon icon={faGithub} className="text-lg" />
                          <span>Code</span>
                        </motion.a>
                        <motion.a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white relative overflow-hidden flex-1 justify-center"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          <span className="relative z-10 flex items-center gap-2">
                            <FontAwesomeIcon icon={faGlobe} className="text-lg" />
                            <span>Live Demo</span>
                          </span>
                        </motion.a>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl mb-4">No projects found</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-colors duration-300
                  ${darkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal with Suspense */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            darkMode={darkMode}
          />
        )}
      </Suspense>
    </section>
  );
};

Projects.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Projects;
