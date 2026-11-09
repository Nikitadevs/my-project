import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { siteMeta, socialLinks } from './siteData';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link className="footer-brand" to="/">{siteMeta.name}<span>.</span></Link>
            <p>Thoughtful software, built with curiosity.</p>
            <Link className="footer-contact-link" to="/contact">Let’s connect <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div>
              <p>Explore</p>
              <Link to="/projects">Work</Link>
              <Link to="/about">About</Link>
              <Link to="/skills">Skills</Link>
            </div>
            <div>
              <p>More</p>
              <Link to="/experience">Experience</Link>
              <Link to="/education">Education</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div>
              <p>Elsewhere</p>
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                  {social.name} <FiArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteMeta.name}</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
