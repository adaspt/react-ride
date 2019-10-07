import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import Content from '../../components/Content';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useProject } from '../project/hooks/useProject';
import { useDiagram } from './hooks/useDiagram';
import { useSelection } from './hooks/useSelection';
import DiagramSideBar from './components/DiagramSideBar';
import DiagramSurface from './components/DiagramSurface';
import { useComponentTree } from './hooks/useComponentTree';

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
  const { tree, treeError, treeLoading, updateComponent } = useComponentTree(projectId, diagramId);
  const selection = useSelection();

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

  const renderSideBar = () => (
    <DiagramSideBar
      project={project}
      diagram={diagram}
      tree={tree}
      selectedTab={selection.tab}
      selectedComponentId={selection.componentId}
      selectedPropIndex={selection.propIndex}
      selectedHookIndex={selection.hookIndex}
      onComponentUpdated={updateComponent}
      onTabChange={selection.selectTab}
    />
  );

  return (
    <Content renderSideBarContent={renderSideBar}>
      <DiagramSurface
        tree={tree}
        treeError={treeError}
        treeLoading={treeLoading}
        selectedComponentId={selection.componentId}
        onComponentSelect={selection.selectComponent}
      />
    </Content>
  );
};

export default withAuthentication(DiagramPage);
