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
  const selection = useSelection();
  const {
    tree,
    treeError,
    treeLoading,
    updateComponent,
    addComponent,
    addProp,
    updateProp,
    deleteProp,
    addHook
  } = useComponentTree(projectId, diagramId, selection.selectComponent);

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
      key={selection.componentId || ''}
      project={project}
      diagram={diagram}
      tree={tree}
      selectedTab={selection.tab}
      selectedComponentId={selection.componentId}
      selectedPropIndex={selection.propIndex}
      selectedHookIndex={selection.hookIndex}
      onComponentUpdated={updateComponent}
      onTabChange={selection.selectTab}
      onComponentAdd={addComponent}
      onPropSelect={(componentId, propIndex) => selection.selectComponent(componentId, propIndex, null)}
      onPropAdd={addProp}
      onPropUpdated={updateProp}
      onPropCancel={() => selection.selectComponent(selection.componentId, null, null)}
      onPropDelete={deleteProp}
      onHookSelect={(componentId, hookIndex) => selection.selectComponent(componentId, null, hookIndex)}
      onHookAdd={addHook}
    />
  );

  return (
    <Content renderSideBarContent={renderSideBar}>
      <DiagramSurface
        tree={tree}
        treeError={treeError}
        treeLoading={treeLoading}
        selectedComponentId={selection.componentId}
        onComponentSelect={componentId => selection.selectComponent(componentId, null, null)}
      />
    </Content>
  );
};

export default withAuthentication(DiagramPage);
