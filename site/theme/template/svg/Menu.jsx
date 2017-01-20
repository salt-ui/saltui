import React from 'react';

export default class IconMenu extends React.PureComponent {
  static defaultProps = {
    size: 32,
    color: '#999',
  }
  static propTypes = {
    size: React.PropTypes.number,
    color: React.PropTypes.string,
  }
  render() {
    const { size, color, className, ...otherProps } = this.props;
    return (
      <svg id="icon-menu" className={className} viewBox="0 0 100 100" width={size} height={size} {...otherProps}>
        <line x1="0" x2="100" y1="10" y2="10" stroke={color} strokeWidth="14" />
        <line x1="0" x2="100" y1="50" y2="50" stroke={color} strokeWidth="14" />
        <line x1="0" x2="100" y1="90" y2="90" stroke={color} strokeWidth="14" />
      </svg>
    );
  }
}