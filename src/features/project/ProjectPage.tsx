import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { Diagram } from '../../model/diagrams';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useProject } from './hooks/useProject';
import { useDiagramList } from './hooks/useDiagramList';
import ProjectSideBar from './components/ProjectSideBar';
import DiagramList from './components/DiagramList';

interface RouteParams {
  projectId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const ProjectPage: React.FC<Props> = ({ projectId = '', navigate }) => {
  const { project, projectError, projectLoading } = useProject(projectId);
  const { diagrams, diagramsError, diagramsLoading } = useDiagramList(projectId);
  const [creatingNewDiagram, setCreatingNewDiagram] = useState(false);

  if (projectError) {
    return <Error message={projectError} />;
  }

  if (projectLoading && !project) {
    return <Loading />;
  }

  if (!project) {
    return null;
  }

  const handleNewDiagram = () => setCreatingNewDiagram(true);
  const handleDiagramCreated = (diagram: Diagram) =>
    navigate && navigate(`/projects/${diagram.projectId}/${diagram.id}`);
  const handleCancelNewDiagram = () => setCreatingNewDiagram(false);

  const renderSideBarContent = () => (
    <ProjectSideBar
      project={project}
      creatingNewDiagram={creatingNewDiagram}
      onDiagramCreated={handleDiagramCreated}
      onDiagramCreateCancel={handleCancelNewDiagram}
    />
  );

  return (
    <Content renderSideBarContent={renderSideBarContent}>
      <div className="container-fluid py-5">
        <DiagramList
          projectId={projectId}
          error={diagramsError}
          loading={diagramsLoading}
          diagrams={diagrams}
          onNewDiagram={handleNewDiagram}
        />
      </div>
    </Content>
  );
};

export default withAuthentication(ProjectPage);
