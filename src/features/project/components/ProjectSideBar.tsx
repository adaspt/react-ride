import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import Panel from '../../../components/Panel';
import CreateDiagramForm from './CreateDiagramForm';

interface Props {
  project: Project;
  creatingNewDiagram: boolean;
  onDiagramCreated: (diagram: Diagram) => void;
  onDiagramCreateCancel: () => void;
}

const ProjectSideBar: React.FC<Props> = ({
  project,
  creatingNewDiagram,
  onDiagramCreated,
  onDiagramCreateCancel
}) => {
  return (
    <>
      <Panel>
        <div className="card-header">Project</div>
        <div className="card-body">
          <p>{project.name}</p>
        </div>
      </Panel>
      <Panel continuous={true} fill={true}>
        <div className="card-header">Shared with</div>
        <div className="card-body">
          <p>Everyone</p>
        </div>
      </Panel>
      {creatingNewDiagram && (
        <Panel continuous={true}>
          <div className="card-header">Create new diagram</div>
          <div className="card-body">
            <CreateDiagramForm
              projectId={project.id}
              onCreated={onDiagramCreated}
              onCancel={onDiagramCreateCancel}
            />
          </div>
        </Panel>
      )}
    </>
  );
};

export default ProjectSideBar;
