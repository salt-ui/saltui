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
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    num = 31;
  }
  for (var i = 1; i <= num; i++) {
    arr.push(i);
  };
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

// 解析格式化value
function parseValue(value) {
  var date = void 0;
  var timeType = void 0;

  if ((0, _isObject2.default)(value)) {
    date = value.value ? new Date(value.value) : new Date();
    timeType = { AM: 0, PM: 1 }[value.timeType || 'AM'];
  } else {
    date = value ? new Date(parseInt(value, 10)) : new Date();
    timeType = date.getHours() >= 12 ? 1 : 0;
  }

  date = getNowIfDateInvalid(date);

  return [date.getFullYear(), date.getMonth(), date.getDate(), timeType, date.getHours() >= 13 ? date.getHours() - 12 : date.getHours(), // 12小时制
  date.getHours(), date.getMinutes(), date.getSeconds(),
  // 获取年月日组合，转换成number
  '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) - 0, '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) - 0];
};
function numToDate(num) {
  var str = '' + num;
  var Y = str.substring(0, 4);
  var M = str.substring(4, 6);
  var D = str.substring(6, 8);
  return Y + '-' + M + '-' + D;
}
// 根据日期获取一周中的一天
// sure 可以控制是否添加周"几"
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
  var arr = numToDate(currentValue).split('-');
  arr[1] = parseInt(arr[1]) - 1;
  return arr;
}

function getMinMaxDate(_ref) {
  var value = _ref.value,
      currentValue = _ref.currentValue,
      timeStyle = _ref.timeStyle;

  switch (timeStyle) {
    case 'Y':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat([currentValue, 0, 1, 0, 0, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat([currentValue, 11, 31, 23, 59, 59])))()
      };
    case 'M':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat([value[0].value, currentValue, 1, 0, 0, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat([value[0].value, currentValue + 1, 1, 0, 0, 0])))()
      };
    case 'D':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat([value[0].value, value[1].value, currentValue, 0, 0, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat([value[0].value, value[1].value, currentValue, 23, 59, 59])))()
      };
    case 'T':
      var min = currentValue === 0 ? [0, 0, 0] : [12, 0, 0];
      var max = currentValue === 0 ? [12, 0, 0] : [23, 59, 59];
      var commont = [value[0].value, value[1].value, value[2].value];
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat(commont, min)))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat(commont, max)))()
      };
    case 'YMD':
    case 'YMDW':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(currentValue)), [0, 0, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(currentValue)), [23, 59, 59])))()
      };
    case 'H':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(value[0].value)), [currentValue, 0, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(value[0].value)), [currentValue, 59, 59])))()
      };
    case 'm':
      return {
        minDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(value[0].value)), [value[1].value, currentValue, 0])))(),
        maxDate: new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(getDateArr(value[0].value)), [value[1].value, currentValue, 59])))()
      };
    default:
      return {};
  }
}

function filterTime(_ref2) {
  var data = _ref2.data,
      value = _ref2.value,
      columns = _ref2.columns,
      disabledDate = _ref2.disabledDate;

  var arr = [];
  columns.forEach(function (item, index) {
    arr[index] = data[index].filter(function (currentValue) {
      var nowDate = getMinMaxDate({ value: value, currentValue: currentValue.value, timeStyle: item });
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

function parseDate(_ref3) {
  var columns = _ref3.columns,
      value = _ref3.value;

  var firstStyle = columns[0];
  var dateStr = {
    YMD: [],
    Hm: []
  };
  columns.forEach(function (item, index) {
    if (item === "YMD" || item === "YMDW") {
      dateStr.YMD = ('' + numToDate(value[index].value)).split('-');
      return;
    };
    if (item === 'H' || item === 'm') {
      dateStr.Hm.push('' + addZero(value[index].value));
      return;
    };
    if (item === 'T') {
      dateStr.Hm = value[index].value ? ['12', '00', '00'] : ['00', '00', '00'];
      return;
    }
    dateStr.YMD.push(value[index].value);
  });
  return dateStr.YMD.join('-') + ' ' + dateStr.Hm.join(':');
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
  getMinMaxDate: getMinMaxDate,
  parseDate: parseDate,
  filterTime: filterTime,
  colFlags: colFlags,
  Y: Y,
  YM: YM,
  YMD: YMD,
  YMDT: YMDT,
  YMDHM: YMDHM,
  YMDWHM: YMDWHM
};
module.exports = exports['default'];