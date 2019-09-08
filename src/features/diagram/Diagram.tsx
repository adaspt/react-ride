import React from 'react';

import { Component as ComponentModel } from '../../model/component';
import { useComponentModel } from './hooks/useComponentModel';
import { useSelection } from './hooks/useSelection';
import Path from './components/Path';
import Component from './components/Component';
import SideBar from './components/SideBar';

const Diagram: React.FC = () => {
  const {
    tree,
    addComponent,
    deleteComponent,
    updateComponent,
    addProp,
    updateProp,
    deleteProp,
    addHook,
    updateHook,
    deleteHook
  } = useComponentModel();
  const { selection, selectComponent, selectProp, selectHook } = useSelection();

  const handleAddComponent = (parentId: string) => {
    const componentId = addComponent(parentId);
    selectComponent(componentId);
  };

  const handleDeleteComponent = (componentId: string) => {
    deleteComponent(componentId);
    selectComponent(null);
  };

  const handleUpdateComponent = (componentId: string, data: Partial<ComponentModel>) =>
    updateComponent(componentId, data);

  const handleAddProp = (componentId: string) => {
    const propIndex = addProp(componentId);
    selectProp(componentId, propIndex);
  };

  const handleDeleteProp = (componentId: string, propIndex: number) => {
    deleteProp(componentId, propIndex);
    selectProp(componentId, null);
  };

  const handleAddHook = (componentId: string) => {
    const hookIndex = addHook(componentId);
    selectHook(componentId, hookIndex);
  };

  const handleDeleteHook = (componentId: string, hookIndex: number) => {
    deleteHook(componentId, hookIndex);
    selectHook(componentId, null);
  };

  return (
    <div className="row no-gutters flex-fill">
      <div className="col-9">
        <div className="absolute-fill overflow-auto small" onClick={() => selectComponent(null)}>
          <Path selectedComponentId={selection.componentId} tree={tree} />
          <div className="row no-gutters p-2">
            <Component
              id="root"
              selectedComponentId={selection.componentId}
              tree={tree}
              onSelect={selectComponent}
            />
          </div>
        </div>
      </div>
      <div className="col-3 border-left d-flex">
        <SideBar
          selectedComponentId={selection.componentId}
          selectedPropIndex={selection.propIndex}
          selectedHookIndex={selection.hookIndex}
          tree={tree}
          onAddComponent={handleAddComponent}
          onDeleteComponent={handleDeleteComponent}
          onUpdateComponent={handleUpdateComponent}
          onAddProp={handleAddProp}
          onSelectProp={selectProp}
          onUpdateProp={updateProp}
          onDeleteProp={handleDeleteProp}
          onAddHook={handleAddHook}
          onSelectHook={selectHook}
          onUpdateHook={updateHook}
          onDeleteHook={handleDeleteHook}
        />
      </div>
    </div>
  );
};

export default Diagram;
