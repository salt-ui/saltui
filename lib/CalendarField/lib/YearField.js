'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Datetime = require('../../Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _Context = require('../../Context');

var _util = require('./util');

var _DayField2 = require('./DayField');

var _DayField3 = _interopRequireDefault(_DayField2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearField = function (_DayField) {
  _inherits(YearField, _DayField);

  function YearField() {
    _classCallCheck(this, YearField);

    return _possibleConstructorReturn(this, (YearField.__proto__ || Object.getPrototypeOf(YearField)).apply(this, arguments));
  }

  _createClass(YearField, [{
    key: 'getTimestamp',
    value: function getTimestamp(date) {
      var dateObj = new Date(date);
      if ((0, _util.isNumber)(date)) {
        dateObj = new Date(parseInt(date));
      }
      return isNaN(dateObj.getTime()) ? undefined : dateObj.getTime();
    }
  }, {
    key: 'processValue',
    value: function processValue(value, key) {
      var t = this;
      // 非级联模式
      if (t.props.singleMode) {
        if ((0, _util.isObject)(value) && !value.hasOwnProperty('value')) {
          value.value = value.startDate;
        }
        return value;
      }
      // 级联模式，要拼装成具有 startDate 和 endDate 的对象
      if ((0, _util.isStringOrNumber)(value) || !value) {
        return {
          startDate: value,
          endDate: value
        };
      }
      if (Array.isArray(value)) {
        return {
          startDate: value[0],
          endDate: value[1]
        };
      }
      if ((0, _util.isObject)(value)) {
        var startDate = value.startDate;
        var endDate = value.endDate;
        // 如果是初始化，且 startDate 为空，则把 value 置为 startDate
        // key 也可以用来判断是初始化还是点击之后触发的该方法
        if (!key && !startDate) {
          startDate = value.value;
        }
        var start = t.getTimestamp(startDate);
        var end = t.getTimestamp(endDate);
        if (start > end) {
          // 如果初始化时，传入的endDate比startDate还早，则设置为相等的值
          if (!key) {
            end = start;
          }
          if (key === 'start') {
            console.warn('current key is startDate, but startDate > endDate, so endDate will be clear');
            end = null;
          }
          if (key === 'end') {
            console.warn('current key is endDate, but startDate > endDate, so startDate will be clear');
            start = null;
          }
        }
        return {
          startDate: start,
          startDateType: value.startDateType,
          endDate: end,
          endDateType: value.endDateType
        };
      }
      return value;
    }
  }, {
    key: 'onOk',
    value: function onOk(value, key) {
      var t = this;
      var mergedValue = value;
      // 级联模式下，合并 value
      if (!t.props.singleMode) {
        var _extends2;

        mergedValue = _extends({}, t.props.value, value, (_extends2 = {}, _defineProperty(_extends2, key + 'DateType', value.timeType), _defineProperty(_extends2, key + 'Date', value.value), _extends2));
      }
      var result = t.processValue(mergedValue, key);

      t.props.onOk(result);

      // 级联模式，选择了开始时间，未选择结束时间或结束时间被置空，则自动弹出选择结束日期面板
      if (!t.props.singleMode && key === 'start' && !result.endDate) {
        t.yearEnd.show();
      }
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      var t = this;
      t.props.onCancel();
    }
  }, {
    key: 'handleFieldClick',
    value: function handleFieldClick(key) {
      var t = this;
      if (t.props.readOnly) {
        return;
      }
      if (t.props.singleMode) {
        t.year.show();
        return;
      }
      t['year' + key[0].toUpperCase() + key.substring(1)].show();
    }
  }, {
    key: 'renderPlaceholder',
    value: function renderPlaceholder(value, key) {
      var t = this;
      var placeholder = t.props.placeholder;

      return React.createElement(
        'div',
        {
          className: (0, _Context.prefixClass)('omit calendar-field-placeholder'),
          onClick: t.props.singleMode ? null : t.handleFieldClick.bind(t, key)
        },
        typeof placeholder === 'string' ? placeholder : placeholder[key === 'start' ? 0 : 1]
      );
    }
  }, {
    key: 'renderDateBlock',
    value: function renderDateBlock(value, key) {
      var t = this;
      if (value[key + 'Date']) {
        return React.createElement(
          'div',
          {
            className: (0, _Context.prefixClass)('calendar-field-value'),
            onClick: t.props.singleMode ? null : t.handleFieldClick.bind(t, key)
          },
          React.createElement(
            'span',
            { className: (0, _classnames3.default)('date-text', _defineProperty({}, (0, _Context.prefixClass)('calendar-field-readonly'), !!t.props.readOnly)) },
            value[key + 'Date']
          ),
          t.renderWeekText(value, key),
          t.renderDateTypeText(value, key)
        );
      }
      return t.renderPlaceholder(value, key);
    }

    // 渲染展示区域

  }, {
    key: 'renderView',
    value: function renderView(calendarProps) {
      var t = this;
      if (t.props.singleMode) {
        return React.createElement(
          'div',
          { onClick: t.handleFieldClick.bind(t) },
          t.renderSingleModeView()
        );
      }
      return t.renderCascadeModeView();
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar(props) {
      var _this2 = this;

      var t = this;
      var component = void 0;
      // 级联模式
      if (!t.props.singleMode) {

        // 处理title
        var title = props.title;
        if (typeof props.title === 'string') {
          title = [props.title, props.title];
        }

        component = React.createElement(
          'div',
          null,
          React.createElement(_Datetime2.default, _extends({}, props, {
            title: title[0],
            value: {
              value: props.value.startDate,
              timeType: props.value.startDateType
            },
            slotRef: function slotRef(r) {
              t.yearStart = r;
            },
            onConfirm: function onConfirm(val) {
              t.onOk(val, 'start');
            },
            onCancel: function onCancel() {
              t.onCancel();
            }
          })),
          React.createElement(_Datetime2.default, _extends({}, props, {
            title: title[1],
            value: {
              value: props.value.endDate,
              timeType: props.value.endDateType
            },
            slotRef: function slotRef(r) {
              t.yearEnd = r;
            },
            onConfirm: function onConfirm(val) {
              t.onOk(val, 'end');
            },
            onCancel: function onCancel() {
              t.onCancel();
            }
          }))
        );
      }
      // 单点模式
      else {
          var _title = props.title;
          if (typeof props.title !== 'string') {
            _title = props.title[0];
          }
          component = React.createElement(_Datetime2.default, _extends({}, props, {
            title: _title,
            slotRef: function slotRef(r) {
              _this2.year = r;
            },
            onConfirm: function onConfirm(val) {
              t.onOk(val);
            },
            onCancel: function onCancel() {
              t.onCancel();
            }
          }));
        }
      return component;
    }
  }, {
    key: 'getExtraClassNames',
    value: function getExtraClassNames() {
      return (0, _Context.prefixClass)('year-calendar-field');
    }
  }, {
    key: 'getExtraProps',
    value: function getExtraProps() {
      return {};
    }
  }, {
    key: 'getCalendarProps',
    value: function getCalendarProps() {
      var t = this;
      return _extends({
        title: t.props.title || t.props.placeholder, // 如果没有title，则把placeholder作为title
        locale: t.props.locale,
        value: t.processValue(t.props.value),
        columns: _Datetime2.default.Y,
        confirmText: t.props.confirmText,
        cancelText: t.props.cancelText
      }, t.getExtraProps());
    }
  }]);

  return YearField;
}(_DayField3.default);

YearField.displayName = 'YearField';
exports.default = YearField;
module.exports = exports['default'];