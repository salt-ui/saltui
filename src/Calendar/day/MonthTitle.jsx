/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../../Context';
import locale from '../locale';
import formatter from '../formatter';


class MonthTitle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
    // 一个月中的任意一天都可以
    anyDayInMonth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    anyDayInMonth: '',
    className: undefined,
    locale: undefined,
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
