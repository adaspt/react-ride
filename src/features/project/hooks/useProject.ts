import { useEffect } from 'react';

import { Project } from '../../../model/projects';
import { getProject } from '../../../api/projects';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useProject = (projectId: string) => {
  const db = useDatabase();
  const {
    data: project,
    error: projectError,
    loading: projectLoading,
    loadStart,
    loadSuccess,
    loadFailure
  } = useAsyncData<Project>();

  const fetchData = async (projectId: string) => {
    try {
      loadStart();
      const data = await db.execute(getProject(projectId));
      loadSuccess(data);
    } catch (ex) {
      loadFailure(ex.message || 'Failed to load data');
    }
  };

  useEffect(() => {
    fetchData(projectId);
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    project,
    projectError,
    projectLoading
  };
};
