'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _utils = require('./utils');

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

var columnsFlexMap = {
  YMD: [1.24, 1.1, 1.1],
  YMDT: [0.98, 0.83, 0.83, 0.79],
  YMDHm: [1.64, 0.89, 0.89],
  YMDWHm: [1.64, 0.89, 0.89]
};

var Datetime = function (_React$Component) {
  _inherits(Datetime, _React$Component);

  function Datetime(props) {
    _classCallCheck(this, Datetime);

    // 如果二者同时存在，是提示出错
    var _this = _possibleConstructorReturn(this, (Datetime.__proto__ || Object.getPrototypeOf(Datetime)).call(this, props));

    _initialiseProps.call(_this);

    if (props.columns.indexOf('T') !== -1 && props.columns.indexOf('H') !== -1) {
      throw new Error('Please refer to tingle-document.');
    }
    var me = _this;
    _this.init(props, me);
    return _this;
  }
  // 外部变更选中值


  _createClass(Datetime, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var setValue = this.setValue;
      var value = nextProps.value;

      if (value) {
        setValue(value, true, nextProps);
      }
    }

    // 获取默认最小值

    // 获取默认最大值

    // 添加年月日等文本

    // 初始化日历面板

  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var data = state.data,
          value = state.value;

      return _react2.default.createElement(_Slot2.default, {
        className: _Context2.default.prefixClass('datetime-field-border-none'),
        disabled: disabled,
        ref: props.slotRef,
        columnsFlex: columnsFlexMap[props.columns.join('')],
        title: props.title,
        confirmText: props.confirmText || _locale2.default[props.locale].confirmText,
        data: data,
        value: value,
        onChange: this.handleChange,
        onCancel: this.handleCancel,
        onConfirm: this.handleConfirm
      });
    }
  }]);

  return Datetime;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setValue = function (value, confirm, nextProps) {
    var ret = _this2.getOptions({ value: value }, nextProps);
    var newProps = nextProps || _this2.props;
    var data = (0, _utils.formatFromProps)(_this2.formatText(ret.data), newProps);
    var newValue = (0, _utils.formatFromProps)(_this2.formatText(ret.value), newProps);
    var columns = newProps.columns;

    if (newProps.disabledDate) {
      data = (0, _utils.filterTime)({ data: data, disabledDate: newProps.disabledDate, newValue: newValue, columns: columns });
    };
    _this2.state = {
      data: data,
      value: newValue
    };
  };

  this.getDefaultMinDate = function (value) {
    var date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      throw Error('Invalid Date');
    }
    return date;
  };

  this.getDefaultMaxDate = function (value) {
    var date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      throw Error('Invalid Date');
    }
    return date;
  };

  this.getPlainDate = function (value) {
    var timeType = false;
    return {
      value: new Date(value),
      timeType: timeType ? 'PM' : 'AM'
    };
  };

  this.getOptions = function (_ref, props) {
    var value = _ref.value;
    var minDate = props.minDate,
        maxDate = props.maxDate,
        minuteStep = props.minuteStep;

    minDate = _this2.getDefaultMinDate(minDate);
    maxDate = _this2.getDefaultMaxDate(maxDate);
    var currentValue = (0, _utils.parseValue)(value);
    var datYear = (0, _utils.getDaysByYear)(currentValue[0]);
    var options = [(0, _utils.makeRange)(minDate.getFullYear(), maxDate.getFullYear()), (0, _utils.makeRange)(1, 12).map(function (v) {
      return { text: '' + v, value: v - 1 };
    }), (0, _utils.getDates)(value), _locale2.default[props.locale].noon, (0, _utils.makeRange)(0, 12), (0, _utils.makeRange)(0, 23), (0, _utils.makeRange)(0, 59, minuteStep), (0, _utils.makeRange)(0, 59), datYear, datYear];
    var ret = _Slot2.default.formatDataValue([].concat(options), [].concat(currentValue));
    return ret;
  };

  this.setOptions = function (props, me) {
    var ret = _this2.getOptions({ value: props.value }, props);
    var data = (0, _utils.formatFromProps)(_this2.formatText(ret.data), props);
    var value = (0, _utils.formatFromProps)(_this2.formatText(ret.value), props);
    var columns = props.columns;

    if (props.disabledDate) {
      data = (0, _utils.filterTime)({ data: data, disabledDate: props.disabledDate, value: value, columns: columns });
    };
    _this2.state = {
      data: data,
      value: value
    };
  };

  this.handleConfirm = function (value) {
    var val = _this2.slotChanged ? value : _this2.state.value;
    _this2.props.onConfirm(_this2.getPlainDate(val));
  };

  this.formatText = function (arr, text) {
    var formatArray = [];
    var localeCode = _this2.props.locale;

    for (var i = 0; i < arr.length; i += 1) {
      var el = arr[i];
      formatArray.push((0, _utils.isArray)(el) ? _this2.formatText(el, _locale2.default[localeCode].surfix[_utils.colFlags[i]]) : {
        text: (0, _utils.addZero)(el.text) + ((0, _utils.isUndefined)(text) ? _locale2.default[localeCode].surfix[_utils.colFlags[i]] : text),
        value: el.value
      });
    }
    return formatArray;
  };

  this.handleCancel = function () {
    _this2.props.onCancel && _this2.props.onCancel();
  };

  this.handleChange = function (value, column) {
    var props = _this2.props;
    var columns = props.columns;

    var dateStr = (0, _utils.parseDate)({ columns: columns, value: value });
    var now = new Date(dateStr);
    var options = _this2.getOptions({ value: now.getTime() }, props);
    var data = (0, _utils.formatFromProps)(_this2.formatText(options.data), props);
    if (props.disabledDate) {
      data = (0, _utils.filterTime)({ data: data, disabledDate: props.disabledDate, value: value, columns: columns });
    }
    _this2.setState({
      data: data,
      value: value
    });
    props.onChange && props.onChange(now, value, column);
  };

  this.init = function (props, me) {
    _this2.setOptions(props, me);
  };
};

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: _utils.YMDHM,
  onConfirm: function onConfirm(_) {
    return _;
  },
  onCancel: function onCancel(_) {
    return _;
  },
  slotRef: function slotRef(_) {
    return _;
  },
  minuteStep: 1,
  minDate: '2000-01-01',
  maxDate: '2030-12-31'
};

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
  slotRef: _react2.default.PropTypes.func,
  minuteStep: _react2.default.PropTypes.number,
  minDate: _react2.default.PropTypes.string,
  maxDate: _react2.default.PropTypes.string,
  disabledDate: _react2.default.PropTypes.func
};
Datetime.Y = _utils.Y;
Datetime.YM = _utils.YM;
Datetime.YMD = _utils.YMD;
Datetime.YMDT = _utils.YMDT;
Datetime.YMDHM = _utils.YMDHM;
Datetime.YMDWHM = _utils.YMDWHM;
Datetime.displayName = 'Datetime';

exports.default = Datetime;
module.exports = exports['default'];