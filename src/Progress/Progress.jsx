/**
 * Progress Component for tingle
 * @author shallker.wxd(dongnan)
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

class Progress extends React.Component {
  static propTypes = {
    percent: PropTypes.number,
    showInfo: PropTypes.bool,
    status: PropTypes.oneOf(['normal', 'exception', 'success']),
    strokeWidth: PropTypes.number,
  };

  static defaultProps = {
    // 进度条宽度
    strokeWidth: 8,

    // 当前进度百分比，0到100
    percent: 0,

    // 是否带有label信息
    showInfo: true,

    // bar的类型，'normal' 'exception' 'success'
    status: 'normal',
  };

  static displayName = 'Progress';

  render() {
    const t = this;
    let percent = Math.round(parseFloat(t.props.percent));
    let percentWidth = `${percent}%`;

    let statusClass = '';

    if (t.props.status === 'normal') {
      statusClass = 'blue-bar';
    } else if (t.props.status === 'exception') {
      statusClass = 'red-bar';
    } else if (t.props.status === 'success') {
      statusClass = 'green-bar';
    } else {
      statusClass = 'blue-bar';
    }

    let showInfoClass = '';

    if (t.props.showInfo) {
      showInfoClass = 'with-label';
    } else {
      showInfoClass = 'without-label';
    }

    let labelText = '';

    if (percent < 0) {
      percent = 0;
      percentWidth = `${percent}%`;
    }

    if (percent > 100) {
      percent = 100;
      percentWidth = `${percent}%`;
    }

    if (percent >= 0 && percent < 100) {
      labelText = `${percent}%`;
    } else if (percent === 100) {
      labelText = '100%';
      statusClass = 'green-bar';
    } else {
      throw new Error('invalid percent');
    }

    const progressBarStyle = {
      height: `${t.props.strokeWidth}px`,
    };

    const barCoreStyle = {
      width: percentWidth,
      height: `${t.props.strokeWidth}px`,
    };

    const barLabelStyle = {
      lineHeight: `${t.props.strokeWidth}px`,
    };

    return (
      <div
        className={classnames(Context.prefixClass('progress'), {
          [t.props.className]: !!t.props.className,
        }, showInfoClass)}
      >
        <div className={classnames('progress-bar', statusClass)} style={progressBarStyle}>
          <div className="bar-core" style={barCoreStyle} />
        </div>
        <div className="bar-label" style={barLabelStyle}>{labelText}</div>
      </div>
    );
  }
}

export default Progress;
