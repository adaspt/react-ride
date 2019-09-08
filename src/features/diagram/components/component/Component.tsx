import React from 'react';
import clsx from 'clsx';

import { ComponentTree } from '../../../../model/component';

interface Props {
  id: string;
  selectedComponentId: string | null;
  tree: ComponentTree;
  onSelect: (componentId: string | null) => void;
}

const Component: React.FC<Props> = ({ id, selectedComponentId, tree, onSelect }) => {
  const { name, width, properties, hooks } = tree.components[id];
  const children = tree.byParent[id];
  const selected = selectedComponentId === id;

  const handleSelect: React.MouseEventHandler = e => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <div className={`col-${width} p-2`}>
      <div className={clsx('card', selected ? 'text-white bg-primary' : 'text-dark')} onClick={handleSelect}>
        <div className="card-header py-1">
          {name}
          {!!properties.length && `(${properties.map(x => x.name).join(', ')})`}
        </div>
        <div className="row no-gutters p-2">
          {hooks.length > 0 && (
            <div className="col-12 px-2">
              <ul className="list-inline m-0">
                {hooks.map(x => (
                  <li key={x.name} className="list-inline-item">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {children.map(childId => (
            <Component
              key={childId}
              id={childId}
              selectedComponentId={selectedComponentId}
              tree={tree}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component;
