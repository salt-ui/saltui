'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Eye = require('salt-icon/lib/Eye');

var _Eye2 = _interopRequireDefault(_Eye);

var _EyeClose = require('salt-icon/lib/EyeClose');

var _EyeClose2 = _interopRequireDefault(_EyeClose);

var _Lock = require('salt-icon/lib/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PasswordInput Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author shumi.lg
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var prefixClass = _Context2.default.prefixClass;
var iconSize = '20px';

/**
 * 密码输入框
 *
 * @class PasswordInput
 * @extends {React.Component}
 */

var PasswordInput = function (_React$Component) {
  _inherits(PasswordInput, _React$Component);

  function PasswordInput(props) {
    _classCallCheck(this, PasswordInput);

    var _this = _possibleConstructorReturn(this, (PasswordInput.__proto__ || Object.getPrototypeOf(PasswordInput)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PasswordInput, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.decrypted !== this.props.decrypted) {
        if (this.input) {
          this.input.focus();
        }
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var value = e.target.value;
      this.props.onChange(value, e);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      this.props.onFocus(e);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      this.props.onBlur(e);
    }
  }, {
    key: 'handleEyeIconClick',
    value: function handleEyeIconClick(e) {
      var nextDecrypted = !this.props.decrypted;
      this.props.onDecryptedChange(nextDecrypted, e);
    }
  }, {
    key: 'renderPlaceHolder',
    value: function renderPlaceHolder() {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames5.default)(prefixClass('omit password-input-placeholder'), _defineProperty({}, prefixClass('DN'), this.props.value !== ''))
        },
        this.props.placeholder
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _this2 = this;

      var inputValue = this.props.value;
      var type = this.props.decrypted ? 'password' : 'text';

      return _react2.default.createElement('input', {
        ref: function ref(c) {
          _this2.input = c;
        },
        type: type,
        value: inputValue,
        className: (0, _classnames5.default)(prefixClass('password-input-text'), _defineProperty({}, prefixClass('password-input-text-decrypted'), this.props.decrypted)),
        onChange: function onChange(e) {
          _this2.handleChange(e);
        },
        onFocus: function onFocus(e) {
          _this2.handleFocus(e);
        },
        onBlur: function onBlur(e) {
          _this2.handleBlur(e);
        }
      });
    }
  }, {
    key: 'renderEyeIcon',
    value: function renderEyeIcon() {
      var _this3 = this;

      var EyeIcon = this.props.decrypted ? _EyeClose2.default : _Eye2.default;

      return _react2.default.createElement(EyeIcon, {
        className: (0, _classnames5.default)(prefixClass('password-input-right-icon')),
        width: iconSize,
        height: iconSize,
        onClick: function onClick(e) {
          _this3.handleEyeIconClick(e);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames5.default)(prefixClass('password-input FBAC FBH'), _defineProperty({}, this.props.className, !!this.props.className))
        },
        !this.props.hideIcon ? _react2.default.createElement(_Lock2.default, {
          className: (0, _classnames5.default)(prefixClass('password-input-left-icon')),
          width: iconSize,
          height: iconSize
        }) : null,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames5.default)(prefixClass('password-input-core')) },
          this.renderPlaceHolder(),
          this.renderInput()
        ),
        this.renderEyeIcon()
      );
    }
  }]);

  return PasswordInput;
}(_react2.default.Component);

PasswordInput.propTypes = {
  className: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  decrypted: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  onDecryptedChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  hideIcon: _react2.default.PropTypes.func
};
PasswordInput.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
  decrypted: true,
  onChange: _Context2.default.noop,
  onDecryptedChange: _Context2.default.noop,
  onFocus: _Context2.default.noop,
  onBlur: _Context2.default.noop,
  hideIcon: false
};
PasswordInput.displayName = 'PasswordInput';
exports.default = PasswordInput;
module.exports = exports['default'];