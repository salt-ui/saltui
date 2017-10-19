'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Context = require('../../Context');

var _Field = require('../../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Calendar = require('../../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Datetime = require('../../Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _uxcoreFormatter = require('uxcore-formatter');

var _uxcoreFormatter2 = _interopRequireDefault(_uxcoreFormatter);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayField = function (_React$Component) {
  _inherits(DayField, _React$Component);

  function DayField(props) {
    _classCallCheck(this, DayField);

    var _this = _possibleConstructorReturn(this, (DayField.__proto__ || Object.getPrototypeOf(DayField)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(DayField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.locale = _Calendar2.default.I18n[this.props.locale];
    }
  }, {
    key: 'handleFieldClick',
    value: function handleFieldClick() {
      var t = this;
      if (t.props.readOnly) {
        return;
      }
      t.setState({
        visible: true
      });
    }
  }, {
    key: 'onOk',
    value: function onOk(value) {
      var t = this;
      t.setState({
        visible: false
      });
      t.props.onOk(value);
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      var t = this;
      t.setState({
        visible: false
      });
      t.props.onCancel();
    }

    // 制造"周X"的文案

  }, {
    key: 'makeWeekText',
    value: function makeWeekText(data, type) {
      var t = this;
      data[type + 'Week'] = t.locale.weekTitle[new Date(data[type]).getDay()];
      if (t.props.locale === _util.Locale.cn) {
        data[type + 'Week'] = '\u5468' + data[type + 'Week'];
      }
    }

    // 根据情景，制造value，用于显示
    // 此方法会被子类使用，本应拆分，由子类复写，但因处理较复杂，所以未拆分

  }, {
    key: 'makeViewValue',
    value: function makeViewValue() {
      var t = this;
      var result = {};
      if ((0, _util.isStringOrNumber)(t.props.value)) {
        result.start = result.end = t.props.value ? t.props.value : '';
      } else if (t.props.singleMode && (0, _util.isObject)(t.props.value)) {
        result.start = result.end = t.props.value.value;
      } else if (Array.isArray(t.props.value)) {
        result.start = t.props.value[0];
        result.end = t.props.value[1];
      } else if ((0, _util.isObject)(t.props.value)) {
        result.start = t.props.value.startDate ? t.props.value.startDate : '';
        result.end = t.props.value.endDate ? t.props.value.endDate : '';
        // 如果传入的endDate比startDate还早，则设置为相等的值
        if (new Date(result.start).getTime() > new Date(result.end).getTime()) {
          result.end = result.start;
        }
      }
      // 如果value非Date类型，则临时存放起来，最后再返回
      if (isNaN(new Date(result.start))) {
        result.tempStart = result.start;
      }
      if (isNaN(new Date(result.end))) {
        result.tempEnd = result.end;
      }
      switch (t.props.type) {
        case 'year':
          result.start = _uxcoreFormatter2.default.date(result.start, _util.defaultFormatter.y);
          result.end = _uxcoreFormatter2.default.date(result.end, _util.defaultFormatter.y);
          break;
        case 'month':
          result.start = _uxcoreFormatter2.default.date(result.start, t.props.formatter || _util.defaultFormatter.m);
          result.end = _uxcoreFormatter2.default.date(result.end, t.props.formatter || _util.defaultFormatter.m);
          break;
        default:
        case 'day':
        case 'dayWithSlot':
        case 'dayWithHalf':
        case 'dayWithTime':
          // 格式化日期
          result.start = _uxcoreFormatter2.default.date(result.start, t.props.formatter || _util.defaultFormatter.d);
          result.end = _uxcoreFormatter2.default.date(result.end, t.props.formatter || _util.defaultFormatter.d);
          if (!isNaN(new Date(result.start))) {
            t.makeWeekText(result, 'start');
          }
          if (!isNaN(new Date(result.end))) {
            t.makeWeekText(result, 'end');
          }
          // result
          if (t.props.singleMode) {
            result.startDateType = result.endDateType = t.locale.dayTipMap[t.props.value.startDateType || t.props.value.timeType];
          } else if ((0, _util.isObject)(t.props.value)) {
            result.startDateType = t.locale.dayTipMap[t.props.value.startDateType];
            result.endDateType = t.locale.dayTipMap[t.props.value.endDateType];
          }
          break;
      }
      // 如果有临时值
      if (result.tempStart) {
        result.start = result.tempStart;
      }
      if (result.tempEnd) {
        result.end = result.tempEnd;
      }
      result.startDate = result.start;
      delete result.start;
      result.endDate = result.end;
      delete result.end;
      return result;
    }
  }, {
    key: 'renderPlaceholder',
    value: function renderPlaceholder(value, key) {
      var t = this;
      var placeholder = t.props.placeholder;

      return _react2.default.createElement(
        'div',
        { className: (0, _Context.prefixClass)('omit calendar-field-placeholder') },
        typeof placeholder === 'string' ? placeholder : placeholder[key === 'start' ? 0 : 1]
      );
    }
  }, {
    key: 'renderWeekText',
    value: function renderWeekText(value, key) {
      var t = this;
      if (t.props.showWeek && value[key + 'Week']) {
        return _react2.default.createElement(
          'span',
          { className: 'week' },
          value[key + 'Week']
        );
      }
      return null;
    }
  }, {
    key: 'renderDateTypeText',
    value: function renderDateTypeText(value, key) {
      var t = this;
      if (t.props.showDateType && value[key + 'DateType']) {
        return _react2.default.createElement(
          'span',
          { className: 'date-type' },
          value[key + 'DateType']
        );
      }
      return null;
    }

    // 级联的每一项结构是相同的，所以可以提出来共用

  }, {
    key: 'renderDateBlock',
    value: function renderDateBlock(value, key) {
      var t = this;
      if (value[key + 'Date']) {
        return _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('calendar-field-value') },
          _react2.default.createElement(
            'span',
            { className: (0, _classnames4.default)('date-text', _defineProperty({}, (0, _Context.prefixClass)('calendar-field-readonly'), !!t.props.readOnly))
            },
            value[key + 'Date']
          ),
          t.renderWeekText(value, key),
          t.renderDateTypeText(value, key)
        );
      }
      return t.renderPlaceholder(value, key);
    }

    // 区间模式

  }, {
    key: 'renderCascadeModeView',
    value: function renderCascadeModeView() {
      var _classnames2;

      var t = this;
      var value = t.makeViewValue();
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames4.default)((0, _Context.prefixClass)('calendar-field-show-box'), (_classnames2 = {
            'h-layout': t.props.layout === 'h',
            'v-layout': t.props.layout === 'v'
          }, _defineProperty(_classnames2, (0, _Context.prefixClass)('FBH'), t.props.layout === 'v'), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBAC'), t.props.layout === 'v'), _classnames2))
        },
        t.renderDateBlock(value, 'start'),
        t.props.layout === 'v' && !t.props.singleMode && _react2.default.createElement('span', { className: 'split-line' }),
        t.renderDateBlock(value, 'end')
      );
    }

    // 单选模式

  }, {
    key: 'renderSingleModeView',
    value: function renderSingleModeView() {
      var t = this;
      var _t$props = t.props,
          placeholder = _t$props.placeholder,
          readOnly = _t$props.readOnly;

      var value = t.makeViewValue();
      return _react2.default.createElement(
        'div',
        null,
        !t.props.value && _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('omit calendar-field-placeholder') },
          typeof placeholder === 'string' ? placeholder : placeholder[0]
        ),
        t.renderDateBlock(value, 'start')
      );
    }

    // 渲染展示区域

  }, {
    key: 'renderView',
    value: function renderView(calendarProps) {
      var t = this;
      return _react2.default.createElement(
        'div',
        { onClick: t.handleFieldClick.bind(t) },
        calendarProps.singleMode ? t.renderSingleModeView() : t.renderCascadeModeView()
      );
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar(props) {
      return _react2.default.createElement(_Calendar2.default, props);
    }
  }, {
    key: 'getFieldProps',
    value: function getFieldProps() {
      var t = this;
      return {
        label: t.props.label,
        tappable: t.props.tappable,
        required: t.props.required,
        multiLine: t.props.multiLine,
        icon: t.props.icon,
        layout: t.props.layout,
        tip: t.props.tip,
        readOnly: t.props.readOnly
      };
    }
  }, {
    key: 'getCalendarProps',
    value: function getCalendarProps() {
      var t = this;
      return {
        visible: t.state.visible,
        locale: t.props.locale,
        animationType: t.props.animationType,
        singleMode: t.props.singleMode,
        showHalfDay: t.props.showHalfDay,
        topPanelTitle: t.props.topPanelTitle,
        value: t.props.value,
        disabledDate: t.props.disabledDate,
        renderDayBadge: t.props.renderDayBadge,
        renderCustomDayLabel: t.props.renderCustomDayLabel,
        maskClosable: t.props.maskClosable,
        onOk: t.onOk.bind(t),
        onCancel: t.onCancel.bind(t),
        onChange: t.props.onChange,
        onMaskClose: t.props.onMaskClose
      };
    }

    // 获取表单域额外的classnames，主要用于年、月

  }, {
    key: 'getExtraClassNames',
    value: function getExtraClassNames() {
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var fieldProps = t.getFieldProps();
      var calendarProps = t.getCalendarProps();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Field2.default,
          _extends({}, fieldProps, {
            className: (0, _classnames4.default)((0, _Context.prefixClass)('calendar-field'), t.getExtraClassNames(), t.props.className, {
              readonly: t.props.readOnly
            })
          }),
          t.renderView(calendarProps)
        ),
        t.renderCalendar(calendarProps)
      );
    }
  }]);

  return DayField;
}(_react2.default.Component);

DayField.displayName = 'DayField';


DayField.defaultProps = _extends({}, _Calendar2.default.defaultProps, _Datetime2.default.defaultProps, _Field2.default.defaultProps, {
  placeholder: ['请选择开始日期', '请选择结束日期'],
  locale: 'zh-cn',
  type: 'day', // year, month, day(面板形式), dayWithSlot(拨盘形式), dayWithHalf, dayWithTime
  formatter: '',
  readOnly: false,
  showWeek: true, // 是否显示周几
  showDateType: true, // 是否显示“全天”“上午”“下午”
  multiLine: true,
  onCancel: function onCancel() {},
  onOk: function onOk() {},
  disabledDate: function disabledDate() {},
  renderDayBadge: function renderDayBadge() {},
  renderCustomDayLabel: function renderCustomDayLabel() {},
  onChange: function onChange() {}
});

DayField.propTypes = _extends({}, _Calendar2.default.propTypes, _Datetime2.default.propTypes, _Field2.default.propTypes, {
  placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]),
  locale: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string,
  formatter: _react2.default.PropTypes.string,
  readOnly: _react2.default.PropTypes.bool,
  showWeek: _react2.default.PropTypes.bool,
  showDateType: _react2.default.PropTypes.bool,
  multiLine: _react2.default.PropTypes.bool,
  onCancel: _react2.default.PropTypes.func,
  onOk: _react2.default.PropTypes.func,
  disabledDate: _react2.default.PropTypes.func,
  renderDayBadge: _react2.default.PropTypes.func,
  renderCustomDayLabel: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func
});

exports.default = DayField;
module.exports = exports['default'];