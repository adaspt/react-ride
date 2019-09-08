import React from 'react';
import ReactDOM from 'react-dom';
import SizeInput from './SizeInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SizeInput value={12} onChange={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
