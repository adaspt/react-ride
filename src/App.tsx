import React from 'react';
import { Router } from '@reach/router';

import { useSession } from './hooks/useSession';
import Navbar from './components/Navbar';
import Route from './components/Route';
import HomePage from './features/home/HomePage';
import SandboxPage from './features/sandbox/SandboxPage';
import SignInPage from './features/signin/SignInPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ProjectPage from './features/project/ProjectPage';

const App: React.FC = () => {
  const { authenticating, authError, user, signIn, signOut } = useSession();
  if (authError) {
    return <p>{authError}</p>;
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
        <Route path="/projects">
          <ProjectsPage path="/" user={user} />
          <ProjectPage path="/:projectId" user={user} />
        </Route>
        <SandboxPage path="/sandbox" />
        <SignInPage path="/signin" authenticated={authenticated} onSignInWithGoogle={signIn} />
      </Router>
    </React.StrictMode>
  );
};

export default App;
