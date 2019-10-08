import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import { ComponentTree, Component, ComponentProperty, ComponentHook } from '../../../model/component';
import { DiagramTab } from '../hooks/useSelection';
import DiagramPanel from './DiagramPanel';
import ComponentPanel from './ComponentPanel';
import PropsAndHooksPanel from './PropsAndHooksPanel';
import PropPanel from './PropPanel';
import HookPanel from './HookPanel';

interface Props {
  project: Project;
  diagram: Diagram;
  tree: ComponentTree | null;
  selectedTab: DiagramTab;
  selectedComponentId: string | null;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  onSaveContent: () => void;
  onTabChange: (tab: DiagramTab) => void;
  onComponentUpdate: (componentId: string, changes: Partial<Component>) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentMoveIn: (componentId: string) => void;
  onComponentMoveOut: (componentId: string) => void;
  onComponentMoveUp: (componentId: string) => void;
  onComponentMoveDown: (componentId: string) => void;
  onComponentAdd: (parentId: string) => void;
  onPropSelect: (componentId: string, index: number) => void;
  onPropAdd: (componentId: string) => void;
  onPropUpdated: (componentId: string, propIndex: number, values: ComponentProperty) => void;
  onPropCancel: () => void;
  onPropDelete: (componentId: string, propIndex: number) => void;
  onHookSelect: (componentId: string, index: number) => void;
  onHookAdd: (componentId: string) => void;
  onHookUpdated: (componentId: string, hookIndex: number, values: ComponentHook) => void;
  onHookCancel: () => void;
  onHookDelete: (componentId: string, hookIndex: number) => void;
}

const DiagramSideBar: React.FC<Props> = ({
  project,
  diagram,
  tree,
  selectedTab,
  selectedComponentId,
  selectedPropIndex,
  selectedHookIndex,
  onSaveContent,
  onTabChange,
  onComponentUpdate,
  onComponentDelete,
  onComponentMoveIn,
  onComponentMoveOut,
  onComponentMoveUp,
  onComponentMoveDown,
  onComponentAdd,
  onPropSelect,
  onPropAdd,
  onPropUpdated,
  onPropCancel,
  onPropDelete,
  onHookSelect,
  onHookAdd,
  onHookUpdated,
  onHookCancel,
  onHookDelete
}) => {
  const handlePropAdd = (componentId: string) => {
    onTabChange('props');
    onPropAdd(componentId);
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

  const handleHookAdd = (componentId: string) => {
    onTabChange('hooks');
    onHookAdd(componentId);
  };

  const handleHookUpdated = async (values: ComponentHook) => {
    if (selectedComponentId && selectedHookIndex != null) {
      onHookUpdated(selectedComponentId, selectedHookIndex, values);
    }
  };

  const handleHookDelete = () => {
    if (selectedComponentId && selectedHookIndex != null) {
      onHookDelete(selectedComponentId, selectedHookIndex);
    }
  };

  const selectedComponent = tree && selectedComponentId && tree.components[selectedComponentId];
  const selectedProp =
    selectedComponent && selectedPropIndex != null && selectedComponent.properties[selectedPropIndex];
  const selectedHook =
    selectedComponent && selectedHookIndex != null && selectedComponent.hooks[selectedHookIndex];

  return (
    <>
      <DiagramPanel project={project} diagram={diagram} onSaveContent={onSaveContent} />
      {selectedComponent && (
        <ComponentPanel
          component={selectedComponent}
          onUpdate={onComponentUpdate}
          onDelete={onComponentDelete}
          onComponentAdd={onComponentAdd}
          onPropAdd={handlePropAdd}
          onHookAdd={handleHookAdd}
          onMoveIn={onComponentMoveIn}
          onMoveOut={onComponentMoveOut}
          onMoveUp={onComponentMoveUp}
          onMoveDown={onComponentMoveDown}
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
          key={`${selectedComponentId}.${selectedPropIndex}`}
          prop={selectedProp}
          onUpdate={handlePropUpdated}
          onCancel={onPropCancel}
          onDelete={handlePropDelete}
        />
      )}
      {selectedHook && (
        <HookPanel
          key={`${selectedComponentId}.${selectedHookIndex}`}
          hook={selectedHook}
          onUpdate={handleHookUpdated}
          onCancel={onHookCancel}
          onDelete={handleHookDelete}
        />
      )}
    </>
  );
};

export default DiagramSideBar;
