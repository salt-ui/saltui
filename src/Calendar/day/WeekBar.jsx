/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../../Context';
import locale from '../locale';

const prefixClass = Context.prefixClass;

class WeekBar extends React.Component {

  static propTypes = {
    className: React.PropTypes.string, // 国际化语言
    locale: React.PropTypes.string, // 国际化语言
  };

  static defaultProps = {
    locale: 'zh-cn',
  };

  static displayName = 'WeekBar';

  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  render() {
    const t = this;
    return (
      <div
        className={classnames(prefixClass('day-calendar-week-bar FBH'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        {
          t.locale.weekTitle.map((item, index) => (
            <div
              className={classnames(prefixClass('FB1 FBAC'), 'week-bar-item', {
                first: index === 0,
                last: index === 6,
              })}
              key={index}
            >{item}</div>
            )
          )
        }
      </div>
    );
  }
}

export default WeekBar;
