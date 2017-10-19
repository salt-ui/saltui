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

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Rate = require('../Rate');

var _Rate2 = _interopRequireDefault(_Rate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * RateField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author yuguo.qyg
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RateField = function (_React$Component) {
  _inherits(RateField, _React$Component);

  function RateField() {
    _classCallCheck(this, RateField);

    return _possibleConstructorReturn(this, (RateField.__proto__ || Object.getPrototypeOf(RateField)).apply(this, arguments));
  }

  _createClass(RateField, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, _Field2.default.getFieldProps(t.props), {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('rate-field'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, 'readOnly', t.props.readOnly), _classnames))
        }),
        _react2.default.createElement(_Rate2.default, {
          total: t.props.total,
          width: 18,
          gap: t.props.gap,
          value: t.props.value,
          size: t.props.label ? 'normal' : t.props.size,
          showTip: t.props.label ? false : t.props.showTip,
          scoreTips: t.props.scoreTips,
          readOnly: t.props.readOnly,
          onChange: function onChange(value) {
            t.props.onChange(value);
          }
        })
      );
    }
  }]);

  return RateField;
}(_react2.default.Component);

RateField.propTypes = _extends({
  className: _react2.default.PropTypes.string
}, _Rate2.default.propTypes);
RateField.defaultProps = {};
RateField.displayName = 'RateField';
exports.default = RateField;
module.exports = exports['default'];