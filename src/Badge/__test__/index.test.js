import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Badge from '../';

describe('Badge', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Badge dot/>
  );
  expect(wrapper).toMatchSnapshot();
  });
});