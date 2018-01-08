import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import TabBarItemIcon from './TabBarItemIcon';
import TabBarItemTitle from './TabBarItemTitle';

class TabBarItemBadge extends React.Component {
  static displayName = 'TabBarItemBadge';
  static propTypes = {
    badge: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
    badgeStyle: PropTypes.object,
    iconHeight: PropTypes.number,
    active: PropTypes.bool,
    showTitle: PropTypes.bool,
  };

  static defaultProps = {
    showTitle: true,
  };

  render() {
    const { badge, badgeStyle, iconHeight, active, showTitle } = this.props;
    const contentBadge = [];
    if (badge && (typeof badge === 'number')) {
      contentBadge.push(<Badge key={'badge_number'} count={badge} style={badgeStyle} >
        <TabBarItemIcon {...this.props} iconHeight={iconHeight} active={active} />
        {showTitle ? <TabBarItemTitle {...this.props} active={active} /> : null}
      </Badge>);
    } else if (badge && (typeof badge === 'string')) {
      contentBadge.push(
        <Badge key={'badge_string'} text={badge} style={badgeStyle} >
          <TabBarItemIcon {...this.props} iconHeight={iconHeight} active={active} />
          {showTitle ? <TabBarItemTitle {...this.props} active={active} /> : null}
        </Badge>);
    } else if (badge && badge.constructor === Object) {
      contentBadge.push(
        <Badge {...badge} key={'badge_object'} style={badgeStyle} >
          <TabBarItemIcon {...this.props} iconHeight={iconHeight} active={active} />
          {showTitle ? <TabBarItemTitle {...this.props} active={active} /> : null}
        </Badge>);
    } else {
      contentBadge.push(
        <div key={'badge_others'}>
          <TabBarItemIcon {...this.props} iconHeight={iconHeight} active={active} />
          {showTitle ? <TabBarItemTitle {...this.props} active={active} /> : null}
        </div>);
    }
    return (<div>
      {contentBadge}
    </div>);
  }
}

export default TabBarItemBadge;
