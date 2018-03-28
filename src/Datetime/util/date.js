
import {
  parseDate,
  addZero,
  cloneDeep,
  isArray,
  numToDate,
  makeRange,
  isUndefined,
  getDaysByYear,
  getDaysByMonth,
  getMonthsByYear,
} from './base';
import locale from './locale';
import dateFormat from './dateFormat';
import Slot from '../../Slot';

const { warn, error } = console;
const colFlags = ['Y', 'M', 'D', 'T', 'h', 'H', 'm', 's', 'YMD', 'YMDW'];

/**
 * 解析参数值
 * @param { object | string | date | string | number  } value
 * @example {value: 1545484545454} [2018,2,1] 1212154545454, ***
 * @returns array
 */
function parseValue(value) {
  const date = new Date(parseDate(value));
  let timeType;
  if (value && value.timeType) {
    timeType = ({ AM: 0, PM: 1 })[value.timeType || 'AM'];
  } else {
    timeType = date.getHours() >= 12 ? 1 : 0;
  }
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

/**
 * sure 可以控制是否添加周"几" 根据日期获取一周中的一天，默认是 true
 * @param {*} days
 * @param {*} props
 * @param {*} sure
 */

function addDayOfWeek(days, props, sure = true) {
  const daysNew = cloneDeep(days);
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

/**
 * 根据 props columns 计算 slot list
 * @param {*} arr
 * @param {*} props
 */
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

/**
 * 求时间区间的并集
 * @param { array } arr
 */
function parseDisabledArr(arr) {
  let min;
  let max;
  let arrNew = cloneDeep(arr);
  arrNew = arrNew.map((item) => {
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
  let newArr = arrNew.filter(item => !!item);
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
        warn('Datetime: Please check your disabledDate props returns');
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
 * 求有限时间范围内的 disabledDate时间区间
 * @param { object } disabledArr
 * @param { string | number } minDateTime
 * @param { string | number } maxDateTime
 */

function getDateRangeArr(disabledDateObj, minDateTime, maxDateTime) {
  const {
    minTime,
    maxTime,
    startEnd,
  } = disabledDateObj;
  // 时间范围
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
      warn('Datetime: Please check your disabledDate props returns');
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
  // 计算大于时间区间的范围
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
 * 获取 options
 * @param {*} value
 * @param {*} props
 */
function getOptions(value, props) {
  let { minDate, maxDate } = props;
  const { minuteStep } = props;
  minDate = parseDate(minDate);
  maxDate = parseDate(maxDate);
  if (maxDate <= minDate) {
    error(' Datetime： props maxDate must be greater than minDate ');
    return [];
  }
  minDate = new Date(minDate);
  maxDate = new Date(maxDate);
  const currentValue = new Date(parseDate(value));
  const dayYear = getDaysByYear({ year: currentValue.getFullYear(), minDate, maxDate });
  const options = [
    makeRange(minDate.getFullYear(), maxDate.getFullYear()),
    // makeRange(1, 12).map(v => ({ text: `${v}`, value: v - 1 })),
    getMonthsByYear({ year: currentValue.getFullYear(), minDate, maxDate }),
    getDaysByMonth({
      minDate, maxDate, year: currentValue.getFullYear(), month: currentValue.getMonth(),
    }),
    locale[props.locale].noon,
    makeRange(0, 12),
    makeRange(0, 23),
    makeRange(0, 59, minuteStep),
    makeRange(0, 59),
    dayYear,
    dayYear,
  ];
  return options;
}

/**
 * 过滤年份
 * @param { Array } arr
 * @param { object } disabledDateObj
 * @param { String } minDate
 */

function filterYear(arr, { disabledDateObj, minDate, maxDate }) {
  const minDateTime = new Date(minDate).getTime();
  const maxDateTime = new Date(maxDate).getTime();
  const yearRangeArr = getDateRangeArr(disabledDateObj, minDateTime, maxDateTime);
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
 * @param { object } disabledDateObj
 */

function filterMonth(arr, year, disabledDateObj) {
  const minDateTime = new Date(year, 0, 1).getTime();
  const maxDateTime = new Date(year, 11, 31).getTime();
  const monthRangeArr = getDateRangeArr(disabledDateObj, minDateTime, maxDateTime);
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
 * @param { object } disabledDateObj
 */
function filterDay(arr, year, month, disabledDateObj) {
  const minDateTime = new Date(year, month, 1).getTime();
  const maxDateTime = new Date(year, month + 1, 0).getTime();
  const dayRangeArr = getDateRangeArr(disabledDateObj, minDateTime, maxDateTime);
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
 * 初始化过滤
 * @param { Array } data
 * @param { Array } value
 * @param { fun } disabledDate
 * @param { String|NUmber } minDate
 * @param { String|NUmber } maxDate
 * @param { array } disabledArr
 */

function filterDate({
  data,
  value,
  disabledArr,
  minDate,
  maxDate,
  oldData = {},
  props,
}) {
  const disabledArrNew = parseDisabledArr(disabledArr);
  const year = value[0].value;
  const month = value[1].value;
  let yearData = data[0];
  let monthData = getMonthsByYear({ year, minDate, maxDate });
  monthData = monthData.map(item => ({
    value: item.value,
    text: `${addZero(item.text)}${locale[props.locale].surfix.M}`,
  }));
  let dayData = getDaysByMonth({
    year, month, minDate, maxDate,
  });
  if (disabledArrNew.startEnd || disabledArrNew.minTime || disabledArrNew.maxTime) {
    if (oldData.yearData) {
      ({ yearData } = oldData);
    } else {
      yearData = filterYear(yearData, { disabledDateObj: disabledArrNew, minDate, maxDate });
    }
    if (oldData.monthData) {
      ({ monthData } = oldData);
    } else {
      const monthArr = filterMonth(monthData, year, disabledArrNew);
      monthData = monthArr.length ? monthArr : monthData;
    }
    const dayArr = filterDay(dayData, year, month, disabledArrNew);
    dayData = dayArr.length ? dayArr : dayData;
    const unit = locale[props.locale].surfix.D;
    dayData = dayData.map((item) => {
      item.text = addZero(item.text) + (unit || '');
      return item;
    });
  }
  if (disabledArrNew.minTime >= disabledArrNew.maxTime) {
    warn('Datetime: Please check your disabledDate props');
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
function getSlotFormattedValue(value, props) {
  // 使用当前时间或传入时间作为默认值
  // 形成候选项
  const currentValueNew = parseValue(value);
  const options = getOptions(value, props);
  // 数据格式化
  const ret = Slot.formatDataValue([].concat(options), [].concat(currentValueNew));
  return formatFromProps(ret.value, props);
}
module.exports = {
  parseValue,
  addDayOfWeek,
  formatFromProps,
  formatText,
  getOptions,
  Slot,
  locale,
  filterDate,
  getSlotFormattedValue,
};

