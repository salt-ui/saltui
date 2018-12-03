import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonElement extends React.Component {
  static displayName = 'SkeletonElement'

  static propTypes = {
    className: PropTypes.any,
    animate: PropTypes.bool,
  }


  static defaultProps = {
    className: undefined,
    animate: false,
  }


  render() {
    const {
      className,
      animate,
      ...others
    } = this.props;
    return (
      <div className={classnames(Context.prefixClass(`skeleton-element${animate ? ' skeleton-loading' : ''} ${className}`))} {...others} />
    );
  }
}


module.exports = SkeletonElement;
