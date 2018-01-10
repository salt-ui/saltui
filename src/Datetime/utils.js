import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import dateFormat from './dateFormat';
import locale from './locale';
import Slot from '../Slot';

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
  if ([1, 3, 5, 8, 10, 12].indexOf(month) !== -1) {
    num = 31;
  }
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}
// 如果非正确的日期，则返回当前时间对象
function getNowIfDateInvalid(dataObj) {
  let date = dataObj;
  if (Number.isNaN(date.getTime())) {
    // invalid
    console.warn('invalid date');
    date = new Date();
  }
  return date;
}

/**
 * 解析格式化value
 * @param {*} value
 */
function parseValue(value) {
  let date;
  let timeType;
  if (isObject(value)) {
    date = value.value ? new Date(value.value) : new Date(value);
    timeType = ({ AM: 0, PM: 1 })[value.timeType || 'AM'];
  } else {
    date = !value || new Date(value) === 'Invalid Date' ? new Date() : new Date(value);
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
}
function numToDate(num) {
  const str = `${num}`;
  const YN = str.substring(0, 4);
  const M = str.substring(4, 6);
  const D = str.substring(6, 8);
  return `${YN}-${M}-${D}`;
}

/**
 * sure 可以控制是否添加周"几" 根据日期获取一周中的一天
 * @param {*} days
 * @param {*} props
 * @param {*} sure
 */
function addDayOfWeek(days, props, sure = true) {
  const daysNew = days;
  if (isArray(days)) {
    days.forEach((day) => {
      const dayNew = day;
      const date = new Date(numToDate(day.value));
      if (sure) {
        dayNew.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
      } else {
        dayNew.text = dateFormat(date, 'YYYY/MM/DD');
      }
    });
    return;
  }
  const date = new Date(numToDate(days.value));
  if (sure) {
    daysNew.text = `${dateFormat(date, 'YYYY/MM/DD')} ${locale[props.locale].week[date.getDay()]}`;
  } else {
    daysNew.text = dateFormat(date, 'YYYY/MM/DD');
  }
}

function formatFromProps(arr, props) {
  const { columns } = props;
  const displayList = [];
  for (let i = 0; i < columns.length; i += 1) {
    if (colFlags.indexOf(columns[i]) !== -1) {
      displayList.push(arr[colFlags.indexOf(columns[i])]);
    }
    if (!isArray(displayList[i]) && !isObject(displayList[i]) && (columns[i] === 'YMDW' || columns[i] === 'YMD')) {
      displayList[i] = {
        value: displayList[i],
        text: displayList[i],
      };
    }
    if (columns[i] === 'YMDW') {
      addDayOfWeek(displayList[i], props);
    }
    if (columns[i] === 'YMD') {
      addDayOfWeek(displayList[i], props, false);
    }
  }

  return displayList;
}

/**
 * 根据年 月计算 天数
 * @param { Number } year
 * @param { Number } month
 */
function getMonthDays(year, month) {
  let NUM = 30;
  if ([1, 3, 5, 8, 10, 12].indexOf(month) !== -1) {
    NUM = 31;
  }
  if (month === 2) {
    NUM = isLeapYear(year) ? 29 : 28;
  }
  return NUM;
}
/**
 * 计算时间范围类的年份
 * @param { String | Number} minDate
 * @param { String | Number } maxDate
 * @param { Number } year
 */
function getMonthsByYear({ minDate, maxDate, year }) {
  const max = new Date(maxDate);
  const min = new Date(minDate);
  const maxYear = max.getFullYear();
  const minYear = min.getFullYear();
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => ({
    text: `${addZero(index + 1)}月`,
    value: index,
  }));
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
/**
 * 根据年月 最大 最小日期计算当月天数
 * @param minDate { Number|String } 最小日期
 * @param maxDate { Number|String } 最大日期
 * @param year { Number } 当前年
 * @param month { Number } 当前月
 * */
function getDayByMonth({
  minDate, maxDate, year, month,
}) {
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
/**
 * 解析当前日期
 * @param { Array } columns  ["Y","M","D"]
 * @param { Array } value  [{value: '2018', text: '2018年'}, {value: 0,text: '01月'}]
 */
function parseDate({ columns, value }) {
  const dateStr = {
    YMD: [],
    Hm: [],
  };
  if (!value) {
    return new Date().getTime();
  }
  let DateArr = [];
  let currentValue;
  if (columns) {
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
    dateStr.YMD = dateStr.YMD.map(item => parseInt(item, 10));
    dateStr.YMD[1] = dateStr.YMD[1] ? dateStr.YMD[1] - 1 : dateStr.YMD[1];
    dateStr.Hm = dateStr.Hm.map(item => parseInt(item, 10));
    DateArr = [...dateStr.YMD, ...dateStr.Hm];
    currentValue = DateArr.length ? new Date(...DateArr) : [];
  } else {
    currentValue = new Date(value).getTime();
  }
  return currentValue || new Date().getTime();
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
  const stepNew = step || 1;
  const arr = [];
  for (let i = start; i <= end; i += stepNew) {
    arr.push(i);
  }
  return arr;
}
/**
 * 求有限时间范围内的 disabledDate时间区间
 * @param { Array } disabledArr
 * @param { String | Number } minDateTime
 * @param { String | Number } maxDateTime
 */
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
      console.warn('Datetime: Please check your disabledDate props returns');
      continue;
    }
    if (start >= minDateTime && end <= maxDateTime) { // start end 都在 取值范围内
      dateRangeArr.push(startEnd[i]);
    }
    if (start <= minDateTime && end >= minDateTime && end <= maxDateTime) { // start 不在 end 在
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
/**
 * 过滤年份
 * @param { Array } arr
 * @param { Array } disabledArr
 * @param { String } minDate
 */
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
/**
 * 过滤月份
 * @param { Array } arr
 * @param { Number } year
 * @param { Array } disabledArr
 */
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
      for (let i = monthStart + 1; i <= monthEnd; i++) {
        monthArr.push(i);
      }
    } else {
      for (let i = monthStart + 1; i < monthEnd; i++) {
        monthArr.push(i);
      }
    }
  });
  return arr.filter((item) => {
    const month = item.value;
    return monthArr.indexOf(month) === -1;
  });
}
/**
 * 过滤日
 * @param { Array } arr
 * @param { Number } year
 * @param { Number } month
 * @param { Array } disabledArr
 */
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
/**
 * 求 时间禁止区间并集
 * @param { Array } arr
 */
function parseDisabledArr(arr) {
  let min;
  let max;
  const arrNew = arr.map((item) => {
    const { start, end } = item;
    if (!start && !end) {
      const dateTime = new Date(item).getTime();
      if (dateTime) {
        return {
          start: dateTime,
          end: dateTime,
        };
      }
      return false;
    }
    return {
      start: new Date(start).getTime(),
      end: new Date(end).getTime(),
    };
  });
  let newArr = arr.filter(item => !!item);
  // 求时间并集并求出 最大值和最小值
  newArr = newArr.filter((item) => {
    const { start, end } = item;
    if (start && !end) { // 求max
      if (!max) {
        max = start;
      } else {
        max = max > start ? start : max;
      }
      return false;
    }
    if (!start && end) {
      if (!min) {
        min = end;
      } else {
        min = min < end ? end : min;
      }
      return false;
    }
    if (end && start) {
      if (start > end) {
        console.warn('Datetime: Please check your disabledDate props returns');
        return false;
      }
      if (min && min >= start) {
        min = min < end ? end : min;
        return false;
      }
      if (max && max <= end) {
        max = max > start ? start : max;
        return false;
      }
      return true;
    }
    return true;
  });
  let startEnd = [];
  // 时间排序
  startEnd = newArr.sort((a, b) => a.start - b.start);
  return {
    maxTime: max,
    minTime: min,
    startEnd,
  };
}
/**
 * 初始化过滤
 * @param { Array } data
 * @param { Array } value
 * @param { fun } disabledDate
 * @param { String|NUmber } minDate
 * @param { String|NUmber } maxDate
 */
function filterDate({
  data,
  value,
  disabledArr,
  minDate,
  maxDate,
  oldData,
}) {
  const oldDataN = oldData || {};
  const disabledArrN = parseDisabledArr(disabledArr);
  const year = value[0].value;
  const month = value[1].value;
  let yearData = data[0];
  let monthData = getMonthsByYear({ year, minDate, maxDate });
  let dayData = getDayByMonth({
    year, month, minDate, maxDate,
  });
  if (disabledArr.startEnd || disabledArr.minTime || disabledArr.maxTime) {
    if (oldDataN.yearData) {
      ({ yearData } = oldDataN);
    } else {
      yearData = filterYear(yearData, { disabledArr, minDate, maxDate });
    }
    if (oldDataN.monthData) {
      ({ monthData } = oldDataN);
    } else {
      const monthArr = filterMonth(monthData, year, disabledArr);
      monthData = monthArr.length ? monthArr : monthData;
    }
    const dayArr = filterDay(dayData, year, month, disabledArr);
    dayData = dayArr.length ? dayArr : dayData;
  }
  if (disabledArr.minTime >= disabledArr.maxTime) {
    console.warn('Datetime: Please check your disabledDate props');
    return [];
  }
  if (!yearData.length) {
    return [];
  }
  const outArr = [yearData, monthData, dayData];
  if (data[3]) {
    outArr.push(data[3]);
  }
  return outArr;
}
/**
 * 添加年月日等文本
 * @param { array } arr
 * @param {string } text
 * @param { object } props
 */
function formatText(arr, text, props) {
  const formatArray = [];
  const localeCode = props.locale;
  for (let i = 0; i < arr.length; i += 1) {
    const el = arr[i];
    formatArray.push(isArray(el) ?
      formatText(el, locale[localeCode].surfix[colFlags[i]], props) :
      {
        text: addZero(el.text) +
              (isUndefined(text) ? locale[localeCode].surfix[colFlags[i]] : text),
        value: el.value,
      });
  }
  return formatArray;
}

function getOptions({ value }, props) {
  let { minDate, maxDate } = props;
  const { minuteStep } = props;
  minDate = parseDate({ value: minDate });
  maxDate = parseDate({ value: maxDate });
  if (maxDate <= minDate) {
    console.error(' Datetime： props maxDate must be greater than minDate ');
    return [];
  }
  minDate = new Date(minDate);
  maxDate = new Date(maxDate);
  const currentValue = parseValue(value);
  const datYear = getDaysByYear(currentValue[0]);
  const options = [
    makeRange(minDate.getFullYear(), maxDate.getFullYear()),
    makeRange(1, 12).map(v => ({ text: `${v}`, value: v - 1 })),
    getDates(value),
    locale[props.locale].noon,
    makeRange(0, 12),
    makeRange(0, 23),
    makeRange(0, 59, minuteStep),
    makeRange(0, 59),
    datYear,
    datYear,
  ];
  const ret = Slot.formatDataValue([].concat(options), [].concat(currentValue));
  const data = formatFromProps(formatText(ret.data, undefined, props), props);
  const newValue = formatFromProps(formatText(ret.value, undefined, props), props);
  return {
    data,
    value: newValue,
  };
}

function getSlotFormattedValue(currentValue, props) {
  // 使用当前时间或传入时间作为默认值
  const currentValueN = parseValue(currentValue);
  // 形成候选项
  const { data, value } = getOptions({ value: currentValueN }, props);
  // 数据格式化
  const ret = Slot.formatDataValue([].concat(data), [].concat(value));
  return ret.value || [];
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
  filterDate,
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
  getSlotFormattedValue,
  getOptions,
  Slot,
  locale,
};
