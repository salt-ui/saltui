'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _Toast = require('../../Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _Context = require('../../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Button = require('../../Button');

var _Button2 = _interopRequireDefault(_Button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _Panel2 = require('./Panel');

var _Panel3 = _interopRequireDefault(_Panel2);

var _formatter = require('../formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Calendar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 继承自Panel，只处理级联相关的逻辑
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var CascadePanel = function (_Panel) {
  _inherits(CascadePanel, _Panel);

  function CascadePanel(props) {
    _classCallCheck(this, CascadePanel);

    var _this = _possibleConstructorReturn(this, (CascadePanel.__proto__ || Object.getPrototypeOf(CascadePanel)).call(this, props));

    _this.isASC = true; // 是否是正序选择。第二次点击的日期，晚于第一次点击的日期，则为正序选择
    return _this;
  }

  _createClass(CascadePanel, [{
    key: 'showToast',
    value: function showToast() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var content = start ? this.locale.cascadeToastTip.start : this.locale.cascadeToastTip.end;
      _Toast2.default.show({
        className: prefixClass('day-calendar-cascade-tip'),
        content: content
      });
    }

    // 级联模式，调整成正确的数据

  }, {
    key: 'adaptCascadeDate',
    value: function adaptCascadeDate(sDate, eDate) {
      var startDate = _util2.default.isNil(sDate) ? sDate : new Date(sDate).getTime();
      var endDate = _util2.default.isNil(eDate) ? eDate : new Date(eDate).getTime();
      // 如果开始时间大于结束时间，则把结束时间置为同开始时间相同的时间
      if (startDate && endDate && startDate > endDate) {
        endDate = startDate;
      }
      return {
        startDate: startDate,
        endDate: endDate
      };
    }
  }, {
    key: 'processValue',
    value: function processValue(propValue) {
      var value = (0, _cloneDeep2.default)(propValue);
      if (_util2.default.isNil(value)) {
        value = {};
      } else if (/^\d*$/.test(value)) {
        value = {
          startDate: new Date(parseInt(value, 10)).getTime()
        };
      } else if (typeof value === 'string') {
        value = {
          startDate: new Date(value).getTime()
        };
      }
      if (Object.prototype.toString.call(propValue) === '[object Object]') {
        var result = this.adaptCascadeDate(propValue.startDate, propValue.endDate);
        value = {
          startDate: result.startDate,
          endDate: result.endDate
        };
      } else if (Object.prototype.toString.call(propValue) === '[object Array]') {
        var _result = this.adaptCascadeDate(propValue[0], propValue[1] || propValue[0]);
        value = {
          startDate: _result.startDate,
          endDate: _result.endDate
        };
      }
      var newValue = _extends({}, propValue, value);

      if (!newValue.startDate) {
        this.showToast(true);
      } else if (!newValue.endDate) {
        this.showToast(false);
      }

      var activeDate = void 0;
      var activeType = '';

      if (!_util2.default.isNil(newValue.startDate)) {
        activeDate = newValue.startDate;
        activeType = 'start';
      }
      if (!_util2.default.isNil(newValue.endDate)) {
        activeDate = newValue.endDate;
        activeType = 'end';
      }

      this.setState({
        value: newValue,
        activeDate: activeDate,
        activeType: activeType
      });
    }
  }, {
    key: 'onDaySelected',
    value: function onDaySelected(timestamp) {
      var t = this;
      t.isASC = true;
      var startDate = t.state.value.startDate;
      var endDate = t.state.value.endDate;
      var startDateType = t.state.value.startDateType;
      var endDateType = t.state.value.endDateType;
      var activeType = '';
      if (!startDate && !endDate) {
        startDate = timestamp;
        startDateType = _const.halfDayType.FULL;
        endDateType = _const.halfDayType.FULL;
        activeType = 'start';
      } else if (!startDate && endDate) {
        if (timestamp > endDate) {
          startDate = endDate;
          endDate = timestamp;
          startDateType = _const.halfDayType.FULL;
          endDateType = _const.halfDayType.FULL;
          activeType = 'end';
        } else {
          startDate = timestamp;
          startDateType = _const.halfDayType.FULL;
          if (!endDateType || endDateType === 'PM') {
            endDateType = _const.halfDayType.FULL;
          }
          activeType = 'start';
          t.isASC = false;
        }
      } else if (startDate && !endDate) {
        if (timestamp < startDate) {
          endDate = startDate;
          startDate = timestamp;
          startDateType = _const.halfDayType.FULL;
          endDateType = _const.halfDayType.FULL;
          activeType = 'start';
          t.isASC = false;
        } else {
          endDate = timestamp;
          if (!startDateType || startDateType === 'AM') {
            startDateType = _const.halfDayType.FULL;
          }
          endDateType = _const.halfDayType.FULL;
          activeType = 'end';
        }
      } else if (startDate && endDate) {
        startDate = timestamp;
        endDate = null;
        startDateType = _const.halfDayType.FULL;
        endDateType = _const.halfDayType.FULL;
        activeType = 'start';
      }
      var newValue = _extends({}, t.state.value, {
        startDate: startDate,
        endDate: endDate,
        startDateType: startDateType,
        endDateType: endDateType
      });

      if (!newValue.startDate) {
        t.showToast(true);
      } else if (!newValue.endDate) {
        t.showToast(false);
      }

      t.setState({
        value: newValue,
        activeDate: timestamp,
        activeType: activeType
      });

      t.props.onChange({
        startDate: newValue.startDate,
        endDate: newValue.endDate,
        startDateType: newValue.startDateType,
        endDateType: newValue.endDateType
      });

      // 在 slide 模式，且不显示 halfDay 的情况下，只要起止值都已经完整，则触发 onOk
      if (t.props.animationType === 'slideLeft' & !t.props.showHalfDay && newValue.startDate && newValue.endDate) {
        t.props.onOk((0, _cloneDeep2.default)(newValue));
      }
    }
  }, {
    key: 'onHalfButtonClick',
    value: function onHalfButtonClick(halfType) {
      var t = this;
      var newValue = (0, _cloneDeep2.default)(t.state.value);
      newValue[t.state.activeType + 'DateType'] = halfType;
      this.setState({
        value: newValue
      });
      t.props.onChange((0, _cloneDeep2.default)(newValue));
    }
  }, {
    key: 'onOk',
    value: function onOk() {
      var t = this;
      t.props.onOk((0, _cloneDeep2.default)(t.state.value));
    }
  }, {
    key: 'renderHalfDay',
    value: function renderHalfDay() {
      var t = this;
      var halfType = t.state.value[t.state.activeType + 'DateType'];

      var full = _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)(prefixClass('tap'), 'day-type-item full', {
            active: halfType === _const.halfDayType.FULL
          }),
          key: 'half-day-full',
          onClick: function onClick(e) {
            t.onHalfButtonClick(_const.halfDayType.FULL, e);
          }
        },
        t.locale.dayTipMap.FULL
      );

      var am = _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)(prefixClass('tap'), 'day-type-item am', {
            active: halfType === _const.halfDayType.AM
          }),
          key: 'half-day-am',
          onClick: function onClick(e) {
            t.onHalfButtonClick(_const.halfDayType.AM, e);
          }
        },
        t.locale.dayTipMap.AM
      );

      var pm = _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)(prefixClass('tap'), 'day-type-item pm', {
            active: halfType === _const.halfDayType.PM
          }),
          key: 'half-day-pm',
          onClick: function onClick(e) {
            t.onHalfButtonClick(_const.halfDayType.PM, e);
          }
        },
        t.locale.dayTipMap.PM
      );

      var halfButtons = [full, am, pm];

      if (t.isASC && t.state.activeType === 'end') {
        halfButtons = [full, am];
      }
      if (!t.isASC && t.state.activeType === 'start') {
        halfButtons = [full, pm];
      }

      return _react2.default.createElement(
        'div',
        {
          className: prefixClass('day-calendar-half-day-wrapper')
        },
        _react2.default.createElement(
          'div',
          {
            className: prefixClass('day-calendar-half-day-container')
          },
          _react2.default.createElement(
            'ul',
            { className: 'day-type-list' },
            halfButtons
          )
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            type: 'primary',
            display: 'banner',
            onClick: function onClick(e) {
              t.onOk(e);
            }
          },
          t.locale.button.confirm
        )
      );
    }
  }]);

  return CascadePanel;
}(_Panel3.default);

CascadePanel.propTypes = _extends({}, _Panel3.default.propTypes);
CascadePanel.defaultProps = _extends({}, _Panel3.default.defaultProps);
exports.default = CascadePanel;
module.exports = exports['default'];