import React from 'react';

import { Component } from '../../../model/component';
import { useForm } from '../../../hooks/useForm';
import Panel from '../../../components/Panel';
import SizeInput from '../../../components/SizeInput';

interface Props {
  component: Component;
  onUpdated: (componentId: string, changes: Partial<Component>) => void;
  onComponentAdd: (parentId: string) => void;
  onPropAdd: (componentId: string) => void;
  onHookAdd: (componentId: string) => void;
}

const ComponentPanel: React.FC<Props> = ({ component, onUpdated, onComponentAdd, onPropAdd, onHookAdd }) => {
  const { values, handleChange, handleSubmit } = useForm(component);

  const handleUpdate = ({ name }: Component) => {
    onUpdated(component.id, { name });
    return Promise.resolve();
  };

  const handleWidthChange = (width: number) => onUpdated(component.id, { width });

  const handleComponentAdd = () => onComponentAdd(component.id);

  return (
    <Panel continuous>
      <div className="card-header">Component</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                autoFocus
                value={values.name}
                onChange={handleChange('name')}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-primary">
                  <i className="fa fa-check"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <SizeInput value={component.width} onChange={handleWidthChange} />
          </div>
          <div className="d-flex">
            <div className="btn-toolbar">
              <div className="btn-group mr-2">
                <button
                  type="button"
                  className="btn btn-success"
                  title="Add component"
                  onClick={handleComponentAdd}
                >
                  <i className="fa fa-cube"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  title="Add property"
                  onClick={() => onPropAdd(component.id)}
                >
                  <i className="fa fa-plug"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  title="Add hook"
                  onClick={() => onHookAdd(component.id)}
                >
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
