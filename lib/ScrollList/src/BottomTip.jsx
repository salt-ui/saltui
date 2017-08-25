import React from 'react';

class BottomTip extends React.Component {
  static displayName = 'BottomTip';
  static defaultProps = {
    text: '',
    icon: null,
  };
  static propTypes = {
    icon: React.PropTypes.element,
    text: React.PropTypes.string.isRequired,
  };

  render() {
    return (<div className="bottom-tip">
      {this.props.icon}
      <div className="text">{this.props.text}</div>
    </div>);
  }
}

export default BottomTip;

