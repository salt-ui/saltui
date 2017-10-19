'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../../Context');

var _Context2 = _interopRequireDefault(_Context);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _MonthBody = require('./MonthBody');

var _MonthBody2 = _interopRequireDefault(_MonthBody);

var _MonthTitle = require('./MonthTitle');

var _MonthTitle2 = _interopRequireDefault(_MonthTitle);

var _formatter = require('../formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
var shadowArray = [1, 2]; // 只是用来提供一个长度的数组，本身的值没什么用
// const maxMonth = 5; // 最多渲染这么多个月

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.state = {
      monthPool: [] // 数据结构如：['m201707_150', [1501545600000, 1501632000000], 'm201709_166']
    };
    _this.monthAreaHeight = props.showHalfDay ? props.height - 104 : 'auto';
    // 距顶或距底小于这个距离时，就动态加载
    _this.bufferDistance = props.showHalfDay ? _this.monthAreaHeight / 2 : props.height;
    _this.startY = 0; // 手指滑动时的初始Y坐标
    _this.endY = 0; // 手指滑动时的初始Y坐标
    _this.monthLoading = false; // 是否正在加载month
    _this.direction = '';
    return _this;
  }

  _createClass(Panel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var t = this;
      t.locale = _locale2.default[t.props.locale];
      t.processValue(t.props.value);
      // 初始化添加一些月份
      t.updateMonthPool();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var t = this;

      t.updateMonthPool(true, function () {
        t.root.scrollTop = t.getHeadNewMonthHeight();
      });

      t.root.addEventListener('touchstart', function (ev) {
        t.startY = ev.touches[0].screenY;
      }, false);

      t.root.addEventListener('touchmove', function (ev) {
        ev.stopPropagation();
        t.endY = ev.touches[0].screenY;
        if (t.endY - t.startY < 0) {
          t.direction = 'up';
          t.loadMonth();
        } else {
          t.direction = 'down';
          if (!t.locked) {
            t.loadMonth();
            t.locked = true;
            setTimeout(function () {
              t.locked = false;
              _this2.loadMonth();
            }, 30);
          }
        }
      }, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.processValue(nextProps.value);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _isEqual2.default)(nextProps, this.props) || !(0, _isEqual2.default)(nextState, this.state);
    }
  }, {
    key: 'onDaySelected',
    value: function onDaySelected(timestamp, e) {
      this.setState({
        value: timestamp
      });
      this.props.onChange({
        value: timestamp
      });
      // singleMode = true，且 viewMode = slide，点击即关闭，所以触发 onOk
      if (this.props.animationType === 'slideLeft') {
        this.props.onOk({
          value: timestamp
        });
      }
    }

    /*
     * 根据 timestamp 去计算它所属的月份的全部 days
     * days数据结构为：[timestamp1, timestamp2, ...]
     */

  }, {
    key: 'getMonthDays',
    value: function getMonthDays() {
      var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

      var cursorDay = new Date(new Date(timestamp).setDate(1));
      var currentMonth = cursorDay.getMonth();
      var days = [];
      while (cursorDay.getMonth() === currentMonth) {
        days.push(cursorDay.getTime());
        cursorDay.setDate(cursorDay.getDate() + 1);
      }
      return days;
    }
  }, {
    key: 'getRefByTimestamp',
    value: function getRefByTimestamp(timestamp) {
      return this['month' + (0, _formatter2.default)(timestamp, 'yyyyMM')];
    }
  }, {
    key: 'getHeadNewMonthHeight',
    value: function getHeadNewMonthHeight() {
      var t = this;
      var preNewMonthHeight = 0;
      // 依次取出头部新加的月份，计算其高度
      shadowArray.forEach(function (val, key) {
        var ref = t.getRefByTimestamp(t.state.monthPool[key][0]);
        preNewMonthHeight += ref.offsetHeight;
      });
      return preNewMonthHeight;
    }
  }, {
    key: 'getMonthHeight',
    value: function getMonthHeight(yyyyMM) {
      var t = this;
      var ref = t['month' + yyyyMM];
      return ref ? ref.offsetHeight : 0;
    }

    // t.state.monthPool中存放一些占位信息。该function负责取出真正月份的部分信息

  }, {
    key: 'getRealMonthPool',
    value: function getRealMonthPool(monthPool) {
      var lastRealMonthIndex = 0;
      var realMonthLen = 0;
      monthPool.forEach(function (m, idx) {
        if (Array.isArray(m)) {
          lastRealMonthIndex = idx;
          realMonthLen += 1;
        }
      });
      var firstRealMonthIndex = lastRealMonthIndex - realMonthLen + 1;
      return {
        firstRealMonthIndex: firstRealMonthIndex,
        lastRealMonthIndex: lastRealMonthIndex,
        realMonthLen: realMonthLen
      };
    }

    /*
     * 设置monthPool
     * @param pre 向队列的头部插入
     * 每次向队首或队尾添加或减少与shadowArray相同长度的月
     */

  }, {
    key: 'updateMonthPool',
    value: function updateMonthPool() {
      var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments[1];

      var t = this;
      var monthPool = (0, _cloneDeep2.default)(t.state.monthPool);

      var _t$getRealMonthPool = t.getRealMonthPool(monthPool),
          firstRealMonthIndex = _t$getRealMonthPool.firstRealMonthIndex,
          lastRealMonthIndex = _t$getRealMonthPool.lastRealMonthIndex;

      if (pre) {
        shadowArray.forEach(function () {
          var firstDayInFirstMonth = monthPool[firstRealMonthIndex][0];
          // 月份-1
          var preMonth = new Date(parseInt(firstDayInFirstMonth, 10)).setMonth(new Date(parseInt(firstDayInFirstMonth, 10)).getMonth() - 1);
          if (firstRealMonthIndex === 0) {
            monthPool.splice(0, 0, t.getMonthDays(preMonth));
          } else {
            monthPool.splice(firstRealMonthIndex - 1, 1, t.getMonthDays(preMonth));
            firstRealMonthIndex -= 1;
          }
          lastRealMonthIndex += 1;
        });
      } else {
        shadowArray.forEach(function () {
          // 取队列尾部的月份
          var lastMonth = monthPool[lastRealMonthIndex] || [];
          // 取该月中的第一天，有可能为 undefined
          var firstDayInLastMonth = lastMonth[0];
          if (!firstDayInLastMonth) {
            var firstValue = !_util2.default.isNil(t.props.value) ? t.props.value : Date.now();
            if ((0, _isObject2.default)(firstValue)) {
              firstValue = firstValue.startDate || firstValue.endDate || firstValue.value || Date.now();
            } else if ((0, _isArray2.default)(firstValue)) {
              firstValue = firstValue[0] || Date.now();
            }
            monthPool.splice(lastRealMonthIndex, 0, t.getMonthDays(firstValue));
          } else {
            // 月份加1
            var nextMonth = new Date(parseInt(firstDayInLastMonth, 10)).setMonth(new Date(parseInt(firstDayInLastMonth, 10)).getMonth() + 1);
            monthPool.splice(lastRealMonthIndex + 1, 1, t.getMonthDays(nextMonth));
            lastRealMonthIndex += 1;
          }
        });
      }
      t.setState({
        monthPool: monthPool
      }, callback);
    }
  }, {
    key: 'processValue',
    value: function processValue(propValue) {
      this.setState({
        value: propValue
      });
    }
  }, {
    key: 'loadMonth',
    value: function loadMonth() {
      var t = this;
      var docHeight = t.root.scrollHeight;
      var clientHeight = t.root.clientHeight;
      var scrollTop = t.root.scrollTop;
      var scrollBottom = docHeight - scrollTop - clientHeight;
      // 正在加载，或者滑动距离小于100px，都不触发loadMonth
      if (t.monthLoading || Math.abs(t.endY - t.startY) < 100) {
        return;
      }

      if (t.direction === 'up' && scrollBottom < t.bufferDistance) {
        // 向上滑动，加载未来的月份
        t.monthLoading = true;
        t.updateMonthPool(false, function () {
          t.monthLoading = false;
        });
      } else if (t.direction === 'down' && scrollTop < t.bufferDistance) {
        // 向下滑动，加载过去的月份
        t.monthLoading = true;

        t.updateMonthPool(true, function () {
          t.monthLoading = false;
          if (t.root.scrollTop === 0) {
            t.root.scrollTop = 10;
          }
          if (_util2.default.isIos()) {
            t.root.scrollTop += t.getHeadNewMonthHeight();
          }
        });
      }
    }

    // 只有级联才用到上下午

  }, {
    key: 'renderHalfDay',
    value: function renderHalfDay() {
      return null;
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth(props) {
      var t = this;
      return t.state.monthPool.map(function (monthDays) {
        if (!Array.isArray(monthDays)) {
          return null;
        }
        var firstDay = monthDays[0];
        return _react2.default.createElement(
          'div',
          {
            className: prefixClass('day-calendar-month-block'),
            key: (0, _formatter2.default)(firstDay, 'yyyyMM'),
            ref: function ref(c) {
              t['month' + (0, _formatter2.default)(firstDay, 'yyyyMM')] = c;
            }
          },
          _react2.default.createElement(_MonthTitle2.default, { anyDayInMonth: firstDay, locale: t.props.locale }),
          _react2.default.createElement(_MonthBody2.default, _extends({}, props, {
            value: t.state.value,
            days: monthDays,
            onSelected: function onSelected(data, e) {
              t.onDaySelected(data, e);
            }
          }))
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _classnames;

      var t = this;

      var _t$props = t.props,
          className = _t$props.className,
          height = _t$props.height,
          others = _objectWithoutProperties(_t$props, ['className', 'height']);

      var showHalfDay = !t.props.singleMode && t.props.showHalfDay;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(p) {
            if (!showHalfDay) {
              _this3.root = p;
            }
          },
          className: (0, _classnames3.default)(prefixClass('day-calendar-panel'), (_classnames = {}, _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'not-show-half-button', !showHalfDay), _classnames)),
          style: { height: height }
        },
        showHalfDay ? _react2.default.createElement(
          'div',
          {
            className: '' + prefixClass('month-area'),
            style: { height: t.monthAreaHeight },
            ref: function ref(p) {
              _this3.root = p;
            }
          },
          t.renderMonth(others)
        ) : t.renderMonth(others),
        showHalfDay && t.renderHalfDay()
      );
    }
  }]);

  return Panel;
}(_react2.default.Component);

Panel.propTypes = {
  className: _react2.default.PropTypes.string,
  locale: _react2.default.PropTypes.string,
  height: _react2.default.PropTypes.number,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.array, _react2.default.PropTypes.object]),
  singleMode: _react2.default.PropTypes.bool, // 是否是单选模式
  onChange: _react2.default.PropTypes.func,
  showHalfDay: _react2.default.PropTypes.bool
};
Panel.defaultProps = {
  singleMode: true,
  onChange: function onChange() {},
  showHalfDay: false
};
exports.default = Panel;
module.exports = exports['default'];