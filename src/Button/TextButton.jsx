import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from './utils';

class TextButton extends React.Component {
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
    const {
      className,
      style,
      type,
      disabled,
      display,
      size,
    } = this.props;

    const classSet = {
      [`${prefixClass('FBH FBAC FBJC')}`]: true,
      [className]: !!className,
      [`${prefixClass('text-button')}`]: true,
      [`${prefixClass('text-button-primary')}`]: type === 'primary',
      [`${prefixClass('text-button-secondary')}`]: type === 'secondary',
      [`${prefixClass('text-button-inline')}`]: display === 'inline',
      [`${prefixClass('text-button-size-small')}`]: size === 'small',
      [`${prefixClass('text-button-size-medium')}`]: size === 'medium',
      [`${prefixClass('text-button-size-large')}`]: size === 'large',
      disabled,
    };

    return (
      <div
        className={classnames(classSet)}
        disabled={disabled}
        style={style}
        onClick={this.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

TextButton.defaultProps = {
  className: '',
  style: {},
  size: 'medium',
  type: 'primary',
  onClick() { },
  children: null,
  display: 'normal',
  disabled: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
TextButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
  children: PropTypes.node,
  display: PropTypes.oneOf(['inline', 'normal']),
  disabled: PropTypes.bool,
};

TextButton.displayName = 'TextButton';

export default TextButton;
