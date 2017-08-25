/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import Popup from '../Popup';
import Context from '../Context';
import DayCalendar from './day';
import util from './util';
import locale from './locale';
import MonthCalendar from './month';
import YearCalendar from './year';

const prefixClass = Context.prefixClass;

class Calendar extends React.Component {

  static displayName = 'Calendar';

  constructor(props) {
    super(props);
    this.slideBackListener = this.handleSlideBack.bind(this);
  }

  componentDidMount() {
    const t = this;
    t.showCalendar(t.props);
  }

  componentDidUpdate() {
    this.showCalendar(this.props);
  }

  componentWillUnmount() {
    if (this.props.viewMode === 'slide' && this.props.visible) {
      history.go(-1);
    }
  }

  onOk(value) {
    if (this.props.viewMode === 'slide') {
      history.go(-1);
    }
    this.props.onOk(value);
  }

  showCalendar(props) {
    const t = this;
    if (!props.visible) {
      if (t.popup) {
        t.popup.close();
        t.popup = null;
        window.removeEventListener('popstate', t.slideBackListener, false);
      }
      return;
    }

    const calendar = <DayCalendar {...props} onOk={(val) => { t.onOk(val); }} />;

    if (t.popup) {
      t.popup.update(calendar);
      return;
    }

    if (props.viewMode === 'popup') {
      t.popup = Popup.show(calendar, {
        animationType: 'slide-up',
        className: prefixClass('calendar-popup'),
      });
    } else {
      t.popup = Popup.show(calendar, {
        animationType: 'slide-left',
        className: prefixClass('calendar-popup'),
      });
      history.pushState({
        calendarType: 'Calendar.slide',
      }, '', util.addUrlParam('CALENDARSLIDE', Date.now()));
      window.addEventListener('popstate', t.slideBackListener, false);
    }
  }

  handleSlideBack(e) {
    const t = this;
    const { state } = e;
    if (!state || !state.calendarType) {
      window.removeEventListener('popstate', t.slideBackListener, false);
      t.popup.close();
      t.props.onCancel();
    }
  }

  render() {
    return null;
  }
}

Calendar.MonthCalendar = MonthCalendar;
Calendar.YearCalendar = YearCalendar;

Calendar.util = util;
Calendar.locale = locale;
Calendar.I18n = locale;

export default Calendar;
