import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.array,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    prefixCls: 't-scroll-list-taglist',
    className: undefined,
    data: [],
    onClick: () => {}
  };

  renderTagItem(item, index, className) {
    const { onClick, prefixCls } = this.props;
    return <span 
      key={`${prefixCls}-item-${index}`}
      onClick={() => onClick(item, index)}
      className={classnames(`${prefixCls}-item`,{
        [`${className}-item`]: !!className,
      })}>
        {item.value || item || ''}
      </span>
  }

  render() {
    const { 
      prefixCls,
      className,
      data = [],
    } = this.props;
    return (
      <div
        className={classnames({
          [prefixCls]: true,
          [className]: !!className,
        })}
      >
        {
          data.map((item, index) => {
            return this.renderTagItem(item, index, className);
          })
        }
      </div>
    );
  }
}

export default Item;
