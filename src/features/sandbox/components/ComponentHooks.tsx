import React from 'react';
import clsx from 'clsx';

import { ComponentHook } from '../../../model/component';

interface Props {
  hooks: ComponentHook[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const ComponentHooks: React.FC<Props> = ({ hooks, selectedIndex, onSelect }) => {
  return (
    <div className="list-group list-group-flush">
      {hooks.map((x, i) => (
        <button
          key={i}
          className={clsx('list-group-item list-group-item-action py-2', selectedIndex === i && 'active')}
          onClick={() => onSelect(i)}
        >
          {x.name}
        </button>
      ))}
    </div>
  );
};

export default ComponentHooks;
