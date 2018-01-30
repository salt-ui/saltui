/**
 * TabBar Component for tingle
 * @author zhouwenjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import { Box } from '../Boxs';
import TabBarItemCenter from './TabBarItemCenter';
import TabBarItemBadge from './TabBarItemBadge';

class TabBarItem extends React.Component {
  static displayName = 'TabBarItem';
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.element,
  };
 static defaultProps = {
   className: undefined,
   item: undefined,
 }
 render() {
   const t = this;
   const { active } = t.props;
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
