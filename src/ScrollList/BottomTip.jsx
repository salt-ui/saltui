import React from 'react';
import PropTypes from 'prop-types';

class BottomTip extends React.Component {
  static displayName = 'BottomTip';
  static defaultProps = {
    text: '',
    icon: null,
  };
  static propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
  };

  render() {
    return (
      <div className="bottom-tip">
        {this.props.icon}
        <div className="text">{this.props.text}</div>
      </div>);
  }
}

export default BottomTip;

