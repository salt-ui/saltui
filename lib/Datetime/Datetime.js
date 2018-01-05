'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

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
    _this.init(props);
    return _this;
  }
  // 外部变更选中值


  _createClass(Datetime, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setOptions(nextProps);
    }
    // 初始化日历面板

  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;
      var data = state.data,
          value = state.value;

      return _react2.default.createElement(_utils.Slot, {
        className: _Context2.default.prefixClass('datetime-field-border-none'),
        ref: props.slotRef,
        columnsFlex: columnsFlexMap[props.columns.join('')],
        title: props.title,
        confirmText: props.confirmText || _utils.locale[props.locale].confirmText,
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

  this.getPlainDate = function (value) {
    var date = new Date();
    var columns = _this2.props.columns;

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
  };

  this.setOptions = function (props) {
    var _getOptions = (0, _utils.getOptions)({ value: props.value }, props),
        data = _getOptions.data,
        value = _getOptions.value;

    var columns = props.columns,
        minDate = props.minDate,
        maxDate = props.maxDate;

    var columnsStyle = columns[0];
    if (props.disabledDate && columnsStyle === 'Y') {
      var disabledArr = props.disabledDate();
      if ((0, _utils.isArray)(disabledArr) && disabledArr.length) {
        data = (0, _utils.filterDate)({
          data: data,
          disabledArr: disabledArr,
          value: value,
          columns: columns,
          minDate: minDate,
          maxDate: maxDate
        });
      }
    }
    _this2.state = {
      data: data,
      value: value
    };
  };

  this.handleConfirm = function (value) {
    var output = _this2.getPlainDate(value);
    _this2.props.onConfirm(output);
  };

  this.handleCancel = function () {
    _this2.props.onCancel();
  };

  this.handleChange = function (value, column) {
    var props = _this2.props;
    var columns = props.columns,
        minDate = props.minDate,
        maxDate = props.maxDate,
        disabledDate = props.disabledDate;
    var data = _this2.state.data;

    var date = (0, _utils.parseDate)({ columns: columns, value: value });
    var columnsStyle = columns[column];
    if (columnsStyle === 'D') {
      props.onChange(date, column);
      return;
    }
    var newData = (0, _utils.getOptions)({ value: date }, props);
    var updateObj = {
      data: newData.data,
      value: newData.value
    };
    if (value.every(function (item) {
      return !!item;
    })) {
      updateObj.value = value;
    }
    if (disabledDate) {
      var disabledArr = disabledDate();
      if ((0, _utils.isArray)(disabledArr) && disabledArr.length && columns[0] === 'Y') {
        var YEARDATE = data[0];
        var MONTHDATE = data[1];
        var oldData = {};
        if (columnsStyle === 'Y') {
          oldData.yearData = YEARDATE;
        }
        if (columnsStyle === 'M') {
          oldData.yearData = YEARDATE;
          oldData.monthData = MONTHDATE;
        }
        var AllData = (0, _utils.filterDate)({
          data: newData.data,
          disabledArr: disabledArr,
          value: value,
          columns: columns,
          minDate: minDate,
          maxDate: maxDate,
          oldData: oldData
        });
        updateObj.data = AllData.length >= 3 ? AllData : newData.data;
      }
    }
    _this2.setState(updateObj);
    props.onChange(date, column);
  };

  this.init = function (props) {
    _this2.setOptions(props);
  };
};

Datetime.defaultProps = {
  className: '',
  locale: 'zh-cn',
  columns: _utils.YMD,
  onConfirm: function onConfirm(_) {
    return _;
  },
  onCancel: function onCancel(_) {
    return _;
  },
  onChange: function onChange(_) {
    return _;
  },
  slotRef: function slotRef(_) {
    return _;
  },
  minuteStep: 1,
  minDate: 946656000000,
  maxDate: 1924876800000,
  disabledDate: function disabledDate() {
    return [];
  }
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
  onChange: _react2.default.PropTypes.func,
  slotRef: _react2.default.PropTypes.func,
  minuteStep: _react2.default.PropTypes.number,
  maxDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  minDate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  disabledDate: _react2.default.PropTypes.func
};
Datetime.Y = _utils.Y;
Datetime.YM = _utils.YM;
Datetime.YMD = _utils.YMD;
Datetime.YMDT = _utils.YMDT;
Datetime.YMDHM = _utils.YMDHM;
Datetime.YMDWHM = _utils.YMDWHM;
Datetime.getSlotFormattedValue = _utils.getSlotFormattedValue;
Datetime.displayName = 'Datetime';

exports.default = Datetime;
module.exports = exports['default'];