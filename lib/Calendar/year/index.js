'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefixClass = _Context2.default.prefixClass;

var YearCalendar = function (_React$Component) {
  _inherits(YearCalendar, _React$Component);

  function YearCalendar() {
    _classCallCheck(this, YearCalendar);

    return _possibleConstructorReturn(this, (YearCalendar.__proto__ || Object.getPrototypeOf(YearCalendar)).apply(this, arguments));
  }

  _createClass(YearCalendar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: prefixClass('calendar year-calendar') },
        _react2.default.createElement(
          'p',
          null,
          'Calendar.YearCalendar \u4E0D\u518D\u652F\u6301\uFF1A'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u5982\u679C\u60F3\u9009\u62E9\u300E\u5E74\u4EFD\u300F\uFF0C\u8BF7\u6362\u7528 Datetime/DatetimeField \u7EC4\u4EF6\uFF1B'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u5982\u679C\u60F3\u9009\u62E9\u300E\u5E74\u4EFD\u533A\u95F4\u300F\uFF0C\u8BF7\u6362\u7528 CalendarField \u7EC4\u4EF6\u3002'
        )
      );
    }
  }]);

  return YearCalendar;
}(_react2.default.Component);

YearCalendar.propTypes = {
  className: _react2.default.PropTypes.string,
  locale: _react2.default.PropTypes.string, // 国际化语言
  animationType: _react2.default.PropTypes.string,
  singleMode: _react2.default.PropTypes.bool, // 是否是单选模式
  onChange: _react2.default.PropTypes.func
};
YearCalendar.defaultProps = {
  locale: 'zh-cn',
  animationType: 'slideLeft', //  slideUp | slideLeft
  singleMode: true,
  onChange: function onChange() {}
};
YearCalendar.displayName = 'YearCalendar';
exports.default = YearCalendar;
module.exports = exports['default'];