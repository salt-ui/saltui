import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';

export default class Header extends React.Component {
  render() {
    return (
      <div className={prefixClass('card-header')}>{this.props.children}</div>
    )
  }
}

Header.contextTypes = {
  locale: PropTypes.string
}