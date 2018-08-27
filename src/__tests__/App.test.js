import React from 'react';
import ReactDOM from 'react-dom';
import { debug, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has title whoswho', () => {
  const { debug, container } = render(<App />);
  //debug();
  expect(container).toHaveTextContent('WhosWho');
});
