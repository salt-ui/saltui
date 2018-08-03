import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import { Box } from '../Boxs';
import TabBarItemBadge from './TabBarItemBadge';

/**
 * more Items of Tab Bar, on the Mask Layer
 */

class TabBarItemMore extends React.Component {
  static displayName = 'TabBarItemMore';
  static propTypes = {
    onClick: PropTypes.func,
    keyNew: PropTypes.string,
    path: PropTypes.string,
    hideMoreItems: PropTypes.func,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  static defaultProps = {
    onClick: undefined,
    path: undefined,
    hideMoreItems: undefined,
    index: undefined,
    keyNew: undefined,
  };

  handleClick = (e) => {
    e.stopPropagation();
    const {
      index, path, onClick, hideMoreItems,
    } = this.props;
    onClick && onClick(index, path);
    hideMoreItems && hideMoreItems(e);
  };

  render() {
    const t = this;
    const { active, iconHeight } = t.props;
    return (
      <Box
        className={classnames(
          Context.prefixClass('tabs-bar-item'),
          Context.prefixClass('tabs-bar-item-more'),
          active,
        )}
        onClick={this.handleClick}
        flex={1}
      >
        <TabBarItemBadge {...t.props} iconHeight={iconHeight} active={active} showTitle={false} />
      </Box>
    );
  }
}

export default TabBarItemMore;
