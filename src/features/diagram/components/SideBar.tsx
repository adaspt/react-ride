import React from 'react';

import { ComponentTree, Component } from '../../../model/component';
import Panel from '../../../components/Panel';
import ComponentDetails from './ComponentDetails';

interface Props {
  selectedComponentId: string | null;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  tree: ComponentTree;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onUpdateComponent: (componentId: string, data: Partial<Component>) => void;
  onAddProp: (componentId: string) => void;
  onSelectProp: (componentId: string, propIndex: number) => void;
  onAddHook: (componentId: string) => void;
  onSelectHook: (componentId: string, hookIndex: number) => void;
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
  onAddHook,
  onSelectHook
}) => {
  const component = selectedComponentId && tree.components[selectedComponentId];
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
      {selectedComponentId && selectedPropIndex != null && (
        <Panel continuous>
          <div className="card-header">Prop</div>
          <div className="card-body">Selected prop</div>
        </Panel>
      )}
      {selectedComponentId && selectedHookIndex != null && (
        <Panel continuous>
          <div className="card-header">Hook</div>
          <div className="card-body">Selected hook</div>
        </Panel>
      )}
    </div>
  );
};

export default SideBar;
