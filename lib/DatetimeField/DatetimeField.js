'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DatetimeField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');
var Field = require('../Field');
var Datetime = require('../Datetime');
var isObject = require('lodash/isObject');

// 左边补零
function addZero(num) {
  return '' + (num < 10 ? '0' : '') + num;
}

var DatetimeField = function (_React$Component) {
  _inherits(DatetimeField, _React$Component);

  function DatetimeField(props) {
    _classCallCheck(this, DatetimeField);

    var _this = _possibleConstructorReturn(this, (DatetimeField.__proto__ || Object.getPrototypeOf(DatetimeField)).call(this, props));

    _this.state = {
      slotValue: Datetime.getSlotFormattedValue(props.value, props)
    };
    _this.valueChanged = false;
    return _this;
  }

  _createClass(DatetimeField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var slotValue = Datetime.getSlotFormattedValue(nextProps.value, nextProps);
      this.setState({
        slotValue: slotValue
      });
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      var t = this;
      t.valueChanged = true;
      if (t.props.onSelect) {
        t.props.onSelect(value);
      } else {
        t.props.onConfirm(value);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (!t.props.readOnly && t.slot) {
        t.slot.show();
      }
    }
  }, {
    key: 'formatter',
    value: function formatter(value) {
      var t = this;

      // 用户未点击过确认，即：未进行过日期选择，如果值合法，则展示格式化后的值，如果值非法，则原样输出
      // 只读状态下，可能传递一些用于加密的"***"之类的字符
      if (!t.valueChanged) {
        var date = void 0;
        var result = void 0;
        var propValue = t.props.value;
        if (isObject(propValue)) {
          date = propValue.value ? new Date(propValue.value) : new Date();
          result = propValue.value;
        } else {
          date = propValue ? new Date(parseInt(propValue, 10)) : new Date();
          result = propValue;
        }
        if (isNaN(date.getTime())) {
          return result;
        }
      }

      var columns = t.props.columns;
      var arr = value.map(function (v) {
        return addZero(v.text);
      });

      if (columns.indexOf('YMD') !== -1 || columns.indexOf('YMDW') !== -1) {
        return ((arr[0] || '') + ' ' + arr.slice(1).join(':')).replace(new RegExp('/', 'gi'), '-');
      }

      return arr.slice(0, 3).join('-') + ' ' + arr.slice(3).join(':');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var _t$props = t.props,
          className = _t$props.className,
          value = _t$props.value,
          placeholder = _t$props.placeholder,
          readOnly = _t$props.readOnly;


      return React.createElement(
        Field,
        _extends({}, t.props, {
          icon: t.props.readOnly ? null : {
            className: Context.prefixClass('datetime-field-icon'),
            name: 'angle-right',
            width: 26,
            height: 26,
            onClick: t.handleClick.bind(t)
          },
          className: classnames(Context.prefixClass('datetime-field'), _defineProperty({}, className, !!className))
        }),
        React.createElement(
          'div',
          { onClick: t.handleClick.bind(t) },
          isObject(value) && value.value || !isObject(value) && value ? '' : React.createElement(
            'div',
            { className: Context.prefixClass('omit datetime-field-placeholder') },
            placeholder
          ),
          React.createElement(
            'div',
            { className: Context.prefixClass('datetime-field-value FBH FBAC') },
            React.createElement(
              'span',
              {
                className: classnames(Context.prefixClass('FB1 omit'), _defineProperty({}, Context.prefixClass('datetime-field-readonly'), !!readOnly))
              },
              t.formatter(t.state.slotValue)
            )
          )
        ),
        React.createElement(Datetime, {
          slotRef: function slotRef(c) {
            _this2.slot = c;
          },
          title: t.props.label,
          locale: t.props.locale,
          columns: t.props.columns,
          value: t.props.value,
          confirmText: t.props.confirmText,
          cancelText: t.props.cancelText,
          onCancel: t.props.onCancel.bind(t),
          onConfirm: t.handleConfirm.bind(t)
        })
      );
    }
  }]);

  return DatetimeField;
}(React.Component);

DatetimeField.Y = Datetime.Y;
DatetimeField.YM = Datetime.YM;
DatetimeField.YMD = Datetime.YMD;
DatetimeField.YMDT = Datetime.YMDT;
DatetimeField.YMDHM = Datetime.YMDHM;
DatetimeField.YMDWHM = Datetime.YMDWHM;

DatetimeField.defaultProps = _extends({}, Datetime.defaultProps, {
  label: '',
  readOnly: false,
  placeholder: '',
  onSelect: function onSelect(_) {
    return _;
  }
});

// http://facebook.github.io/react/docs/reusable-components.html
DatetimeField.propTypes = _extends({}, Datetime.propTypes, {
  label: React.PropTypes.string.isRequired,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  onSelect: React.PropTypes.func
});

DatetimeField.displayName = 'DatetimeField';

module.exports = DatetimeField;