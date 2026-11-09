import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiLayers } from 'react-icons/fi';
import { AboutBreadcrumb, ContactStrip, PageIntro } from './PortfolioComponents';
import { projects } from './siteData';

function Experience() {
  return (
    <div className="container page-content experience-page">
      <AboutBreadcrumb current="Experience" />
      <PageIntro
        eyebrow="EXPERIENCE"
        title={<>Learning by building<span className="accent-dot">.</span></>}
        description="Hands-on projects are where ideas become practical skills. Here are a few things I’ve explored along the way."
      />

      <div className="journey-layout">
        <aside className="journey-intro">
          <span className="journey-intro-icon"><FiLayers aria-hidden="true" /></span>
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />HANDS-ON WORK</p>
          <h2>Ideas are better when you build them.</h2>
          <p>Each project is a chance to explore a problem, try a new approach, and keep learning.</p>
          <Link className="text-link" to="/projects">Browse all projects <FiArrowRight aria-hidden="true" /></Link>
        </aside>

        <section className="journey-list" aria-label="Hands-on project experience">
          {projects.slice(0, 3).map((project) => (
            <article className="journey-entry" key={project.id}>
              <div className="journey-marker" aria-hidden="true"><span>{project.number}</span></div>
              <div className="journey-card">
                <p className="project-type">{project.type}</p>
                <h2>{project.title}</h2>
                <p className="journey-description">{project.details}</p>
                <ul className="journey-features" aria-label="Project features">
                  {project.features.slice(0, 2).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="journey-card-bottom">
                  <ul className="tag-list" aria-label="Technologies">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    View source <FiArrowUpRight aria-hidden="true" /><span className="sr-only"> for {project.title} (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <ContactStrip />
    </div>
  );
}

export default Experience;
