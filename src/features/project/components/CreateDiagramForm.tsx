import React from 'react';

import { Diagram } from '../../../model/diagrams';
import { createDiagram } from '../../../api/diagrams';
import { useForm } from '../../../hooks/useForm';
import { useDatabase } from '../../../hooks/useDatabase';

interface Props {
  projectId: string;
  onCreated: (diagram: Diagram) => void;
  onCancel: () => void;
}

export interface DiagramCreateData {
  name: string;
}

const initialDiagramData: DiagramCreateData = {
  name: ''
};

const CreateDiagramForm: React.FC<Props> = ({ projectId, onCancel, onCreated }) => {
  const db = useDatabase();
  const { values, handleChange, handleSubmit } = useForm(initialDiagramData);

  const handleCreate = async (data: DiagramCreateData) => {
    const diagram = await db.execute(createDiagram(projectId, data));
    onCreated(diagram);
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Diagram name"
          autoFocus
          value={values.name}
          onChange={handleChange('name')}
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Create
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateDiagramForm;
