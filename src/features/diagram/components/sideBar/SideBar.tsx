import React from 'react';

import { ComponentTree, Component } from '../../../../model/component';
import Panel from '../../../../components/panel/Panel';
import ComponentDetails from '../componentDetails/ComponentDetails';

interface Props {
  selectedComponentId: string | null;
  tree: ComponentTree;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onUpdateComponent: (componentId: string, data: Partial<Component>) => void;
}

const SideBar: React.FC<Props> = ({
  selectedComponentId,
  tree,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent
}) => {
  const component = selectedComponentId && tree.components[selectedComponentId];
  return (
    <div className="d-flex flex-column flex-fill">
      {selectedComponentId && component && (
        <ComponentDetails
          key={selectedComponentId}
          component={component}
          onAddComponent={onAddComponent}
          onDeleteComponent={onDeleteComponent}
          onUpdateComponent={onUpdateComponent}
        />
      )}
      {selectedComponentId && (
        <Panel continuous>
          <div className="card-header">Prop</div>
          <div className="card-body">Selected prop/hook</div>
        </Panel>
      )}
    </div>
  );
};

export default SideBar;
