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
import cloneDeep from 'lodash/cloneDeep';
import locale from '../locale';
import formatter from '../formatter';
import util from '../util';
import { halfDayType } from './const';

const prefixClass = Context.prefixClass;

class MonthBody extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    // days：[timestamp1, timestamp1, ...]
    days: React.PropTypes.array,
    singleMode: React.PropTypes.bool, // 是否是单选模式
    locale: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      // React.PropTypes.array, // 传递过来的，不能存在array类型的value
      React.PropTypes.object,
    ]),
    disabledDate: React.PropTypes.func,
    renderDayBadge: React.PropTypes.func,
    renderCustomDayLabel: React.PropTypes.func,
  };

  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  makeWeeks(monthDays) {
    const result = [];
    const days = cloneDeep(monthDays);
    // 根据 days 计算这个月有多少周
    const firstDay = days[0]; // 取出第一天
    const firstDayInWeek = new Date(parseInt(firstDay, 10)).getDay(); // 计算该月的第一天是周几
    // 把第一天前面不足一周的日期用 null 补满
    for (let i = 0; i < firstDayInWeek; i++) {
      days.unshift(null);
    }
    const lastDay = days[days.length - 1]; // 取出最后一天
    const lastDayInWeek = new Date(parseInt(lastDay, 10)).getDay(); // 计算该月的最后一天是周几
    // 把最后一天后面不足一周的日期用 null 补满
    for (let j = 0; j < 6 - lastDayInWeek; j++) {
      days.push(null);
    }
    const weeksNum = Math.ceil(days.length / 7);
    for (let i = 0; i < weeksNum; i++) {
      result.push(days.splice(0, 7));
    }
    return result;
  }

  isDisabledDate(day) {
    const t = this;
    if (day && typeof t.props.disabledDate === 'function') {
      return t.props.disabledDate(day, t.props.value);
    }
    return false;
  }

  renderEmptyDay(idx) {
    return (
      <div
        className={classnames(prefixClass('FB1 FBH FBAC FBJC tap'), 'day-cell')}
        key={idx}
      >
        <span className="day-cell-inner" /></div>
    );
  }

  renderTodayLabel() {
    return (
      <span className="day-label today-label">{this.locale.today}</span>
    );
  }

  // 渲染右上角的徽标text
  renderDayBadge(day) {
    const t = this;
    const func = t.props.renderDayBadge;
    if (typeof func === 'function') {
      const badge = func(day, t.props.value);
      if (badge) {
        return (
          <span className="badge-label">
            {badge}
          </span>
        );
      }
      return null;
    }
    return null;
  }

  // 渲染用户定制的日期文案，比如端午节、日程等
  renderCustomDayLabel(day) {
    const t = this;
    const func = t.props.renderCustomDayLabel;
    if (typeof func === 'function') {
      const custom = func(day, t.props.value);
      if (custom) {
        return (
          <span className="day-label custom-label">
            {custom}
          </span>
        );
      }
      return null;
    }
    return null;
  }

  renderSingModeDay(day, idx) {
    const t = this;
    const today = util.isSameDay(day, Date.now());
    let value = t.props.value;
    if (!util.isNil(t.props.value) && typeof t.props.value === 'object') {
      value = t.props.value.startDate || t.props.value.endDate;
      if (t.props.value.value) {
        value = t.props.value.value;
      }
    }
    const selected = util.isSameDay(day, value);
    const disabled = t.isDisabledDate(day);
    return (
      <div
        className={classnames(prefixClass('FB1 FBH FBAC FBJC tap'), 'day-cell')}
        key={idx}
        onClick={(e) => { if (!disabled) { t.props.onSelected(day, e); } }}
      >
        <span
          className={classnames('day-cell-inner', {
            today,
            selected,
            disabled,
          })}
        >
          {formatter(day, 'DD')}
        </span>
        {
          today && t.renderTodayLabel()
        }
        {
          t.renderDayBadge(day)
        }
        {
          t.renderCustomDayLabel(day)
        }
      </div>
    );
  }

  renderCascadeModeDay(day, idx) {
    const t = this;
    const today = util.isSameDay(day, Date.now());
    let selected = false;
    const value = t.props.value;
    selected =
      util.isInRange(value.startDate, value.endDate, day);
    const disabled = t.isDisabledDate(day);
    if (!selected) {
      return (
        <div
          className={classnames(prefixClass('FB1 FBH FBAC FBJC tap'), 'day-cell')}
          key={idx}
          onClick={(e) => { if (!disabled) { t.props.onSelected(day, e); } }}
        >
          <span
            className={classnames('day-cell-inner', {
              today,
              selected,
              disabled,
            })}
          >
            {formatter(day, 'DD')}
          </span>
          {
            today && t.renderTodayLabel()
          }
          {
            t.renderDayBadge(day)
          }
          {
            t.renderCustomDayLabel(day)
          }
        </div>
      );
    }
    const isStartDate = util.isSameDay(value.startDate, day);
    const isEndDate = util.isSameDay(value.endDate, day);
    let isPM = false;
    if (isStartDate && value.startDateType === halfDayType.PM) {
      isPM = true;
    } else if (isEndDate && value.endDateType === halfDayType.PM) {
      isPM = true;
    }
    let isAM = false;
    if (isStartDate && value.startDateType === halfDayType.AM) {
      isAM = true;
    } else if (isEndDate && value.endDateType === halfDayType.AM) {
      isAM = true;
    }
    const isFull = !(isAM || isPM);
    const isWeekFirstDay = idx === 0;
    const isWeekLastDay = idx === 6;
    const isMonthFirstDay = util.isSameDay(t.props.days[0], day);
    const isMonthLastDay =
      util.isSameDay(t.props.days[t.props.days.length - 1], day);
    // 非起、止，非周始、周尾
    const isInRange = selected &&
      !(isStartDate || isEndDate || isWeekFirstDay ||
      isWeekLastDay || isMonthFirstDay || isMonthLastDay);
    // 是否应该出现"色块垫子"
    const shouldHaveBackBlock = selected &&
      !(isStartDate && isEndDate) && // 非同时是起、止
      ( // 有起、有止
        (isStartDate && !util.isNil(value.endDate)) ||
        (isEndDate && !util.isNil(value.startDate)) ||
        !(isStartDate || isEndDate)
      ) &&
      !(
        (isWeekFirstDay && (
          (isMonthFirstDay && isEndDate) ||
          isMonthLastDay ||
          (!isMonthFirstDay && !isMonthFirstDay && isEndDate)
        )) ||
        (isWeekLastDay && (
          isMonthFirstDay ||
          (isMonthLastDay && isStartDate) ||
          (!isMonthFirstDay && !isMonthLastDay && isStartDate)
        )) ||
        (!isWeekFirstDay && !isWeekLastDay && (
          (isMonthFirstDay && isEndDate) ||
          (isMonthLastDay && isStartDate) ||
          (!isMonthFirstDay && !isMonthLastDay && !isStartDate && !isEndDate)
        ))
      );
    const placeLeft =
      isEndDate || (!isEndDate && (isWeekLastDay || isMonthLastDay));
    const placeRight =
      isStartDate || (!isEndDate && (isWeekFirstDay || isMonthFirstDay));
    return (
      <div
        className={classnames(prefixClass('FB1 FBH FBAC FBJC tap'), 'day-cell')}
        key={idx}
        onClick={(e) => { if (!disabled) { t.props.onSelected(day, e); } }}
      >
        {
          shouldHaveBackBlock &&
          <div
            className={classnames('back-block', {
              left: placeLeft,
              right: placeRight,
            })}
          />
        }
        <span
          className={classnames('day-cell-inner', {
            today,
            selected,
            disabled,
            'in-range': isInRange,
            'start-date': isStartDate,
            'end-date': isEndDate,
            'week-first-day': isWeekFirstDay,
            'week-last-day': isWeekLastDay,
            'month-first-day': isMonthFirstDay,
            'month-last-day': isMonthLastDay,
            'half-day': t.props.showHalfDay && (isAM || isPM),
          })}
        >
          {formatter(day, 'DD')}
        </span>
        {
          today && !(isStartDate || isEndDate) && t.renderTodayLabel()
        }
        {
          isStartDate && !isEndDate &&
            <span className="day-label start-label">{t.locale.duration.start}</span>
        }
        {
          isEndDate && !isStartDate &&
            <span className="day-label end-label">{t.locale.duration.end}</span>
        }
        {
          t.props.showHalfDay && isAM && <span className="day-label am-label">{t.locale.dayTipMap.AM}</span>
        }
        {
          t.props.showHalfDay && isPM && <span className="day-label pm-label">{t.locale.dayTipMap.PM}</span>
        }
        {
          t.props.showHalfDay && isFull && (isStartDate || isEndDate) && <span className="day-label full-label">{t.locale.dayTipMap.FULL}</span>
        }
        {
          t.renderDayBadge(day)
        }
        {
          t.renderCustomDayLabel(day)
        }
      </div>
    );
  }

  render() {
    const t = this;
    const weeks = t.makeWeeks(t.props.days);
    return (
      <div className={prefixClass('day-calendar-month-body FBV')}>
        {
          weeks.map((week, index) => (
            <div className={classnames(prefixClass('FBH FBAC'), 'week-block')} key={index}>
              {
                week.map((day, idx) => {
                  if (!day) {
                    return t.renderEmptyDay(idx);
                  }
                  if (t.props.singleMode) {
                    return t.renderSingModeDay(day, idx);
                  }
                  return t.renderCascadeModeDay(day, idx);
                })
              }
            </div>
            )
          )
        }
      </div>
    );
  }
}

export default MonthBody;
