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

var _calculateHeight = require('./calculateHeight');

var _calculateHeight2 = _interopRequireDefault(_calculateHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TextareaField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zhangshun@alipay.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var TextareaField = function (_React$Component) {
  _inherits(TextareaField, _React$Component);

  function TextareaField(props) {
    _classCallCheck(this, TextareaField);

    var _this = _possibleConstructorReturn(this, (TextareaField.__proto__ || Object.getPrototypeOf(TextareaField)).call(this, props));

    _this.state = {
      height: null,
      rows: 1
    };
    return _this;
  }

  _createClass(TextareaField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.resize();
      }
    }
  }, {
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
    key: 'resize',
    value: function resize() {
      this.setState((0, _calculateHeight2.default)(this.textarea, this.props.minRows || this.props.rows, this.props.maxRows));
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.resize();
      this.props.onChange(e.target.value, e);
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
    key: 'renderCount',
    value: function renderCount() {
      var addons = this.getAddons();
      if (addons.count && !this.props.readOnly) {
        return addons.count;
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var t = this;
      var _t$props = t.props,
          placeholder = _t$props.placeholder,
          readOnly = _t$props.readOnly,
          lineHeight = _t$props.lineHeight;

      var style = {
        // height: t.state.height,
        lineHeight: lineHeight
      };

      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          multiLine: true,
          className: (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixClass('textarea-field'), true), _defineProperty(_classnames, 'readonly', readOnly), _defineProperty(_classnames, t.props.className, !!t.props.className), _classnames))
        }),
        _react2.default.createElement('textarea', {
          ref: function ref(c) {
            _this2.textarea = c;
          },
          className: prefixClass('textarea-field-content'),
          style: style,
          placeholder: placeholder,
          value: t.props.value,
          readOnly: readOnly,
          rows: t.state.rows,
          onChange: function onChange(e) {
            t.handleChange(e);
          },
          onFocus: function onFocus(e) {
            t.handleFocus(e);
          },
          onBlur: function onBlur(e) {
            t.handleBlur(e);
          }
        }),
        t.renderCount()
      );
    }
  }]);

  return TextareaField;
}(_react2.default.Component);

TextareaField.defaultProps = {
  placeholder: '',
  onChange: _Context2.default.noop,
  onFocus: _Context2.default.noop,
  onBlur: _Context2.default.noop,
  readOnly: false,
  minRows: 1,
  maxRows: 10,
  lineHeight: '1.3',
  value: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
TextareaField.propTypes = {
  value: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onBlur: _react2.default.PropTypes.func,
  readOnly: _react2.default.PropTypes.bool,
  minRows: _react2.default.PropTypes.number,
  maxRows: _react2.default.PropTypes.number,
  rows: _react2.default.PropTypes.number,
  lineHeight: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any
};

TextareaField.displayName = 'TextareaField';

exports.default = TextareaField;
module.exports = exports['default'];