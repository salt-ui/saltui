/**
 * Timeline Component for tingle
 * @author zhongsisi
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Item from './Item';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const t = this;
    let hasActive = false;
    let hasIcon = false;
    t.props.children.forEach((child) => {
      if (child.props.active) {
        hasActive = true;
      }
      if (child.props.icon) {
        hasIcon = true;
      }
    });
    /* eslint-disable react/no-array-index-key */
    return (
      <div
        className={classnames(Context.prefixClass('timeline'), {
          [t.props.className]: !!t.props.className,
          'has-active': hasActive,
          'has-icon': hasIcon,
        })}
      >
        {
          t.props.children.map((ele, idx) => (
            React.cloneElement(ele, {
              index: idx,
              last: idx === t.props.children.length - 1,
              key: idx,
            })
          ))
        }
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

Timeline.defaultProps = {
  className: undefined,
};

Timeline.propTypes = {
  className: PropTypes.string,
};

Timeline.displayName = 'Timeline';
Timeline.Item = Item;

export default Timeline;
