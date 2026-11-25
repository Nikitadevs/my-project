import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiGithub, FiLink2, FiX } from 'react-icons/fi';
import { ProjectVisual } from './PortfolioComponents';

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const shareInputRef = useRef(null);
  const backdropPointerRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState('idle');
  const shareUrl = new URL('/projects?project=' + encodeURIComponent(project.id), window.location.origin).href;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      const returnTarget = previousFocus instanceof HTMLElement && previousFocus.isConnected && previousFocus !== document.body
        ? previousFocus
        : document.getElementById('main-content');
      returnTarget?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    setCopyStatus('idle');
  }, [project.id]);

  useEffect(() => {
    if (copyStatus === 'fallback') shareInputRef.current?.focus();
  }, [copyStatus]);

  const copyProjectLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('fallback');
    }
  };

  const isOutsideDialog = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-description"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointerRef.current = event.button === 0 && event.isPrimary && isOutsideDialog(event)
          ? event.pointerId
          : null;
      }}
      onPointerUp={(event) => {
        const shouldDismiss = backdropPointerRef.current === event.pointerId && isOutsideDialog(event);
        backdropPointerRef.current = null;
        if (shouldDismiss) onClose();
      }}
      onPointerCancel={() => { backdropPointerRef.current = null; }}
    >
      <div className="dialog-content">
        <button className="dialog-close icon-button" type="button" onClick={onClose} aria-label="Close project details" autoFocus>
          <FiX aria-hidden="true" />
        </button>
        <ProjectVisual kind={project.visual} compact />
        <div className="dialog-body">
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />{project.type}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p id="project-dialog-description" className="dialog-description">{project.details}</p>
          <h3>What’s inside</h3>
          <ul className="feature-list">
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <ul className="tag-list" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="dialog-actions">
            <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" /> View source
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button className="button button-quiet" type="button" onClick={copyProjectLink}>
              {copyStatus === 'copied' ? <FiCheck aria-hidden="true" /> : <FiLink2 aria-hidden="true" />}
              {copyStatus === 'copied' ? 'Link copied' : 'Copy project link'}
            </button>
          </div>
          <span className="sr-only" role="status">{copyStatus === 'copied' ? 'Project link copied.' : ''}</span>
          {copyStatus === 'fallback' && (
            <div className="dialog-share-fallback">
              <label htmlFor="project-share-link">Copy this project link</label>
              <input ref={shareInputRef} id="project-share-link" value={shareUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default ProjectModal;
