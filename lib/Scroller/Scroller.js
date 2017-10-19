'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Scroller Component for tingle
 * @author gbk
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classnames = require('classnames');
var IScroll = require('./iscroll');
var Context = require('../Context');

var Scroller = function (_React$Component) {
  _inherits(Scroller, _React$Component);

  function Scroller() {
    _classCallCheck(this, Scroller);

    return _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).apply(this, arguments));
  }

  _createClass(Scroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var t = this;

      // 根节点的dom引用
      t.el = ReactDOM.findDOMNode(t.root);

      // 初始化 iscroll
      t.initScroll();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var t = this;

      // 避免很频繁的调用
      clearTimeout(t.timeout);
      t.timeout = setTimeout(function () {
        // 有些场景下不需要刷新
        if (t.props.autoRefresh) {
          // 更新 iscroll
          if (t.scroller) {
            t.scroller.refresh();
          }
        }
      }, 10);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // 销毁 iscroll
      this.scroller.destroy();
    }
  }, {
    key: 'initScroll',
    value: function initScroll() {
      var t = this;

      // 参数过滤，onXxx 是事件，否则是配置参数
      var options = {};
      var events = {};
      Object.keys(t.props).forEach(function (key) {
        var matches = /^on([A-Z]\w*)$/.exec(key);
        if (matches) {
          // 事件
          var evtName = matches[1].replace(/./, function (p) {
            return p.toLowerCase();
          });
          events[evtName] = t.props[key];
        } else if (key !== 'className' && key !== 'autoRefresh' && key !== 'minWidth') {
          // 配置
          options[key] = t.props[key];
        }
      });

      // iscroll 实例化
      t.scroller = new IScroll(t.el, options);

      // 事件挂载
      Object.keys(events).forEach(function (key) {
        t.scroller.on(key, events[key].bind(null, t.scroller));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;

      // iscroll 需要一个 wrapper，所以里面多加了一层 div
      return React.createElement(
        'div',
        {
          className: classnames(Context.prefixClass('scroller'), _defineProperty({}, t.props.className, !!t.props.className)),
          style: t.props.style,
          ref: function ref(c) {
            _this2.root = c;
          }
        },
        React.createElement(
          'div',
          {
            className: Context.prefixClass('DIB'),
            style: { minWidth: t.props.minWidth }
          },
          this.props.children
        )
      );
    }
  }]);

  return Scroller;
}(React.Component);

// 更多配置参数，详见 http://iscrolljs.com/ ，事件用 onXxx 的格式，例如 scrollEnd 事件对应的参数是 onScrollEnd


Scroller.defaultProps = {
  click: /chrome/i.test(navigator.userAgent), // iscroll 默认屏蔽内部的 click 事件，考虑到在 chrome 中调试没开模拟器的场景，允许响应 click 点击。 http://iscrolljs.com/#basic-features
  disablePointer: true,
  autoRefresh: true,
  minWidth: '100%'
};

// http://facebook.github.io/react/docs/reusable-components.html
Scroller.propTypes = {
  autoRefresh: React.PropTypes.bool,
  className: React.PropTypes.string,
  disablePointer: React.PropTypes.bool,
  children: React.PropTypes.node
};

module.exports = Scroller;