/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import Context from '../../Context';
import locale from '../locale';
import formatter from '../formatter';

const prefixClass = Context.prefixClass;

class MonthTitle extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    locale: React.PropTypes.string,
    // 一个月中的任意一天都可以
    anyDayInMonth: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  };

  static defaultProps = {
    anyDayInMonth: '',
  };

  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  render() {
    const t = this;
    return (
      <div className={prefixClass('day-calendar-month-title')}>
        {
          formatter(t.props.anyDayInMonth, t.locale.dayCalendarMonthTitleFormat)
        }
      </div>
    );
  }
}

export default MonthTitle;
