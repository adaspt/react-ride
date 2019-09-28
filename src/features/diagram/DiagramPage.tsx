import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';

interface RouteParams {
  id: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  user: User;
}

const DiagramPage: React.FC<Props> = ({ id }) => {
  return <>Diagram: {id}</>;
};

export default withAuthentication(DiagramPage);
