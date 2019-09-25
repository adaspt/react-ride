import React from 'react';

import { ComponentHook } from '../../../model/component';
import { useInput } from '../../../hooks/useInput';
import Panel from '../../../components/Panel';

interface Props {
  hook: ComponentHook;
  onUpdateHook: (data: Partial<ComponentHook>) => void;
  onClose: () => void;
  onDelete: () => void;
}

const HookDetails: React.FC<Props> = ({ hook, onUpdateHook, onClose, onDelete }) => {
  const nameInput = useInput(hook.name, name => onUpdateHook({ name }));

  const handleKeyDown = (callback: () => void): React.KeyboardEventHandler => e => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <Panel continuous>
      <div className="card-header">Hook</div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Hook name"
            value={nameInput.value}
            onChange={e => nameInput.change(e.target.value)}
            onKeyDown={handleKeyDown(nameInput.submit)}
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
          Close
        </button>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </Panel>
  );
};

export default HookDetails;
