import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonOperationBar extends React.Component {
  render() {
    const {
      className,
      animate,
      ...others
    } = this.props;
    return (
      <div className={classnames(Context.prefixClass('skeleton-operation-bar'))} {...others}>
        <span className={classnames(Context.prefixClass(`skeleton-operation-left${animate ? ' skeleton-loading' : ''}`))} />
        <span className={classnames(Context.prefixClass(`skeleton-operation-mid${animate ? ' skeleton-loading' : ''}`))} />
        <span className={classnames(Context.prefixClass(`skeleton-operation-right${animate ? ' skeleton-loading' : ''}`))} />
      </div>
    );
  }
}


SkeletonOperationBar.displayName = 'SkeletonOperationBar';

SkeletonOperationBar.propTypes = {
  className: PropTypes.any,
  animate: PropTypes.bool,
};

SkeletonOperationBar.defaultProps = {
  className: undefined,
  animate: false,
};

module.exports = SkeletonOperationBar;
