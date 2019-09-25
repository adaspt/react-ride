import React from 'react';

import { ComponentTree, Component } from '../../../model/component';

interface Props {
  selectedComponentId: string | null;
  tree: ComponentTree;
}

const Path: React.FC<Props> = ({ selectedComponentId, tree }) => {
  const components: Component[] = [];
  let componentId = selectedComponentId;
  while (componentId) {
    let component = tree.components[componentId];
    components.unshift(component);
    componentId = component.parentId;
  }

  return (
    <nav className="ml-3 mt-3 mr-3">
      <ol className="breadcrumb mb-0 py-2">
        <li className="breadcrumb-item">Project</li>
        {components.map(x => (
          <li key={x.id} className="breadcrumb-item active">
            {x.name}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Path;
