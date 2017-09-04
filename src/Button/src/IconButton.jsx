import React from 'react';
import classnames from 'classnames';
import Icon from '@ali/tingle-icon';
import { prefixClass } from './utils';

class IconButton extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    if (!this.props.disabled) {
      this.props.onClick(evt);
    }
  }

  render() {
    const className = this.props.className;
    const style = this.props.style;
    const type = this.props.type;
    const disabled = this.props.disabled;

    const primary = type === 'primary';
    const secondary = type === 'secondary';

    const classSet = {
      [`${prefixClass('FBH FBAC FBJC')}`]: true,
      [className]: !!className,
      [`${prefixClass('icon-button')}`]: true,
      [`${prefixClass('icon-button-primary')}`]: primary,
      [`${prefixClass('icon-button-secondary')}`]: secondary,
      disabled,
    };

    const name = this.props.name;
    const fill = this.props.fill;
    const size = this.props.size;
    const iconHTML = React.createElement(Icon, {
      name,
      fill,
      width: size,
      height: size,
    });

    return (
      <div
        className={classnames(classSet)}
        disabled={disabled}
        style={style}
        onClick={this.onClick}
      >
        {iconHTML}
      </div>
    );
  }
}

IconButton.defaultProps = {
  className: '',
  style: {},
  type: 'primary',
  name: '',
  fill: null,
  size: 24,
  onClick() { },
  disabled: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
IconButton.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.oneOf(['primary', 'secondary']),
  name: React.PropTypes.string.isRequired,
  fill: React.PropTypes.string,
  size: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

IconButton.displayName = 'IconButton';

export default IconButton;
