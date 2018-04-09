import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.string,
    desMaxLine: PropTypes.number,
    extra: PropTypes.any,
  };
  static defaultProps = {
    prefixCls: 't-scroll-list-item',
    desMaxLine: 2,
    className: undefined,
    img: undefined,
    title: undefined,
    description: undefined,
    extra: undefined,
  };

  renderImg() {
    const { img, prefixCls } = this.props;
    if (typeof img === 'string') {
      return (<img alt="" className={`${prefixCls}-img`} src={img} />);
    }
    return img;
  }

  renderTitle() {
    const { title, prefixCls } = this.props;
    return <div className={`${prefixCls}-title`}>{title}</div>;
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
    const { prefixCls, className } = this.props;
    return (
      <div
        className={classnames({
          [prefixCls]: true,
          [className]: !!className,
        })}
      >
        {this.renderImg()}
        <div className={`${prefixCls}-content`}>
          {this.renderTitle()}
          {this.renderDes()}
        </div>
        {this.renderExtra()}
      </div>
    );
  }
}

export default Item;
