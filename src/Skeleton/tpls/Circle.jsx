import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonCircle extends React.Component {
  static displayName = 'SkeletonCircle'

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
      <div className={classnames(Context.prefixClass(`skeleton-circle${animate ? ' skeleton-loading' : ''}`))} {...others}>xxx</div>
    );
  }
}


module.exports = SkeletonCircle;
