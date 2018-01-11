import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import formatter from './formatter';
import localeMap from './locale';

function isSameDay(day1, day2) {
  return (this.isNil(day1) && this.isNil(day2)) ||
    parseInt(day1, 10) === parseInt(day2, 10) ||
    formatter(day1, 'YYYY-MM-DD') === formatter(day2, 'YYYY-MM-DD');
  // 可以不使用formatter的方式来判断两天是否相等
  // todo...
}

// 是否在指定的时间内（含起止时间）
// 参数格式均为时间戳
function isInRange(startDate, endDate, targetDate) {
  return ((targetDate > startDate) && (targetDate < endDate)) ||
    targetDate === startDate ||
    targetDate === endDate;
}

function isNil(value) {
  return value === null || value === undefined || (Number.isNaN(value) && (typeof value === 'number'));
}

// 渲染特殊的工作日或休息日，比如国家因节假日而进行的调休
// 传入的dayMap的格式为：{
//    '2017-01-02': 'work',
//    '2017-01-03': 'leave',
// }
function generateSpecialWorkdayOrHolidayRender(dayMap, lang = 'zh-cn') {
  return function render(data, locale, current) {
    const currentDate = formatter(new Date(current), 'YYYY-MM-DD');
    const type = data[currentDate];
    if (type) {
      if (type === 'work') {
        return (
          <span className="workday-label">{localeMap[locale] && localeMap[locale].workday}</span>
        );
      }
      return (
        <span className="holiday-label">{localeMap[locale] && localeMap[locale].holiday}</span>
      );
    }
    return null;
  }.bind(null, dayMap, lang);
}

// 对系统的判断来自：https://github.com/madrobby/zepto/blob/master/src/detect.js
function isIos() {
  const ua = navigator.userAgent;
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const os = {};
  if (iphone && !ipod) {
    os.ios = true;
    os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
  }
  if (ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
  }
  if (ipod) {
    os.ios = true;
    os.ipod = true;
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }
  return os.ios;
}

function addUrlParam(name, value) {
  let currentUrl = window.location.href;
  let reg;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(`${name}=[-\\w]{4,25}`, 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, `${name}=${value}`);
    } else {
      currentUrl += `&${name}=${value}`;
    }
  } else {
    currentUrl += `?${name}=${value}`;
  }
  return currentUrl;
}

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
  const startDate = isNil(sDate) ? sDate : new Date(sDate).getTime();
  let endDate = isNil(eDate) ? eDate : new Date(eDate).getTime();
  // 如果开始时间大于结束时间，则把结束时间置为同开始时间相同的时间
  if (startDate && endDate && startDate > endDate) {
    endDate = startDate;
  }
  return {
    startDate,
    endDate,
  };
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


export default {
  isSameDay,
  isInRange,
  isNil,
  generateSpecialWorkdayOrHolidayRender,
  isIos,
  addUrlParam,
  makeWeeks,
  adaptCascadeDate,
  getMonthDays,
  getRealMonthPool,
};
