import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../../Context';

class SkeletonTextBar extends React.Component {
  contentItem(index) {
    const {
      className,
      animate,
      ...others
    } = this.props;
    return (
      <ul key={`${index}`} className={classnames(Context.prefixClass('skeleton-text-bar-wrapper'))}>
        <li key={`${index}-1`} className={classnames(Context.prefixClass(`skeleton-text-bar${animate ? ' skeleton-loading' : ''} ${className}`))} {...others} />
        <li key={`${index}-2`} className={classnames(Context.prefixClass(`skeleton-text-bar${animate ? ' skeleton-loading' : ''} ${className}`))} {...others} />
      </ul>
    );
  }

  render() {
    const t = this;
    const { rows } = t.props;
    const contentList = [];
    for (let i = 0; i < rows; i++) {
      contentList.push(t.contentItem(i));
    }
    return (
      <div>
        {contentList}
      </div>
    );
  }
}

SkeletonTextBar.displayName = 'SkeletonTextBar';

SkeletonTextBar.propTypes = {
  className: PropTypes.any,
  animate: PropTypes.bool,
  rows: PropTypes.number,
};

SkeletonTextBar.defaultProps = {
  className: undefined,
  animate: false,
  rows: 1,
};


module.exports = SkeletonTextBar;
