import React from 'react';

import { ComponentHook } from '../../../model/component';
import Panel from '../../../components/Panel';
import { useForm } from '../../../hooks/useForm';

interface Props {
  hook: ComponentHook;
  onUpdate: (values: ComponentHook) => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
}

const HookPanel: React.FC<Props> = ({ hook, onUpdate, onCancel, onDelete }) => {
  const { values, handleChange, handleSubmit } = useForm(hook);

  return (
    <Panel continuous>
      <div className="card-header">Hook</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Hook name"
              autoFocus
              value={values.name}
              onChange={handleChange('name')}
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

export default HookPanel;
