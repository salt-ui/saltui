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

function getMinMaxDate({value, currentValue, timeStyle}) {
  switch(timeStyle) {
    case 'Y':
      return {
        minDate: new Date(...[currentValue, 0, 1, 0, 0, 0]),
        maxDate: new Date(...[currentValue, 11, 31, 23, 59, 59]),
      };
    case 'M':
      return {
        minDate: new Date(...[value[0].value, currentValue, 1, 0, 0, 0]),
        maxDate: new Date(...[value[0].value, currentValue + 1, 1, 0, 0, 0]),
      };
    case 'D':
      return {
        minDate: new Date(...[value[0].value, value[1].value, currentValue, 0, 0, 0]),
        maxDate: new Date(...[value[0].value, value[1].value, currentValue, 23, 59, 59]),
      };
    case 'T':
      const min = currentValue === 0 ? [ 0, 0, 0] : [12,0,0];
      const max = currentValue === 0 ? [12, 0, 0] : [23,59,59];
      const commont = [value[0].value, value[1].value, value[2].value];
      return {
        minDate: new Date(...commont, ...min),
        maxDate: new Date(...commont, ...max),
      };
    case 'YMD':
    case 'YMDW':
      return {
        minDate: new Date( ...getDateArr(currentValue), ...[0, 0, 0]),
        maxDate: new Date( ...getDateArr(currentValue), ...[23, 59, 59]),
      };
    case 'H':
      return {
        minDate: new Date(...getDateArr(value[0].value), ...[currentValue, 0, 0]),
        maxDate: new Date(...getDateArr(value[0].value), ...[currentValue, 59, 59]),
      };
    case 'm':
      return {
        minDate: new Date(...getDateArr(value[0].value), ...[value[1].value, currentValue, 0]),
        maxDate: new Date(...getDateArr(value[0].value), ...[value[1].value, currentValue, 59]),
      };
    default:
      return {};
  }
}

function filterTime({ data, value, columns, disabledDate }) {
  if (!value || !data.length) {
    return;
  }
  const arr = [];
  columns.forEach((item, index) => {
    arr[index] = data[index].filter((currentValue) => {
      const nowDate = getMinMaxDate({ value, currentValue: currentValue.value, timeStyle: item });
      if (!(!disabledDate(nowDate.minDate) && !disabledDate(nowDate.maxDate))) {
        return true;
      };
      return false;
    });
    if (!arr[index].length) {
      arr[index] = data[index];
    }
  });
  return arr;
};

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
  getMinMaxDate,
  parseDate,
  filterTime,
  colFlags,
  Y,
  YM,
  YMD,
  YMDT,
  YMDHM,
  YMDWHM,
};
