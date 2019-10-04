import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';
import { useProjectList } from './hooks/useProjectList';

interface Props extends RouteComponentProps {
  user: User;
}

const ProjectsPage: React.FC<Props> = () => {
  const { projects, projectsError, projectsLoading } = useProjectList();

  if (projectsError) {
    return <>projectsError</>;
  }

  if (!projects || projectsLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {projects.map(x => (
        <Link key={x.id} to={x.id}>
          <div className="card">
            <div className="card-body">{x.name}</div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default withAuthentication(ProjectsPage);
