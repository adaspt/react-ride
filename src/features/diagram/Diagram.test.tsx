import React from 'react';
import ReactDOM from 'react-dom';
import Diagram from './Diagram';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Diagram />, div);
  ReactDOM.unmountComponentAtNode(div);
});
