import React from 'react';

import { Component } from '../../../../model/component';
import { useInput } from '../../../../hooks/useInput';
import Panel from '../../../../components/panel/Panel';
import SizeInput from '../../../../components/sizeInput/SizeInput';

interface Props {
  component: Component;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onUpdateComponent: (componentId: string, data: Partial<Component>) => void;
}

const ComponentDetails: React.FC<Props> = ({
  component,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent
}) => {
  const nameInput = useInput(component.name, name => onUpdateComponent(component.id, { name }));
  const widthInput = useInput(component.width, width => onUpdateComponent(component.id, { width }));

  const handleKeyDown = (callback: () => void): React.KeyboardEventHandler => e => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  const handleWidthChange = (width: number) => {
    widthInput.change(width);
    widthInput.submit();
  };

  return (
    <>
      <Panel>
        <div className="card-header">Component</div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={nameInput.value}
              onChange={e => nameInput.change(e.target.value)}
              onKeyDown={handleKeyDown(nameInput.submit)}
            />
          </div>
          <div className="form-group">
            <SizeInput value={widthInput.value} onChange={handleWidthChange} />
          </div>
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle mr-2"
              onClick={() => onAddComponent(component.id)}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!component.parentId}
              onClick={() => onDeleteComponent(component.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </Panel>
      <Panel continuous fill>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#props">
                Props
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#hooks">
                Hooks
              </a>
            </li>
          </ul>
        </div>
        <div className="list-group list-group-flush">
          <li className="list-group-item py-2">id: number</li>
          <li className="list-group-item py-2">name: string</li>
        </div>
      </Panel>
    </>
  );
};

export default ComponentDetails;
