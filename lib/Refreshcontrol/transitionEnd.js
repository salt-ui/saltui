'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionEnd;
function transitionEnd(el, fun) {
  var arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];

  var handler = {
    handleEvent: function handleEvent() {
      arr.forEach(function (eventName) {
        el.removeEventListener(eventName, handler, false);
      });

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      fun.apply(el, args);
    }
  };
  arr.forEach(function (eventName) {
    el.addEventListener(eventName, handler, false);
  });
}
module.exports = exports['default'];