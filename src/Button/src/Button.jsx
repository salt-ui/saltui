/**
* Button Component for tingle
* @author cm
*
* Copyright 2014-2016, Tingle Team, Alinw.
* All rights reserved.
*/
import React from 'react';
import classnames from 'classnames';
import Icon from '@ali/tingle-icon';
import { prefixClass } from './utils';
import TextButton from './TextButton';

class Button extends React.Component {

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
    const type = this.props.type;
    if (type === 'text') {
      return <TextButton {...this.props} />;
    }

    const className = this.props.className;
    const style = this.props.style;
    const size = this.props.size;
    const loading = this.props.loading;
    const display = this.props.display;
    const disabled = this.props.disabled;

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
      iconHTML = <Icon name="loading-round" className={prefixClass('button-loading-icon')} />;
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
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  size: React.PropTypes.oneOf(['medium', 'large', 'small']),
  type: React.PropTypes.oneOf(['primary', 'secondary', 'minor', 'danger']),
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
  display: React.PropTypes.oneOf(['inline', 'normal', 'banner']),
  loading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

Button.displayName = 'Button';

export default Button;
