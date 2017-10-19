'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../../Context');

var _Context2 = _interopRequireDefault(_Context);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Calendar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var WeekBar = function (_React$Component) {
  _inherits(WeekBar, _React$Component);

  function WeekBar() {
    _classCallCheck(this, WeekBar);

    return _possibleConstructorReturn(this, (WeekBar.__proto__ || Object.getPrototypeOf(WeekBar)).apply(this, arguments));
  }

  _createClass(WeekBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.locale = _locale2.default[this.props.locale];
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(prefixClass('day-calendar-week-bar FBH'), _defineProperty({}, t.props.className, !!t.props.className))
        },
        t.locale.weekTitle.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            {
              className: (0, _classnames3.default)(prefixClass('FB1 FBAC'), 'week-bar-item', {
                first: index === 0,
                last: index === 6
              }),
              key: index
            },
            item
          );
        })
      );
    }
  }]);

  return WeekBar;
}(_react2.default.Component);

WeekBar.propTypes = {
  className: _react2.default.PropTypes.string, // 国际化语言
  locale: _react2.default.PropTypes.string // 国际化语言
};
WeekBar.defaultProps = {
  locale: 'zh-cn'
};
WeekBar.displayName = 'WeekBar';
exports.default = WeekBar;
module.exports = exports['default'];