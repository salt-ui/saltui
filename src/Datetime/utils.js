import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import dateFormat from './dateFormat';
import locale from './locale';

const colFlags = ['Y', 'M', 'D', 'T', 'h', 'H', 'm', 's', 'YMD', 'YMDW'];

const Y = ['Y'];
const YM = ['Y', 'M'];
const YMD = ['Y', 'M', 'D'];
const YMDT = ['Y', 'M', 'D', 'T'];
const YMDHM = ['YMD', 'H', 'm'];
const YMDWHM = ['YMDW', 'H', 'm'];
function addZero(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function getDates(value) {
  const date = new Date(value);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const arr = [];
  let num = 30;
  if (month === 2) {
    num = 28;
    if (isLeapYear(year)) {
      num = 29;
    }
  }
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    num = 31;
  }
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  };
  return arr;
}
// 如果非正确的日期，则返回当前时间对象
function getNowIfDateInvalid(dataObj) {
  let date = dataObj;
  if (isNaN(date.getTime())) {
    // invalid
    console.warn('invalid date');
    date = new Date();
  }
  return date;
}

// 解析格式化value
function parseValue(value) {
  let date;
  let timeType;

  if (isObject(value)) {
    date = value.value ? new Date(value.value) : new Date();
    timeType = ({ AM: 0, PM: 1 })[value.timeType || 'AM'];
  } else {
    date = !value || new Date(value) == 'Invalid Date' ? new Date() : new Date(parseInt(value, 10));
    timeType = date.getHours() >= 12 ? 1 : 0;
  }

  date = getNowIfDateInvalid(date);

  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    timeType,
    date.getHours() >= 13 ? date.getHours() - 12 : date.getHours(), // 12小时制
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    // 获取年月日组合，转换成number
    `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}` - 0,
    `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}` - 0,
  ];
};
function numToDate(num) {
  const str = `${num}`;
  const Y = str.substring(0, 4);
  const M = str.substring(4, 6);
  const D = str.substring(6, 8);
  return `${Y}-${M}-${D}`;
}
// 根据日期获取一周中的一天
// sure 可以控制是否添加周"几"
function addDayOfWeek(days, props, sure = true) {
  if (isArray(days)) {
    days.forEach((day) => {
      const date = new Date(numToDate(day.value));
      if (sure) {
        day.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
      } else {
        day.text = dateFormat(date, 'YYYY/MM/DD');
      }
    });
    return;
  }

  const date = new Date(numToDate(days.value));
  if (sure) {
    days.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
  } else {
    days.text = dateFormat(date, 'YYYY/MM/DD');
  }
}

function formatFromProps(arr, props) {
  const { columns } = props;
  const displayList = [];
  for (let i = 0; i < columns.length; i += 1) {
    if (colFlags.indexOf(columns[i]) !== -1) {
      displayList.push(arr[colFlags.indexOf(columns[i])]);
    }
    if (columns[i] === 'YMDW') {
      addDayOfWeek(displayList[i], props);
    }
    if (columns[i] === 'YMD') {
      addDayOfWeek(displayList[i], props, false);
    }
  }

  return displayList;
};

function getDateArr(currentValue) {
  const arr = numToDate(currentValue).split('-');
  arr[1] = parseInt(arr[1]) - 1;
  return arr;
}


function getMonthDays(year, month) {
  let NUM = 30;
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    NUM = 31;
  }
  if (month === 2) {
    NUM = isLeapYear(year) ? 29 : 28;
  }
  return NUM;
}

function getMonthsByYear({ minDate, maxDate, year }) {
  const max = new Date(maxDate);
  const min = new Date(minDate);
  const maxYear = max.getFullYear();
  const minYear = min.getFullYear();
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => {
    return {
      text: `${addZero(index + 1)}月`,
      value: index,
    };
  });
  if (year > minYear && year < maxYear) {
    return arr;
  }
  const maxTime = max.getTime();
  const minTime = min.getTime();
  if (year === maxYear) {
    arr = arr.filter((item) => {
      const date = new Date(year, item.value, 1);
      return date.getTime() < maxTime;
    });
  }
  if (year === minYear) {
    arr = arr.filter((item) => {
      const date = new Date(year, item.value, 1);
      return date.getTime() > minTime;
    });
  }
  return arr;
}
// 根据年月 最大 最小日期计算当月天数
function getDayByMonth({ minDate, maxDate, year, month }) {
  const max = new Date(maxDate);
  const min = new Date(minDate);
  const maxYear = max.getFullYear();
  const minYear = min.getFullYear();
  const NUM = getMonthDays(year, month + 1);
  let arr = [];
  for (let i = 1; i <= NUM; i++) {
    arr.push({
      text: `${addZero(i)}日`,
      value: i,
    });
  }
  if (year > minYear && year < maxYear) {
    return arr;
  }
  const maxTime = max.getTime();
  const minTime = min.getTime();
  if (year === minYear) {
    arr = arr.filter((item) => {
      const date = new Date(year, month, item.value);
      return date.getTime() > minTime;
    });
  }
  if (year === maxYear) {
    arr = arr.filter((item) => {
      const date = new Date(year, month, item.value);
      return date.getTime() < maxTime;
    });
  }
  return arr;
}


function parseDate({ columns, value }) {
  const dateStr = {
    YMD: [],
    Hm: [],
  };
  columns.forEach((item, index) => {
    if (item === 'YMD' || item === 'YMDW') {
      dateStr.YMD = `${numToDate(value[index].value)}`.split('-');
      return;
    }
    if (item === 'H' || item === 'm') {
      dateStr.Hm.push(`${addZero(value[index].value)}`);
      return;
    }
    if (item === 'T') {
      dateStr.Hm = value[index].value ? ['12', '00', '00'] : ['00', '00', '00'];
      return;
    }
    dateStr.YMD.push(value[index].value);
  });
  return new Date(...dateStr.YMD, ...dateStr.Hm);
}
function getDaysByYear(item) {
  const days = [];
  const arr = [item - 1, item, item + 1];
  arr.forEach((year) => {
    for (let i = 1; i < 13; i += 1) {
      getDates(`${year}-${i}`).forEach((el) => {
        days.push(`${year}${addZero(i)}${addZero(el)}` - 0);
      });
    }
  });
  return days;
}
function makeRange(start, end, step) {
  step = step || 1;
  const arr = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}
// 求有限时间范围内的 disabledDate时间区间
function getDateRangeArr({ disabledArr, minDateTime, maxDateTime }) {
  const {
    minTime,
    maxTime,
    startEnd,
  } = disabledArr;
  const dateRangeArr = [];
  // 计算时间区间
  if (minTime) { // 计算小于区间
    if (minDateTime <= minTime) {
      dateRangeArr.push({
        start: minDateTime,
        end: minTime,
      });
    }
  }
  /* eslint no-continue:0 */
  for (let i = 0; i < startEnd.length; i++) { // 计算中间区间
    const { start, end } = startEnd[i];
    if (end < start) {
      continue;
    }
    if (start >= minDateTime && end <= maxDateTime) { // start end 都在 取值范围内
      dateRangeArr.push(startEnd[i]);
    }
    if (start <= minDateTime && end >= minDateTime && end <= maxDateTime ) { // start 不在 end 在
      dateRangeArr.push({
        start: minDateTime,
        end,
      });
      continue;
    }
    if (start >= minDateTime && start <= maxDateTime && end >= maxDateTime) { // end 不在 start 在
      dateRangeArr.push({
        start,
        end: maxDateTime,
      });
      continue;
    }
    if (start <= minDateTime && end >= maxDateTime) { // end 不在 start 不在
      dateRangeArr.push({
        start: minDateTime,
        end: maxDateTime,
      });
      continue;
    }
  }
  // 计算中间时间区间
  if (maxTime) {
    if (maxDateTime > maxTime) {
      dateRangeArr.push({
        start: maxTime,
        end: maxDateTime,
      });
    }
  }
  return dateRangeArr;
}

function filterYear(arr, { disabledArr, minDate, maxDate }) {
  const minDateTime = new Date(minDate).getTime();
  const maxDateTime = new Date(maxDate).getTime();
  const yearRangeArr = getDateRangeArr({ disabledArr, minDateTime, maxDateTime });
  const yearArr = [];
  yearRangeArr.forEach((item) => {
    let { start, end } = item;
    start = new Date(start);
    end = new Date(end);
    const yearStart = start.getFullYear();
    const monthStart = start.getMonth();
    const dayStart = start.getDate();
    const yearEnd = end.getFullYear();
    const monthEnd = end.getMonth();
    const dayEnd = new Date(end.getTime() + 86400000).getDate();
    if (monthStart === 0 && dayStart === 1) { // 判断临界时 是否去掉整年
      if (monthEnd === 11 && dayEnd === 1) {
        for (let i = yearStart; i <= yearEnd; i++) {
          yearArr.push(i);
        }
      } else {
        for (let i = yearStart; i < yearEnd; i++) {
          yearArr.push(i);
        }
      }
    }
    if (monthEnd === 11 && dayEnd === 1) {
      for (let i = yearStart + 1; i <= yearEnd; i++) {
        yearArr.push(i);
      }
    } else {
      for (let i = yearStart + 1; i < yearEnd; i++) {
        yearArr.push(i);
      }
    }
  });
  return arr.filter((item) => {
    const year = item.value;
    return yearArr.indexOf(year) === -1;
  });
}

function filterMonth(arr, year, disabledArr) {
  const minDateTime = new Date(year, 0, 1).getTime();
  const maxDateTime = new Date(year, 11, 31).getTime();
  const monthRangeArr = getDateRangeArr({ disabledArr, minDateTime, maxDateTime });
  const monthArr = [];
  monthRangeArr.forEach((item) => {
    let { start, end } = item;
    start = new Date(start);
    end = new Date(end);

    const monthStart = start.getMonth();
    const monthEnd = end.getMonth();
    const dayStart = start.getDate();
    const dayEnd = new Date(end.getTime() + 86400000).getDate();
    if (dayStart === 1) {
      if (dayEnd === 1) {
        for (let i = monthStart; i <= monthEnd; i++) {
          monthArr.push(i);
        }
      } else {
        for (let i = monthStart; i < monthEnd; i++) {
          monthArr.push(i);
        }
      }
    }
    if (dayEnd === 1) {
      for (let i = monthStart + 1 ; i <= monthEnd; i++) {
        monthArr.push(i);
      }
    } else {
      for (let i = monthStart + 1 ; i < monthEnd; i++) {
        monthArr.push(i);
      }
    }
  });
  return arr.filter((item) => {
    const month = item.value;
    return monthArr.indexOf(month) === -1;
  });
}

function filterDay(arr, year, month, disabledArr) {
  const minDateTime = new Date(year, month, 1).getTime();
  const maxDateTime = new Date(year, month + 1, 0).getTime();
  const dayRangeArr = getDateRangeArr({ disabledArr, minDateTime, maxDateTime });
  const dayArr = [];
  dayRangeArr.forEach((item) => {
    let { start, end } = item;
    start = new Date(start).getDate();
    end = new Date(end).getDate();
    for (let i = start; i <= end; i++) {
      dayArr.push(i);
    }
  });
  return arr.filter((item) => {
    const day = item.value;
    return dayArr.indexOf(day) === -1;
  });
}
// 求 时间禁止区间并集
function parseDisabledArr(arr) {
  let min;
  let max;
  let startEnd = [];
  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    if (currentValue.end || currentValue.start) {
      const { start, end } = currentValue;
      if (start && end) {
        startEnd.push({
          start: new Date(start).getTime(),
          end: new Date(end).getTime(),
        });
      }
      const endTime = new Date(end).getTime();
      const startTime = new Date(start).getTime();
      if (end && !start) { // 取小于区间
        if (!min) {
          min = endTime;
        } else {
          min = min >= endTime ? endTime : min;
        }
      }
      if (!end && start) { // 取大于区间
        if (!max) {
          max = startTime;
        } else {
          max = max <= startTime ? startTime : max;
        }
      }
    } else {
      const dateTime = new Date(currentValue).getTime();
      if (dateTime) {
        startEnd.push({
          start: dateTime,
          end: dateTime,
        });
      }
    }
  }
  // 将点连成线
  startEnd = startEnd.sort((a, b) => {
    return a.start - b.start;
  });
  let newStartEnd = [];
  if (startEnd.length) {
    let newItem = startEnd[0];
    for (let i = 1; i < startEnd.length; i++) {
      if (newItem.end >= startEnd[i].start) {
        newItem.end = startEnd[i].end;
        if (i === startEnd.length - 1) {
          newStartEnd.push(newItem);
        }
      } else {
        newStartEnd.push(newItem);
        newItem = startEnd[i];
      }
    }
  }
  newStartEnd = newStartEnd.filter((item) => {
    const { start, end } = item;
    if (min >= start) {
      min = min <= end ? end : min;
      return false;
    }
    if (max <= end) {
      max = max >= start ? start : max;
      return false;
    }
    return true;
  });
  return {
    minTime: min,
    maxTime: max,
    startEnd,
  };
}

function filterTime({ data, value, disabledDate, minDate, maxDate }) {
  let disabledArr = disabledDate();
  if (!disabledArr) {
    return data;
  }
  if (!isArray(disabledArr)) {
    disabledArr = [disabledArr];
  }
  disabledArr = parseDisabledArr(disabledArr);
  if (disabledArr.startEnd || disabledArr.minTime || disabledArr.maxTime) {
    data[0] = filterYear(data[0], { disabledArr, minDate, maxDate });
    const monthArr = filterMonth(data[1], value[0].value, disabledArr);
    data[1] = monthArr.length ? monthArr : data[1];
    const dayArr = filterDay(data[2], value[0].value, value[1].value, disabledArr);
    data[2] = dayArr.length ? dayArr : data[2];
  }
  return data;
}

export default {
  isLeapYear,
  addZero,
  makeRange,
  getDates,
  getDaysByYear,
  parseValue,
  isUndefined,
  isArray,
  isObject,
  formatFromProps,
  addDayOfWeek,
  numToDate,
  parseDate,
  filterTime,
  colFlags,
  Y,
  YM,
  YMD,
  YMDT,
  YMDHM,
  YMDWHM,
  filterYear,
  filterMonth,
  filterDay,
  getMonthsByYear,
  getDayByMonth,
  parseDisabledArr,
};
