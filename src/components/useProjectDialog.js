import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { projects } from './siteData';

export function useProjectDialog(searchQuery) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProject = projects.find((project) => project.id === searchParams.get('project')) || null;

  const openProject = (project) => {
    const next = new URLSearchParams(searchParams);
    if (typeof searchQuery === 'string') {
      if (searchQuery) next.set('q', searchQuery);
      else next.delete('q');
    }
    next.set('project', project.id);
    const previousState = location.state && typeof location.state === 'object' ? location.state : {};
    setSearchParams(next, { state: { ...previousState, projectDialogOpened: true } });
  };

  const closeProject = () => {
    if (location.state?.projectDialogOpened) {
      navigate(-1);
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.delete('project');
    setSearchParams(next, { replace: true });
  };

  return { selectedProject, openProject, closeProject };
}
