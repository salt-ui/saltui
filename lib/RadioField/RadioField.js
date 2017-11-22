'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _OptionChecked = require('salt-icon/lib/OptionChecked');

var _OptionChecked2 = _interopRequireDefault(_OptionChecked);

var _FieldRequired = require('salt-icon/lib/FieldRequired');

var _FieldRequired2 = _interopRequireDefault(_FieldRequired);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Group = require('../Group');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * RadioField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author shanchao
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var RadioField = function (_React$Component) {
  _inherits(RadioField, _React$Component);

  function RadioField(props) {
    _classCallCheck(this, RadioField);

    var _this = _possibleConstructorReturn(this, (RadioField.__proto__ || Object.getPrototypeOf(RadioField)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(RadioField, [{
    key: 'clickAction',
    value: function clickAction(value, item, index, data) {
      var t = this;
      var _t$props = t.props,
          radioArray = _t$props.data,
          onChange = _t$props.onChange;


      var disable = item.disable;
      if (disable) {
        return;
      }
      radioArray.map(function (radioItem) {
        radioItem.checked = false;
        return radioItem;
      });
      item.checked = !item.checked;
      if (onChange) {
        onChange(value, index, data);
      }
      t.forceUpdate();
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon(checked, position) {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames6.default)(prefixClass('radio-field-icon-wrapper FBAC FBH'), _defineProperty({}, position, !!position))
        },
        _react2.default.createElement(_OptionChecked2.default, {
          width: 16,
          height: 16,
          className: (0, _classnames6.default)(prefixClass('radio-field-icon'), {
            'un-checked': !checked
          })
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props2 = t.props,
          rootClassName = _t$props2.rootClassName,
          className = _t$props2.className,
          radioArray = _t$props2.data,
          groupListArgument = _t$props2.groupListArgument,
          groupListFlag = _t$props2.groupListFlag,
          label = _t$props2.label;


      var radioArrayComponent = radioArray.map(function (item, index, data) {
        var checked = item.checked,
            disable = item.disable,
            value = item.value;

        return _react2.default.createElement(
          'div',
          {
            key: index,
            className: (0, _classnames6.default)(prefixClass('radio-field-row FBAC FBH'), {
              disable: disable
            }),
            onClick: t.clickAction.bind(t, value, item, index, data)
          },
          t.props.iconPosition === 'left' && t.renderIcon(checked),
          _react2.default.createElement(
            'div',
            {
              ref: 'content' + index,
              className: prefixClass('radio-field-content FB1')
            },
            item.content || item.text
          ),
          t.props.iconPosition === 'right' && t.renderIcon(checked, 'right'),
          disable && _react2.default.createElement('div', { className: prefixClass('radio-field-disable-mask') })
        );
      });

      var requiredTag = _react2.default.createElement(_FieldRequired2.default, {
        className: prefixClass('radio-field-label-required'),
        width: 6,
        height: 6,
        fill: 'red'
      });

      var finalJSX = _react2.default.createElement(
        _Group2.default,
        { className: (0, _classnames6.default)(prefixClass('radio-field'), _defineProperty({}, rootClassName, !!rootClassName), _defineProperty({}, className, !!className))
        },
        label === '' ? null : _react2.default.createElement(
          _Group2.default.Head,
          { className: (0, _classnames6.default)(prefixClass('radio-field-label')) },
          label,
          this.props.required && requiredTag
        ),
        _react2.default.createElement(
          _Group2.default.List,
          groupListArgument,
          radioArrayComponent
        )
      );

      if (!groupListFlag) {
        var _classnames4;

        finalJSX = _react2.default.createElement(
          'div',
          {
            ref: 'root',
            className: (0, _classnames6.default)(prefixClass('radio-field'), (_classnames4 = {}, _defineProperty(_classnames4, rootClassName, !!rootClassName), _defineProperty(_classnames4, className, !!className), _classnames4))
          },
          radioArrayComponent
        );
      }

      return finalJSX;
    }
  }]);

  return RadioField;
}(_react2.default.Component);

RadioField.defaultProps = {
  data: [],
  onChange: function onChange() {},

  groupListFlag: true,
  groupListArgument: {
    lineIndent: 0,
    itemIndent: 16
  },
  label: '',
  iconPosition: 'right',
  required: false
};

// http://facebook.github.io/react/docs/reusable-components.html
RadioField.propTypes = {
  className: _react2.default.PropTypes.string,
  data: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,
  groupListFlag: _react2.default.PropTypes.bool,
  groupListArgument: _react2.default.PropTypes.object,
  iconPosition: _react2.default.PropTypes.string,
  required: _react2.default.PropTypes.bool
};

RadioField.displayName = 'RadioField';

module.exports = RadioField;