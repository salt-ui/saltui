import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Badge from '../Badge';

class Item extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    img: PropTypes.string,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number, PropTypes.bool]),
    badgePosition: PropTypes.string,
    desMaxLine: PropTypes.number,
    extra: PropTypes.any,
    borderType: PropTypes.string,
  };
  static defaultProps = {
    prefixCls: 't-scroll-list-item',
    desMaxLine: 2,
    className: undefined,
    img: undefined,
    avatar: undefined,
    title: undefined,
    description: undefined,
    badge: undefined,
    badgePosition: 'followTitle', // indicator/followTitle/titleRight
    extra: undefined,
    borderType: '',
  };

  renderImg() {
    const { img, prefixCls } = this.props;
    if (typeof img === 'string') {
      return (<img alt="" className={`${prefixCls}-img`} src={img} />);
    }
    return img;
  }

  renderAvatar() {
    const { avatar, prefixCls } = this.props;
    if (typeof avatar === 'string') {
      return (<img alt="" className={`${prefixCls}-avatar`} src={avatar} />);
    }
    return avatar;
  }

  renderTitle() {
    const { title, prefixCls, badgePosition } = this.props;
    if (!title) return null;
    return (
      <div className={classnames(`${prefixCls}-title`, {
        [badgePosition]: true,
      })}
      >{title}{badgePosition === 'indicator' ? null : this.renderBadge()}
      </div>);
  }

  renderBadge() {
    const { badge, prefixCls } = this.props;
    const className = `${prefixCls}-badge`;
    if (typeof badge === 'string') {
      return (<Badge text={badge} className={className} />);
    } else if (typeof badge === 'number') {
      return (<Badge count={badge} className={className} />);
    } else if (typeof badge === 'boolean') {
      return (<Badge dot className={className} />);
    }
    return badge;
  }

  renderDes() {
    const { description, prefixCls, desMaxLine } = this.props;
    if (description) {
      return (
        <div className={`${prefixCls}-des`}>
          <div
            className={`${prefixCls}-des-inner`}
            style={{
              WebkitLineClamp: desMaxLine,
            }}
          >
            {description}
          </div>
        </div>
      );
    }
    return null;
  }

  renderExtra() {
    const { extra, prefixCls } = this.props;
    if (extra) {
      return (
        <div className={`${prefixCls}-extra`}>
          <div className={`${prefixCls}-extra-inner`}>{extra}</div>
        </div>
      );
    }
    return null;
  }
  render() {
    const {
      prefixCls, className, borderType, badgePosition,
    } = this.props;
    return (
      <div
        className={classnames({
          [prefixCls]: true,
          [className]: !!className,
          [borderType]: !!borderType,
        })}
      >
        {this.renderImg()}
        {this.renderAvatar()}
        <div className={`${prefixCls}-content`}>
          {this.renderTitle()}
          {this.renderDes()}
        </div>
        {badgePosition === 'indicator' ? this.renderBadge() : null}
        {this.renderExtra()}
      </div>
    );
  }
}

export default Item;
