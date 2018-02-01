/**
 * NoticeBar Component for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InfoRoundIcon from 'salt-icon/lib/InfoRound';
import NoteRoundIcon from 'salt-icon/lib/NoteRound';
import CheckRoundIcon from 'salt-icon/lib/CheckRound';
import CrossRoundIcon from 'salt-icon/lib/CrossRound';
import DirectionRightIcon from 'salt-icon/lib/DirectionRight';
import CrossIcon from 'salt-icon/lib/Cross';
import Animate from 'rc-animate';
import Context from '../Context';

class NoticeBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    optionsType: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'info',
    className: '',
    message: '',
    optionsType: '',
    visible: true,
    onClose: () => { },
    onClick: () => { },
  };

  static displayName = 'NoticeBar';

  handleClose(e) {
    this.props.onClose(this, e);
  }

  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(this, e);
    }
  }

  renderContent() {
    const t = this;
    const iconMap = {
      info: 'notice-info',
      success: 'notice-success',
      error: 'notice-error',
      warning: 'notice-warning',
    };
    const { type, message, optionsType } = t.props;
    const iconClassName = iconMap[type];
    const iconProps = {
      width: 18,
      height: 18,
      fill: '#fff',
      className: 'icon-custom-class',
    };
    const iconCompMap = {
      info: InfoRoundIcon,
      warning: NoteRoundIcon,
      success: CheckRoundIcon,
      error: CrossRoundIcon,
    };
    const Icon = iconCompMap[type];
    const iconName = <Icon {...iconProps} />;
    return (
      <div
        className={classnames(Context.prefixClass('FBH notice-bar-content'), {
          [iconClassName]: !!iconClassName,
        })}
      >
        <div className="notice-icon">{iconName}</div>
        <span className="notice-content-message">{message}</span>
        {optionsType ? t.renderOptions() : null}
      </div>
    );
  }

  renderOptions() {
    const t = this;
    const { optionsType } = t.props;
    // 目前type 分为jumpto、close 等;
    if (optionsType === 'jumpto') {
      return (
        <div className="notice-options notice-direction">
          <DirectionRightIcon width={18} height={18} fill="#fff" className="icon-custom-class" />
        </div>);
    } else if (optionsType === 'close') {
      return (
        <div className="notice-options notice-cross">
          <CrossIcon width={18} height={18} fill="#fff" className="icon-custom-class" onClick={(e) => { t.handleClose(e); }} />
        </div>);
    }
    return null;
  }

  render() {
    const t = this;
    const { className, visible } = this.props;
    const content = t.renderContent();
    const dom = (
      <div
        className={classnames(Context.prefixClass('notice-bar'), {
          [className]: !!className,
        })}
        onClick={(e) => { t.handleClick(e); }}
      >
        {content}
      </div>
    );
    return (
      <Animate
        transitionName={Context.prefixClass('notice-bar-fade')}
        transitionAppear
      >
        {visible ? dom : null}
      </Animate>
    );
  }
}

export default NoticeBar;
