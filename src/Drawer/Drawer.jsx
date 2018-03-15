/**
 * Drawer Component for tingle
 * @author eternalsky
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import RcDrawer from 'rc-drawer';
import { prefixClass } from '../Context';

class Drawer extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: prefixClass('drawer'),
  };

  static displayName = 'Drawer';

  render() {
    const t = this;
    return (
      <RcDrawer {...t.props} />
    );
  }
}

export default Drawer;
