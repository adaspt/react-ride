import React from 'react';

import { ComponentProperty } from '../../../model/component';
import Panel from '../../../components/Panel';
import { useForm } from '../../../hooks/useForm';

interface Props {
  prop: ComponentProperty;
  onUpdate: (values: ComponentProperty) => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
}

const PropPanel: React.FC<Props> = ({ prop, onUpdate, onCancel, onDelete }) => {
  const { values, handleChange, handleSubmit } = useForm(prop);

  return (
    <Panel continuous>
      <div className="card-header">Property</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Property name"
              autoFocus
              value={values.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Property type"
              value={values.type}
              onChange={handleChange('type')}
            />
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary mr-2">
              OK
            </button>
            <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger ml-auto" onClick={onDelete}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </form>
      </div>
    </Panel>
  );
};

export default PropPanel;
