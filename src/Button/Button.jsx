/**
* Button Component for tingle
* @author cm
*
* Copyright 2014-2016, Tingle Team, Alinw.
* All rights reserved.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoadingRound from 'salt-icon/lib/LoadingRound';
import { prefixClass } from './utils';
import TextButton from './TextButton';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const { disabled, loading, onClick } = this.props;
    if (!disabled && !loading) {
      onClick(evt);
    }
  }

  render() {
    const {
      type,
      className,
      style,
      size,
      loading,
      display,
      disabled,
    } = this.props;
    if (type === 'text') {
      return <TextButton {...this.props} />;
    }

    const normal = display === 'normal';
    const inline = display === 'inline';
    const banner = display === 'banner';

    const primary = type === 'primary';
    const secondary = type === 'secondary';
    const danger = type === 'danger';
    const minor = type === 'minor';

    const classSet = {
      [className]: !!className,
      [`${prefixClass('button')}`]: true,
      disabled,
      [`${prefixClass('button-primary')}`]: primary && !disabled,
      [`${prefixClass('button-secondary')}`]: secondary && !disabled,
      [`${prefixClass('button-minor')}`]: minor && !disabled,
      [`${prefixClass('button-danger')}`]: danger && !disabled,
      [`${prefixClass('button-loading')}`]: loading,
      [`${prefixClass('button-normal')}`]: normal,
      [`${prefixClass('button-inline')}`]: inline,
      [`${prefixClass('button-banner')}`]: banner,
      [`${prefixClass('button-size-small')}`]: size === 'small',
      [`${prefixClass('button-size-medium')}`]: size === 'medium',
      [`${prefixClass('button-size-large')}`]: size === 'large',
    };

    let iconHTML;
    if (loading) {
      iconHTML = <LoadingRound className={prefixClass('button-loading-icon')} />;
    }

    return (
      <div
        className={classnames(classSet)}
        disabled={disabled}
        style={style}
        onClick={this.onClick}
      >
        {iconHTML}
        {this.props.children}
      </div>
    );
  }
}

Button.defaultProps = {
  className: '',
  style: {},
  size: 'medium',
  type: 'primary',
  onClick() { },
  children: null,
  display: 'normal',
  loading: false,
  disabled: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['medium', 'large', 'small']),
  type: PropTypes.oneOf(['primary', 'secondary', 'minor', 'danger']),
  onClick: PropTypes.func,
  children: PropTypes.node,
  display: PropTypes.oneOf(['inline', 'normal', 'banner']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.displayName = 'Button';

export default Button;
