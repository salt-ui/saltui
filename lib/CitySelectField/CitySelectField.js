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

var _Context = require('../Context');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _CitySelector = require('./CitySelector');

var _CitySelector2 = _interopRequireDefault(_CitySelector);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CitySelectField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingnan.yqn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CitySelectField = function (_Component) {
  _inherits(CitySelectField, _Component);

  function CitySelectField(props) {
    _classCallCheck(this, CitySelectField);

    var _this = _possibleConstructorReturn(this, (CitySelectField.__proto__ || Object.getPrototypeOf(CitySelectField)).call(this, props));

    _this.state = {
      // 当前选中值
      value: _this.props.value || [],
      // 选择城市的浮层是否弹出
      selectorIsOpen: false
    };
    return _this;
  }

  _createClass(CitySelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }
  }, {
    key: 'openSelector',
    value: function openSelector() {
      if (this.props.readOnly) return;
      this.setState({ selectorIsOpen: true });
    }
  }, {
    key: 'closeSelector',
    value: function closeSelector() {
      this.setState({ selectorIsOpen: false });
      this.props.onCancel.call(null);
    }
  }, {
    key: 'selectValue',
    value: function selectValue(value) {
      this.setState({ value: value, selectorIsOpen: false });
      this.props.onSelect.call(null, value);
    }
  }, {
    key: 'renderSelector',
    value: function renderSelector() {
      if (!this.state.selectorIsOpen) return '';
      return _react2.default.createElement(_CitySelector2.default, _extends({}, this.props, {
        districtData: (0, _utils.clearChildren)(this.props.districtData, this.props.selectorType),
        value: [].concat(_toConsumableArray(this.state.value)),
        onSelect: this.selectValue.bind(this),
        onCancel: this.closeSelector.bind(this)
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          layout = _props.layout,
          required = _props.required,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          districtData = _props.districtData,
          tip = _props.tip;

      var fieldProps = { label: label, layout: layout, required: required, tip: tip, readOnly: readOnly };
      var isSelectedValue = !!this.state.value.length;
      var fieldClassName = (0, _classnames4.default)((0, _Context.prefixClass)('city-select-field'), _defineProperty({}, className, !!className));
      var fieldPlaceholderClassName = (0, _Context.prefixClass)('omit city-field-placeholder ' + (isSelectedValue ? 'DN' : ''));
      var fieldValueClassName = (0, _Context.prefixClass)('city-field-value FBH FBAC ' + (isSelectedValue ? '' : 'DN'));
      var fieldValueInnerClassName = (0, _classnames4.default)((0, _Context.prefixClass)('FB1 omit'), _defineProperty({}, (0, _Context.prefixClass)('city-field-readonly'), readOnly));
      var iconConfig = readOnly ? null : {
        className: (0, _Context.prefixClass)('city-field-icon'),
        name: 'angle-right',
        width: 26,
        height: 26,
        onClick: this.openSelector.bind(this)
      };
      var fieldValue = (0, _utils.findDistrictObjs)(districtData, this.state.value).map(function (i) {
        return i.label;
      }).join(' / ');

      // 针对只读模式下，如果没有匹配省份的值，则默认选择 props 传递过来的值
      if (readOnly && !fieldValue) {
        fieldValue = this.props.value.join(' / ');
      }

      return _react2.default.createElement(
        'div',
        { className: fieldClassName },
        _react2.default.createElement(
          _Field2.default,
          _extends({}, fieldProps, { icon: iconConfig }),
          _react2.default.createElement(
            'div',
            { onClick: this.openSelector.bind(this) },
            _react2.default.createElement(
              'div',
              { className: fieldPlaceholderClassName },
              placeholder
            ),
            _react2.default.createElement(
              'div',
              { className: fieldValueClassName },
              _react2.default.createElement(
                'span',
                { className: fieldValueInnerClassName },
                fieldValue
              )
            )
          ),
          this.renderSelector()
        )
      );
    }
  }]);

  return CitySelectField;
}(_react.Component);

CitySelectField.displayName = 'CitySelectField';
CitySelectField.propTypes = {
  className: _react.PropTypes.string,
  label: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  selectorType: _react.PropTypes.string,
  layout: _react.PropTypes.string,
  tip: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  value: _react.PropTypes.array,
  districtData: _react.PropTypes.array,
  required: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};
CitySelectField.defaultProps = {
  className: '',
  label: '省市区',
  placeholder: '请选择',
  layout: 'h', // v | h
  tip: '',
  selectorType: 'default', // default | city | province
  value: [],
  districtData: [],
  required: false,
  readOnly: false,
  onSelect: function onSelect() {},
  onCancel: function onCancel() {}
};
exports.default = CitySelectField;
module.exports = exports['default'];