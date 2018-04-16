/**
 * Calendar Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import util, { makeWeeks } from '../util';
import { prefixClass } from '../../Context';
import locale from '../locale';
import formatter from '../formatter';
import { halfDayType } from './const';

function renderEmptyDay(idx) {
  return (
    <div
      className={classnames(prefixClass('FB1 FBH FBAC FBJC tap'), 'day-cell')}
      key={idx}
    >
      <span className="day-cell-inner" />
    </div>
  );
}

class MonthBody extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    // days：[timestamp1, timestamp1, ...]
    days: PropTypes.array,
    singleMode: PropTypes.bool, // 是否是单选模式
    locale: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      // PropTypes.array, // 传递过来的，不能存在array类型的value
      PropTypes.object,
    ]),
    disabledDate: PropTypes.func,
    renderDayBadge: PropTypes.func,
    renderCustomDayLabel: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    days: undefined,
    singleMode: undefined,
    locale: undefined,
    value: undefined,
    disabledDate: undefined,
    renderDayBadge: undefined,
    renderCustomDayLabel: undefined,
  };

  componentWillMount() {
    this.locale = locale[this.props.locale];
  }

  isDisabledDate(day) {
    const t = this;
    if (day && typeof t.props.disabledDate === 'function') {
      return t.props.disabledDate(day, t.props.value);
    }
    return false;
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

  renderSingModeDay(day, idx, isWeekend) {
    const t = this;
    const today = util.isSameDay(day, Date.now());
    let { value } = t.props;
    if (!util.isNil(t.props.value) && typeof t.props.value === 'object') {
      value = t.props.value.startDate || t.props.value.endDate;
      if (t.props.value.value) {
        ({ value } = t.props.value);
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
            isWeekend,
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

  renderCascadeModeDay(day, idx, isWeekend) {
    const t = this;
    const today = util.isSameDay(day, Date.now());
    let selected = false;
    const { value } = t.props;
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
              isWeekend,
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
    const weeks = makeWeeks(t.props.days);
    /* eslint-disable react/no-array-index-key */
    return (
      <div className={prefixClass('day-calendar-month-body FBV')}>
        {
          weeks.map((week, index) => (
            <div className={classnames(prefixClass('FBH FBAC'), 'week-block')} key={index}>
              {
                week.map((day, idx) => {
                  const isWeekend = idx === 0 || idx === 6;
                  if (!day) {
                    return renderEmptyDay(idx);
                  }
                  if (t.props.singleMode) {
                    return t.renderSingModeDay(day, idx, isWeekend);
                  }
                  return t.renderCascadeModeDay(day, idx, isWeekend);
                })
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default MonthBody;
