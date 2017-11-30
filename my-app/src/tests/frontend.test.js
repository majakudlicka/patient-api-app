import React from 'react';
import {mount, shallow, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import allPatients from '../components/allPatients.js';
import NotFound from '../components/notFound.js';
import patientDetail from '../components/patientDetail.js';

configure({adapter: new Adapter()});

describe('allPatients', () => {
  let mountedallPatients;
  const allPatients = () => {
    if (!mountedallPatients) {
      mountedallPatients = mount(<allPatients />);
    }
    return mountedallPatients;
  };

  it('NotFound Component is being rendered in a div with .flex-container class', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.flex-container').length).toEqual(1);
  });

  it('patientDetail Component is being rendered in a div with .flex-container class', () => {
    const wrapper = shallow(<patientDetail />);
    expect(wrapper.find('.flex-container').length).toEqual(1);
  });

  it('allPatients component renders an object', () => {
    const wrapper = mount(<allPatients />);
    expect(typeof wrapper).toEqual('object');
  });

  it('contains everything else that gets rendered', () => {
    const divs = allPatients().find('div');
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(allPatients().children());
  });

  // it('formatBirthDate function returns a correctly formatted date', () => {
  //   const wrapper = shallow(<allPatients />);
  //   console.log(wrapper.instance().sortAsc()); // true
  // });
});

// describe('allPatients', () => {
//   it('always renders a div', () => {
//     const divs = allPatients.formatBirthDate('2017-02-22T16:09:24.386Z');
//     console.log(divs);
//     // expect(divs.length).toBeGreaterThan(0);
//   });
// });
