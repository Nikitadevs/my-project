import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiCompass,
  FiGithub,
  FiLayers,
  FiLinkedin,
} from 'react-icons/fi';
import { ContactStrip } from './PortfolioComponents';
import { education, siteMeta, socialLinks } from './siteData';

const principles = [
  { icon: FiCompass, title: 'Stay curious', text: 'Start with questions, explore the details, and keep learning along the way.' },
  { icon: FiLayers, title: 'Think in systems', text: 'Consider how each piece fits together, from the interface to the underlying logic.' },
  { icon: FiCode, title: 'Make it useful', text: 'Turn ideas into practical experiences that feel clear and considered.' },
];

const socialIcons = { GitHub: FiGithub, LinkedIn: FiLinkedin };
const focusTools = ['React', 'Python', 'Docker', 'Git'];

function About() {
  return (
    <div className="container page-content about-page">
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="about-hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />A LITTLE ABOUT ME</p>
          <h1 id="about-heading">Hello, I’m <em>{siteMeta.name}</em><span className="accent-dot">.</span></h1>
          <p className="about-lead">I build thoughtful software and like knowing how the pieces fit together.</p>
          <p className="about-bio">
            I’m a {siteMeta.title.toLowerCase()} who likes working across the stack—from clear interfaces to the systems behind them.
            I learn by building, experimenting, and refining the details.
          </p>
          <div className="about-actions">
            <Link className="button button-primary" to="/projects">Explore my work <FiArrowRight aria-hidden="true" /></Link>
            <Link className="button button-quiet" to="/contact">Get in touch <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="about-focus">
            <p>WORKING WITH &amp; EXPLORING</p>
            <ul aria-label="Selected technologies">
              {focusTools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
            <Link to="/skills" className="about-focus-link">View all skills <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>

        <aside className="profile-card" aria-label="Profile details">
          <div className="profile-art" aria-hidden="true">
            <span className="profile-art-label">PROFILE / 01</span>
            <span className="profile-orbit profile-orbit-one" />
            <span className="profile-orbit profile-orbit-two" />
            <strong>{siteMeta.name.charAt(0)}<span>.</span></strong>
            <span className="profile-art-caption">THOUGHTFUL / BY DESIGN</span>
          </div>
          <div className="profile-body">
            <div className="profile-identity">
              <div>
                <p>THE SHORT VERSION</p>
                <h2>{siteMeta.name}</h2>
                <span>{siteMeta.title}</span>
              </div>
              <span className="profile-mark" aria-hidden="true">✳</span>
            </div>
            <dl className="profile-facts">
              <div><dt>FOCUS</dt><dd>Interfaces &amp; systems</dd></div>
              <div><dt>EDUCATION</dt><dd>{education.school}</dd></div>
            </dl>
            <div className="profile-socials" aria-label="Social profiles">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.name] || FiArrowUpRight;
                return (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                    <Icon aria-hidden="true" /> {social.name} <FiArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      <section className="about-paths" aria-labelledby="paths-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />THE BIGGER PICTURE</p>
            <h2 id="paths-title">A little more about my path.</h2>
            <p>Take a closer look at the experiences and education behind the work.</p>
          </div>
        </div>
        <div className="about-path-grid">
          <Link className="about-path-card" to="/experience">
            <span className="about-path-icon"><FiBriefcase aria-hidden="true" /></span>
            <span className="about-path-copy">
              <span>01 / EXPERIENCE</span>
              <strong>Learning by building</strong>
              <span>Explore the projects and practice behind my work.</span>
            </span>
            <FiArrowRight className="about-path-arrow" aria-hidden="true" />
          </Link>
          <Link className="about-path-card" to="/education">
            <span className="about-path-icon"><FiBookOpen aria-hidden="true" /></span>
            <span className="about-path-copy">
              <span>02 / EDUCATION</span>
              <strong>Always learning</strong>
              <span>{education.school} · {education.period}</span>
            </span>
            <FiArrowRight className="about-path-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />HOW I APPROACH THINGS</p>
            <h2 id="values-title">A few guiding ideas.</h2>
          </div>
        </div>
        <div className="values-grid">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <article className="value-card" key={title}>
              <div className="value-card-top"><span className="value-icon"><Icon aria-hidden="true" /></span><span>0{index + 1}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactStrip />
    </div>
  );
}

export default About;
