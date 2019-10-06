import { useEffect } from 'react';

import { Project } from '../../../model/projects';
import { getProjects } from '../../../api/projects';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useDiagramList = (projectId: string) => {
  const db = useDatabase();
  const {
    data: diagrams,
    error: diagramsError,
    loading: diagramsLoading,
    loadStart,
    loadSuccess,
    loadFailure
  } = useAsyncData<Project[]>();

  const fetchData = async (projectId: string) => {
    try {
      loadStart();
      const data = await db.execute(getProjects());
      loadSuccess(data);
    } catch (ex) {
      loadFailure(ex.message || 'Failed to load data');
    }
  };

  useEffect(() => {
    fetchData(projectId);
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    diagrams,
    diagramsError,
    diagramsLoading
  };
};
