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

var _rcInputNumber = require('rc-input-number');

var _rcInputNumber2 = _interopRequireDefault(_rcInputNumber);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _PlusThin = require('salt-icon/lib/PlusThin');

var _PlusThin2 = _interopRequireDefault(_PlusThin);

var _MinusThin = require('salt-icon/lib/MinusThin');

var _MinusThin2 = _interopRequireDefault(_MinusThin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NumberPicker Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author sujingjing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NumberPicker = function (_React$Component) {
  _inherits(NumberPicker, _React$Component);

  function NumberPicker(props) {
    _classCallCheck(this, NumberPicker);

    var _this = _possibleConstructorReturn(this, (NumberPicker.__proto__ || Object.getPrototypeOf(NumberPicker)).call(this, props));

    _this.state = {
      width: 108
    };
    return _this;
  }

  _createClass(NumberPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;
      t.processingWidth();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var newValueLength = nextProps.value.toString().length;
      var valueLength = t.props.value.toString().length;
      if (newValueLength !== valueLength) {
        t.processingWidth(newValueLength);
      }
    }
    // 获得当前值所占的宽度，给予组件，实现可根据输入的内容来变宽

  }, {
    key: 'processingWidth',
    value: function processingWidth(length) {
      var t = this;
      var width = t.reference.offsetWidth;
      width = length && length <= 4 ? 108 : width;
      // rc-input-number的input框最宽的宽度为185px
      if (width > 185) {
        width = 185;
      }
      t.setState({ width: width });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _classnames2,
          _this2 = this;

      var t = this;
      var fillColorUp = t.props.disabled || t.props.value >= t.props.max ? '#cccccc' : '#f37372';
      var fillColorDown = t.props.disabled || t.props.value <= t.props.min ? '#cccccc' : '#f37372';

      var _t$props = t.props,
          className = _t$props.className,
          showNumber = _t$props.showNumber,
          restProps = _objectWithoutProperties(_t$props, ['className', 'showNumber']);

      var stepperClass = (0, _classnames4.default)((_classnames = {}, _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'showNumber', !!showNumber), _classnames));

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(_Context2.default.prefixClass('number-picker'), (_classnames2 = {}, _defineProperty(_classnames2, t.props.className, !!t.props.className), _defineProperty(_classnames2, 'readonly-status', t.props.readOnly), _classnames2)),
          style: { width: t.state.width }
        },
        _react2.default.createElement(_rcInputNumber2.default, _extends({
          upHandler: _react2.default.createElement(_PlusThin2.default, { name: 'plus-thin', fill: fillColorUp, width: '14', height: '14' }),
          downHandler: _react2.default.createElement(_MinusThin2.default, { name: 'minus-thin', fill: fillColorDown, width: '14', height: '14' })
        }, restProps, {
          className: stepperClass
        })),
        _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              _this2.reference = c;
            }, className: 'reference' },
          t.props.value
        )
      );
    }
  }]);

  return NumberPicker;
}(_react2.default.Component);

NumberPicker.propTypes = {
  className: _react2.default.PropTypes.string,
  step: _react2.default.PropTypes.number,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  max: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.number,
  readOnly: _react2.default.PropTypes.bool,
  showNumber: _react2.default.PropTypes.bool,
  focusOnUpDown: _react2.default.PropTypes.bool,
  useTouch: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  disabled: _react2.default.PropTypes.bool
};
NumberPicker.defaultProps = {
  step: 1,
  value: 2,
  readOnly: false,
  showNumber: true,
  disabled: false,
  focusOnUpDown: false,
  useTouch: true,
  onChange: function onChange() {}
};
NumberPicker.displayName = 'NumberPicker';
exports.default = NumberPicker;
module.exports = exports['default'];