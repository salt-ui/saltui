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

var _AngleRight = require('salt-icon/lib/AngleRight');

var _AngleRight2 = _interopRequireDefault(_AngleRight);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SelectField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author caoke.ck
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var isNil = function isNil(value) {
  return value === null || value === undefined;
};

var SelectField = function (_React$Component) {
  _inherits(SelectField, _React$Component);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props));

    var t = _this;
    var value = props.value;
    t.state = {
      value: isNil(value) ? value : [value],
      confirmedValue: [value]
    };
    return _this;
  }

  // 外部变更选中值


  _createClass(SelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var value = nextProps.value;
      t.setState({
        value: isNil(value) ? value : [value],
        confirmedValue: [value]
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (!t.props.readOnly) {
        t.slot.show();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      this.props.onSelect(value[0]);
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var t = this;
      t.setState({
        value: t.state.confirmedValue
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var icon = !t.props.readOnly ? _react2.default.createElement(_AngleRight2.default, {
        className: _Context2.default.prefixClass('select-field-icon'),
        width: 26,
        height: 26,
        onClick: t.handleClick.bind(t)
      }) : null;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          icon: icon,
          className: (0, _classnames4.default)(_Context2.default.prefixClass('select-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(
          'div',
          { onClick: t.handleClick.bind(t) },
          !t.state.confirmedValue[0] ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('omit select-field-placeholder') },
            t.props.placeholder
          ) : '',
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('select-field-value FBH FBAC') },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(_Context2.default.prefixClass('FB1 omit'), _defineProperty({}, _Context2.default.prefixClass('select-field-readonly'), !!t.props.readOnly))
              },
              t.props.formatter(t.state.confirmedValue[0])
            )
          )
        ),
        _react2.default.createElement(_Slot2.default, {
          ref: function ref(c) {
            _this2.slot = c;
          },
          title: t.props.label,
          confirmText: t.props.confirmText,
          cancelText: t.props.cancelText,
          data: [t.props.options],
          value: t.state.value,
          onChange: t.handleChange.bind(t),
          onCancel: t.handleCancel.bind(t),
          onConfirm: t.handleConfirm.bind(t)
        })
      );
    }
  }]);

  return SelectField;
}(_react2.default.Component);

SelectField.defaultProps = {
  options: [],
  formatter: function formatter(value) {
    return value ? value.text : '';
  },
  onSelect: function onSelect() {},

  readOnly: false,
  placeholder: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectField.propTypes = {
  className: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string.isRequired,
  options: _react2.default.PropTypes.array.isRequired,
  value: _react2.default.PropTypes.object,
  formatter: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  readOnly: _react2.default.PropTypes.bool,
  placeholder: _react2.default.PropTypes.string
};

SelectField.displayName = 'SelectField';

exports.default = SelectField;
module.exports = exports['default'];