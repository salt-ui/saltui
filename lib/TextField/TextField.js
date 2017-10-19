'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TextField Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');
var Field = require('../Field');
var CrossRound = require('salt-icon/lib/CrossRound');

var prefixClass = Context.prefixClass;

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
      React.Children.forEach(this.props.children, function (child) {
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
      return React.createElement(
        'div',
        { className: prefixClass('text-field-content-main') },
        React.createElement(
          'div',
          {
            className: classnames(prefixClass('omit text-field-placeholder'), _defineProperty({}, prefixClass('DN'), t.props.value !== ''))
          },
          t.props.placeholder
        ),
        React.createElement('input', {
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
        return React.createElement(CrossRound, {
          onClick: function onClick(e) {
            _this2.props.onChange('', e);
          },
          className: classnames(prefixClass('text-field-clear-icon'), _defineProperty({}, prefixClass('text-field-clear-icon__hasRight'), addons.right || addons.count))
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
      return React.createElement(
        Field,
        _extends({}, t.props, {
          className: classnames(prefixClass('text-field'), t.props.className, {
            readonly: t.props.readOnly
          })
        }),
        React.createElement(
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
}(React.Component);

TextField.defaultProps = {
  className: '',
  filter: function filter(v) {
    return v;
  },
  label: '',
  onChange: Context.noop,
  onFocus: Context.noop,
  onBlur: Context.noop,
  placeholder: '',
  readOnly: false,
  type: 'text',
  value: '',
  allowClear: true
};

TextField.propTypes = {
  className: React.PropTypes.string,
  filter: React.PropTypes.func,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  children: React.PropTypes.any,
  allowClear: React.PropTypes.bool
};

TextField.displayName = 'TextField';

module.exports = TextField;