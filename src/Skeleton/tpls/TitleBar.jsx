import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonTitleBar extends React.Component {
  static displayName = 'SkeletonTitleBar'

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
      <div className={classnames(Context.prefixClass(`skeleton-title-bar${animate ? ' skeleton-loading' : ''}`))} {...others} />
    );
  }
}


module.exports = SkeletonTitleBar;
