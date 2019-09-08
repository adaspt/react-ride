import React from 'react';

import { Component } from '../../../../model/component';
import Panel from '../../../../components/panel/Panel';
import SizeInput from '../../../../components/sizeInput/SizeInput';

interface Props {
  component: Component;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
}

const ComponentDetails: React.FC<Props> = ({ component, onAddComponent, onDeleteComponent }) => {
  return (
    <>
      <Panel>
        <div className="card-header">Component</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name" defaultValue={component.name} />
          </div>
          <div className="form-group">
            <SizeInput value={component.width} onChange={() => {}} />
          </div>
          <div className="btn-toolbar">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle mr-2"
              onClick={() => onAddComponent(component.id)}
            >
              Add
            </button>
            <button type="button" className="btn btn-danger" onClick={() => onDeleteComponent(component.id)}>
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
