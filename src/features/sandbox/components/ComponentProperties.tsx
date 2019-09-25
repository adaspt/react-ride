import React from 'react';
import clsx from 'clsx';

import { ComponentProperty } from '../../../model/component';

interface Props {
  properties: ComponentProperty[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const ComponentProperties: React.FC<Props> = ({ properties, selectedIndex, onSelect }) => {
  return (
    <div className="list-group list-group-flush">
      {properties.map((x, i) => (
        <button
          key={i}
          className={clsx('list-group-item list-group-item-action py-2', selectedIndex === i && 'active')}
          onClick={() => onSelect(i)}
        >
          {x.name}: {x.type}
        </button>
      ))}
    </div>
  );
};

export default ComponentProperties;
