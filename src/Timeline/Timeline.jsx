/**
 * Timeline Component for tingle
 * @author zhongsisi
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');

const classnames = require('classnames');

const Context = require('../Context');
const Item = require('./Item');

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
            })
          ))
        }
      </div>
    );
  }
}

Timeline.defaultProps = {
};

Timeline.propTypes = {
  className: React.PropTypes.string,
};

Timeline.displayName = 'Timeline';
Timeline.Item = Item;

module.exports = Timeline;
