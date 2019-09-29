import { useEffect } from 'react';

import { Project } from '../../../model/projects';
import { getProjects } from '../../../api/projects';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useProjectList = () => {
  const db = useDatabase();
  const {
    data: projects,
    error: projectsError,
    loading: projectsLoading,
    loadStart,
    loadSuccess,
    loadFailure
  } = useAsyncData<Project[]>();

  const fetchData = async () => {
    try {
      loadStart();
      const data = await db.execute(getProjects());
      loadSuccess(data);
    } catch (ex) {
      loadFailure(ex.message || 'Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    projects,
    projectsError,
    projectsLoading
  };
};
