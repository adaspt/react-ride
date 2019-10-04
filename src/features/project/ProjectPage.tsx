import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';

interface RouteParams {
  projectId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const ProjectPage: React.FC<Props> = ({ projectId }) => {
  return <>Project {projectId}</>;
};

export default withAuthentication(ProjectPage);
