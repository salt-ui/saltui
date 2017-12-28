'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CrossRound = require('salt-icon/lib/CrossRound');

var _CrossRound2 = _interopRequireDefault(_CrossRound);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TextField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var TextField = function (_React$Component) {
  _inherits(TextField, _React$Component);

  function TextField() {
    _classCallCheck(this, TextField);

    return _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).apply(this, arguments));
  }

  _createClass(TextField, [{
    key: 'getAddons',
    value: function getAddons() {
      var addons = {};
      _react2.default.Children.forEach(this.props.children, function (child) {
        if (typeof child.type === 'function') {
          if (child.type.displayName === 'LeftAddon' && !addons.left) {
            addons.left = child;
          } else if (child.type.displayName === 'RightAddon' && !addons.right) {
            addons.right = child;
          } else if (child.type.displayName === 'Count' && !addons.count) {
            addons.count = child;
          }
        }
      });
      return addons;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var value = this.props.filter(e.target.value);
      this.props.onChange(value, e);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      var t = this;
      t.props.onFocus(t.props.value, e);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var t = this;
      t.props.onBlur(t.props.value, e);
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var t = this;
      return _react2.default.createElement(
        'div',
        { className: prefixClass('text-field-content-main') },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames4.default)(prefixClass('omit text-field-placeholder'), _defineProperty({}, prefixClass('DN'), t.props.value !== ''))
          },
          t.props.placeholder
        ),
        _react2.default.createElement('input', {
          className: prefixClass('text-field-input'),
          type: t.props.type, value: t.props.value, readOnly: t.props.readOnly,
          onChange: function onChange(e) {
            t.handleChange(e);
          },
          onFocus: function onFocus(e) {
            t.handleFocus(e);
          },
          onBlur: function onBlur(e) {
            t.handleBlur(e);
          }
        })
      );
    }
  }, {
    key: 'renderLeft',
    value: function renderLeft(addons) {
      if (addons.left) {
        return addons.left;
      }
      return null;
    }
  }, {
    key: 'renderClear',
    value: function renderClear(addons) {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          allowClear = _props.allowClear,
          readOnly = _props.readOnly;

      if (value && allowClear && !readOnly) {
        return _react2.default.createElement(_CrossRound2.default, {
          onClick: function onClick(e) {
            _this2.props.onChange('', e);
          },
          className: (0, _classnames4.default)(prefixClass('text-field-clear-icon'), _defineProperty({}, prefixClass('text-field-clear-icon__hasRight'), addons.right || addons.count))
        });
      }
      return null;
    }
  }, {
    key: 'renderRight',
    value: function renderRight(addons) {
      if (addons.right) {
        return addons.right;
      }
      if (addons.count) {
        return addons.count;
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var addons = t.getAddons();
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          className: (0, _classnames4.default)(prefixClass('text-field'), t.props.className, {
            readonly: t.props.readOnly
          })
        }),
        _react2.default.createElement(
          'div',
          { className: prefixClass('text-field-content') },
          t.renderLeft(addons),
          t.renderInput(),
          t.renderClear(addons),
          t.renderRight(addons)
        )
      );
    }
  }]);

  return TextField;
}(_react2.default.Component);

TextField.defaultProps = {
  className: '',
  filter: function filter(v) {
    return v;
  },
  label: '',
  onChange: _Context2.default.noop,
  onFocus: _Context2.default.noop,
  onBlur: _Context2.default.noop,
  placeholder: '',
  readOnly: false,
  type: 'text',
  value: '',
  allowClear: true
};

TextField.propTypes = {
  className: _react2.default.PropTypes.string,
  filter: _react2.default.PropTypes.func,
  label: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  readOnly: _react2.default.PropTypes.bool,
  type: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any,
  allowClear: _react2.default.PropTypes.bool
};

TextField.displayName = 'TextField';

exports.default = TextField;
module.exports = exports['default'];