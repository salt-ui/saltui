'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CascadeSelectField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var cloneDeep = require('lodash/fp/cloneDeep');

var Context = require('../Context');
var Slot = require('../Slot');
var Field = require('../Field');
var Popup = require('../Popup');
var CascadeSlot = require('./CascadeSlot');

function parseProps(p) {
  var props = cloneDeep(p);
  var options = props.options,
      value = props.value;

  var cursor = options;
  options = [];
  value = value || [];
  var confirmedValue = value.length ? value : [];

  var _loop = function _loop(deep) {
    var index = 0;
    options[deep] = cursor.map(function (o, i) {
      var option = {
        value: o.value,
        text: o.label
      };
      var val = value[deep];
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && 'value' in value[deep]) {
        val = value[deep].value;
      }
      if (o.value === val) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  };

  for (var deep = 0; cursor && deep < props.columns.length; deep++) {
    _loop(deep);
  }
  // when its readOnly mode show whatever passed in values
  if (props.readOnly && props.options && props.options.length <= 0) {
    var values = value.map(function (v) {
      return { text: v, value: v };
    });
    return {
      options: [],
      value: values,
      confirmedValue: values,
      originOptions: p.options
    };
  }
  return {
    options: options,
    value: value,
    confirmedValue: confirmedValue,
    originOptions: p.options
  };
}

function parseState(value, options) {
  var cursor = options;
  options = [];

  var _loop2 = function _loop2(deep) {
    var index = 0;
    options[deep] = cursor.map(function (o, i) {
      var option = {
        value: o.value,
        text: o.label
      };
      if (deep in value && o.value == value[deep].value) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  };

  for (var deep = 0; cursor; deep++) {
    _loop2(deep);
  }
  return {
    options: options,
    value: value
  };
}

var CascadeSelectField = function (_React$Component) {
  _inherits(CascadeSelectField, _React$Component);

  function CascadeSelectField(props) {
    _classCallCheck(this, CascadeSelectField);

    var _this = _possibleConstructorReturn(this, (CascadeSelectField.__proto__ || Object.getPrototypeOf(CascadeSelectField)).call(this, props));

    var t = _this;

    // 数据格式化
    t.state = parseProps(props);
    t.state.confirmedValue = props.value ? t.state.value : [];
    return _this;
  }

  // 外部变更选中值


  _createClass(CascadeSelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      t.setState(parseProps(nextProps));
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (!t.props.readOnly) {
        if (t.props.mode === 'normal') {
          t.refs.slot.show();
        } else if (t.props.mode === 'complex') {
          // this.setState({ cascadeSlotVisible: true });
          this.showCascadeSlot();
        }
      }
    }
  }, {
    key: 'showCascadeSlot',
    value: function showCascadeSlot() {
      var t = this;
      Popup.show(React.createElement(CascadeSlot, {
        visible: true,
        title: t.props.label,
        confirmText: t.props.confirmText,
        cancelText: t.props.cancelText,
        options: t.state.originOptions,
        value: t.state.value,
        onChange: t.handleChange.bind(t),
        onCancel: t.handleCancel.bind(t),
        onConfirm: t.handleConfirm.bind(t)
      }), { maskClosable: false });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      var t = this;
      t.setState(parseState(value, t.props.options));
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      var t = this;
      // 确认选中项目
      t.props.onSelect(value);
      Popup.hide();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var t = this;
      if (t.state.confirmedValue.length) {
        t.setState(parseState(t.state.confirmedValue, t.props.options));
      }
      Popup.hide();
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      return React.createElement(
        Field,
        _extends({}, t.props, {
          icon: t.props.readOnly ? null : {
            className: Context.prefixClass('cascade-select-field-icon'),
            name: 'angle-right',
            width: 26,
            height: 26,
            onClick: t.handleClick.bind(t)
          },
          className: classnames(Context.prefixClass('cascade-select-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        React.createElement(
          'div',
          { onClick: t.handleClick.bind(t) },
          !t.state.confirmedValue.length ? React.createElement(
            'div',
            { className: Context.prefixClass('omit cascade-select-field-placeholder') },
            t.props.placeholder
          ) : '',
          React.createElement(
            'div',
            { className: Context.prefixClass('cascade-select-field-value FBH FBAC') },
            React.createElement(
              'span',
              {
                className: classnames(Context.prefixClass('FB1 omit'), _defineProperty({}, Context.prefixClass('cascade-select-field-readonly'), !!t.props.readOnly))
              },
              t.props.formatter(t.state.confirmedValue)
            )
          )
        ),
        this.props.mode === 'normal' ? React.createElement(Slot, {
          ref: 'slot',
          title: t.props.label,
          confirmText: t.props.confirmText,
          cancelText: t.props.cancelText,
          data: t.state.options,
          value: t.state.value,
          onChange: t.handleChange.bind(t),
          onCancel: t.handleCancel.bind(t),
          onConfirm: t.handleConfirm.bind(t),
          columns: t.props.columns
        }) : null
      );
    }
  }]);

  return CascadeSelectField;
}(React.Component);

CascadeSelectField.defaultProps = {
  options: [],
  value: [],
  formatter: function formatter(value) {
    return value.map(function (v) {
      return v.text;
    }).join('/');
  },
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  readOnly: false,
  placeholder: '',
  columns: [],
  mode: 'normal'
};

// http://facebook.github.io/react/docs/reusable-components.html
CascadeSelectField.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array,
  value: React.PropTypes.array,
  formatter: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  columns: React.PropTypes.array,
  mode: React.PropTypes.oneOf(['normal', 'complex'])
};

CascadeSelectField.displayName = 'CascadeSelectField';

module.exports = CascadeSelectField;