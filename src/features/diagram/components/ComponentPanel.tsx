import React from 'react';

import { Component } from '../../../model/component';
import { useForm } from '../../../hooks/useForm';
import Panel from '../../../components/Panel';
import SizeInput from '../../../components/SizeInput';

interface Props {
  component: Component;
  onUpdate: (componentId: string, changes: Partial<Component>) => void;
  onDelete: (componentId: string) => void;
  onComponentAdd: (parentId: string) => void;
  onPropAdd: (componentId: string) => void;
  onHookAdd: (componentId: string) => void;
  onMoveIn: (componentId: string) => void;
  onMoveOut: (componentId: string) => void;
  onMoveUp: (componentId: string) => void;
  onMoveDown: (componentId: string) => void;
}

const ComponentPanel: React.FC<Props> = ({
  component,
  onUpdate,
  onDelete,
  onComponentAdd,
  onPropAdd,
  onHookAdd,
  onMoveIn,
  onMoveOut,
  onMoveUp,
  onMoveDown
}) => {
  const { values, handleChange, handleSubmit } = useForm(component);

  const handleUpdate = ({ name }: Component) => {
    onUpdate(component.id, { name });
    return Promise.resolve();
  };

  const handleWidthChange = (width: number) => onUpdate(component.id, { width });

  const handleComponentAdd = () => onComponentAdd(component.id);

  const handleMoveIn = () => onMoveIn(component.id);
  const handleMoveOut = () => onMoveOut(component.id);
  const handleMoveUp = () => onMoveUp(component.id);
  const handleMoveDown = () => onMoveDown(component.id);

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
          <div className="btn-toolbar">
            <div className="btn-group mr-2">
              <button type="button" className="btn btn-secondary" title="Move in" onClick={handleMoveIn}>
                <i className="fa fa-arrow-circle-up"></i>
              </button>
              <button type="button" className="btn btn-secondary" title="Move out" onClick={handleMoveOut}>
                <i className="fa fa-arrow-circle-down"></i>
              </button>
              <button type="button" className="btn btn-secondary" title="Move up" onClick={handleMoveUp}>
                <i className="fa fa-arrow-up"></i>
              </button>
              <button type="button" className="btn btn-secondary" title="Move down" onClick={handleMoveDown}>
                <i className="fa fa-arrow-down"></i>
              </button>
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
            <button
              type="button"
              disabled={!component.parentId}
              className="btn btn-danger"
              title="Delete component"
              onClick={() => onDelete(component.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </form>
      </div>
    </Panel>
  );
};

export default ComponentPanel;
