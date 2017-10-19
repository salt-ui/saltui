'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultFormatter = {
  y: 'YYYY',
  m: 'YYYY-MM',
  d: 'YYYY-MM-DD'
};

var Locale = {
  cn: 'zh-cn',
  en: 'en-us'
};

// 以下方法，只做简单判断

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isString(str) {
  return typeof str === 'string';
}

function isNumber(str) {
  return (/^\d*$/.test(str)
  );
}

function isStringOrNumber(str) {
  return isString(str) || isNumber(str);
}

exports.defaultFormatter = defaultFormatter;
exports.Locale = Locale;
exports.isObject = isObject;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isStringOrNumber = isStringOrNumber;