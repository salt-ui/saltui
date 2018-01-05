'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextButton = function (_React$Component) {
  _inherits(TextButton, _React$Component);

  function TextButton(props) {
    _classCallCheck(this, TextButton);

    var _this = _possibleConstructorReturn(this, (TextButton.__proto__ || Object.getPrototypeOf(TextButton)).call(this, props));

    _this.onClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(TextButton, [{
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
          className = _props.className,
          style = _props.style,
          type = _props.type,
          disabled = _props.disabled,
          display = _props.display,
          size = _props.size;


      var classSet = (_classSet = {}, _defineProperty(_classSet, '' + (0, _utils.prefixClass)('FBH FBAC FBJC'), true), _defineProperty(_classSet, className, !!className), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button'), true), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-primary'), type === 'primary'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-secondary'), type === 'secondary'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-inline'), display === 'inline'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-size-small'), size === 'small'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-size-medium'), size === 'medium'), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('text-button-size-large'), size === 'large'), _defineProperty(_classSet, 'disabled', disabled), _classSet);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(classSet),
          disabled: disabled,
          style: style,
          onClick: this.onClick
        },
        this.props.children
      );
    }
  }]);

  return TextButton;
}(_react2.default.Component);

TextButton.defaultProps = {
  className: '',
  style: {},
  size: 'medium',
  type: 'primary',
  onClick: function onClick() {},

  children: null,
  display: 'normal',
  disabled: false
};

// http://facebook.github.io/react/docs/reusable-components.html
TextButton.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  type: _propTypes2.default.oneOf(['primary', 'secondary']),
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.node,
  display: _propTypes2.default.oneOf(['inline', 'normal']),
  disabled: _propTypes2.default.bool
};

TextButton.displayName = 'TextButton';

exports.default = TextButton;
module.exports = exports['default'];