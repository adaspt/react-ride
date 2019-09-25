import React from 'react';
import { Router } from '@reach/router';

import { useSession } from './hooks/useSession';
import Navbar from './components/Navbar';
import Home from './features/home/Home';
import Sandbox from './features/sandbox/Sandbox';
import SignIn from './features/signin/SignIn';

const App: React.FC = () => {
  const { authenticating, authError, user, signOut } = useSession();
  if (authError) {
    return (
      <p>
        {authError.code} {authError.message}
      </p>
    );
  }

  if (authenticating) {
    return <p>Loading...</p>;
  }

  const authenticated = !!user;

  return (
    <React.StrictMode>
      <Navbar user={user} onSignOut={signOut} />
      <Router className="d-flex flex-fill">
        <Home path="/" />
        <Sandbox path="/sandbox" />
        <SignIn path="/signin" authenticated={authenticated} />
      </Router>
    </React.StrictMode>
  );
};

export default App;
