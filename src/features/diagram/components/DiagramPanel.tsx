import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import Panel from '../../../components/Panel';

interface Props {
  project: Project;
  diagram: Diagram;
  onSaveContent: () => void;
}

const DiagramPanel: React.FC<Props> = ({ project, diagram, onSaveContent }) => {
  return (
    <Panel>
      <div className="card-header">{project.name}</div>
      <div className="card-body d-flex align-items-center">
        <span>{diagram.name}</span>
        <button type="button" className="btn btn-primary ml-auto" onClick={onSaveContent}>
          Save
        </button>
      </div>
    </Panel>
  );
};

export default DiagramPanel;
