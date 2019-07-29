import React from 'react';
import ReactDOM from 'react-dom';
import Transcriptions from './Transcriptions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Transcriptions />, div);
});