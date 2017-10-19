'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _year = require('./year');

var _year2 = _interopRequireDefault(_year);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.slideBackListener = _this.handleSlideBack.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;
      t.showCalendar(t.props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.showCalendar(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.animationType === 'slideLeft' && this.props.visible) {
        history.go(-1);
      }
    }
  }, {
    key: 'onOk',
    value: function onOk(value) {
      if (this.props.animationType === 'slideLeft') {
        history.go(-1);
      }
      this.props.onOk(value);
    }

    // slide-up模式下才有该方法

  }, {
    key: 'onMaskClose',
    value: function onMaskClose() {
      var t = this;
      t.popup.close();
      t.popup = null;
      t.props.onMaskClose();
    }
  }, {
    key: 'showCalendar',
    value: function showCalendar(props) {
      var t = this;
      if (!props.visible) {
        if (t.popup) {
          t.popup.close();
          t.popup = null;
          window.removeEventListener('popstate', t.slideBackListener, false);
        }
        return;
      }

      var calendar = _react2.default.createElement(_day2.default, _extends({}, props, { onOk: function onOk(val) {
          t.onOk(val);
        } }));

      if (t.popup) {
        t.popup.update(calendar);
        return;
      }

      if (props.animationType === 'slideUp') {
        t.popup = _Popup2.default.show(calendar, {
          animationType: 'slide-up',
          className: prefixClass('calendar-popup'),
          maskClosable: props.maskClosable,
          onMaskClose: t.onMaskClose.bind(t)
        });
      } else {
        t.popup = _Popup2.default.show(calendar, {
          animationType: 'slide-left',
          className: prefixClass('calendar-popup')
        });
        history.pushState({
          calendarType: 'Calendar.slide'
        }, '', _util2.default.addUrlParam('CALENDARSLIDE', Date.now()));
        window.addEventListener('popstate', t.slideBackListener, false);
      }
    }
  }, {
    key: 'handleSlideBack',
    value: function handleSlideBack(e) {
      var t = this;
      var state = e.state;

      if (!state || !state.calendarType) {
        window.removeEventListener('popstate', t.slideBackListener, false);
        t.popup.close();
        t.props.onCancel();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.displayName = 'Calendar';
Calendar.propTypes = _extends({}, _day2.default.propTypes, _month2.default.propTypes, _year2.default.propTypes, {
  maskClosable: _react2.default.PropTypes.bool,
  onMaskClose: _react2.default.PropTypes.func,
  onOk: _react2.default.PropTypes.func,
  onCancel: _react2.default.PropTypes.func
});
Calendar.defaultProps = _extends({}, _day2.default.defaultProps, _month2.default.defaultProps, _year2.default.defaultProps, {
  maskClosable: true,
  onMaskClose: function onMaskClose() {},
  onOk: function onOk() {},
  onCancel: function onCancel() {}
});


Calendar.MonthCalendar = _month2.default;
Calendar.YearCalendar = _year2.default;

Calendar.util = _util2.default;
Calendar.locale = _locale2.default;
Calendar.I18n = _locale2.default;

exports.default = Calendar;
module.exports = exports['default'];