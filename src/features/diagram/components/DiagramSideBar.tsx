import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import { ComponentTree, Component, ComponentProperty } from '../../../model/component';
import { DiagramTab } from '../hooks/useSelection';
import DiagramPanel from './DiagramPanel';
import ComponentPanel from './ComponentPanel';
import PropsAndHooksPanel from './PropsAndHooksPanel';
import PropPanel from './PropPanel';

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
  onPropUpdated: (componentId: string, propIndex: number, values: ComponentProperty) => void;
  onPropCancel: () => void;
  onPropDelete: (componentId: string, propIndex: number) => void;
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
  onPropUpdated,
  onPropCancel,
  onPropDelete,
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

  const handlePropUpdated = async (values: ComponentProperty) => {
    if (selectedComponentId && selectedPropIndex != null) {
      onPropUpdated(selectedComponentId, selectedPropIndex, values);
    }
  };

  const handlePropDelete = () => {
    if (selectedComponentId && selectedPropIndex != null) {
      onPropDelete(selectedComponentId, selectedPropIndex);
    }
  };

  const selectedComponent = tree && selectedComponentId && tree.components[selectedComponentId];
  const selectedProp =
    selectedComponent && selectedPropIndex != null && selectedComponent.properties[selectedPropIndex];
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
      {selectedProp && (
        <PropPanel
          prop={selectedProp}
          onUpdate={handlePropUpdated}
          onCancel={onPropCancel}
          onDelete={handlePropDelete}
        />
      )}
    </>
  );
};

export default DiagramSideBar;
