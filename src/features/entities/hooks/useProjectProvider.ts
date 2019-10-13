import { createContext, useContext, useCallback } from 'react';
import indexBy from 'ramda/es/indexBy';
import prop from 'ramda/es/prop';

import { asyncPipe } from '../../../utils/functions';
import { Project } from '../../../model/projects';
import { getProjects } from '../../../api/projects';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { useDatabase } from '../../../hooks/useDatabase';

export const useProjectProvider = () => {
  const db = useDatabase();
  const { data: projects, error: projectsError, loading: projectsLoading, load } = useAsyncData<
    Record<string, Project>
  >();

  const loadProjects = useCallback(() => load(asyncPipe(getProjects, db.execute, indexBy(prop('id')))), [
    load,
    db.execute
  ]);

  return {
    projects,
    projectsError,
    projectsLoading,
    loadProjects
  };
};

type ProjectProviderValue = ReturnType<typeof useProjectProvider>;

const ProjectContext = createContext<ProjectProviderValue | undefined>(undefined);

export const ProjectContextProvider = ProjectContext.Provider;

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("'useProjectContext' must be used within ProjectProvider.");
  }

  return context;
};
