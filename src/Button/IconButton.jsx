import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    if (!this.props.children) {
      return null;
    }
    const {
      className,
      style,
      type,
      disabled,
      size,
    } = this.props;

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

    const iconHTML = React.cloneElement(this.props.children, {
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
  size: 24,
  onClick() { },
  disabled: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
IconButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

IconButton.displayName = 'IconButton';

export default IconButton;
