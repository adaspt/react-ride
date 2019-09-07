import React from 'react';

import { ComponentWidth } from '../../../../model/component';

interface Props {
  name: string;
  width: ComponentWidth;
  hooks: string[];
}

const WIDTH_MAP: Record<ComponentWidth, string> = {
  1: 'col-2',
  2: 'col-4',
  3: 'col-6',
  4: 'col-8',
  5: 'col-10',
  6: 'col-12'
};

const Component: React.FC<Props> = ({ name, width, hooks, children }) => {
  return (
    <div className={`${WIDTH_MAP[width]} p-2`}>
      <div className="card">
        <div className="card-header py-1">{name}</div>
        <div className="row no-gutters p-2">
          {hooks.length > 0 && (
            <div className="col-12 px-2">
              <ul className="list-inline m-0">
                {hooks.map(x => (
                  <li key={x} className="list-inline-item">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Component;
