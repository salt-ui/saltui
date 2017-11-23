'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = function (_React$Component) {
  _inherits(IconButton, _React$Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    var _this = _possibleConstructorReturn(this, (IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call(this, props));

    _this.onClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(IconButton, [{
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

      if (!this.props.children) {
        return null;
      }
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          type = _props.type,
          disabled = _props.disabled,
          size = _props.size;


      var primary = type === 'primary';
      var secondary = type === 'secondary';

      var classSet = (_classSet = {}, _defineProperty(_classSet, '' + (0, _utils.prefixClass)('FBH FBAC FBJC'), true), _defineProperty(_classSet, className, !!className), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('icon-button'), true), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('icon-button-primary'), primary), _defineProperty(_classSet, '' + (0, _utils.prefixClass)('icon-button-secondary'), secondary), _defineProperty(_classSet, 'disabled', disabled), _classSet);

      var iconHTML = _react2.default.cloneElement(this.props.children, {
        width: size,
        height: size
      });

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(classSet),
          disabled: disabled,
          style: style,
          onClick: this.onClick
        },
        iconHTML
      );
    }
  }]);

  return IconButton;
}(_react2.default.Component);

IconButton.defaultProps = {
  className: '',
  style: {},
  type: 'primary',
  size: 24,
  onClick: function onClick() {},

  disabled: false
};

// http://facebook.github.io/react/docs/reusable-components.html
IconButton.propTypes = {
  className: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  type: _react2.default.PropTypes.oneOf(['primary', 'secondary']),
  size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  onClick: _react2.default.PropTypes.func,
  disabled: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node.isRequired
};

IconButton.displayName = 'IconButton';

exports.default = IconButton;
module.exports = exports['default'];