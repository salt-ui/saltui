'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SwitchField Component for tingle
 * @dongrui.yang
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var Switch = require('../Switch');
var Field = require('../Field');
var classnames = require('classnames');
var Context = require('../Context');

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
      return React.createElement(
        Field,
        _extends({}, t.props, {
          className: classnames(Context.prefixClass('switch-field'), t.props.className, {
            readOnly: t.props.readOnly
          })
        }),
        React.createElement(
          'div',
          { className: 't-FBH' },
          React.createElement('div', { className: 't-FB1' }),
          React.createElement(Switch, {
            on: this.props.on,
            readOnly: t.props.readOnly,
            onChange: this.handleChange.bind(this)
          })
        )
      );
    }
  }]);

  return SwitchField;
}(React.Component);

SwitchField.defaultProps = {
  label: '',
  className: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
SwitchField.propTypes = {
  label: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  on: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

SwitchField.displayName = 'SwitchField';

module.exports = SwitchField;