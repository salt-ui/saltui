import React from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

class TabBarItemTitle extends React.Component {
  static displayName = 'TabBarItemTitle';
  static propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    activeTitleStyle: PropTypes.object,
  };
  static defaultProps = {
    active: undefined,
    title: undefined,
    titleStyle: undefined,
    activeTitleStyle: undefined,
  };
  render() {
    const {
      active, title, titleStyle, activeTitleStyle,
    } = this.props;
    const currentTitleStyle = active ? activeTitleStyle : titleStyle;
    return (<span
      className={Context.prefixClass('tabs-bar-item-label')}
      style={currentTitleStyle}
    >{title}</span>);
  }
}

export default TabBarItemTitle;
