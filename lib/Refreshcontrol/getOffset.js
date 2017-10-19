"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffset;
function getOffset(el) {
  var box = el.getBoundingClientRect();
  var body = document.body;
  var clientTop = el.clientTop || body.clientTop || 0;
  var clientLeft = el.clientLeft || body.clientLeft || 0;
  var scrollTop = window.pageYOffset || el.scrollTop;
  var scrollLeft = window.pageXOffset || el.scrollLeft;

  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
module.exports = exports["default"];