import React from 'react';

import { Project } from '../../../model/projects';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import ListCard from '../../../components/ListCard';

interface Props {
  projects: Project[] | null;
  error: string | null;
  loading: boolean;
}

const ProjectList: React.FC<Props> = ({ projects, error, loading }) => {
  if (error) {
    return <Error message={error} />;
  }

  if (!projects || loading) {
    return <Loading />;
  }

  return (
    <div className="row">
      {projects.map(x => (
        <ListCard key={x.id} title={x.name} link={`/projects/${x.id}`} />
      ))}
    </div>
  );
};

export default ProjectList;
