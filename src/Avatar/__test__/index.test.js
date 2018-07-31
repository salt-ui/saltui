import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Avatar>Hello Jest!</Avatar>
  );
  expect(wrapper).toMatchSnapshot();
  });
});