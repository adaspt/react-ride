import React from 'react';
import ReactDOM from 'react-dom';

import { ComponentTree } from '../../../../model/component';
import SideBar from './SideBar';

it('renders without crashing', () => {
  const tree: ComponentTree = {
    components: {
      root: { id: 'root', parentId: null, name: 'App', width: 12, properties: [], hooks: [] }
    },
    byParent: {
      root: []
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<SideBar selectedComponentId={null} tree={tree} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
