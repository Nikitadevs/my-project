import { Link } from 'react-router-dom';
import { FiArrowRight, FiCompass } from 'react-icons/fi';

function NotFound() {
  return (
    <div className="container page-content not-found-page">
      <div className="not-found-copy">
        <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />PAGE NOT FOUND / 404</p>
        <h1>Looks like a wrong <em>turn</em><span className="accent-dot">.</span></h1>
        <p>The page you’re looking for isn’t here. Head home or explore the work instead.</p>
        <div className="not-found-actions">
          <Link className="button button-primary" to="/">Go home <FiArrowRight aria-hidden="true" /></Link>
          <Link className="button button-quiet" to="/projects">Explore projects <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="not-found-art" aria-hidden="true">
        <span className="not-found-art-label">A SMALL DETOUR</span>
        <span className="not-found-orbit not-found-orbit-one" />
        <span className="not-found-orbit not-found-orbit-two" />
        <span className="not-found-compass"><FiCompass /></span>
        <strong>404<span>.</span></strong>
        <span className="not-found-art-caption">THERE’S MORE TO EXPLORE ↗</span>
      </div>
    </div>
  );
}

export default NotFound;
