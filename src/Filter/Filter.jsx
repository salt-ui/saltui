/**
 * Filter Component for SaltUI
 * @author taoqili
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar.jsx'

export default class Filter extends React.Component {
  static displayName = 'Filter';

  static propTypes = {
    activeIndex: PropTypes.number,
    options: PropTypes.object,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    activeIndex: -1,
    options: {},
    onSelect: () => {}
  };

  constructor(props) {
    super(props);
    this.selectData = {}
  }

  setSelect = (data) => {
    if (!data || typeof data !== 'object') {
      return
    }
    this.selectData = {
      ...this.selectData,
      ...data
    }
  };

  getSelect = () => {
    return this.selectData
  };

  render() {
    return (
      <div>
        <HeaderBar {...this.props} setSelect={this.setSelect} getSelect={this.getSelect} />
        {/*<SomeOther />*/}
      </div>
    );
  }
}
