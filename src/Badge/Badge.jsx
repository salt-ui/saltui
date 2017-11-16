/**
 * Badge Component for tingle
 * @author minjie.lmj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';

class Badge extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    text: React.PropTypes.string,
    corner: React.PropTypes.oneOf(['rt', 'lt', 'rb', 'lb']),
    dot: React.PropTypes.bool,
    overflowCount: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  };

  static defaultProps = {
    className: '',
    count: 0,
    text: '',
    dot: false,
    overflowCount: 99,
  };

  static displayName = 'Badge';

  render() {
    const t = this;
    const cls = {
      [t.props.className]: !!t.props.className,
    };
    const {
      dot,
      text,
      corner,
      overflowCount,
    } = this.props;


    let { count } = this.props;
    count = count > overflowCount ? `${overflowCount}+` : count;

    if (text) {
      count = text;
    }

    const style = t.props.style || {};

    if ('left' in style) {
      style.right = 'auto';
    }

    if (corner) {
      cls['badge-corner'] = true;
      cls[`badge-${t.props.corner}`] = true;
    } else {
      if (dot) {
        count = '';
        cls['badge-dot'] = true;
      }

      if (t.props.children) {
        style.webkitTransform = 'translate(50%, -50%)';
        style.transform = 'translate(50%, -50%)'; // fix https://aone.alibaba-inc.com/req/11690248
      }
    }

    if (!t.props.children) {
      cls['badge-no-child'] = true;
    }

    let showBadge = true;
    if ((!count || count === '0' || count < 0) && !dot) {
      showBadge = false;
    }

    return (
      <div className={classnames(Context.prefixClass('badge'), cls)}>
        {showBadge ?
          <div className="badge-inner" style={style}>
            {count}
          </div> :
        null}
        {t.props.children}
      </div>
    );
  }
}

export default Badge;
