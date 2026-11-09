import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiChevronRight, FiGithub } from 'react-icons/fi';
import { projects } from './siteData';

export function AboutBreadcrumb({ current }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/about">About</Link>
      <FiChevronRight aria-hidden="true" />
      <span aria-current="page">{current}</span>
    </nav>
  );
}

export function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro-description">{description}</p>
    </div>
  );
}

export function SectionIntro({ eyebrow, title, description, action }) {
  return (
    <div className="section-intro">
      <div>
        <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProjectVisual({ kind, compact = false }) {
  return (
    <div className={'project-visual project-visual--' + kind + (compact ? ' is-compact' : '')} aria-hidden="true">
      {kind === 'tennis' && (
        <div className="court-art">
          <div className="court-lines"><span /></div>
          <div className="court-ball" />
          <span className="visual-caption">MATCH / 01</span>
        </div>
      )}
      {kind === 'form' && (
        <div className="form-art">
          <div className="form-art-top"><span /><span /><span /></div>
          <div className="form-art-heading" />
          <div className="form-art-line" />
          <div className="form-art-line short" />
          <div className="form-art-choice"><FiCheck /><span /></div>
          <div className="form-art-bottom" />
        </div>
      )}
      {kind === 'terminal' && (
        <div className="terminal-art">
          <div className="terminal-top"><span /><span /><span /></div>
          <p><span>›</span> python Dealership.py</p>
          <p className="terminal-muted">class <strong>Inventory</strong>:</p>
          <p className="terminal-muted indent">check_inventory() <span>_</span></p>
        </div>
      )}
      {kind === 'portfolio' && (
        <div className="portfolio-art">
          <div className="portfolio-art-bar"><span /><span /><span /></div>
          <div className="portfolio-art-content"><strong>N<span>.</span></strong><div><i /><i /><i /></div></div>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, onSelect, headingLevel: Heading = 'h3' }) {
  return (
    <article className="project-card">
      <button
        className="project-visual-button"
        type="button"
        onClick={() => onSelect(project)}
        aria-label={'View details for ' + project.title}
      >
        <ProjectVisual kind={project.visual} />
        <span className="project-number">{project.number} / {String(projects.length).padStart(2, '0')}</span>
        <span className="project-visual-arrow"><FiArrowRight aria-hidden="true" /></span>
      </button>
      <div className="project-card-body">
        <p className="project-type">{project.type}</p>
        <Heading>{project.title}</Heading>
        <p className="project-description">{project.description}</p>
        <ul className="tag-list" aria-label="Technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-card-actions">
          <button className="text-link" type="button" onClick={() => onSelect(project)} aria-label={'View details for ' + project.title}>
            Project details <FiArrowRight aria-hidden="true" />
          </button>
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={'View ' + project.title + ' source code on GitHub (opens in a new tab)'}>
            <FiGithub aria-hidden="true" /> Code
          </a>
        </div>
      </div>
    </article>
  );
}

export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div>
        <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />LET’S CONNECT</p>
        <h2>Have an idea in mind?</h2>
        <p>Good things start with a conversation.</p>
      </div>
      <Link to="/contact" className="button button-primary">
        Get in touch <FiArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}
