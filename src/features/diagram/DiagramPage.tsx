import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useProject } from '../project/hooks/useProject';
import { useDiagram } from './hooks/useDiagram';
import DiagramSideBar from './components/DiagramSideBar';

interface RouteParams {
  projectId: string;
  diagramId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const DiagramPage: React.FC<Props> = ({ projectId = '', diagramId = '' }) => {
  const { project, projectError, projectLoading } = useProject(projectId);
  const { diagram, diagramError, diagramLoading } = useDiagram(projectId, diagramId);

  const error = projectError || diagramError;
  if (error) {
    return <Error message={error} />;
  }

  if (projectLoading || diagramLoading) {
    return <Loading />;
  }

  if (!project || !diagram) {
    return null;
  }

  const renderSideBar = () => <DiagramSideBar project={project} diagram={diagram} />;

  return (
    <Content renderSideBarContent={renderSideBar}>
      Diagram {project.name} {diagram.name}
    </Content>
  );
};

export default withAuthentication(DiagramPage);
