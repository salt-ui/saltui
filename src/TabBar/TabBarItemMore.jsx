import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import { Box } from '../Boxs';
import TabBarItemBadge from './TabBarItemBadge';

/**
* more Items of Tab Bar,  on the Mask Layer
*/

class TabBarItemMore extends React.Component {
  static displayName = 'TabBarItemMore';
  static propTypes = {
    onClick: PropTypes.func,
    keyNew: PropTypes.string,
    path: PropTypes.string,
    hideMoreItems: PropTypes.func,
    index: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };
  static defaultProps = {
    onClick: () => { },
    path: undefined,
    hideMoreItems: undefined,
    index: undefined,
    keyNew: undefined,
  }
  constructor(props) {
    super(props);
    this.doClick = this.doClick.bind(this);
  }
  doClick(e) {
    e.stopPropagation();
    this.props.onClick(this.props.index, this.props.path);
    this.props.hideMoreItems(e);
  }

  render() {
    const t = this;
    const { active, iconHeight } = t.props;
    return (
      <Box
        className={classnames(
          Context.prefixClass('tabs-bar-item'),
          Context.prefixClass('tabs-bar-item-more'), {
            active,
          },
        )}
        onClick={this.doClick}
        flex={1}
      >
        <TabBarItemBadge {...t.props} iconHeight={iconHeight} active={active} showTitle={false} />
      </Box>
    );
  }
}

export default TabBarItemMore;
