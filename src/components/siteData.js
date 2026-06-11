export const siteMeta = {
  name: 'Nikita',
  title: 'Computer Engineer',
  tagline: 'Designing and building reliable systems — from hardware-aware thinking to polished software.',
  resumePath: '/resume.pdf',
  profileImage: null,
};

export const navItems = [
  { href: '/', id: 'hero', label: 'Home', icon: 'Home' },
  { href: '/about', id: 'about', label: 'About', icon: 'About' },
  { href: '/skills', id: 'skills', label: 'Skills', icon: 'Skills' },
  { href: '/experience', id: 'experience', label: 'Experience', icon: 'Experience' },
  { href: '/education', id: 'education', label: 'Education', icon: 'Education' },
  { href: '/projects', id: 'projects', label: 'Projects', icon: 'Projects' },
  { href: '/contact', id: 'contact', label: 'Contact', icon: 'Contact' },
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Nikitadevs',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nikita-veretenko-b502b928a',
  },
];

export const contactInfo = [
  {
    label: 'Email',
    value: 'nikita@example.com',
    link: 'mailto:nikita@example.com',
  },
  {
    label: 'Location',
    value: 'United States',
  },
  {
    label: 'Phone',
    value: '(123) 456-7890',
    link: 'tel:+11234567890',
  },
];

export const aboutHighlights = [
  {
    title: 'Problem Solver',
    description: 'Passionate about finding elegant solutions to complex problems.',
    color: 'from-yellow-400 to-orange-500',
    stats: '50+ Projects Completed',
  },
  {
    title: 'Fast Learner',
    description: 'Quick to adapt and master new technologies and frameworks.',
    color: 'from-blue-400 to-purple-500',
    stats: '10+ Technologies Mastered',
  },
  {
    title: 'Clean Code',
    description: 'Committed to writing maintainable and efficient code.',
    color: 'from-green-400 to-emerald-500',
    stats: '1000+ Commits',
  },
  {
    title: 'Passionate',
    description: 'Deeply passionate about creating impactful software solutions.',
    color: 'from-red-400 to-pink-500',
    stats: '100% Client Satisfaction',
  },
];

export const resumeDetails = [
  { label: 'Experience', value: '5+ Years' },
  { label: 'Education', value: 'Computer Science' },
  { label: 'Projects', value: '50+' },
];

export const projects = [
  {
    id: 1,
    title: 'Cloud Infrastructure Automation',
    description:
      'End-to-end IaC platform for provisioning AWS environments with Terraform, standardized modules, and CI/CD-driven releases.',
    accent: 'from-sky-500 to-blue-700',
    highlight: '70% faster deployments',
    technologies: ['AWS', 'Terraform', 'Docker', 'Jenkins'],
    category: 'devops',
    links: {
      github: 'https://github.com/Nikitadevs',
      live: 'https://github.com/Nikitadevs',
    },
    features: [
      'Multi-region deployment',
      'Auto-scaling configurations',
      'Infrastructure as Code',
      'Monitoring and alerting',
    ],
    outcomes: [
      'Cut release cycles from hours to minutes',
      'Standardized infra across staging and production',
      'Built-in drift detection and rollback paths',
    ],
    details:
      'Designed a modular Terraform workflow with reusable stacks, pipeline gates, and observability hooks. The system reduced deployment time by 70% while making environment parity predictable for the whole team.',
  },
  {
    id: 2,
    title: 'Kubernetes Cluster Management',
    description:
      'Production-grade Kubernetes operations layer with Helm releases, proactive monitoring, and automated recovery workflows.',
    accent: 'from-violet-500 to-purple-700',
    highlight: '99.9% availability',
    technologies: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
    category: 'devops',
    links: {
      github: 'https://github.com/Nikitadevs',
      live: 'https://github.com/Nikitadevs',
    },
    features: [
      'Custom controllers',
      'Auto-healing',
      'Performance monitoring',
      'Cost optimization',
    ],
    outcomes: [
      'Reduced incident response time with unified dashboards',
      'Automated node and pod recovery playbooks',
      'Lowered cloud spend through right-sizing policies',
    ],
    details:
      'Built a cluster management toolkit around Helm, Prometheus, and Grafana with alerting tuned to SLOs. The platform sustained 99.9% availability and trimmed operational costs by 40% through capacity insights.',
  },
  {
    id: 3,
    title: 'Microservices Architecture',
    description:
      'Event-driven backend composed of Go microservices, gRPC contracts, and an Istio service mesh for resilient traffic control.',
    accent: 'from-emerald-500 to-teal-700',
    highlight: '1M+ requests / day',
    technologies: ['Go', 'gRPC', 'Istio', 'MongoDB'],
    category: 'backend',
    links: {
      github: 'https://github.com/Nikitadevs',
      live: 'https://github.com/Nikitadevs',
    },
    features: [
      'Service discovery',
      'Load balancing',
      'Circuit breaking',
      'Distributed tracing',
    ],
    outcomes: [
      'Sub-100ms p95 latency under peak load',
      'Independent deploys per bounded context',
      'End-to-end traceability across services',
    ],
    details:
      'Architected a microservices platform with clear service boundaries, gateway routing, and mesh-level resilience patterns. The system handles 1M+ daily requests at 99.99% uptime with sub-100ms response times.',
  },
  {
    id: 4,
    title: 'Developer Portfolio',
    description:
      'Interactive personal portfolio featuring a liquid glass design system, section-driven routing, and motion-aware UX patterns.',
    accent: 'from-blue-500 to-indigo-600',
    highlight: 'Accessible glass UI',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS'],
    category: 'frontend',
    links: {
      github: 'https://github.com/Nikitadevs',
      live: 'https://github.com/Nikitadevs',
    },
    features: [
      'Liquid glass design system',
      'Reduced-motion support',
      'Responsive bento layouts',
      'Lazy-loaded modals',
    ],
    outcomes: [
      'Unified visual language across all sections',
      'Keyboard-friendly navigation and focus traps',
      'Optimized bundles with route-level code splitting',
    ],
    details:
      'Crafted a cohesive frontend experience with reusable glass panels, accessible interactions, and performance-conscious animations. The site demonstrates full-stack storytelling through projects, skills, and contact flows.',
  },
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'devops', label: 'DevOps' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
];

export const experiences = [
  {
    company: 'TechCorp Inc.',
    role: 'Senior Software Engineer',
    period: '2020 - Present',
    current: true,
    description:
      'Led development of multiple high-impact projects, architecting scalable solutions that serve millions of users globally. Spearheaded the migration to microservices architecture.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Implemented new features used by 1M+ active users',
      'Led a team of 5 developers and mentored junior engineers',
      'Reduced deployment time by 60% with CI/CD automation',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  {
    company: 'StartupHub Solutions',
    role: 'Full Stack Developer',
    period: '2018 - 2020',
    description:
      'Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver high-quality software solutions.',
    achievements: [
      'Built responsive web applications from scratch',
      'Integrated third-party APIs and payment systems',
      'Optimized database queries improving load times by 50%',
    ],
    technologies: ['JavaScript', 'Python', 'MongoDB', 'Express'],
  },
  {
    company: 'Digital Agency Pro',
    role: 'Frontend Developer',
    period: '2016 - 2018',
    description:
      'Created beautiful and functional user interfaces for client projects, ensuring pixel-perfect implementation and cross-browser compatibility.',
    achievements: [
      'Delivered 20+ client projects on time and within budget',
      'Improved website load times by 35% through optimization',
      'Implemented accessibility standards (WCAG 2.1)',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap'],
  },
];

export const education = [
  {
    school: 'Mundelein High School',
    degree: 'High School Diploma',
    period: '2023 - 2027',
    current: true,
    description:
      'Specialized in Artificial Intelligence and Machine Learning with focus on deep learning architectures and natural language processing',
    achievements: [
      'Graduated with High Honors (GPA: 3.9/4.0)',
      'Published 3 research papers in top-tier AI conferences',
      'Led student AI research group with 15+ members',
      'Received Best Thesis Award for ML research',
    ],
    courses: [
      'Advanced Algorithms',
      'Machine Learning',
      'Neural Networks',
      'Computer Vision',
      'NLP',
      'Deep Learning',
    ],
  },
];

export const heroHighlights = [
  {
    title: 'Fast experiences',
    description: 'Speed-optimized pages that feel fluid on every device.',
  },
  {
    title: 'Clean build',
    description: 'Readable code, accessible layouts, and thoughtful interactions.',
  },
  {
    title: 'Polished details',
    description: 'Subtle motion, contrast, and spacing for modern usability.',
  },
];

export const heroSkills = ['React', 'Node.js', 'TypeScript', 'UI/UX'];
