import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigationType, useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { ContactStrip, PageIntro, ProjectCard } from './PortfolioComponents';
import ProjectModal from './ProjectModal';
import { projects } from './siteData';
import { useProjectDialog } from './useProjectDialog';

const filters = [
  { id: 'all', label: 'All projects' },
  { id: 'web', label: 'Web apps' },
  { id: 'python', label: 'Python' },
];

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { key: locationKey } = useLocation();
  const navigationType = useNavigationType();
  const searchRef = useRef(null);
  const pendingQuery = useRef(null);
  const requestedFilter = searchParams.get('category');
  const filter = filters.some((item) => item.id === requestedFilter) ? requestedFilter : 'all';
  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const { selectedProject, openProject, closeProject } = useProjectDialog(query);

  useEffect(() => {
    // Keep typing immediate while router updates are deferred, but honor history navigation.
    if (navigationType === 'POP' || pendingQuery.current === null || pendingQuery.current === urlQuery) {
      pendingQuery.current = null;
      setQuery(urlQuery);
    }
  }, [locationKey, navigationType, urlQuery]);

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === 'all' || project.category === filter;
      const searchable = [project.title, project.description, project.type, ...project.technologies].join(' ').toLowerCase();
      return matchesFilter && (!search || searchable.includes(search));
    });
  }, [filter, query]);

  const updateQuery = (value) => {
    setQuery(value);
    pendingQuery.current = value;
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set('q', value);
      else next.delete('q');
      return next;
    }, { replace: true });
  };

  const updateFilter = (value) => {
    pendingQuery.current = query;
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (query) next.set('q', query);
      else next.delete('q');
      if (value === 'all') next.delete('category');
      else next.set('category', value);
      return next;
    });
  };

  const resetFilters = () => {
    setQuery('');
    pendingQuery.current = '';
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.delete('q');
      next.delete('category');
      return next;
    });
    searchRef.current?.focus();
  };

  return (
    <div className="container page-content work-page">
      <PageIntro
        eyebrow="SELECTED WORK"
        title={<>Built with purpose<span className="accent-dot">.</span></>}
        description="A selection of projects exploring useful ideas, thoughtful interfaces, and the code behind them."
      />

      <section className="projects-section" aria-label="Projects">
        <div className="project-toolbar">
          <div className="filter-list" role="group" aria-label="Filter projects">
            {filters.map((item) => {
              const count = item.id === 'all' ? projects.length : projects.filter((project) => project.category === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={'filter-button' + (filter === item.id ? ' is-active' : '')}
                  aria-pressed={filter === item.id}
                  onClick={() => updateFilter(item.id)}
                >
                  {item.label}<span className="filter-count" aria-hidden="true">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="search-field" role="search">
            <FiSearch aria-hidden="true" />
            <label className="sr-only" htmlFor="project-search">Search projects</label>
            <input
              ref={searchRef}
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search projects or tools"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => { updateQuery(''); searchRef.current?.focus(); }}
              >
                <FiX aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="results-row">
          <p className="results-count" role="status" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
          {(filter !== 'all' || query) && <button className="clear-filters" type="button" onClick={resetFilters}>Clear filters <FiX aria-hidden="true" /></button>}
        </div>

        {filteredProjects.length ? (
          <div className="project-grid">
            {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onSelect={openProject} headingLevel="h2" />)}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon"><FiSearch aria-hidden="true" /></span>
            <h2>No projects found.</h2>
            <p>Try a different search or show all projects.</p>
            <button type="button" className="text-link" onClick={resetFilters}>Reset filters <span aria-hidden="true">→</span></button>
          </div>
        )}
      </section>

      <ContactStrip />
      {selectedProject && <ProjectModal project={selectedProject} onClose={closeProject} />}
    </div>
  );
}

export default Projects;
