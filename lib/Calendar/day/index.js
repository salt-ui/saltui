'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../../Context');

var _Context2 = _interopRequireDefault(_Context);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _WeekBar = require('./WeekBar');

var _WeekBar2 = _interopRequireDefault(_WeekBar);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _CascadePanel = require('./CascadePanel');

var _CascadePanel2 = _interopRequireDefault(_CascadePanel);

var _TopBar = require('../TopBar');

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Calendar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var DayCalendar = function (_React$Component) {
  _inherits(DayCalendar, _React$Component);

  function DayCalendar(props) {
    _classCallCheck(this, DayCalendar);

    var _this = _possibleConstructorReturn(this, (DayCalendar.__proto__ || Object.getPrototypeOf(DayCalendar)).call(this, props));

    _this.height = props.animationType === 'slideUp' ? 446 : document.documentElement.clientHeight;
    _this.value = (0, _cloneDeep2.default)(props.value);
    return _this;
  }

  _createClass(DayCalendar, [{
    key: 'onTopBarOk',
    value: function onTopBarOk() {
      this.props.onOk(this.value);
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.value = value;
      this.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;

      var _t$props = t.props,
          className = _t$props.className,
          others = _objectWithoutProperties(_t$props, ['className']);

      var paneHeight = t.height - 28;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            _this2.root = r;
          },
          className: (0, _classnames3.default)(prefixClass('calendar day-calendar FBV'), _defineProperty({}, className, !!className))
        },
        t.props.animationType === 'slideUp' && _react2.default.createElement(_TopBar2.default, _extends({}, t.props, { onOk: function onOk() {
            t.onTopBarOk();
          } })),
        _react2.default.createElement(_WeekBar2.default, { locale: t.props.locale }),
        t.props.singleMode ? _react2.default.createElement(_Panel2.default, _extends({
          className: prefixClass('FB1')
        }, others, {
          height: paneHeight,
          onChange: function onChange(value) {
            t.onChange(value);
          }
        })) : _react2.default.createElement(_CascadePanel2.default, _extends({
          className: prefixClass('FB1')
        }, others, {
          height: paneHeight,
          onChange: function onChange(value) {
            t.onChange(value);
          }
        }))
      );
    }
  }]);

  return DayCalendar;
}(_react2.default.Component);

DayCalendar.propTypes = {
  className: _react2.default.PropTypes.string,
  locale: _react2.default.PropTypes.string, // 国际化语言
  animationType: _react2.default.PropTypes.string,
  singleMode: _react2.default.PropTypes.bool, // 是否是单选模式
  onChange: _react2.default.PropTypes.func
};
DayCalendar.defaultProps = {
  locale: 'zh-cn',
  animationType: 'slideLeft', //  slideUp | slideLeft
  singleMode: true,
  onChange: function onChange() {}
};
DayCalendar.displayName = 'DayCalendar';
exports.default = DayCalendar;
module.exports = exports['default'];