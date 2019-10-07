import React from 'react';

import { Project } from '../../../model/projects';
import { Diagram } from '../../../model/diagrams';
import DiagramPanel from './DiagramPanel';

interface Props {
  project: Project;
  diagram: Diagram;
}

const DiagramSideBar: React.FC<Props> = ({ project, diagram }) => {
  return (
    <>
      <DiagramPanel project={project} diagram={diagram} />
    </>
  );
};

export default DiagramSideBar;
