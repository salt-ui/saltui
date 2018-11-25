import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonImageBig extends React.Component {
  render() {
    const {
      className,
      animate,
    } = this.props;
    // const style = {};
    // if (width > 0 || typeof width === 'string') {
    //   style.width = width;
    // }
    // if (height > 0 || typeof height === 'string') {
    //   style.height = height;
    // }
    return (
      <div className={classnames(Context.prefixClass(`skeleton-image-big${animate ? ' skeleton-loading' : ''} ${className}`))} />
    );
  }
}

SkeletonImageBig.displayName = 'SkeletonImageBig';

SkeletonImageBig.propTypes = {
  className: PropTypes.any,
  animate: PropTypes.bool,
  size: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

SkeletonImageBig.defaultProps = {
  className: undefined,
  animate: false,
  size: 'middle',
  width: 0,
  height: 0,
};

module.exports = SkeletonImageBig;
