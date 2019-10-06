import React from 'react';
import { Router } from '@reach/router';

import { useSession } from './hooks/useSession';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Error from './components/Error';
import HomePage from './features/home/HomePage';
import SandboxPage from './features/sandbox/SandboxPage';
import SignInPage from './features/signin/SignInPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ProjectPage from './features/project/ProjectPage';
import DiagramPage from './features/diagram/DiagramPage';

const App: React.FC = () => {
  const { authenticating, authError, user, signIn, signOut } = useSession();
  if (authError) {
    return <Error message={authError} />;
  }

  if (authenticating) {
    return <Loading />;
  }

  const authenticated = !!user;

  return (
    <React.StrictMode>
      <Navbar user={user} onSignOut={signOut} />
      <Router className="d-flex flex-fill">
        <HomePage path="/" user={user} />
        <ProjectsPage path="/projects" user={user} />
        <ProjectPage path="/projects/:projectId" user={user} />
        <DiagramPage path="/projects/:projectId/:diagramId" user={user} />
        <SandboxPage path="/sandbox" />
        <SignInPage path="/signin" authenticated={authenticated} onSignInWithGoogle={signIn} />
      </Router>
    </React.StrictMode>
  );
};

export default App;
