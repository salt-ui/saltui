import React from 'react';
import Context from '../Context';

class TabBarItemTitle extends React.Component {
  static displayName = 'TabBarItemTitle';
  static propTypes = {
    active: React.PropTypes.bool,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    activeTitleStyle: React.PropTypes.object,
  };
  render() {
    const { active, title, titleStyle, activeTitleStyle } = this.props;
    const currentTitleStyle = active ? activeTitleStyle : titleStyle;
    return (<span
      className={Context.prefixClass('tabs-bar-item-label')}
      style={currentTitleStyle}
    >{title}</span>);
  }
}

export default TabBarItemTitle;
