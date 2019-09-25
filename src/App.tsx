import React from 'react';
import { Router } from '@reach/router';

import Navbar from './components/Navbar';
import Home from './features/home/Home';
import Sandbox from './features/sandbox/Sandbox';
import SignIn from './features/signin/SignIn';
import { useSession } from './hooks/useSession';

const App: React.FC = () => {
  const { authenticating } = useSession();
  if (authenticating) {
    return <p>Loading...</p>;
  }

  return (
    <React.StrictMode>
      <Navbar />
      <Router className="d-flex flex-fill">
        <Home path="/" />
        <Sandbox path="/sandbox" />
        <SignIn path="/signin" />
      </Router>
    </React.StrictMode>
  );
};

export default App;
