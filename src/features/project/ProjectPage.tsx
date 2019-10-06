import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import Error from '../../components/Error';
import { useProject } from './hooks/useProject';
import { useDiagramList } from './hooks/useDiagramList';
import ProjectSideBar from './components/ProjectSideBar';
import DiagramList from './components/DiagramList';
import Loading from '../../components/Loading';

interface RouteParams {
  projectId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const ProjectPage: React.FC<Props> = ({ projectId = '' }) => {
  const { project, projectError, projectLoading } = useProject(projectId);
  const { diagrams, diagramsError, diagramsLoading } = useDiagramList(projectId);

  if (projectError) {
    return <Error message={projectError} />;
  }

  if (projectLoading) {
    return <Loading />;
  }

  if (!project) {
    return null;
  }

  const renderSideBarContent = () => <ProjectSideBar project={project} />;

  return (
    <Content renderSideBarContent={renderSideBarContent}>
      <div className="container-fluid py-5">
        <DiagramList
          projectId={projectId}
          error={diagramsError}
          loading={diagramsLoading}
          diagrams={diagrams}
        />
      </div>
    </Content>
  );
};

export default withAuthentication(ProjectPage);
