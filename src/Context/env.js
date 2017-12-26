/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const win = window;
const doc = document;

const ua = navigator.userAgent;
const isMobile = !!ua.match(/mobile/i) || 'orientation' in win;
const isPC = !isMobile;

const supportTouch = 'ontouchstart' in window;
const support3D = ('WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix());
const supportHairline = (() => {
  let support = false;
  if (win.devicePixelRatio && devicePixelRatio >= 2) {
    const testElem = doc.createElement('div');
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
})();

// 常量
const TOUCH_START = supportTouch ? 'touchstart' : 'mousedown';
const TOUCH_MOVE = supportTouch ? 'touchmove' : 'mousemove';
const TOUCH_END = supportTouch ? 'touchend' : 'mouseup';
const TOUCH_CANCEL = supportTouch ? 'touchcancel' : 'mouseup';

const env = {
  // 是什么环境
  isPC,
  isMobile,

  // 是否支持
  support3D,
  supportHairline,
  supportTouch,

  // 事件去差异
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
  RESIZE: 'resize',
};

export default env;
