import cloneDeep from 'lodash/cloneDeep';
import classnames from 'classnames';
import React from 'react';
import { prefixClass } from '../../Context';
import util from '../util';

function makeWeeks(monthDays) {
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


// 级联模式，调整成正确的数据
function adaptCascadeDate(sDate, eDate) {
  const startDate = util.isNil(sDate) ? sDate : new Date(sDate).getTime();
  let endDate = util.isNil(eDate) ? eDate : new Date(eDate).getTime();
  // 如果开始时间大于结束时间，则把结束时间置为同开始时间相同的时间
  if (startDate && endDate && startDate > endDate) {
    endDate = startDate;
  }
  return {
    startDate,
    endDate,
  };
}

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

/*
   * 根据 timestamp 去计算它所属的月份的全部 days
   * days数据结构为：[timestamp1, timestamp2, ...]
   */
function getMonthDays(timestamp = Date.now()) {
  const cursorDay = new Date(new Date(timestamp).setDate(1));
  const currentMonth = cursorDay.getMonth();
  const days = [];
  while (cursorDay.getMonth() === currentMonth) {
    days.push(cursorDay.getTime());
    cursorDay.setDate(cursorDay.getDate() + 1);
  }
  return days;
}

// t.state.monthPool中存放一些占位信息。该function负责取出真正月份的部分信息
function getRealMonthPool(monthPool) {
  let lastRealMonthIndex = 0;
  let realMonthLen = 0;
  monthPool.forEach((m, idx) => {
    if (Array.isArray(m)) {
      lastRealMonthIndex = idx;
      realMonthLen += 1;
    }
  });
  const firstRealMonthIndex = (lastRealMonthIndex - realMonthLen) + 1;
  return {
    firstRealMonthIndex,
    lastRealMonthIndex,
    realMonthLen,
  };
}

// 只有级联才用到上下午
function renderHalfDay() {
  return null;
}

export {
  makeWeeks,
  adaptCascadeDate,
  renderEmptyDay,
  getMonthDays,
  getRealMonthPool,
  renderHalfDay,
};
