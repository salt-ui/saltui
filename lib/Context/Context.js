'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _touchEffect = require('./touchEffect');

var _touchEffect2 = _interopRequireDefault(_touchEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Tingle Context
                                                                                                                                                                                                                   * The environment for tingle's initialization
                                                                                                                                                                                                                   * @author gnosaij
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Copyright 2014-2015, Tingle Team, Alinw.
                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                   */
// 引入环境检测模块


var win = window;
var doc = document;
// 全局点击态初始化
_touchEffect2.default.attach(doc.body);

/**
 * 变换两个参数的函数到多个参数
 * @param  {Function} fn 基函数
 * @return {Function} 变换后的函数
 * @demo
 *      let add = (x, y) => { return x+y; }
 *      add = redo(add);
 *      add(1,2,3) => 6
 */
var redo = function redo(fn) {
  return function () {
    var args = arguments;
    var ret = fn(args[0], args[1]);
    for (var i = 2, l = args.length; i < l; i++) {
      ret = fn(ret, args[i]);
    }
    return ret;
  };
};

/**
 * 对象扩展
 * @param  {Object} receiver
 * @param  {Object} supplier
 * @return {Object} 扩展后的receiver对象
 */
var mixin = redo(function (receiver, supplier) {
  if (Object.keys) {
    Object.keys(supplier).forEach(function (property) {
      Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
    });
  } else {
    for (var property in supplier) {
      if (supplier.hasOwnProperty(property)) {
        receiver[property] = supplier[property];
      }
    }
  }
  return receiver;
});

/**
 * 获取自增长id
 * @return {Number}
 */
var tid = 0;
var getTID = function getTID() {
  return tid++;
};

/**
 * rem system
 * @TODO 这个闭包 + rem方法 + makePrivateRem方法的整合
 */
(function (docEl, fontEl) {
  var dpr = win.devicePixelRatio || 1;

  // 类似小米2 webView webkit版本是534及以下，避免闪屏
  var matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
  if (matches && matches[1] <= 534) {
    dpr = 1;
  }

  win.dpr = dpr;

  if (!docEl.getAttribute('data-dpr')) {
    // 在body上添加环境检测的标识类className
    doc.documentElement.className = (0, _classnames3.default)(doc.documentElement.className.trim(), _defineProperty({
      pc: _env2.default.isPC,
      mobile: _env2.default.isMobile,
      hairline: _env2.default.supportHairline
    }, 'dpr' + dpr, dpr > 1));

    docEl.setAttribute('data-dpr', dpr);
    docEl.firstElementChild.appendChild(fontEl);
  }

  var setRem = function setRem() {
    var docWidth = docEl.clientWidth;
    win.rem = docWidth / 10;

    // ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
    // 老机器bug rem计算不是标准=html fontsize
    if (/ZTE U930_TD/.test(navigator.userAgent)) {
      win.rem *= 1.13;
    }

    fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important}';
  };

  win.addEventListener('resize', function () {
    // resize时立刻change,pad上刷屏明显
    setRem();
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRem();
    }
  }, false);

  setRem();
})(doc.documentElement, doc.createElement('style'));

var defaultArtBoardWidth = 750;

var rem = function rem(px, artBoardWidth) {
  return px * 10 / (artBoardWidth || defaultArtBoardWidth) + 'rem';
};

var makePrivateRem = function makePrivateRem(artBoardWidth) {
  return function (px) {
    return rem(px, artBoardWidth);
  };
};

// 全局默认配置
var defaultGlobalConfig = {
  svgPath: ''
};

var runtimeGlobalConfig = {};

/**
 * Top namespace
 */
// TODO setGlobal/getGlobal
var Context = {
  getTID: getTID,
  mixin: mixin,
  noop: function noop(v) {
    return v;
  },

  rem: rem,
  makePrivateRem: makePrivateRem,
  /**
     * 执行全局配置
     * @param options
     */
  setGlobal: function setGlobal(options) {
    runtimeGlobalConfig = mixin({}, defaultGlobalConfig, options);
  },

  /**
     * 获取全局配置
     * @param property {String} optional
     * @returns {*}
     */
  getGlobal: function getGlobal(property) {
    return property ? runtimeGlobalConfig[property] : runtimeGlobalConfig;
  },

  /**
     * 为 class 添加前缀
     * @param property {String} required
     * @returns {*}
     */
  prefixClass: function prefixClass(classNames) {
    var prefix = Context.getGlobal('classNamePrefix') || 't';
    return classNames.split(' ').map(function (className) {
      return prefix + '-' + className;
    }).join(' ');
  }
};

mixin(Context, _env2.default);

// 多次require时保证返回同一个全局对象 保证setGlobal/getGlobal正确执行
exports.default = win.__TingleContext || (win.__TingleContext = Context);
module.exports = exports['default'];