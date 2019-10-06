import { useEffect } from 'react';

import { Project } from '../../../model/projects';
import { getProjects } from '../../../api/projects';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useProjectList = () => {
  const db = useDatabase();
  const { data: projects, error: projectsError, loading: projectsLoading, load } = useAsyncData<Project[]>();

  useEffect(load(() => db.execute(getProjects())), []);

  return {
    projects,
    projectsError,
    projectsLoading
  };
};
