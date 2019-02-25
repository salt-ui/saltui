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
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    desMaxLine: PropTypes.number,
    totalNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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
    totalNumber: undefined,
    extra: undefined,
    borderType: undefined,
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
    const { title, prefixCls } = this.props;
    return <div className={`${prefixCls}-title`}>{title}{this.renderBadge()}</div>;
  }

  renderBadge() {
    const { badge, prefixCls } = this.props;
    if (typeof badge === 'string') {
      return (<Badge text={badge} style={{ marginLeft: 8, marginTop: 1, background: '#F9BD0F' }} />);
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

  renderTotalNumber() {
    const { totalNumber, prefixCls } = this.props;
    if (!totalNumber || totalNumber <= 0) return null;
    let num = '';
    if (typeof totalNumber === 'number') {
      num = totalNumber > 99 ? '99+' : totalNumber;
    }
    return (
      <div
        className={classnames(`${prefixCls}-number`, {
        more: totalNumber > 99,
        little: typeof totalNumber === 'boolean',
      })}
      >
        {num}
      </div>
    );
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
    const { prefixCls, className, borderType } = this.props;
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
        {this.renderTotalNumber()}
        {this.renderExtra()}
      </div>
    );
  }
}

export default Item;
