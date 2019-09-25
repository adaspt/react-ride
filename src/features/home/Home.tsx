import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = () => {
  return <Redirect to="demo" noThrow />;
};

export default Home;
