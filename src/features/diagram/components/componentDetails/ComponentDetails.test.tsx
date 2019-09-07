import React from 'react';
import ReactDOM from 'react-dom';
import ComponentDetails from './ComponentDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComponentDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
