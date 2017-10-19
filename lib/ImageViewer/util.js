"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 参考：https://github.com/xiangpaopao/blog/issues/8
// innerHeight, innerHeight havs the best compability
var getHeight = function getHeight(ele) {
  return ele.getBoundingClientRect().height;
};

var isXiaomi = function isXiaomi() {
  if (navigator) {
    return (/xiaomi/i.test(navigator.userAgent)
    );
  }
  return false;
};

exports.default = {
  getHeight: getHeight,
  isXiaomi: isXiaomi
};
module.exports = exports["default"];