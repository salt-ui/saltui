'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _dateFormat = require('./dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var colFlags = ['Y', 'M', 'D', 'T', 'h', 'H', 'm', 's', 'YMD', 'YMDW'];

var Y = ['Y'];
var YM = ['Y', 'M'];
var YMD = ['Y', 'M', 'D'];
var YMDT = ['Y', 'M', 'D', 'T'];
var YMDHM = ['YMD', 'H', 'm'];
var YMDWHM = ['YMDW', 'H', 'm'];
function addZero(num) {
  return '' + (num < 10 ? '0' : '') + num;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function getDates(value) {
  var date = new Date(value);
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var arr = [];
  var num = 30;
  if (month === 2) {
    num = 28;
    if (isLeapYear(year)) {
      num = 29;
    }
  }
  if ([1, 3, 5, 8, 10, 12].indexOf(month) !== -1) {
    num = 31;
  }
  for (var i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}
// 如果非正确的日期，则返回当前时间对象
function getNowIfDateInvalid(dataObj) {
  var date = dataObj;
  if (isNaN(date.getTime())) {
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
  var date = void 0;
  var timeType = void 0;
  if ((0, _isObject2.default)(value)) {
    date = value.value ? new Date(value.value) : new Date(value);
    timeType = { AM: 0, PM: 1 }[value.timeType || 'AM'];
  } else {
    date = !value || new Date(value) === 'Invalid Date' ? new Date() : new Date(value);
    timeType = date.getHours() >= 12 ? 1 : 0;
  }
  date = getNowIfDateInvalid(date);
  return [date.getFullYear(), date.getMonth(), date.getDate(), timeType, date.getHours() >= 13 ? date.getHours() - 12 : date.getHours(), // 12小时制
  date.getHours(), date.getMinutes(), date.getSeconds(),
  // 获取年月日组合，转换成number
  '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) - 0, '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) - 0];
}
function numToDate(num) {
  var str = '' + num;
  var Y = str.substring(0, 4);
  var M = str.substring(4, 6);
  var D = str.substring(6, 8);
  return Y + '-' + M + '-' + D;
}

/**
 * sure 可以控制是否添加周"几" 根据日期获取一周中的一天
 * @param {*} days
 * @param {*} props
 * @param {*} sure
 */
function addDayOfWeek(days, props) {
  var sure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if ((0, _isArray2.default)(days)) {
    days.forEach(function (day) {
      var date = new Date(numToDate(day.value));
      if (sure) {
        day.text = (0, _dateFormat2.default)(date, 'YYYY/MM/DD') + ' ' + _locale2.default[props.locale].week[date.getDay()];
      } else {
        day.text = (0, _dateFormat2.default)(date, 'YYYY/MM/DD');
      }
    });
    return;
  }
  var date = new Date(numToDate(days.value));
  if (sure) {
    days.text = (0, _dateFormat2.default)(date, 'YYYY/MM/DD') + ' ' + _locale2.default[props.locale].week[date.getDay()];
  } else {
    days.text = (0, _dateFormat2.default)(date, 'YYYY/MM/DD');
  }
}

function formatFromProps(arr, props) {
  var columns = props.columns;

  var displayList = [];
  for (var i = 0; i < columns.length; i += 1) {
    if (colFlags.indexOf(columns[i]) !== -1) {
      displayList.push(arr[colFlags.indexOf(columns[i])]);
    }
    if (!(0, _isArray2.default)(displayList[i]) && !(0, _isObject2.default)(displayList[i]) && (columns[i] === 'YMDW' || columns[i] === 'YMD')) {
      displayList[i] = {
        value: displayList[i],
        text: displayList[i]
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
  var NUM = 30;
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
function getMonthsByYear(_ref) {
  var minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      year = _ref.year;

  var max = new Date(maxDate);
  var min = new Date(minDate);
  var maxYear = max.getFullYear();
  var minYear = min.getFullYear();
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (item, index) {
    return {
      text: addZero(index + 1) + '\u6708',
      value: index
    };
  });
  if (year > minYear && year < maxYear) {
    return arr;
  }
  var maxTime = max.getTime();
  var minTime = min.getTime();
  if (year === maxYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, item.value, 1);
      return date.getTime() < maxTime;
    });
  }
  if (year === minYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, item.value, 1);
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
function getDayByMonth(_ref2) {
  var minDate = _ref2.minDate,
      maxDate = _ref2.maxDate,
      year = _ref2.year,
      month = _ref2.month;

  var max = new Date(maxDate);
  var min = new Date(minDate);
  var maxYear = max.getFullYear();
  var minYear = min.getFullYear();
  var NUM = getMonthDays(year, month + 1);
  var arr = [];
  for (var i = 1; i <= NUM; i++) {
    arr.push({
      text: addZero(i) + '\u65E5',
      value: i
    });
  }
  if (year > minYear && year < maxYear) {
    return arr;
  }
  var maxTime = max.getTime();
  var minTime = min.getTime();
  if (year === minYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, month, item.value);
      return date.getTime() > minTime;
    });
  }
  if (year === maxYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, month, item.value);
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
function parseDate(_ref3) {
  var columns = _ref3.columns,
      value = _ref3.value;

  var dateStr = {
    YMD: [],
    Hm: []
  };
  if (!value) {
    return new Date().getTime();
  }
  var DateArr = [];
  var currentValue = void 0;
  if (columns) {
    columns.forEach(function (item, index) {
      if (item === 'YMD' || item === 'YMDW') {
        dateStr.YMD = ('' + numToDate(value[index].value)).split('-');
        return;
      }
      if (item === 'H' || item === 'm') {
        dateStr.Hm.push('' + addZero(value[index].value));
        return;
      }
      if (item === 'T') {
        dateStr.Hm = value[index].value ? ['12', '00', '00'] : ['00', '00', '00'];
        return;
      }
      dateStr.YMD.push(value[index].value);
    });
    dateStr.YMD = dateStr.YMD.map(function (item) {
      return parseInt(item);
    });
    dateStr.YMD[1] = dateStr.YMD[1] ? dateStr.YMD[1] - 1 : dateStr.YMD[1];
    dateStr.Hm = dateStr.Hm.map(function (item) {
      return parseInt(item);
    });
    DateArr = [].concat(_toConsumableArray(dateStr.YMD), _toConsumableArray(dateStr.Hm));
    currentValue = DateArr.length ? new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(DateArr))))() : [];
  } else {
    currentValue = new Date(value).getTime();
  }
  return currentValue || new Date().getTime();
}
function getDaysByYear(item) {
  var days = [];
  var arr = [item - 1, item, item + 1];
  arr.forEach(function (year) {
    var _loop = function _loop(i) {
      getDates(year + '-' + i).forEach(function (el) {
        days.push('' + year + addZero(i) + addZero(el) - 0);
      });
    };

    for (var i = 1; i < 13; i += 1) {
      _loop(i);
    }
  });
  return days;
}
function makeRange(start, end, step) {
  step = step || 1;
  var arr = [];
  for (var i = start; i <= end; i += step) {
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
function getDateRangeArr(_ref4) {
  var disabledArr = _ref4.disabledArr,
      minDateTime = _ref4.minDateTime,
      maxDateTime = _ref4.maxDateTime;
  var minTime = disabledArr.minTime,
      maxTime = disabledArr.maxTime,
      startEnd = disabledArr.startEnd;

  var dateRangeArr = [];
  // 计算时间区间
  if (minTime) {
    // 计算小于区间
    if (minDateTime <= minTime) {
      dateRangeArr.push({
        start: minDateTime,
        end: minTime
      });
    }
  }
  /* eslint no-continue:0 */
  for (var i = 0; i < startEnd.length; i++) {
    // 计算中间区间
    var _startEnd$i = startEnd[i],
        start = _startEnd$i.start,
        end = _startEnd$i.end;

    if (end < start) {
      console.warn('Datetime: Please check your disabledDate props returns');
      continue;
    }
    if (start >= minDateTime && end <= maxDateTime) {
      // start end 都在 取值范围内
      dateRangeArr.push(startEnd[i]);
    }
    if (start <= minDateTime && end >= minDateTime && end <= maxDateTime) {
      // start 不在 end 在
      dateRangeArr.push({
        start: minDateTime,
        end: end
      });
      continue;
    }
    if (start >= minDateTime && start <= maxDateTime && end >= maxDateTime) {
      // end 不在 start 在
      dateRangeArr.push({
        start: start,
        end: maxDateTime
      });
      continue;
    }
    if (start <= minDateTime && end >= maxDateTime) {
      // end 不在 start 不在
      dateRangeArr.push({
        start: minDateTime,
        end: maxDateTime
      });
      continue;
    }
  }
  // 计算中间时间区间
  if (maxTime) {
    if (maxDateTime > maxTime) {
      dateRangeArr.push({
        start: maxTime,
        end: maxDateTime
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
function filterYear(arr, _ref5) {
  var disabledArr = _ref5.disabledArr,
      minDate = _ref5.minDate,
      maxDate = _ref5.maxDate;

  var minDateTime = new Date(minDate).getTime();
  var maxDateTime = new Date(maxDate).getTime();
  var yearRangeArr = getDateRangeArr({ disabledArr: disabledArr, minDateTime: minDateTime, maxDateTime: maxDateTime });
  var yearArr = [];
  yearRangeArr.forEach(function (item) {
    var start = item.start,
        end = item.end;

    start = new Date(start);
    end = new Date(end);
    var yearStart = start.getFullYear();
    var monthStart = start.getMonth();
    var dayStart = start.getDate();
    var yearEnd = end.getFullYear();
    var monthEnd = end.getMonth();
    var dayEnd = new Date(end.getTime() + 86400000).getDate();
    if (monthStart === 0 && dayStart === 1) {
      // 判断临界时 是否去掉整年
      if (monthEnd === 11 && dayEnd === 1) {
        for (var i = yearStart; i <= yearEnd; i++) {
          yearArr.push(i);
        }
      } else {
        for (var _i = yearStart; _i < yearEnd; _i++) {
          yearArr.push(_i);
        }
      }
    }
    if (monthEnd === 11 && dayEnd === 1) {
      for (var _i2 = yearStart + 1; _i2 <= yearEnd; _i2++) {
        yearArr.push(_i2);
      }
    } else {
      for (var _i3 = yearStart + 1; _i3 < yearEnd; _i3++) {
        yearArr.push(_i3);
      }
    }
  });
  return arr.filter(function (item) {
    var year = item.value;
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
  var minDateTime = new Date(year, 0, 1).getTime();
  var maxDateTime = new Date(year, 11, 31).getTime();
  var monthRangeArr = getDateRangeArr({ disabledArr: disabledArr, minDateTime: minDateTime, maxDateTime: maxDateTime });
  var monthArr = [];
  monthRangeArr.forEach(function (item) {
    var start = item.start,
        end = item.end;

    start = new Date(start);
    end = new Date(end);

    var monthStart = start.getMonth();
    var monthEnd = end.getMonth();
    var dayStart = start.getDate();
    var dayEnd = new Date(end.getTime() + 86400000).getDate();
    if (dayStart === 1) {
      if (dayEnd === 1) {
        for (var i = monthStart; i <= monthEnd; i++) {
          monthArr.push(i);
        }
      } else {
        for (var _i4 = monthStart; _i4 < monthEnd; _i4++) {
          monthArr.push(_i4);
        }
      }
    }
    if (dayEnd === 1) {
      for (var _i5 = monthStart + 1; _i5 <= monthEnd; _i5++) {
        monthArr.push(_i5);
      }
    } else {
      for (var _i6 = monthStart + 1; _i6 < monthEnd; _i6++) {
        monthArr.push(_i6);
      }
    }
  });
  return arr.filter(function (item) {
    var month = item.value;
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
  var minDateTime = new Date(year, month, 1).getTime();
  var maxDateTime = new Date(year, month + 1, 0).getTime();
  var dayRangeArr = getDateRangeArr({ disabledArr: disabledArr, minDateTime: minDateTime, maxDateTime: maxDateTime });
  var dayArr = [];
  dayRangeArr.forEach(function (item) {
    var start = item.start,
        end = item.end;

    start = new Date(start).getDate();
    end = new Date(end).getDate();
    for (var i = start; i <= end; i++) {
      dayArr.push(i);
    }
  });
  return arr.filter(function (item) {
    var day = item.value;
    return dayArr.indexOf(day) === -1;
  });
}
/**
 * 求 时间禁止区间并集
 * @param { Array } arr
 */
function parseDisabledArr(arr) {
  var min = void 0;
  var max = void 0;
  arr = arr.map(function (item) {
    var start = item.start,
        end = item.end;

    if (!start && !end) {
      var dateTime = new Date(item).getTime();
      if (dateTime) {
        return {
          start: dateTime,
          end: dateTime
        };
      }
      return false;
    }
    return {
      start: new Date(start).getTime(),
      end: new Date(end).getTime()
    };
  });
  var newArr = arr.filter(function (item) {
    return !!item;
  });
  // 求时间并集并求出 最大值和最小值
  newArr = newArr.filter(function (item) {
    var start = item.start,
        end = item.end;

    if (start && !end) {
      // 求max
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
  var startEnd = [];
  // 时间排序
  startEnd = newArr.sort(function (a, b) {
    return a.start - b.start;
  });
  return {
    maxTime: max,
    minTime: min,
    startEnd: startEnd
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
function filterDate(_ref6) {
  var data = _ref6.data,
      value = _ref6.value,
      disabledArr = _ref6.disabledArr,
      minDate = _ref6.minDate,
      maxDate = _ref6.maxDate,
      oldData = _ref6.oldData;

  oldData = oldData || {};
  disabledArr = parseDisabledArr(disabledArr);
  var year = value[0].value;
  var month = value[1].value;
  var yearData = data[0];
  var monthData = getMonthsByYear({ year: year, minDate: minDate, maxDate: maxDate });
  var dayData = getDayByMonth({
    year: year, month: month, minDate: minDate, maxDate: maxDate
  });
  if (disabledArr.startEnd || disabledArr.minTime || disabledArr.maxTime) {
    if (oldData.yearData) {
      yearData = oldData.yearData;
    } else {
      yearData = filterYear(yearData, { disabledArr: disabledArr, minDate: minDate, maxDate: maxDate });
    }
    if (oldData.monthData) {
      monthData = oldData.monthData;
    } else {
      var monthArr = filterMonth(monthData, year, disabledArr);
      monthData = monthArr.length ? monthArr : monthData;
    }
    var dayArr = filterDay(dayData, year, month, disabledArr);
    dayData = dayArr.length ? dayArr : dayData;
  }
  if (disabledArr.minTime >= disabledArr.maxTime) {
    console.warn('Datetime: Please check your disabledDate props');
    return [];
  }
  if (!yearData.length) {
    return [];
  }
  var outArr = [yearData, monthData, dayData];
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
  var formatArray = [];
  var localeCode = props.locale;
  for (var i = 0; i < arr.length; i += 1) {
    var el = arr[i];
    formatArray.push((0, _isArray2.default)(el) ? formatText(el, _locale2.default[localeCode].surfix[colFlags[i]], props) : {
      text: addZero(el.text) + ((0, _isUndefined2.default)(text) ? _locale2.default[localeCode].surfix[colFlags[i]] : text),
      value: el.value
    });
  }
  return formatArray;
}

function getOptions(_ref7, props) {
  var value = _ref7.value;
  var minDate = props.minDate,
      maxDate = props.maxDate;
  var minuteStep = props.minuteStep;

  minDate = parseDate({ value: minDate });
  maxDate = parseDate({ value: maxDate });
  if (maxDate <= minDate) {
    console.error(' Datetime： props maxDate must be greater than minDate ');
    return [];
  }
  minDate = new Date(minDate);
  maxDate = new Date(maxDate);
  var currentValue = parseValue(value);
  var datYear = getDaysByYear(currentValue[0]);
  var options = [makeRange(minDate.getFullYear(), maxDate.getFullYear()), makeRange(1, 12).map(function (v) {
    return { text: '' + v, value: v - 1 };
  }), getDates(value), _locale2.default[props.locale].noon, makeRange(0, 12), makeRange(0, 23), makeRange(0, 59, minuteStep), makeRange(0, 59), datYear, datYear];
  var ret = _Slot2.default.formatDataValue([].concat(options), [].concat(currentValue));
  var data = formatFromProps(formatText(ret.data, undefined, props), props);
  var newValue = formatFromProps(formatText(ret.value, undefined, props), props);
  return {
    data: data,
    value: newValue
  };
}

function getSlotFormattedValue(currentValue, props) {
  // 使用当前时间或传入时间作为默认值
  // 形成候选项
  if (!currentValue) {
    return [];
  }
  if ((0, _isObject2.default)(currentValue)) {
    if (!new Date(currentValue.value).getTime()) {
      return [];
    }
  } else if (!new Date(currentValue).getTime()) {
    return [];
  }

  var _getOptions = getOptions({ value: currentValue }, props),
      data = _getOptions.data,
      value = _getOptions.value;
  // 数据格式化


  var ret = _Slot2.default.formatDataValue([].concat(data), [].concat(value));
  return ret.value;
}

exports.default = {
  isLeapYear: isLeapYear,
  addZero: addZero,
  makeRange: makeRange,
  getDates: getDates,
  getDaysByYear: getDaysByYear,
  parseValue: parseValue,
  isUndefined: _isUndefined2.default,
  isArray: _isArray2.default,
  isObject: _isObject2.default,
  formatFromProps: formatFromProps,
  addDayOfWeek: addDayOfWeek,
  numToDate: numToDate,
  parseDate: parseDate,
  filterDate: filterDate,
  colFlags: colFlags,
  Y: Y,
  YM: YM,
  YMD: YMD,
  YMDT: YMDT,
  YMDHM: YMDHM,
  YMDWHM: YMDWHM,
  filterYear: filterYear,
  filterMonth: filterMonth,
  filterDay: filterDay,
  getMonthsByYear: getMonthsByYear,
  getDayByMonth: getDayByMonth,
  parseDisabledArr: parseDisabledArr,
  getSlotFormattedValue: getSlotFormattedValue,
  getOptions: getOptions,
  Slot: _Slot2.default,
  locale: _locale2.default
};
module.exports = exports['default'];