export const siteMeta = {
  name: 'Nikita',
  title: 'Computer Engineer',
  tagline: 'Designing and building reliable systems, from hardware-aware thinking to polished software.',
  contactEmail: '',
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Nikitadevs' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nikita-veretenko-b502b928a' },
];

export const projects = [
  {
    id: 'tennis-app',
    number: '01',
    title: 'Tennis App',
    type: 'Web application',
    category: 'web',
    visual: 'tennis',
    description: 'A tennis companion for tracking matches, scores, and player profiles.',
    details: 'A React application that brings match tracking, scoreboards, player profiles, and settings together in one place.',
    technologies: ['React', 'JavaScript', 'Vite'],
    features: ['Match tracking and scoreboards', 'Player profiles', 'Responsive application views'],
    github: 'https://github.com/Nikitadevs/Tennis-app',
  },
  {
    id: 'tryout-form',
    number: '02',
    title: 'Tryout Form',
    type: 'Web application',
    category: 'web',
    visual: 'form',
    description: 'A multi-step registration experience for tennis tryouts.',
    details: 'A React registration flow with step-by-step forms, input validation, date selection, and a signature field.',
    technologies: ['React', 'Formik', 'Framer Motion'],
    features: ['Multi-step registration', 'Form validation', 'Date and signature inputs'],
    github: 'https://github.com/Nikitadevs/Tryout-Form',
  },
  {
    id: 'python-dealership',
    number: '03',
    title: 'Python Dealership',
    type: 'Python project',
    category: 'python',
    visual: 'terminal',
    description: 'A car dealership simulator built around inventory, customers, and business decisions.',
    details: 'A terminal-based Python simulation that models dealership inventory, customers, employees, and more.',
    technologies: ['Python', 'SQLite', 'Rich'],
    features: ['Vehicle inventory', 'Customer and employee models', 'Terminal interface'],
    github: 'https://github.com/Nikitadevs/Python-Dealership',
  },
  {
    id: 'portfolio',
    number: '04',
    title: 'Developer Portfolio',
    type: 'Web application',
    category: 'web',
    visual: 'portfolio',
    description: 'A personal space for sharing projects, skills, and the thinking behind the work.',
    details: 'This responsive portfolio is built with React and Vite, with accessible interactions and a design that adapts to different screens.',
    technologies: ['React', 'JavaScript', 'Vite'],
    features: ['Responsive layouts', 'Light and dark themes', 'Keyboard-friendly interactions'],
    github: 'https://github.com/Nikitadevs/my-project',
  },
];

export const skillGroups = [
  {
    number: '01',
    title: 'Interfaces',
    description: 'Creating clear, responsive experiences for the web.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Programming',
    description: 'Building the logic and data models behind an application.',
    skills: ['Python', 'Java', 'Node.js', 'SQLite', 'SQL'],
  },
  {
    number: '03',
    title: 'Systems & tools',
    description: 'Exploring the tools that help software run and evolve.',
    skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
];

export const education = {
  school: 'Mundelein High School',
  program: 'High school',
  period: '2023 – 2027',
};
