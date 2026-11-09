import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiCompass } from 'react-icons/fi';
import { AboutBreadcrumb, ContactStrip, PageIntro } from './PortfolioComponents';
import { education } from './siteData';

function Education() {
  return (
    <div className="container page-content education-page">
      <AboutBreadcrumb current="Education" />
      <PageIntro
        eyebrow="EDUCATION"
        title={<>Always learning<span className="accent-dot">.</span></>}
        description="A foundation for asking better questions, exploring new ideas, and putting them into practice."
      />

      <div className="education-layout">
        <section className="education-card" aria-labelledby="education-school">
          <div className="education-card-top">
            <span className="education-icon"><FiBookOpen aria-hidden="true" /></span>
            <span className="education-index">EDUCATION / 01</span>
          </div>
          <div className="education-card-copy">
            <p className="project-type">{education.program}</p>
            <h2 id="education-school">{education.school}</h2>
            <p>A foundation for asking questions and exploring new ideas.</p>
          </div>
          <div className="education-period">
            <span>STUDY PERIOD</span>
            <strong>{education.period}</strong>
          </div>
        </section>

        <section className="learning-note" aria-labelledby="learning-title">
          <span className="learning-icon"><FiCompass aria-hidden="true" /></span>
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />BEYOND THE CLASSROOM</p>
          <h2 id="learning-title">Learning continues in the work.</h2>
          <p>Projects are a place to experiment, solve problems, and turn new ideas into something tangible.</p>
          <Link className="text-link" to="/projects">See what I’ve made <FiArrowRight aria-hidden="true" /></Link>
        </section>
      </div>
      <ContactStrip />
    </div>
  );
}

export default Education;
