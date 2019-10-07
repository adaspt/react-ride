import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import Panel from '../../../components/Panel';

interface Props {
  project: Project;
  diagram: Diagram;
}

const DiagramPanel: React.FC<Props> = ({ project, diagram }) => {
  return (
    <Panel>
      <div className="card-header">{project.name}</div>
      <div className="card-body">{diagram.name}</div>
    </Panel>
  );
};

export default DiagramPanel;
