import React from 'react';
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
    onClick: React.PropTypes.func,
    key: React.PropTypes.string,
    path: React.PropTypes.string,
    hideMoreItems: React.PropTypes.func,
    index: React.PropTypes.number,
  };

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
        className={classnames(Context.prefixClass('tabs-bar-item'),
          Context.prefixClass('tabs-bar-item-more'), {
            active,
          })}
        onClick={this.doClick}
        flex={1}
      >
        <TabBarItemBadge {...t.props} iconHeight={iconHeight} active={active} showTitle={false} />
      </Box>
    );
  }
}

export default TabBarItemMore;
