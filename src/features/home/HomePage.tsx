import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

import { withAuthentication } from '../../components/withAuthentication';
import { User } from '../../hooks/useSession';

interface Props extends RouteComponentProps {
  user: User;
}

const HomePage: React.FC<Props> = () => {
  return <Redirect to="sandbox" noThrow />;
};

export default withAuthentication(HomePage);
