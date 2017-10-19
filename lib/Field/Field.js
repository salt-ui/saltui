'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Symbol = require('salt-icon/dist/Symbol');

var _Symbol2 = _interopRequireDefault(_Symbol);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _NoteRound = require('salt-icon/lib/NoteRound');

var _NoteRound2 = _interopRequireDefault(_NoteRound);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Field Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author gnosaij
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var Field = function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
  }

  _createClass(Field, [{
    key: 'renderErrMsg',
    value: function renderErrMsg() {
      var _this2 = this;

      if (!this.props.errMsg) return null;
      var Toast = this.props.toastComponent;
      return _react2.default.createElement(_NoteRound2.default, {
        className: prefixClass('field-error-icon'),
        onClick: function onClick(e) {
          if (Toast) {
            e.stopPropagation();
            Toast.show({
              content: _this2.props.errMsg
            });
          }
        }
      });
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      var t = this;
      if (t.props.icon) {
        var icon = null;
        if (typeof t.props.icon.type === 'function') {
          icon = t.props.icon;
        } else if (t.props.icon.name) {
          icon = _react2.default.createElement(_Symbol2.default, t.props.icon);
        }
        if (icon) {
          return icon;
        }
      }
      return null;
    }
  }, {
    key: 'renderTip',
    value: function renderTip() {
      var t = this;
      if (!t.props.readOnly && t.props.tip) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames5.default)(prefixClass('field-box FBH field-tip-box')) },
          t.props.layout === 'h' ? t.renderLabel({ className: prefixClass('field-tip-placeholder') }) : null,
          _react2.default.createElement(
            'div',
            { className: prefixClass('FBH FBAC LH1_5 field-tip') },
            t.props.tip
          )
        );
      }
      return null;
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var t = this;
      if (t.props.label) {
        return _react2.default.createElement(_Label2.default, _extends({
          label: t.props.label,
          required: t.props.required,
          layout: t.props.layout
        }, options));
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2;

      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames5.default)(prefixClass('field'), _defineProperty({}, t.props.className, !!t.props.className))
        },
        t.props.layout === 'v' ? t.renderLabel() : null,
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames5.default)(prefixClass('field-box FBH'), (_classnames2 = {}, _defineProperty(_classnames2, prefixClass('TE'), t.props.tappable), _defineProperty(_classnames2, prefixClass('FBAC'), !t.props.multiLine), _classnames2))
          },
          t.props.layout === 'h' ? t.renderLabel() : null,
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames5.default)(prefixClass('FB1 PR'), _defineProperty({}, prefixClass('field-multi'), t.props.multiLine))
            },
            t.props.children
          ),
          t.props.extra,
          t.props.icon || t.props.errMsg ? _react2.default.createElement(
            'div',
            { className: prefixClass('FBH FBAC field-icon') },
            this.renderErrMsg(),
            this.renderIcon()
          ) : null
        ),
        this.renderTip()
      );
    }
  }]);

  return Field;
}(_react2.default.Component);

Field.defaultProps = {
  label: '',
  tappable: false,
  required: false,
  readOnly: false,
  multiLine: false,
  layout: 'h',
  tip: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
Field.propTypes = {
  label: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.object,
  required: _react2.default.PropTypes.bool,
  tappable: _react2.default.PropTypes.bool,
  readOnly: _react2.default.PropTypes.bool,
  multiLine: _react2.default.PropTypes.bool,
  layout: _react2.default.PropTypes.oneOf(['h', 'v']),
  tip: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  extra: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  toastComponent: _react2.default.PropTypes.func,
  errMsg: _react2.default.PropTypes.string
};

Field.getFieldProps = function () {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var fieldProps = {};
  Object.keys(props).forEach(function (key) {
    if (key in Field.propTypes) {
      fieldProps[key] = props[key];
    }
  });
  return fieldProps;
};

Field.displayName = 'Field';

exports.default = Field;
module.exports = exports['default'];