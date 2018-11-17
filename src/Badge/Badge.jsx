/**
 * Badge Component for SaltUI
 * @author minjie.lmj
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

class Badge extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.string,
    corner: PropTypes.oneOf(['rt', 'lt', 'rb', 'lb']),
    dot: PropTypes.bool,
    overflowCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    dotType: PropTypes.oneOf(['nomral', 'status']),
    status: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    breath: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    count: 0,
    text: '',
    dot: false,
    overflowCount: 99,
    corner: undefined,
    dotType: 'normal',
    status: 'info',
    breath: false,
  };

  static displayName = 'Badge';

  render() {
    const t = this;

    const {
      dot,
      text,
      corner,
      overflowCount,
      dotType,
      className,
      status,
      breath,
    } = this.props;

    const cls = {
      [className]: !!className,
    };


    let { count } = this.props;
    count = count > overflowCount ? `${overflowCount}+` : count;

    if (text) {
      count = text;
    }

    const style = { ...t.props.style } || {};

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
        if (dotType === 'status') {
          cls['badge-status-dot'] = true;
          cls[`badge-status-dot__${status}`] = true;
          if (breath) {
            cls['badge-status-dot__breathing'] = true;
          }
        }
      }

      if (t.props.children) {
        style.WebkitTransform = 'translate(50%, -50%)';
        style.transform = 'translate(50%, -50%)';
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
