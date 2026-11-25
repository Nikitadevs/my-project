import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiGithub, FiLayers, FiLinkedin } from 'react-icons/fi';
import { projects, siteMeta, socialLinks } from './siteData';
import { ContactStrip, ProjectCard, ProjectVisual, SectionIntro } from './PortfolioComponents';
import ProjectModal from './ProjectModal';
import { useProjectDialog } from './useProjectDialog';

const socialIcons = { GitHub: FiGithub, LinkedIn: FiLinkedin };
const tools = ['React', 'JavaScript', 'Python', 'SQLite', 'Docker', 'Git'];

function Hero() {
  const { selectedProject, openProject, closeProject } = useProjectDialog();
  const [featuredId, setFeaturedId] = useState(projects[0].id);
  const featuredProject = projects.find((project) => project.id === featuredId) || projects[0];

  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-introduction"><span className="hello-mark" aria-hidden="true">✳</span> Hi, I’m {siteMeta.name}.</p>
          <p className="eyebrow hero-eyebrow">{siteMeta.title} &amp; curious builder</p>
          <h1 id="hero-title">Ideas made<br /><em>useful.</em></h1>
          <p className="hero-description">
            Thoughtful interfaces. Practical software. I build things for the web and explore the systems that make them work.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects"><FiLayers aria-hidden="true" /> Explore my work</Link>
            <Link className="button button-quiet" to="/about">A little about me</Link>
          </div>
          <div className="hero-socials" aria-label="Find me online">
            <span>ELSEWHERE</span>
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.name] || FiCode;
              return (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                  <Icon aria-hidden="true" /> {social.name}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-showcase">
          <div className="showcase-caption"><span className="eyebrow">From idea to interface</span><span>PROJECT SPOTLIGHT</span></div>
          <div className="workspace">
            <div className="workspace-chrome"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>nikita / selected-work</span><FiCode aria-hidden="true" /></div>
            <div className="spotlight-picker" role="group" aria-label="Choose a featured project">
              {projects.slice(0, 3).map((project) => (
                <button key={project.id} type="button" aria-pressed={featuredId === project.id} onClick={() => setFeaturedId(project.id)}>{project.title}</button>
              ))}
            </div>
            <div className="workspace-preview" id="featured-preview">
              <ProjectVisual kind={featuredProject.visual} compact />
              <div className="spotlight-copy" aria-live="polite" aria-atomic="true">
                <p className="project-type">{featuredProject.type}</p>
                <h2>{featuredProject.title}</h2>
                <p>{featuredProject.description}</p>
              </div>
            </div>
            <div className="workspace-footer">
              <span><FiCode aria-hidden="true" /> Built with {featuredProject.technologies[0]}</span>
              <button type="button" onClick={() => openProject(featuredProject)}>Explore project</button>
            </div>
          </div>
        </div>
      </section>

      <div className="tools-band">
        <div className="container tools-band-inner">
          <span>MY EVERYDAY TOOLBOX</span>
          <ul aria-label="Selected tools">{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          <Link to="/skills">View skills</Link>
        </div>
      </div>

      <section id="selected-work" className="home-work section-block">
        <div className="container">
          <SectionIntro
            eyebrow="THE BUILD LOG"
            title="A little more of my work."
            description="Different problems. New tools. Something learned with every build."
            action={<Link className="section-link" to="/projects">Explore all {projects.length} projects</Link>}
          />
          <div className="project-grid">
            {projects.slice(1).map((project) => <ProjectCard key={project.id} project={project} onSelect={openProject} />)}
          </div>
        </div>
      </section>

      <section className="home-about section-block">
        <div className="container about-teaser">
          <div className="about-teaser-label">
            <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />THE PERSON BEHIND THE CODE</p>
            <div className="builder-mark" aria-hidden="true">N<span>✳</span></div>
            <p className="builder-caption">Always curious. Always building.</p>
          </div>
          <div>
            <h2>Curious by nature.<br /><em>Builder by practice.</em></h2>
            <p>I like understanding how things work, then making them a little better. My interests span the experience on the screen and the systems behind it.</p>
            <div className="teaser-topics"><span>Interfaces</span><span>Software</span><span>Systems thinking</span></div>
            <Link className="text-link" to="/about">Get to know me</Link>
          </div>
        </div>
      </section>

      <div className="container section-block"><ContactStrip /></div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={closeProject} />}
    </>
  );
}

export default Hero;
