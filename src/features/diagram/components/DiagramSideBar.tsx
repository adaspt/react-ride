import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import { ComponentTree, Component } from '../../../model/component';
import { DiagramTab } from '../hooks/useSelection';
import DiagramPanel from './DiagramPanel';
import ComponentPanel from './ComponentPanel';
import PropsAndHooksPanel from './PropsAndHooksPanel';

interface Props {
  project: Project;
  diagram: Diagram;
  tree: ComponentTree | null;
  selectedTab: DiagramTab;
  selectedComponentId: string | null;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  onComponentUpdated: (componentId: string, changes: Partial<Component>) => void;
  onTabChange: (tab: DiagramTab) => void;
  onComponentAdd: (parentId: string) => void;
  onPropSelect: (componentId: string, index: number) => void;
  onPropAdd: (componentId: string) => void;
  onHookSelect: (componentId: string, index: number) => void;
  onHookAdd: (componentId: string) => void;
}

const DiagramSideBar: React.FC<Props> = ({
  project,
  diagram,
  tree,
  selectedTab,
  selectedComponentId,
  selectedPropIndex,
  selectedHookIndex,
  onComponentUpdated,
  onTabChange,
  onComponentAdd,
  onPropSelect,
  onPropAdd,
  onHookSelect,
  onHookAdd
}) => {
  const handlePropAdd = (componentId: string) => {
    onTabChange('props');
    onPropAdd(componentId);
  };

  const handleHookAdd = (componentId: string) => {
    onTabChange('hooks');
    onHookAdd(componentId);
  };

  const selectedComponent = tree && selectedComponentId && tree.components[selectedComponentId];
  return (
    <>
      <DiagramPanel project={project} diagram={diagram} />
      {selectedComponent && (
        <ComponentPanel
          component={selectedComponent}
          onUpdated={onComponentUpdated}
          onComponentAdd={onComponentAdd}
          onPropAdd={handlePropAdd}
          onHookAdd={handleHookAdd}
        />
      )}
      {selectedComponent && (
        <PropsAndHooksPanel
          component={selectedComponent}
          selectedTab={selectedTab}
          selectedPropIndex={selectedPropIndex}
          selectedHookIndex={selectedHookIndex}
          onTabChange={onTabChange}
          onPropSelect={onPropSelect}
          onHookSelect={onHookSelect}
        />
      )}
    </>
  );
};

export default DiagramSideBar;
