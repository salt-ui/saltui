'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _debounce = require('lodash/fp/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _Totop = require('salt-icon/lib/Totop');

var _Totop2 = _interopRequireDefault(_Totop);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Totop Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author shaochao.wsc
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Totop = function (_React$Component) {
  _inherits(Totop, _React$Component);

  function Totop(props) {
    _classCallCheck(this, Totop);

    var _this = _possibleConstructorReturn(this, (Totop.__proto__ || Object.getPrototypeOf(Totop)).call(this, props));

    _this.state = {
      hide: true
    };
    _this.scrolling = false;
    return _this;
  }

  _createClass(Totop, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var t = this;
      var debounceNum = t.props.debounceNum;


      this.toggleShow();

      window.addEventListener('scroll', (0, _debounce2.default)(debounceNum, function (e) {
        _this2.toggleShow(e);
      }), false);
    }
  }, {
    key: 'toggleShow',
    value: function toggleShow(e) {
      var _props = this.props,
          onScroll = _props.onScroll,
          distance = _props.distance;

      if (window.scrollY >= distance) {
        onScroll(e);
        this.setState({ hide: false });
      } else {
        this.setState({ hide: true });
      }
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(to, duration, callback) {
      var t = this;
      if (duration <= 0) {
        if (callback) {
          callback();
        }
        return;
      }
      var y = _utils2.default.getWindowScrollY();
      var difference = to - y;
      var perTick = difference / duration * 10;
      t.timer = setTimeout(function () {
        var targetScrollY = y + perTick;
        _utils2.default.setWindowScrollY(targetScrollY < to ? to : targetScrollY);
        t.scrollTo(to, duration - 10, callback);
      }, 10);
    }
  }, {
    key: 'toTop',
    value: function toTop() {
      var t = this;
      var to = t.props.to || 10;
      var duration = t.props.duration;
      var scrolling = t.scrolling;
      if (scrolling) {
        return;
      }

      t.scrolling = true;

      if (duration === 0) {
        document.body.scrollTop = to;
        t.scrolling = false;
      } else {
        t.scrollTo(to, duration, function () {
          t.scrolling = false;
        });
      }
    }
  }, {
    key: 'renderToTopButton',
    value: function renderToTopButton() {
      var _this3 = this;

      var _props2 = this.props,
          hideToTopButton = _props2.hideToTopButton,
          icon = _props2.icon,
          type = _props2.type,
          size = _props2.size;

      if (hideToTopButton || this.state.hide) {
        return null;
      }
      return _react2.default.createElement(
        _Box2.default,
        { type: type, size: size, onClick: function onClick() {
            _this3.toTop();
          } },
        icon || _react2.default.createElement(_Totop2.default, null)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props = t.props,
          className = _t$props.className,
          children = _t$props.children;

      var prefixCls = _Context2.default.prefixClass('totop');
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(prefixCls, _defineProperty({}, className, !!className))
        },
        children,
        _react2.default.createElement(
          _rcAnimate2.default,
          { transitionName: prefixCls + '-button', transitionAppear: true, component: '' },
          this.renderToTopButton()
        )
      );
    }
  }]);

  return Totop;
}(_react2.default.Component);

Totop.propTypes = {
  className: _react2.default.PropTypes.string,
  hideToTopButton: _react2.default.PropTypes.bool,
  size: _react2.default.PropTypes.oneOf(['large', 'medium', 'small']),
  type: _react2.default.PropTypes.oneOf(['primary', 'secondary']),
  debounceNum: _react2.default.PropTypes.number,
  distance: _react2.default.PropTypes.number,
  onScroll: _react2.default.PropTypes.func,
  icon: _react2.default.PropTypes.element
};
Totop.defaultProps = {
  hideToTopButton: false,
  type: 'secondary',
  debounceNum: 300,
  distance: 30,
  duration: 600,
  onScroll: function onScroll() {}
};
Totop.displayName = 'Totop';


Totop.Box = _Box2.default;

exports.default = Totop;
module.exports = exports['default'];