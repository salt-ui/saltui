'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SwitchField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @dongrui.yang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SwitchField = function (_React$Component) {
  _inherits(SwitchField, _React$Component);

  function SwitchField() {
    _classCallCheck(this, SwitchField);

    return _possibleConstructorReturn(this, (SwitchField.__proto__ || Object.getPrototypeOf(SwitchField)).apply(this, arguments));
  }

  _createClass(SwitchField, [{
    key: 'handleChange',
    value: function handleChange(on) {
      this.props.onChange(on);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('switch-field'), t.props.className, {
            readOnly: t.props.readOnly
          })
        }),
        _react2.default.createElement(
          'div',
          { className: 't-FBH' },
          _react2.default.createElement('div', { className: 't-FB1' }),
          _react2.default.createElement(_Switch2.default, {
            on: this.props.on,
            readOnly: t.props.readOnly,
            onChange: this.handleChange.bind(this)
          })
        )
      );
    }
  }]);

  return SwitchField;
}(_react2.default.Component);

SwitchField.defaultProps = {
  label: '',
  className: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
SwitchField.propTypes = {
  label: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  on: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

SwitchField.displayName = 'SwitchField';

exports.default = SwitchField;
module.exports = exports['default'];