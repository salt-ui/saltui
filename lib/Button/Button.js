'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadingRound = require('salt-icon/lib/LoadingRound');

var _LoadingRound2 = _interopRequireDefault(_LoadingRound);

var _utils = require('./utils');

var _TextButton = require('./TextButton');

var _TextButton2 = _interopRequireDefault(_TextButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Button Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author cm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright 2014-2016, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.onClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'handleClick',
    value: function handleClick(evt) {
      if (!this.props.disabled) {
        this.props.onClick(evt);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classSet;

      var _props = this.props,
          type = _props.type,
          className = _props.className,
          style = _props.style,
          size = _props.size,
          loading = _props.loading,
          display = _props.display,
          disabled = _props.disabled;

      if (type === 'text') {
        return _react2.default.createElement(_TextButton2.default, this.props);
      }

      var normal = display === 'normal';
      var inline = display === 'inline';
      var banner = display === 'banner';

      var primary = type === 'primary';
      var secondary = type === 'secondary';
      var danger = type === 'danger';
      var minor = type === 'minor';

      var classSet = (_classSet = {}, _defineProperty(_classSet, className, !!className), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button'), true), _defineProperty(_classSet, 'disabled', disabled), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-primary'), primary && !disabled), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-secondary'), secondary && !disabled), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-minor'), minor && !disabled), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-danger'), danger && !disabled), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-loading'), loading), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-normal'), normal), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-inline'), inline), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-banner'), banner), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-size-small'), size === 'small'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-size-medium'), size === 'medium'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('button-size-large'), size === 'large'), _classSet);

      var iconHTML = void 0;
      if (loading) {
        iconHTML = _react2.default.createElement(_LoadingRound2.default, { className: (0, _utils.prefixClass)('button-loading-icon') });
      }

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(classSet),
          disabled: disabled,
          style: style,
          onClick: this.onClick
        },
        iconHTML,
        this.props.children
      );
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.defaultProps = {
  className: '',
  style: {},
  size: 'medium',
  type: 'primary',
  onClick: function onClick() {},

  children: null,
  display: 'normal',
  loading: false,
  disabled: false
};

// http://facebook.github.io/react/docs/reusable-components.html
Button.propTypes = {
  className: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  size: _react2.default.PropTypes.oneOf(['medium', 'large', 'small']),
  type: _react2.default.PropTypes.oneOf(['primary', 'secondary', 'minor', 'danger']),
  onClick: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.node,
  display: _react2.default.PropTypes.oneOf(['inline', 'normal', 'banner']),
  loading: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool
};

Button.displayName = 'Button';

exports.default = Button;
module.exports = exports['default'];