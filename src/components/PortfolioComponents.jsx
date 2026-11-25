import { Link } from 'react-router-dom';
import { FiCheck, FiChevronRight, FiCode, FiGithub, FiMessageSquare, FiPlus } from 'react-icons/fi';

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
      <span className="preview-label">{kind === 'terminal' ? 'TERMINAL CONCEPT' : 'INTERFACE CONCEPT'}</span>
      {kind === 'tennis' && (
        <div className="tennis-preview">
          <div className="tennis-preview-header"><strong><span>✳</span> court<span className="tennis-wordmark">side</span></strong><span>MATCH CENTER</span></div>
          <div className="tennis-scoreboard">
            <div className="tennis-match-label"><span>Singles match</span><span>SET 02</span></div>
            <div className="tennis-player"><span className="player-avatar">A</span><strong>Player A</strong><span>6</span><b>40</b></div>
            <div className="tennis-player"><span className="player-avatar player-avatar--blue">B</span><strong>Player B</strong><span>4</span><b>30</b></div>
          </div>
          <div className="tennis-preview-bottom"><span className="mini-court"><i /></span><div><strong>Every point counts.</strong><span>Matches. Scores. Your game.</span></div><span className="tennis-ball" /></div>
        </div>
      )}
      {kind === 'form' && (
        <div className="registration-preview">
          <div className="registration-top"><span>THE NEXT STEP</span><FiCheck /></div>
          <strong>Make your mark.</strong>
          <p>Tennis tryout registration</p>
          <div className="registration-progress"><span /><span /><span /></div>
          <div className="registration-step">PLAYER DETAILS <span>Step 1 of 3</span></div>
          <div className="registration-fields"><span>First name<i>Alex</i></span><span>Last name<i>Morgan</i></span></div>
          <div className="registration-continue">Continue</div>
        </div>
      )}
      {kind === 'terminal' && (
        <div className="dealership-preview">
          <div className="terminal-top"><span /><span /><span /><strong>dealership.py</strong></div>
          <p className="terminal-command"><span>❯</span> python Dealership.py</p>
          <div className="terminal-banner">DEALERSHIP<span>INVENTORY MANAGER</span></div>
          <div className="terminal-table"><span>VEHICLE</span><span>STATUS</span><span>Sedan</span><b>Available</b><span>Sport coupe</span><b>Available</b><span>SUV</span><em>Reserved</em></div>
          <p className="terminal-prompt"><span>❯</span> Select an option <i /></p>
        </div>
      )}
      {kind === 'portfolio' && (
        <div className="website-preview">
          <div className="website-preview-nav"><strong>N.</strong><span>Work&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
          <div className="website-preview-body"><span>COMPUTER ENGINEER</span><strong>Ideas made<br /><em>useful.</em></strong><i>Thoughtful software, built with curiosity.</i><span className="website-preview-button">Explore my work</span></div>
          <div className="website-preview-tiles"><span /><span /><span /></div>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, onSelect, headingLevel: Heading = 'h3' }) {
  return (
    <article className="project-card">
      <button className="project-visual-button" type="button" onClick={() => onSelect(project)} aria-label={'View details for ' + project.title}>
        <ProjectVisual kind={project.visual} />
        <span className="project-open-hint"><FiPlus aria-hidden="true" /><span className="sr-only">Project details</span></span>
      </button>
      <div className="project-card-body">
        <p className="project-type">{project.type}</p>
        <Heading>{project.title}</Heading>
        <p className="project-description">{project.description}</p>
        <ul className="tag-list" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <div className="project-card-actions">
          <button className="text-link" type="button" onClick={() => onSelect(project)} aria-label={'View details for ' + project.title}>Explore project <FiPlus aria-hidden="true" /></button>
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={'View ' + project.title + ' source code on GitHub (opens in a new tab)'}><FiGithub aria-hidden="true" /> Code</a>
        </div>
      </div>
    </article>
  );
}

export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="contact-strip-copy">
        <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
        <h2>Have an idea?<br />Let’s make it <em>happen.</em></h2>
        <p>A project, a question, or a simple hello. I’d love to hear it.</p>
        <Link to="/contact" className="button button-primary"><FiMessageSquare aria-hidden="true" /> Get in touch</Link>
      </div>
      <div className="contact-strip-art" aria-hidden="true"><FiCode /><span>Let’s build<br />something good.</span><i>✳</i></div>
    </section>
  );
}
