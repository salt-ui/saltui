import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

class Box extends React.Component {
  static defaultProps = {
    type: 'primary',
    size: 'medium',
  };

  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  };
  render() {
    const t = this;
    const {
      children, className, size, type, onClick,
    } = t.props;
    const prefixCls = Context.prefixClass('totop-wrap');
    const finalClass = classnames(prefixCls, `${prefixCls}-${size}`, `${prefixCls}-${type}`, className);
    return (
      <div
        className={finalClass}
        onClick={onClick}
      >
        <div className={`${prefixCls}-inner`}>
          {children}
        </div>
      </div>
    );
  }
}

export default Box;
