/**
 * Calendar Component for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../../Context';
import i18n from '../locale';
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

  render() {
    const t = this;
    const { locale, anyDayInMonth } = t.props;
    return (
      <div className={prefixClass('day-calendar-month-title')}>
        {
          formatter(anyDayInMonth, i18n[locale].dayCalendarMonthTitleFormat)
        }
      </div>
    );
  }
}

export default MonthTitle;
