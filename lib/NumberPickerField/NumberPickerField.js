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

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _NumberPicker = require('../NumberPicker');

var _NumberPicker2 = _interopRequireDefault(_NumberPicker);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NumberPickerField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author sujingjing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NumberPickerField = function (_React$Component) {
  _inherits(NumberPickerField, _React$Component);

  function NumberPickerField() {
    _classCallCheck(this, NumberPickerField);

    return _possibleConstructorReturn(this, (NumberPickerField.__proto__ || Object.getPrototypeOf(NumberPickerField)).apply(this, arguments));
  }

  _createClass(NumberPickerField, [{
    key: 'handleChange',
    value: function handleChange(value) {
      var t = this;
      t.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, { className: (0, _classnames3.default)(_Context2.default.prefixClass('number-picker-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(_NumberPicker2.default, {
          onChange: t.handleChange.bind(t),
          className: _Context2.default.prefixClass('tingle-number-picker'),
          value: t.props.value,
          max: t.props.max,
          min: t.props.min,
          step: t.props.step,
          readOnly: t.props.readOnly,
          disabled: t.props.disabled
        })
      );
    }
  }]);

  return NumberPickerField;
}(_react2.default.Component);

NumberPickerField.propTypes = {
  className: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  max: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.number,
  step: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  label: _react2.default.PropTypes.string,
  readOnly: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool
};
NumberPickerField.defaultProps = {
  label: '',
  value: 0,
  max: undefined,
  min: undefined,
  step: 1,
  onChange: _Context2.default.noop,
  readOnly: false,
  disabled: false
};
NumberPickerField.displayName = 'NumberPickerField';
exports.default = NumberPickerField;
module.exports = exports['default'];