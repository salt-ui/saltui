'use strict';

/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var win = window;
var doc = document;

var ua = navigator.userAgent;
var isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
var isPC = !isMobile;

var supportTouch = 'ontouchstart' in window;
var support3D = 'WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix();
var supportHairline = function () {
  var support = false;
  if (win.devicePixelRatio && devicePixelRatio >= 2) {
    var testElem = doc.createElement('div');
    testElem.style.border = '.5px solid transparent';
    doc.body.appendChild(testElem);
    // 0.5 + 0.5 = 1
    // 在这个判断中，我们仅去判断 0.5px 在浏览器中是否被当做 0 px 处理，
    // 有的浏览器中虽然把 0.5px 会渲染成 1px，但仍会显示边线，这仍然是我们所希望的。
    if (testElem.offsetHeight >= 1) {
      support = true;
    }
    doc.body.removeChild(testElem);
  }
  return support;
}();

// 常量
var TOUCH_START = supportTouch ? 'touchstart' : 'mousedown';
var TOUCH_MOVE = supportTouch ? 'touchmove' : 'mousemove';
var TOUCH_END = supportTouch ? 'touchend' : 'mouseup';
var TOUCH_CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

var env = {
  // 是什么环境
  isPC: isPC,
  isMobile: isMobile,

  // 是否支持
  support3D: support3D,
  supportHairline: supportHairline,
  supportTouch: supportTouch,

  // 事件去差异
  TOUCH_START: TOUCH_START,
  TOUCH_MOVE: TOUCH_MOVE,
  TOUCH_END: TOUCH_END,
  TOUCH_CANCEL: TOUCH_CANCEL,
  RESIZE: 'resize'
};

module.exports = env;