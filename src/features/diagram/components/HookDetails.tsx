import React from 'react';

import Panel from '../../../components/Panel';

const HookDetails: React.FC = () => {
  return (
    <Panel continuous>
      <div className="card-header">Hook</div>
      <div className="card-body">Selected hook</div>
    </Panel>
  );
};

export default HookDetails;
