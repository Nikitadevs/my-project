import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiLayers, FiMonitor } from 'react-icons/fi';
import { ContactStrip, PageIntro } from './PortfolioComponents';
import { skillGroups } from './siteData';

const groupPresentation = [
  { icon: FiMonitor, href: '/projects?q=React', link: 'Explore React projects' },
  { icon: FiCode, href: '/projects?q=Python', link: 'Explore Python projects' },
  { icon: FiLayers, href: '/projects', link: 'See the work' },
];

function Skills() {
  return (
    <div className="container page-content skills-page">
      <PageIntro
        eyebrow="TOOLS & TECHNOLOGIES"
        title={<>A well-used toolbox<span className="accent-dot">.</span></>}
        description="The languages, frameworks, and tools I’ve been building with or exploring."
      />

      <section className="toolbox-grid" aria-label="Skills by category">
        {skillGroups.map((group, index) => {
          const presentation = groupPresentation[index] || groupPresentation[2];
          const Icon = presentation.icon;
          return (
            <article className="toolbox-card" key={group.title}>
              <div className="toolbox-card-top">
                <span className="toolbox-icon"><Icon aria-hidden="true" /></span>
                <span>{group.number} / {String(skillGroups.length).padStart(2, '0')}</span>
              </div>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <div className="toolbox-stack">
                <p>TOOLS &amp; TECHNOLOGIES</p>
                <ul className="skill-tags">
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
              <Link className="toolbox-link" to={presentation.href}>
                {presentation.link} <FiArrowRight aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>

      <ContactStrip />
    </div>
  );
}

export default Skills;
