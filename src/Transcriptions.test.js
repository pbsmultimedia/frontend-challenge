import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import Transcriptions from './Transcriptions';
import Header from './Components/Header/Header';
import List from './Components/List/List';

configure({adapter: new Adapter()});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Transcriptions />, div);
});

it('simulates click on fetch transcriptions button', () => {
	const wrapper = mount(<Transcriptions />);		
	let fetchBtn = wrapper.find(Header).find("#fetch-transcriptions");
	fetchBtn.simulate('click');    
	expect(fetchBtn.length).toEqual(1);			
});