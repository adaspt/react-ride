import React from 'react';

import { Project } from '../../../model/projects';
import Panel from '../../../components/Panel';

interface Props {
  project: Project;
}

const ProjectSideBar: React.FC<Props> = ({ project }) => {
  return (
    <>
      <Panel>
        <div className="card-header">Project</div>
        <div className="card-body">
          <p>{project.name}</p>
        </div>
      </Panel>
      <Panel continuous={true}>
        <div className="card-header">Shared with</div>
        <div className="card-body">
          <p>Everyone</p>
        </div>
      </Panel>
    </>
  );
};

export default ProjectSideBar;
