import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Button from '../';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Button>Hello Jest!</Button>
  );
  expect(wrapper).toMatchSnapshot();
  });
});
