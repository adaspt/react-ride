import { useEffect, useMemo } from 'react';

import { useProjectContext } from '../../entities/hooks/useProjectProvider';

export const useProjectList = () => {
  const { projects, projectsError, projectsLoading, loadProjects } = useProjectContext();

  useEffect(loadProjects(), []);

  return {
    projects: useMemo(() => projects && Object.values(projects), [projects]),
    projectsError,
    projectsLoading
  };
};
