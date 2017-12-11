'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

var _dateFormat = require('./dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Datetime Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author caoke.ck & shumi.lg
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @modify quanyun.mqy 于 2017.9.8 从tingle-datetime-field中分拆出来
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var colFlags = ['Y', 'M', 'D', 'T', 'h', 'H', 'm', 's', 'YMD', 'YMDW'];

var Y = ['Y'];
var YM = ['Y', 'M'];
var YMD = ['Y', 'M', 'D'];
var YMDT = ['Y', 'M', 'D', 'T'];
var YMDHM = ['YMD', 'H', 'm'];
var YMDWHM = ['YMDW', 'H', 'm'];

var columnsFlexMap = {
  YMD: [1.24, 1.1, 1.1],
  YMDT: [0.98, 0.83, 0.83, 0.79],
  YMDHm: [1.64, 0.89, 0.89],
  YMDWHm: [1.64, 0.89, 0.89]
};

// 是否是闰年
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

// 左边补零
function addZero(num) {
  return '' + (num < 10 ? '0' : '') + num;
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

function makeRange(start, end) {
  var arr = [];

  for (var i = start; i <= end; i += 1) {
    arr.push(i);
  }

  return arr;
}

// 获取某个月份的日期选项
function getDates(year, month) {
  var dates = [];

  switch ('1 1010110101'.split('')[month]) {
    case '1':
      // 大月
      dates = makeRange(1, 31);
      break;
    case '0':
      // 小月
      dates = makeRange(1, 30);
      break;
    case ' ':
      // 闰年 2 月 和 平年 2 月
      dates = isLeapYear(year) ? makeRange(1, 29) : makeRange(1, 28);
      break;
    default:
      break;
  }

  return dates;
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
}

// 通过年份获取一整年天数
function getDaysByYear(year) {
  var days = [];

  var _loop = function _loop(i) {
    getDates(year, i - 1).forEach(function (el) {
      days.push('' + year + addZero(i) + addZero(el) - 0);
    });
  };

  for (var i = 0; i < 13; i += 1) {
    _loop(i);
  }
  return days;
}

function genOptions(value, props) {
  var initValue = props.value;
  var date = null;

  if ((0, _isObject2.default)(initValue)) {
    date = new Date(initValue.value);
  } else {
    date = initValue ? new Date(parseInt(initValue, 10)) : new Date();
  }

  date = getNowIfDateInvalid(date);

  var year = date.getFullYear();
  var options = [makeRange(year - 100, year + 100), makeRange(1, 12).map(function (v) {
    return { text: '' + v, value: v - 1 };
  }), getDates(value[0], value[1]), _locale2.default[props.locale].noon, makeRange(0, 12), makeRange(0, 23), makeRange(0, 59), makeRange(0, 59), getDaysByYear(value[0]), getDaysByYear(value[0])];

  return options;
}

function numToDate(num) {
  var str = '' + num;
  var Y = str.substring(0, 4);
  var M = str.substring(4, 6);
  var D = str.substring(6);
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

// 根据props定制渲染
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
}

/**
 * 使用 slot 的内置方法对数据进行格式化，返回一个 slot 格式的数据结构
 * @param value: 对象或时间戳
 * @param props: props对象
 * @returns {Array}:
 * [
 *  {text: 2017, value: 2017},
 *  {text: '7', value: 6},
 *  {text: 20, value: 20},
 * ]
 */
function getSlotFormattedValue(value, props) {
  // 使用当前时间或传入时间作为默认值
  var currentValue = parseValue(value);
  // 形成候选项
  var options = genOptions(currentValue, props);
  // 数据格式化
  var ret = _Slot2.default.formatDataValue([].concat(options), [].concat(currentValue));

  return value ? formatFromProps(ret.value, props) : [];
}

var Datetime = function (_React$Component) {
  _inherits(Datetime, _React$Component);

  function Datetime(props) {
    _classCallCheck(this, Datetime);

    // 如果二者同时存在，是提示出错
    var _this = _possibleConstructorReturn(this, (Datetime.__proto__ || Object.getPrototypeOf(Datetime)).call(this, props));

    if (props.columns.indexOf('T') !== -1 && props.columns.indexOf('H') !== -1) {
      throw new Error('Please refer to tingle-document.');
    }

    // 使用当前时间或传入时间作为默认值
    var currentValue = parseValue(props.value);
    // 形成候选项
    _this.options = genOptions(currentValue, props);
    // 数据格式化
    var ret = _Slot2.default.formatDataValue([].concat(_this.options), [].concat(currentValue));

    _this.state = {
      /* eslint-disable react/no-unused-state */
      data: formatFromProps(_this.formatText(ret.data), props),
      value: formatFromProps(_this.formatText(ret.value), props)
      /* eslint-enable react/no-unused-state */
      // confirmedValue: props.value ? formatFromProps(ret.value, props) : [],
    };

    _this.slotChanged = false;
    return _this;
  }

  // 外部变更选中值


  _createClass(Datetime, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var value = nextProps.value;


      if (value) {
        t.setValue(parseValue(nextProps.value), true, nextProps);
      }
      /* else {
       t.setState({
       confirmedValue: [],
       });
       } */
    }

    // value to time stamp

  }, {
    key: 'getPlainDate',
    value: function getPlainDate(value) {
      var date = new Date();
      var columns = this.props.columns;

      var timeType = 0;

      for (var i = 0; i < columns.length; i += 1) {
        if (columns[i] === 'Y') {
          date.setFullYear(value[i].value);
        } else if (columns[i] === 'M') {
          date.setMonth(value[i].value);
        } else if (columns[i] === 'D') {
          date.setDate(value[i].value);
        } else if (columns[i] === 'H') {
          date.setHours(value[i].value);
        } else if (columns[i] === 'm') {
          date.setMinutes(value[i].value);
        } else if (columns[i] === 's') {
          date.setSeconds(value[i].value);
        } else if (columns[i] === 'T') {
          timeType = value[i].value;
        } else if (columns[i] === 'YMD' || columns[i] === 'YMDW') {
          date.setFullYear(('' + value[i].value).substring(0, 4));
          date.setMonth(('' + value[i].value).substring(4, 6) - 1);
          date.setDate(('' + value[i].value).substring(6, 8));
        }
      }

      // 如果需要显示上下午
      if (columns.indexOf('T') !== -1) {
        date.setHours(timeType ? 18 : 9);
        date.setMinutes(0);
      }

      return {
        value: date.getTime(),
        timeType: timeType ? 'PM' : 'AM'
      };
    }
  }, {
    key: 'setValue',
    value: function setValue(val, confirm, props) {
      var t = this;
      var options = genOptions(val, props);
      var newProps = props || t.props;

      /* if (val.length && isNaN(val[0])) {
       const ret = Slot.formatDataValue(
       this.options,
       parseValue(props.value),
       );
       t.setState({
       confirmedValue: props.value ? formatFromProps(ret.value, props) : [],
       });
       return;
       } */

      var _Slot$formatDataValue = _Slot2.default.formatDataValue(options, val),
          data = _Slot$formatDataValue.data,
          value = _Slot$formatDataValue.value;

      var changes = null;

      if (value.length > 2) {
        // 为确保有对应的日期，需要重新设置日期
        var dates = getDates(value[0].value, value[1].value);
        var ret = _Slot2.default.formatColumnValue(dates);
        data[2] = ret.columnData;
        changes = {
          data: formatFromProps(this.formatText(data), newProps),
          value: formatFromProps(this.formatText(value), newProps)
        };
      } else {
        changes = { value: formatFromProps(this.formatText(value), newProps) };
      }
      // if (confirm) {
      //   changes.confirmedValue = formatFromProps(value, props);
      // }
      t.setState(changes);
    }

    // 添加年月日等文本

  }, {
    key: 'formatText',
    value: function formatText(arr, text) {
      var formatArray = [];
      var localeCode = this.props.locale;

      for (var i = 0; i < arr.length; i += 1) {
        var el = arr[i];
        formatArray.push((0, _isArray2.default)(el) ? this.formatText(el, _locale2.default[localeCode].surfix[colFlags[i]]) : {
          text: addZero(el.text) + ((0, _isUndefined2.default)(text) ? _locale2.default[localeCode].surfix[colFlags[i]] : text),
          value: el.value
        });
      }
      return formatArray;
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      var t = this;
      var val = t.slotChanged ? value : t.state.value;
      t.props.onConfirm(t.getPlainDate(val));
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var t = this;
      // if (t.state.confirmedValue && t.state.confirmedValue.length) {
      //   t.setValue(t.state.confirmedValue, true, t.props);
      // }
      t.props.onCancel();
    }

    // 值改变回调

  }, {
    key: 'handleChange',
    value: function handleChange(value, column) {
      var t = this;

      if (!t.slotChanged) {
        t.slotChanged = true;
      }

      if (t.props.columns.indexOf('D') !== -1) {
        // 此处判断当前月份是否存在此日期2月没有30号
        var dateRule = getDates(value[0].value, value[1].value);

        if (dateRule.indexOf(value[2].value) === -1) {
          value[2].value = dateRule[dateRule.length - 1];
        }
      }

      var updateObj = { value: value };

      if (value.length > 2) {
        var shouldChangeOptions = column === 1 || column === 0 && value[1].value === 1;

        if (shouldChangeOptions) {
          var currentValue = parseValue(t.getPlainDate(value));
          t.options = genOptions(currentValue, t.props);
          var ret = _Slot2.default.formatDataValue(t.options, currentValue);
          updateObj.data = formatFromProps(t.formatText(ret.data), t.props);
        }
      }

      t.setState(updateObj);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;

      return _react2.default.createElement(_Slot2.default, {
        className: _Context2.default.prefixClass('datetime-field-border-none'),
        ref: t.props.slotRef,
        columnsFlex: columnsFlexMap[t.props.columns.join('')],
        title: t.props.title,
        confirmText: t.props.confirmText || _locale2.default[this.props.locale].confirmText,
        cancelText: t.props.cancelText || _locale2.default[this.props.locale].cancelText,
        data: t.state.data,
        value: t.state.value,
        onChange: function onChange(value, column) {
          t.handleChange(value, column);
        },
        onCancel: function onCancel() {
          t.handleCancel();
        },
        onConfirm: function onConfirm(value) {
          t.handleConfirm(value);
        }
      });
    }
  }]);

  return Datetime;
}(_react2.default.Component);

Datetime.Y = Y;
Datetime.YM = YM;
Datetime.YMD = YMD;
Datetime.YMDT = YMDT;
Datetime.YMDHM = YMDHM;
Datetime.YMDWHM = YMDWHM;
Datetime.getSlotFormattedValue = getSlotFormattedValue;

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: Datetime.YMD,
  onConfirm: function onConfirm(_) {
    return _;
  },
  onCancel: function onCancel(_) {
    return _;
  },
  slotRef: function slotRef(_) {
    return _;
  }
};

// http://facebook.github.io/react/docs/reusable-components.html
Datetime.propTypes = {
  className: _react2.default.PropTypes.string,
  title: _react2.default.PropTypes.string.isRequired,
  locale: _react2.default.PropTypes.string,
  columns: _react2.default.PropTypes.array,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.object]),
  confirmText: _react2.default.PropTypes.string,
  cancelText: _react2.default.PropTypes.string,
  onConfirm: _react2.default.PropTypes.func,
  onCancel: _react2.default.PropTypes.func,
  slotRef: _react2.default.PropTypes.func
};

Datetime.displayName = 'Datetime';

exports.default = Datetime;
module.exports = exports['default'];