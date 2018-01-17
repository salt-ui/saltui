/**
 * CalendarField Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import DayField from './lib/DayField'; // 选择日期，面板形式
import DayFieldWithSlot from './lib/DayFieldWithSlot'; // 选择日期，拨盘形式
import DayFieldWithHalf from './lib/DayFieldWithHalf';
import DayFieldWithTime from './lib/DayFieldWithTime';
import MonthField from './lib/MonthField';
import YearField from './lib/YearField';

class CalendarField extends React.Component {
  static displayName = 'CalendarField';

  render() {
    const t = this;
    if (t.props.type === 'year') {
      return <YearField {...t.props} />;
    } else if (t.props.type === 'month') {
      return <MonthField {...t.props} />;
    } else if (t.props.type === 'dayWithSlot') {
      return <DayFieldWithSlot {...t.props} />;
    } else if (t.props.type === 'dayWithHalf') {
      return <DayFieldWithHalf {...t.props} />;
    } else if (t.props.type === 'dayWithTime') {
      return <DayFieldWithTime {...t.props} />;
    }
    return <DayField {...t.props} />;
  }
}

export default CalendarField;
