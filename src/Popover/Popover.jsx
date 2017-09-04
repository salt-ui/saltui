/**
 * Popover Component for tingle
 * @author wenzhao.fw
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import Context from '../Context';
import Tooltip from 'rc-tooltip';
import placements from './placements';

class Popover extends React.Component {

  static propTypes = {
    overlayClassName: React.PropTypes.string,
    placement: React.PropTypes.string,
  };

  static defaultProps = {
    overlayClassName: '',
    placement: 'bottomRight',
    trigger: ['click'],
  };

  static displayName = 'Popover';

  render() {
    const t = this;
    const prefixCls = Context.prefixClass('popover');
    const defaultAlign = placements[t.props.placement];
    return (
      <Tooltip
        prefixCls={prefixCls}
        align={defaultAlign}
        {...t.props}
      />
    );
  }
}

export default Popover;
