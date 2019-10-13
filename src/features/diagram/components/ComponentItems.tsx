import React from 'react';
import clsx from 'clsx';

interface Props {
  items: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const ComponentItems: React.FC<Props> = ({ items, selectedIndex, onSelect }) => {
  return (
    <div className="list-group list-group-flush">
      {items.map((x, i) => (
        <button
          key={i}
          className={clsx('list-group-item list-group-item-action py-2', selectedIndex === i && 'active')}
          onClick={() => onSelect(i)}
        >
          {x}
        </button>
      ))}
    </div>
  );
};

export default ComponentItems;
