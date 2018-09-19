/**
 * Drawer Component for SaltUI
 * @author eternalsky
 *
 * Copyright 2018-2019, SaltUI Team.
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
