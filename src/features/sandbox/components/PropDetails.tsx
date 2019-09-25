import React from 'react';

import { ComponentProperty } from '../../../model/component';
import { useInput } from '../../../hooks/useInput';
import Panel from '../../../components/Panel';

interface Props {
  prop: ComponentProperty;
  onUpdateProp: (data: Partial<ComponentProperty>) => void;
  onClose: () => void;
  onDelete: () => void;
}

const PropDetails: React.FC<Props> = ({ prop, onUpdateProp, onClose, onDelete }) => {
  const nameInput = useInput(prop.name, name => onUpdateProp({ name }));
  const typeInput = useInput(prop.type, type => onUpdateProp({ type }));

  const handleKeyDown = (callback: () => void): React.KeyboardEventHandler => e => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <Panel continuous>
      <div className="card-header">Prop</div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Prop name"
            value={nameInput.value}
            onChange={e => nameInput.change(e.target.value)}
            onKeyDown={handleKeyDown(nameInput.submit)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Prop type"
            value={typeInput.value}
            onChange={e => typeInput.change(e.target.value)}
            onKeyDown={handleKeyDown(typeInput.submit)}
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

export default PropDetails;
