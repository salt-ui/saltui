/**
 * Filter Component for SaltUI
 * @author gnosaij
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar.jsx'

class Filter extends React.Component {
  static displayName = 'Filter';

  static propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    options: [],
    onSelect: () => {}
  };

  render() {
    const {} = this.props;
    return (
      <div>
        <HeaderBar {...this.props} />
      </div>
    );
  }
}

export default Filter;
