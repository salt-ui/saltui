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

var _Context2 = _interopRequireDefault(_Context);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _SearchPanel = require('./SearchPanel');

var _SearchPanel2 = _interopRequireDefault(_SearchPanel);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PickerField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author longyan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PickerField = function (_React$Component) {
  _inherits(PickerField, _React$Component);

  _createClass(PickerField, null, [{
    key: 'normalizeValue',
    value: function normalizeValue(input) {
      if (input) {
        if (_utils2.default.isArray(input)) {
          return input;
        }
        if (input.text) {
          return [input];
        }
      }
      return [];
    }
  }]);

  function PickerField(props) {
    _classCallCheck(this, PickerField);

    var _this = _possibleConstructorReturn(this, (PickerField.__proto__ || Object.getPrototypeOf(PickerField)).call(this, props));

    var t = _this;
    var value = PickerField.normalizeValue(props.value);
    t.state = {
      value: value,
      confirmedValue: value,
      popupVisible: false
    };

    t.listener = t.handleHidePopup.bind(t);
    return _this;
  }

  _createClass(PickerField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var value = PickerField.normalizeValue(nextProps.value);
      t.setState({
        value: value,
        confirmedValue: value
      });
    }
  }, {
    key: 'handleHidePopup',
    value: function handleHidePopup(e) {
      var state = e.state;

      if (!state || !state.PickerField) {
        var t = this;
        window.removeEventListener('popstate', t.listener, false);
        t.setState({
          popupVisible: false
        });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (!t.props.readOnly) {
        t.setState({
          popupVisible: true
        }, function () {
          history.pushState({
            PickerField: 'SearchPanel.index'
          }, '', _utils2.default.addUrlParam('PICKER', Date.now()));

          window.addEventListener('popstate', t.listener, false);
        });
      }
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(value) {
      var t = this;
      t.setState({
        confirmedValue: value,
        value: value
      });
      t.props.onSelect(t.props.multiple ? value : value[0]);
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
    key: 'renderResult',
    value: function renderResult() {
      if (this.props.multiple) {
        return this.state.confirmedValue.map(this.props.formatter).join('；');
      }
      return this.props.formatter(this.state.confirmedValue[0]);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var icon = t.props.readOnly ? null : {
        className: _Context2.default.prefixClass('picker-field-icon'),
        name: 'angle-right',
        width: 26,
        height: 26,
        onClick: function onClick(e) {
          t.handleClick(e);
        }
      };

      var panelProps = {
        value: t.state.confirmedValue,
        confirmText: t.props.confirmText,
        cancelText: t.props.cancelText,
        onConfirm: function onConfirm(value) {
          t.handleConfirm(value);
          history.go(-1);
        },
        fetchUrl: t.props.fetchUrl,
        fetchDataOnOpen: t.props.fetchDataOnOpen,
        dataType: t.props.dataType,
        beforeFetch: t.props.beforeFetch,
        fitResponse: t.props.fitResponse,
        afterFetch: t.props.afterFetch,
        showSearch: t.props.showSearch,
        searchTitle: t.props.searchTitle || t.props.placeholder,
        searchDelay: t.props.searchDelay,
        searchPlaceholder: t.props.searchPlaceholder,
        searchNotFoundContent: t.props.searchNotFoundContent,
        formatter: t.props.formatter,
        multiple: t.props.multiple,
        selectText: t.props.selectText,
        searchText: t.props.searchText
      };

      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          icon: icon,
          className: (0, _classnames4.default)(_Context2.default.prefixClass('picker-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(
          'div',
          {
            onClick: function onClick(e) {
              t.handleClick(e);
            }
          },
          !t.state.confirmedValue[0] ? _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('omit picker-field-placeholder') },
            t.props.placeholder
          ) : '',
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('picker-field-value FBH FBAC') },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(_Context2.default.prefixClass('FB1 omit'), _defineProperty({}, _Context2.default.prefixClass('picker-field-readonly'), t.props.readOnly))
              },
              t.renderResult()
            )
          )
        ),
        _react2.default.createElement(_Popup2.default, { visible: this.state.popupVisible, animationType: 'slide-left', content: _react2.default.createElement(_SearchPanel2.default, panelProps) })
      );
    }
  }]);

  return PickerField;
}(_react2.default.Component);

PickerField.defaultProps = {
  readOnly: false,
  placeholder: '请选择',
  searchText: '搜索',
  confirmText: '确认',
  cancelText: '取消',
  fetchUrl: '',
  fetchDataOnOpen: true,
  dataType: 'jsonp',
  beforeFetch: function beforeFetch(obj) {
    return obj;
  },
  fitResponse: function fitResponse(response) {
    return {
      content: response.content || response,
      success: response.success === undefined ? true : response.success
    };
  },
  afterFetch: function afterFetch(obj) {
    return obj;
  },
  showSearch: true,
  searchTitle: '',
  searchDelay: 100,
  searchPlaceholder: '搜索',
  searchNotFoundContent: '无搜索结果',
  formatter: function formatter(value) {
    return value ? value.text : '';
  },
  onSelect: function onSelect() {},

  multiple: false,
  selectText: '已选择：'
};

// http://facebook.github.io/react/docs/reusable-components.html
PickerField.propTypes = {
  className: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string.isRequired,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),
  readOnly: _react2.default.PropTypes.bool,
  placeholder: _react2.default.PropTypes.string,
  searchText: _react2.default.PropTypes.string,
  confirmText: _react2.default.PropTypes.string,
  cancelText: _react2.default.PropTypes.string,
  fetchUrl: _react2.default.PropTypes.string.isRequired,
  fetchDataOnOpen: _react2.default.PropTypes.bool,
  dataType: _react2.default.PropTypes.string,
  beforeFetch: _react2.default.PropTypes.func,
  fitResponse: _react2.default.PropTypes.func,
  afterFetch: _react2.default.PropTypes.func,
  showSearch: _react2.default.PropTypes.bool,
  searchTitle: _react2.default.PropTypes.string,
  searchDelay: _react2.default.PropTypes.number,
  searchPlaceholder: _react2.default.PropTypes.string,
  searchNotFoundContent: _react2.default.PropTypes.string,
  formatter: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  multiple: _react2.default.PropTypes.bool,
  selectText: _react2.default.PropTypes.string
};

PickerField.displayName = 'PickerField';

exports.default = PickerField;
module.exports = exports['default'];