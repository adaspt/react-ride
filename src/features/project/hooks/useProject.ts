import { useEffect } from 'react';

import { useProjectContext } from '../../entities/hooks/useProjectProvider';

export const useProject = (projectId: string) => {
  const { projects, projectsError, projectsLoading, loadProjects } = useProjectContext();

  useEffect(loadProjects(), []);

  const project = projects && projects[projectId];
  const projectError = projectsError || (projects && !project && 'Project does not exist.');

  return {
    project,
    projectError,
    projectLoading: projectsLoading
  };
};
