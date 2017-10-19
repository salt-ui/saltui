'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _uxcoreFormatter = require('uxcore-formatter');

var _uxcoreFormatter2 = _interopRequireDefault(_uxcoreFormatter);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NumberField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NumberField = function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField() {
    _classCallCheck(this, NumberField);

    return _possibleConstructorReturn(this, (NumberField.__proto__ || Object.getPrototypeOf(NumberField)).apply(this, arguments));
  }

  _createClass(NumberField, [{
    key: 'getValue',
    value: function getValue() {
      var _props = this.props,
          value = _props.value,
          type = _props.type,
          delimiter = _props.delimiter,
          format = _props.format,
          fixedNum = _props.fixedNum;

      if (value === undefined || value === null) return '';
      var newValue = '' + value;
      if (format) {
        return format(newValue, delimiter);
      }
      if (type === 'money') {
        if (newValue.match(/\.(\d+)/) && newValue.match(/\.(\d+)/)[1].length > fixedNum) {
          return _uxcoreFormatter2.default.money(newValue, delimiter, fixedNum);
        }
        return _uxcoreFormatter2.default.money(newValue, delimiter);
      } else if (['card', 'cnmobile'].indexOf(type) !== -1) {
        return _uxcoreFormatter2.default[type](newValue, delimiter);
      }
      return newValue;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      var _props2 = this.props,
          deFormat = _props2.deFormat,
          onChange = _props2.onChange,
          delimiter = _props2.delimiter;

      onChange(deFormat(value, delimiter));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;

      var _t$props = t.props,
          prefixCls = _t$props.prefixCls,
          className = _t$props.className,
          otherProps = _objectWithoutProperties(_t$props, ['prefixCls', 'className']);

      ['value', 'onChange'].forEach(function (key) {
        delete otherProps[key];
      });
      return _react2.default.createElement(_TextField2.default, _extends({}, otherProps, {
        className: (0, _classnames3.default)(prefixCls, _defineProperty({}, className, !!className)),
        value: this.getValue(),
        onChange: function onChange(value) {
          _this2.handleChange(value);
        }
      }));
    }
  }]);

  return NumberField;
}(_react2.default.Component);

NumberField.propTypes = {
  className: _react2.default.PropTypes.string,
  prefixCls: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  deFormat: _react2.default.PropTypes.func,
  format: _react2.default.PropTypes.func,
  type: _react2.default.PropTypes.oneOf(['money', 'card', 'cnmobile', 'cnidcard']),
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  delimiter: _react2.default.PropTypes.string,
  fixedNum: _react2.default.PropTypes.number
};
NumberField.defaultProps = {
  prefixCls: 't-number-field',
  onChange: function onChange() {},
  delimiter: ' ',
  deFormat: function deFormat(str, delimiter) {
    return str.split(delimiter).join('');
  }
};
NumberField.displayName = 'NumberField';
exports.default = NumberField;
module.exports = exports['default'];