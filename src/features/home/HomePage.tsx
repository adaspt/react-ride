import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { User } from '../../model/auth';
import { withAuthentication } from '../../components/withAuthentication';

interface Props extends RouteComponentProps {
  user: User;
}

const HomePage: React.FC<Props> = ({ navigate }) => {
  useEffect(() => {
    navigate && navigate('/sandbox');
  }, [navigate]);

  return null;
};

export default withAuthentication(HomePage);
