'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DayField = require('./lib/DayField');

var _DayField2 = _interopRequireDefault(_DayField);

var _DayFieldWithSlot = require('./lib/DayFieldWithSlot');

var _DayFieldWithSlot2 = _interopRequireDefault(_DayFieldWithSlot);

var _DayFieldWithHalf = require('./lib/DayFieldWithHalf');

var _DayFieldWithHalf2 = _interopRequireDefault(_DayFieldWithHalf);

var _DayFieldWithTime = require('./lib/DayFieldWithTime');

var _DayFieldWithTime2 = _interopRequireDefault(_DayFieldWithTime);

var _MonthField = require('./lib/MonthField');

var _MonthField2 = _interopRequireDefault(_MonthField);

var _YearField = require('./lib/YearField');

var _YearField2 = _interopRequireDefault(_YearField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CalendarField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// 选择日期，面板形式
// 选择日期，拨盘形式


var CalendarField = function (_React$Component) {
  _inherits(CalendarField, _React$Component);

  function CalendarField() {
    _classCallCheck(this, CalendarField);

    return _possibleConstructorReturn(this, (CalendarField.__proto__ || Object.getPrototypeOf(CalendarField)).apply(this, arguments));
  }

  _createClass(CalendarField, [{
    key: 'render',
    value: function render() {
      var t = this;
      if (t.props.type === 'year') {
        return _react2.default.createElement(_YearField2.default, t.props);
      } else if (t.props.type === 'month') {
        return _react2.default.createElement(_MonthField2.default, t.props);
      } else if (t.props.type === 'dayWithSlot') {
        return _react2.default.createElement(_DayFieldWithSlot2.default, t.props);
      } else if (t.props.type === 'dayWithHalf') {
        return _react2.default.createElement(_DayFieldWithHalf2.default, t.props);
      } else if (t.props.type === 'dayWithTime') {
        return _react2.default.createElement(_DayFieldWithTime2.default, t.props);
      } else {
        return _react2.default.createElement(_DayField2.default, t.props);
      }
    }
  }]);

  return CalendarField;
}(_react2.default.Component);

CalendarField.displayName = 'CalendarField';
exports.default = CalendarField;
module.exports = exports['default'];