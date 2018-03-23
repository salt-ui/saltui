/**
 * NavBar Component for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import AngleLeft from 'salt-icon/lib/AngleLeft';
import { prefixClass } from '../Context';


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: this.props.isShow,
    };
  }

  handleBackClick() {
    this.props.onLeftClick();
  }

  handleOptionClick() {
    this.props.onRightClick();
  }

  handleCloseView() {
    this.props.closeViewClick();
  }

  render() {
    const t = this;
    return (
      <div
        ref={(c) => { this.root = c; }}
        className={classnames(prefixClass('nav-bar'), {
            [t.props.className]: !!t.props.className,
        })}
      >
        <div className={prefixClass('nav-bar-left FAL')}>
          <div className={prefixClass('nav-bar-left-option')} onClick={this.handleBackClick.bind(this)}>
            <AngleLeft className={prefixClass('nav-bar-arrow-left')} />
            <span>返回</span>
          </div>
          {this.state.isShow ?
            <span
              className={prefixClass('nav-bar-close')}
              onClick={this.handleCloseView.bind(this)}
            >关闭
            </span> : null}
        </div>
        <div className={prefixClass('nav-bar-center nav-bar-center-text omit3 FAC')}>
          {this.props.title}
        </div>
        <div className={prefixClass('nav-bar-right FAR')} onClick={this.handleOptionClick.bind(this)}>
          <span className={prefixClass('nav-bar-right-text')}>{this.props.rightText}</span>
        </div>
      </div>);
  }
}

NavBar.defaultProps = {
  className: '',
  title: '',
  rightText: '更多',
  isShow: true,
  onLeftClick() {
  },
  onRightClick() {
  },
  closeViewClick() {
  },
};

// http://facebook.github.io/react/docs/reusable-components.html
NavBar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  rightText: PropTypes.string,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  closeViewClick: PropTypes.func,
  isShow: PropTypes.bool,
};

NavBar.displayName = 'NavBar';

export default NavBar;
