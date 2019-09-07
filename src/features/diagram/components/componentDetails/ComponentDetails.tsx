import React from 'react';
import Panel from '../../../../components/panel/Panel';

interface Props {}

const ComponentDetails: React.FC<Props> = () => {
  return (
    <>
      <Panel>
        <div className="card-header">Component</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="form-group">
            <div className="btn-group btn-group-sm btn-group-toggle w-100">
              <label className="btn btn-secondary active">
                <input type="radio" autoComplete="off" defaultChecked /> 1/4
              </label>
              <label className="btn btn-secondary">
                <input type="radio" autoComplete="off" /> 1/3
              </label>
              <label className="btn btn-secondary">
                <input type="radio" autoComplete="off" /> 1/2
              </label>
              <label className="btn btn-secondary">
                <input type="radio" autoComplete="off" /> 2/3
              </label>
              <label className="btn btn-secondary">
                <input type="radio" autoComplete="off" /> 3/4
              </label>
              <label className="btn btn-secondary">
                <input type="radio" autoComplete="off" /> Full
              </label>
            </div>
          </div>
          <div className="btn-toolbar">
            <button type="button" className="btn btn-secondary dropdown-toggle mr-2">
              Add
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Panel>
      <Panel continuous fill>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active">Props</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Hooks</a>
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
