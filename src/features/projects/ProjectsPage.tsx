import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import { useProjectList } from './hooks/useProjectList';
import ProjectList from './components/ProjectList';

interface Props extends RouteComponentProps {
  user: User;
}

const ProjectsPage: React.FC<Props> = () => {
  const { projects, projectsError, projectsLoading } = useProjectList();

  return (
    <Content>
      <div className="container-fluid py-5">
        <ProjectList projects={projects} error={projectsError} loading={projectsLoading} />
      </div>
    </Content>
  );
};

export default withAuthentication(ProjectsPage);
