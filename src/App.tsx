import React from 'react';
import { Router } from '@reach/router';

import { useSession } from './hooks/useSession';
import Navbar from './components/Navbar';
import HomePage from './features/home/HomePage';
import SandboxPage from './features/sandbox/SandboxPage';
import SignInPage from './features/signin/SignInPage';
import DiagramListPage from './features/diagramList/DiagramListPage';
import DiagramPage from './features/diagram/DiagramPage';

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
        <HomePage path="/" user={user} />
        <DiagramListPage path="/diagram" user={user} />
        <DiagramPage path="/diagram/:id" user={user} />
        <SandboxPage path="/sandbox" />
        <SignInPage path="/signin" authenticated={authenticated} />
      </Router>
    </React.StrictMode>
  );
};

export default App;
