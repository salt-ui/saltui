import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonImageSmall extends React.Component {
  static displayName = 'SkeletonImageSmall'

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
    } = this.props;
    return (
      <div className={classnames(Context.prefixClass(`skeleton-image-small${animate ? ' skeleton-loading' : ''} ${className}`))} />
    );
  }
}


module.exports = SkeletonImageSmall;
