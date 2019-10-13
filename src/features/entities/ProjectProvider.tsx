import React, { useMemo } from 'react';

import { ProjectContextProvider, useProjectProvider } from './hooks/useProjectProvider';

const ProjectProvider: React.FC = ({ children }) => {
  const { projects, projectsError, projectsLoading, loadProjects } = useProjectProvider();
  const providerValue = useMemo(
    () => ({
      projects,
      projectsError,
      projectsLoading,
      loadProjects
    }),
    [projects, projectsError, projectsLoading, loadProjects]
  );

  return <ProjectContextProvider value={providerValue}>{children}</ProjectContextProvider>;
};

export default ProjectProvider;
