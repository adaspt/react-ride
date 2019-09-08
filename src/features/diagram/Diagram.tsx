import React from 'react';

import { useComponentModel } from './hooks/useComponentModel';
import { useSelection } from './hooks/useSelection';
import Component from './components/component/Component';
import SideBar from './components/sideBar/SideBar';

const Diagram: React.FC = () => {
  const { tree, addComponent, deleteComponent } = useComponentModel();
  const { selection, selectComponent } = useSelection();

  const handleAddComponent = (parentId: string) => {
    const componentId = addComponent(parentId);
    selectComponent(componentId);
  };

  const handleDeleteComponent = (componentId: string) => {
    deleteComponent(componentId);
    selectComponent(null);
  };

  return (
    <div className="row no-gutters flex-fill">
      <div className="col-9">
        <div className="absolute-fill overflow-auto small" onClick={() => selectComponent(null)}>
          <nav className="ml-3 mt-3 mr-3">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">App</li>
              <li className="breadcrumb-item">Layout</li>
              <li className="breadcrumb-item active">Menu</li>
            </ol>
          </nav>
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
          tree={tree}
          onAddComponent={handleAddComponent}
          onDeleteComponent={handleDeleteComponent}
        />
      </div>
    </div>
  );
};

export default Diagram;
