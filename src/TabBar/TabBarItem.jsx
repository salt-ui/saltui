/**
 * TabBar Component for tingle
 * @author zhouwenjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import { Box } from '../Boxs';
import TabBarItemCenter from './TabBarItemCenter';
import TabBarItemBadge from './TabBarItemBadge';

class TabBarItem extends React.Component {
  static displayName = 'TabBarItem';
  static propTypes = {
    className: React.PropTypes.string,
    item: React.PropTypes.element,
  };

  render() {
    const t = this;
    const active = t.props.active;
    const item = t.props.item ? t.props.item : t;
    return (
      <Box
        className={classnames(Context.prefixClass('tabs-bar-item'), {
          active,
        })}
        onClick={t.props.onClick}
        flex={1}
      >
        <TabBarItemBadge {...item.props} iconHeight={t.props.iconHeight} active={active} />
      </Box>
    );
  }
}

export default { TabBarItem, TabBarItemCenter };
