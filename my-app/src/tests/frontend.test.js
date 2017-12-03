import React from 'react';
import {mount, shallow, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import allPatients from '../components/allPatients.js';
import NotFound from '../components/notFound.js';
import patientDetail from '../components/patientDetail.js';
import Pagination from '../components/pagination.js';
import ReactPaginate from 'react-paginate';

//Configures enzyme adapter
configure({adapter: new Adapter()});

//Tests React components --> as per individual test descriptions
describe('React Components', () => {
  it('Pagination Component is being rendered in a div with .flex-container class', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.find('.flex-container').length).toEqual(1);
  });

  it('Pagination Component renders a ReactPaginate component`', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.find(ReactPaginate).length).toBe(1);
  });

  it('Pagination Component has a property of pageCount that equals 100`', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.children().props().pageCount).toEqual(100);
  });

  it('Pagination Component has a property of activeClassName that is named active`', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.children().props().activeClassName).toEqual('active');
  });

  it('NotFound Component is being rendered in a div with .flex-container class', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.flex-container').length).toEqual(1);
  });

  it('allPatients component renders an object', () => {
    const wrapper = shallow(<allPatients />);
    expect(typeof wrapper).toEqual('object');
  });

  it('patientById component renders an object', () => {
    const wrapper = shallow(<patientById />);
    expect(typeof wrapper).toEqual('object');
  });
});
