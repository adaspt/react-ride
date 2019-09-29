import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import { useProjectList } from './hooks/useProjectList';

interface Props extends RouteComponentProps {
  user: User;
}

const ProjectsPage: React.FC<Props> = () => {
  const { projects, projectsError, projectsLoading } = useProjectList();

  if (projectsError) {
    return <>projectsError</>;
  }

  if (!projects || projectsLoading) {
    return <>Loading...</>;
  }

  return <>Projects {projects.length}</>;
};

export default withAuthentication(ProjectsPage);
