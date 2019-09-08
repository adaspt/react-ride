import React from 'react';
import Navbar from './components/Navbar';
import Diagram from './features/diagram/Diagram';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Diagram />
    </>
  );
};

export default App;
