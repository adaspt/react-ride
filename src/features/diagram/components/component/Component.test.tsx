import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component name="Component1" width={6} hooks={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
