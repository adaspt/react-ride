import React from 'react';

import { Component } from '../../../model/component';
import { useForm } from '../../../hooks/useForm';
import Panel from '../../../components/Panel';
import SizeInput from '../../../components/SizeInput';

interface Props {
  component: Component;
  onUpdated: (componentId: string, changes: Partial<Component>) => void;
  onComponentAdd: (parentId: string) => void;
}

const ComponentPanel: React.FC<Props> = ({ component, onUpdated, onComponentAdd }) => {
  const { values, change, handleChange, handleSubmit } = useForm(component);

  const handleUpdate = ({ name, width }: Component) => {
    onUpdated(component.id, { name, width });
    return Promise.resolve();
  };

  const handleComponentAdd = () => onComponentAdd(component.id);

  return (
    <Panel continuous>
      <div className="card-header">Component</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              autoFocus
              value={values.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="form-group">
            <SizeInput value={values.width} onChange={width => change('width', width)} />
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary mr-2">
              OK
            </button>
            <div className="btn-toolbar ml-auto">
              <div className="btn-group mr-2">
                <button
                  type="button"
                  className="btn btn-success"
                  title="Add component"
                  onClick={handleComponentAdd}
                >
                  <i className="fa fa-cube"></i>
                </button>
                <button type="button" className="btn btn-success" title="Add property">
                  <i className="fa fa-plug"></i>
                </button>
                <button type="button" className="btn btn-success" title="Add hook">
                  <i className="fa fa-microchip"></i>
                </button>
              </div>
              <button type="button" className="btn btn-danger" title="Delete component">
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Panel>
  );
};

export default ComponentPanel;
