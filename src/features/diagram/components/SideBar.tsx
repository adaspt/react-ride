import React from 'react';

import { ComponentTree, Component, ComponentProperty, ComponentHook } from '../../../model/component';
import ComponentDetails from './ComponentDetails';
import PropDetails from './PropDetails';
import HookDetails from './HookDetails';

interface Props {
  selectedComponentId: string | null;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  tree: ComponentTree;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onUpdateComponent: (componentId: string, data: Partial<Component>) => void;
  onAddProp: (componentId: string) => void;
  onSelectProp: (componentId: string, propIndex: number | null) => void;
  onUpdateProp: (componentId: string, propIndex: number, data: Partial<ComponentProperty>) => void;
  onDeleteProp: (componentId: string, propIndex: number) => void;
  onAddHook: (componentId: string) => void;
  onSelectHook: (componentId: string, hookIndex: number | null) => void;
  onUpdateHook: (componentId: string, propIndex: number, data: Partial<ComponentHook>) => void;
  onDeleteHook: (componentId: string, propIndex: number) => void;
}

const SideBar: React.FC<Props> = ({
  selectedComponentId,
  selectedPropIndex,
  selectedHookIndex,
  tree,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent,
  onAddProp,
  onSelectProp,
  onUpdateProp,
  onDeleteProp,
  onAddHook,
  onSelectHook,
  onUpdateHook,
  onDeleteHook
}) => {
  const component = !!selectedComponentId && tree.components[selectedComponentId];
  const prop = component && selectedPropIndex != null && component.properties[selectedPropIndex];
  const hook = component && selectedHookIndex != null && component.hooks[selectedHookIndex];

  return (
    <div className="d-flex flex-column flex-fill">
      {selectedComponentId && component && (
        <ComponentDetails
          key={selectedComponentId}
          component={component}
          selectedPropIndex={selectedPropIndex}
          selectedHookIndex={selectedHookIndex}
          onAddComponent={onAddComponent}
          onDeleteComponent={onDeleteComponent}
          onUpdateComponent={onUpdateComponent}
          onAddProp={onAddProp}
          onSelectProp={onSelectProp}
          onAddHook={onAddHook}
          onSelectHook={onSelectHook}
        />
      )}
      {component && prop && (
        <PropDetails
          key={`${component.id}:${selectedPropIndex}`}
          prop={prop}
          onUpdateProp={data => onUpdateProp(component.id, selectedPropIndex!, data)}
          onClose={() => onSelectProp(component.id, null)}
          onDelete={() => onDeleteProp(component.id, selectedPropIndex!)}
        />
      )}
      {component && hook && (
        <HookDetails
          key={`${component.id}:${selectedHookIndex}`}
          hook={hook}
          onUpdateHook={data => onUpdateHook(component.id, selectedHookIndex!, data)}
          onClose={() => onSelectHook(component.id, null)}
          onDelete={() => onDeleteHook(component.id, selectedHookIndex!)}
        />
      )}
    </div>
  );
};

export default SideBar;
