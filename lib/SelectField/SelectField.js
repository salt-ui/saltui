'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SelectField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var AngleRight = require('salt-icon/lib/AngleRight');
var Context = require('../Context');
var Slot = require('../Slot');
var Field = require('../Field');

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
        value: [value],
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
      var icon = !t.props.readOnly ? React.createElement(AngleRight, {
        className: Context.prefixClass('select-field-icon'),
        width: 26,
        height: 26,
        onClick: t.handleClick.bind(t)
      }) : null;
      return React.createElement(
        Field,
        _extends({}, t.props, { icon: icon,
          className: classnames(Context.prefixClass('select-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        React.createElement(
          'div',
          { onClick: t.handleClick.bind(t) },
          !t.state.confirmedValue[0] ? React.createElement(
            'div',
            { className: Context.prefixClass('omit select-field-placeholder') },
            t.props.placeholder
          ) : '',
          React.createElement(
            'div',
            { className: Context.prefixClass('select-field-value FBH FBAC') },
            React.createElement(
              'span',
              {
                className: classnames(Context.prefixClass('FB1 omit'), _defineProperty({}, Context.prefixClass('select-field-readonly'), !!t.props.readOnly))
              },
              t.props.formatter(t.state.confirmedValue[0])
            )
          )
        ),
        React.createElement(Slot, {
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
}(React.Component);

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
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.object,
  formatter: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string
};

SelectField.displayName = 'SelectField';

module.exports = SelectField;