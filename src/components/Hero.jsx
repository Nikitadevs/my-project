import { Link } from 'react-router-dom';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { projects, siteMeta } from './siteData';
import { ContactStrip, ProjectCard, ProjectVisual, SectionIntro } from './PortfolioComponents';
import ProjectModal from './ProjectModal';
import { useProjectDialog } from './useProjectDialog';

function Hero() {
  const { selectedProject, openProject, closeProject } = useProjectDialog();
  const featured = projects.slice(0, 3);
  const featuredProject = projects[0];

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" aria-hidden="true" />{siteMeta.title}</p>
          <h1>Ideas made <em>useful</em><span className="headline-dot">.</span></h1>
          <p className="hero-description">
            Hi, I’m {siteMeta.name}. I build thoughtful software, from the interface you see to the systems behind it.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">
              Explore my work <FiArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-quiet" to="/about">
              A little about me <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-bottom">
            <div className="hero-focus"><span>MY FOCUS</span><strong>Interfaces · software · systems</strong></div>
            <a className="scroll-cue" href="#selected-work">Scroll to explore <FiArrowDown aria-hidden="true" /></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="hero-feature-card">
            <div className="hero-feature-top">
              <span><i aria-hidden="true" /> SELECTED WORK</span>
              <span>{featuredProject.number} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            <ProjectVisual kind={featuredProject.visual} compact />
            <div className="hero-feature-info">
              <div>
                <span>{featuredProject.type}</span>
                <h2>{featuredProject.title}</h2>
                <p>{featuredProject.description}</p>
              </div>
              <button className="hero-feature-action" type="button" onClick={() => openProject(featuredProject)} aria-label={'Explore the ' + featuredProject.title + ' project'}>
                View project <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="selected-work" className="home-work section-block">
        <div className="container">
          <SectionIntro
            eyebrow="A FEW THINGS I’VE MADE"
            title="Work worth exploring."
            description="A selection of projects, from interactive web apps to a Python simulation."
            action={<Link className="section-link" to="/projects">All projects <FiArrowRight aria-hidden="true" /></Link>}
          />
          <div className="project-grid">
            {featured.map((project) => <ProjectCard key={project.id} project={project} onSelect={openProject} />)}
          </div>
        </div>
      </section>

      <section className="home-about section-block">
        <div className="container about-teaser">
          <div className="about-teaser-label">
            <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />A LITTLE ABOUT ME</p>
            <ul className="teaser-pillars">
              <li><span>01</span> Thoughtful interfaces</li>
              <li><span>02</span> Practical software</li>
              <li><span>03</span> Systems thinking</li>
            </ul>
          </div>
          <div>
            <h2>Curious by nature.<br /><em>Builder by practice.</em></h2>
            <p>I like understanding how things work, then making them a little better. My interests span the experience on the screen and the systems behind it.</p>
            <Link className="text-link" to="/about">More about me <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <div className="container section-block"><ContactStrip /></div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeProject} />}
    </>
  );
}

export default Hero;
