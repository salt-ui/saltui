'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames8 = require('classnames');

var _classnames9 = _interopRequireDefault(_classnames8);

var _saltIcon = require('salt-icon');

var _saltIcon2 = _interopRequireDefault(_saltIcon);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _SelectLayer = require('./SelectLayer');

var _SelectLayer2 = _interopRequireDefault(_SelectLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * CheckboxField Component for tingle
                                                                                                                                                                                                                   * @author shanchao
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                   */


var prefixClass = _Context2.default.prefixClass;


var renderIcon = function renderIcon(checked, disable, position) {
  var iconClassName = (0, _classnames9.default)(prefixClass('checkbox-field-icon'), _defineProperty({
    checked: checked,
    'un-checked': !checked,
    disable: disable
  }, prefixClass('checkbox-field-icon') + '-list', true));
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames9.default)(prefixClass('checkbox-field-icon-wrapper FBH FBAC'), _defineProperty({}, position, !!position))
    },
    checked ? _react2.default.createElement(_saltIcon2.default, {
      key: 'check-round',
      width: 26,
      height: 26,
      name: 'check-round',
      className: iconClassName
    }) : _react2.default.createElement('div', { className: iconClassName })
  );
};

var CheckboxField = function (_React$Component) {
  _inherits(CheckboxField, _React$Component);

  function CheckboxField(props) {
    _classCallCheck(this, CheckboxField);

    var _this = _possibleConstructorReturn(this, (CheckboxField.__proto__ || Object.getPrototypeOf(CheckboxField)).call(this, props));

    var t = _this;
    t.state = {
      selectedText: ''
    };
    t.handleCancel = t.handleCancel.bind(t);
    t.handleClick = t.handleClick.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
    return _this;
  }

  _createClass(CheckboxField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getSelectedText(this.props.data);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.getSelectedText(nextProps.data);
    }
  }, {
    key: 'getSelectedText',
    value: function getSelectedText(data) {
      var _this2 = this;

      var selectedText = '';
      data.forEach(function (item) {
        if (item.checked) {
          if (_this2.props.mode === 'list') {
            selectedText = selectedText + _this2.props.titleBreakStr + item.text;
          } else {
            selectedText = selectedText + _this2.props.titleBreakStr + (item.slotText ? item.slotText : item.text);
          }
        }
      });

      if (selectedText) {
        selectedText = selectedText.substring(this.props.titleBreakStr.length);
      }

      this.state.selectedText = selectedText;
    }
  }, {
    key: 'getData',
    value: function getData() {
      var t = this;
      var data = [];

      t.props.data.forEach(function (item) {
        if (item.checked) {
          data.push(item);
        }
      });

      return data;
    }
  }, {
    key: 'clickAction',
    value: function clickAction(value, item, index, data) {
      var t = this;
      var onChange = t.props.onChange;
      var disable = item.disable;

      if (t.props.readOnly || disable) {
        return;
      }
      item.checked = !item.checked;
      onChange && onChange(t.getData());
      t.forceUpdate();
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      !this.props.readOnly && this.slot.show();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {}
  }, {
    key: 'handleConfirm',
    value: function handleConfirm(data) {
      this.state.value = data;
      this.getSelectedText(data);
      this.setState(this.state);
      this.props.onChange(data);
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      var _classnames3,
          _this3 = this;

      var t = this;
      var props = t.props;
      var className = props.className,
          checkboxArray = props.data,
          groupListArgument = props.groupListArgument,
          groupListFlag = props.groupListFlag,
          label = props.label,
          iconPosition = props.iconPosition;

      var requiredTag = _react2.default.createElement(_saltIcon2.default, {
        name: 'field-required',
        className: prefixClass('field-layout-label-required'),
        width: 6,
        height: 6,
        fill: 'red'
      });

      var checkboxArrayComponent = checkboxArray.map(function (item, index, data) {
        var checked = item.checked,
            disable = item.disable,
            value = item.value;

        var finalItemJSX = _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              t.clickAction(value, item, index, checkboxArray);
            },
            key: index,
            className: (0, _classnames9.default)(prefixClass('checkbox-field-row FBAC FBH'), {
              disable: disable
            })
          },
          iconPosition === 'left' && renderIcon(checked, disable),
          _react2.default.createElement(
            'div',
            {
              ref: 'content' + index,
              className: (0, _classnames9.default)(prefixClass('checkbox-field-content FB1'), { disable: disable })
            },
            item.content || item.text
          ),
          iconPosition === 'right' && renderIcon(checked, disable, 'right'),
          disable && _react2.default.createElement('div', { className: prefixClass('checkbox-field-disable-mask') })
        );
        return finalItemJSX;
      });

      var finalJSX = _react2.default.createElement(
        _Group2.default,
        { className: (0, _classnames9.default)(prefixClass('checkbox-field'), (_classnames3 = {}, _defineProperty(_classnames3, className, !!className), _defineProperty(_classnames3, prefixClass('checkbox-field-readonly'), t.props.readOnly), _classnames3))
        },
        label === '' ? null : _react2.default.createElement(
          _Group2.default.Head,
          {
            className: (0, _classnames9.default)(prefixClass('checkbox-field-label'))
          },
          label,
          this.props.required && requiredTag
        ),
        _react2.default.createElement(
          _Group2.default.List,
          groupListArgument,
          checkboxArrayComponent
        )
      );

      if (!groupListFlag) {
        var _classnames4;

        finalJSX = _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              _this3.root = c;
            },
            className: (0, _classnames9.default)(prefixClass('checkbox-field'), (_classnames4 = {}, _defineProperty(_classnames4, className, !!className), _defineProperty(_classnames4, prefixClass('checkbox-field-readonly'), t.props.readOnly), _classnames4))
          },
          checkboxArrayComponent
        );
      }
      return finalJSX;
    }
  }, {
    key: 'renderSlot',
    value: function renderSlot() {
      var _classnames5,
          _this4 = this;

      var t = this;
      return _react2.default.createElement(
        _Field2.default,
        _extends({}, t.props, {
          icon: {
            className: (0, _classnames9.default)(prefixClass('checkbox-field-icon'), (_classnames5 = {}, _defineProperty(_classnames5, prefixClass('checkbox-field-icon') + '-slot', true), _defineProperty(_classnames5, prefixClass('hide'), t.props.readOnly), _classnames5)),
            name: 'angle-right',
            width: 24,
            height: 24,
            onClick: t.handleClick
          },
          className: (0, _classnames9.default)(prefixClass('checkbox-field'), _defineProperty({}, t.props.className, !!t.props.className))
        }),
        _react2.default.createElement(
          'div',
          { onClick: t.handleClick, className: prefixClass('checkbox-field-value-wrap') },
          t.state.selectedText ? _react2.default.createElement(
            'div',
            { className: (0, _classnames9.default)(prefixClass('checkbox-field-value-list'), _defineProperty({}, prefixClass('checkbox-field-slot-mode-readonly'), t.props.readOnly))
            },
            t.state.selectedText
          ) : _react2.default.createElement(
            'div',
            { className: prefixClass('omit checkbox-field-placeholder') },
            t.props.placeholder
          )
        ),
        _react2.default.createElement(_SelectLayer2.default, {
          ref: function ref(c) {
            _this4.slot = c;
          },
          title: t.props.label,
          confirmText: t.props.confirmText,
          cancelText: t.props.cancelText,
          data: t.props.data,
          value: t.state.value,
          maskCloseable: t.props.maskCloseable,
          iconPosition: t.props.iconPosition,
          onCancel: t.handleCancel,
          onConfirm: t.handleConfirm
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.mode === 'list' ? this.renderList() : this.renderSlot();
    }
  }]);

  return CheckboxField;
}(_react2.default.Component);

CheckboxField.defaultProps = {
  className: '',
  mode: 'slot', // slot, list
  readOnly: false,
  label: '',
  titleBreakStr: '，',
  data: [],
  onChange: function onChange() {},

  placeholder: '',
  maskCloseable: true,
  groupListFlag: true,
  groupListArgument: {
    lineIndent: 0,
    itemIndent: 16
  },
  required: false,
  iconPosition: 'left'
};

// http://facebook.github.io/react/docs/reusable-components.html
CheckboxField.propTypes = {
  className: _react2.default.PropTypes.string,
  mode: _react2.default.PropTypes.string,
  readOnly: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  titleBreakStr: _react2.default.PropTypes.string,
  data: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  maskCloseable: _react2.default.PropTypes.bool,
  groupListFlag: _react2.default.PropTypes.bool,
  groupListArgument: _react2.default.PropTypes.object,
  required: _react2.default.PropTypes.bool,
  iconPosition: _react2.default.PropTypes.string
};

CheckboxField.displayName = 'CheckboxField';

exports.default = CheckboxField;
module.exports = exports['default'];