'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getPageSize = function () {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var result = { width: width, height: height };

  return function () {
    return result;
  };
}();

var processData = function processData(data) {
  var values = [];
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !(data instanceof Array)) {
    var keys = Object.keys(data);
    values = keys.map(function (key) {
      return {
        value: key,
        text: data[key]
      };
    });
  } else {
    values = data;
  }
  return values;
};

var debounce = function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function origin() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var t = this;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(t, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(t, args);
  };
};

var toString = Object.prototype.toString;

var isArray = function isArray(arg) {
  return toString.call(arg) === '[object Array]';
};

var addUrlParam = function addUrlParam(name, value) {
  var currentUrl = location.href;
  var reg = void 0;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(name + '=[-\\w]{4,25}', 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, name + '=' + value);
    } else {
      currentUrl += '&' + name + '=' + value;
    }
  } else {
    currentUrl += '?' + name + '=' + value;
  }
  return currentUrl;
};

exports.default = {
  getPageSize: getPageSize,
  processData: processData,
  debounce: debounce,
  isArray: isArray,
  addUrlParam: addUrlParam
};
module.exports = exports['default'];