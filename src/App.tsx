import React from 'react';
import { Router } from '@reach/router';

import Navbar from './components/Navbar';
import Home from './features/home/Home';
import Demo from './features/demo/Demo';
import SignIn from './features/signin/SignIn';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Navbar />
      <Router className="d-flex flex-fill">
        <Home path="/" />
        <Demo path="/demo" />
        <SignIn path="/signin" />
      </Router>
    </React.StrictMode>
  );
};

export default App;
