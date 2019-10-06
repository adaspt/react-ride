import { useEffect } from 'react';

import { Project } from '../../../model/projects';
import { getProject } from '../../../api/projects';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useProject = (projectId: string) => {
  const db = useDatabase();
  const { data: project, error: projectError, loading: projectLoading, load } = useAsyncData<Project>();

  useEffect(load(() => db.execute(getProject(projectId))), [projectId]);

  return {
    project,
    projectError,
    projectLoading
  };
};
