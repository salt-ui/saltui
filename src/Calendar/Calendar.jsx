/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup';
import { prefixClass } from '../Context';
import DayCalendar from './day';
import util from './util';
import locale from './locale';
import MonthCalendar from './month';
import YearCalendar from './year';

class Calendar extends React.Component {
  static displayName = 'Calendar';

  static propTypes = {
    ...DayCalendar.propTypes,
    ...MonthCalendar.propTypes,
    ...YearCalendar.propTypes,
    maskClosable: PropTypes.bool,
    onMaskClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    ...DayCalendar.defaultProps,
    ...MonthCalendar.defaultProps,
    ...YearCalendar.defaultProps,
    maskClosable: true,
    onMaskClose: () => {},
    onOk: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    this.slideBackListener = this.handleSlideBack.bind(this);
  }

  componentDidMount() {
    const t = this;
    t.showCalendar(t.props);
    // cache body height for window resize on android keyboard showing and hiding
    this.bodyHeight = document.documentElement.clientHeight;
  }

  componentDidUpdate() {
    this.showCalendar(this.props);
  }

  componentWillUnmount() {
    if (this.props.animationType === 'slideLeft' && this.props.visible) {
      window.history.go(-1);
    } else if (this.popup) {
      this.popup.close();
    }
  }

  onOk(value) {
    if (this.props.animationType === 'slideLeft') {
      window.history.go(-1);
    }
    this.props.onOk(value);
  }

  // slide-up模式下才有该方法
  onMaskClose() {
    const t = this;
    t.popup.close();
    t.popup = null;
    t.props.onMaskClose();
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

    const calendar = (<DayCalendar
      {...props}
      bodyHeight={this.bodyHeight}
      onOk={(val) => { t.onOk(val); }}
    />);

    if (t.popup) {
      t.popup.update(calendar);
      return;
    }

    if (props.animationType === 'slideUp') {
      t.popup = Popup.show(calendar, {
        animationType: 'slide-up',
        className: prefixClass('calendar-popup'),
        maskClosable: props.maskClosable,
        onMaskClose: t.onMaskClose.bind(t),
      });
    } else {
      t.popup = Popup.show(calendar, {
        animationType: 'slide-left',
        className: prefixClass('calendar-popup'),
      });
      window.history.pushState({
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
