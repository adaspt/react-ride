import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import { useDiagramList } from './hooks/useDiagramList';
import DiagramList from './components/DiagramList';

interface RouteParams {
  projectId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const ProjectPage: React.FC<Props> = ({ projectId = '' }) => {
  const { diagrams } = useDiagramList(projectId);

  return (
    <Content>
      <div className="container-fluid py-5">
        <DiagramList projectId={projectId} diagrams={diagrams} error={null} loading={false} />
      </div>
    </Content>
  );
};

export default withAuthentication(ProjectPage);
