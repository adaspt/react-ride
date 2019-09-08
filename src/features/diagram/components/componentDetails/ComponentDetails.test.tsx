import React from 'react';
import ReactDOM from 'react-dom';

import { Component } from '../../../../model/component';
import ComponentDetails from './ComponentDetails';

it('renders without crashing', () => {
  const component: Component = {
    id: 'root',
    parentId: null,
    name: 'App',
    width: 12,
    properties: [],
    hooks: []
  };

  const div = document.createElement('div');
  ReactDOM.render(<ComponentDetails component={component} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
