import React from 'react';

import { ComponentTree } from '../../../../model/component';
import Panel from '../../../../components/panel/Panel';
import ComponentDetails from '../componentDetails/ComponentDetails';

interface Props {
  selectedComponentId: string | null;
  tree: ComponentTree;
}

const SideBar: React.FC<Props> = ({ selectedComponentId, tree }) => {
  const component = selectedComponentId && tree.components[selectedComponentId];
  return (
    <div className="d-flex flex-column flex-fill">
      {selectedComponentId && component && (
        <ComponentDetails key={selectedComponentId} component={component} />
      )}
      {selectedComponentId && (
        <Panel continuous>
          <div className="card-header">Prop</div>
          <div className="card-body">Selected prop/hook</div>
        </Panel>
      )}
    </div>
  );
};

export default SideBar;
