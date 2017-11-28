'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getData = function getData(response) {
  var data = {};
  if (response.content) {
    if (response.content.data) {
      data = response.content.data;
    } else {
      data = response.content;
    }
  } else if (response.data) {
    data = response.data;
  } else {
    data = (typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' ? response : {};
  }
  return data;
};

var normalizeLocale = function normalizeLocale(locale) {
  var newLocale = locale.toLowerCase();
  if (newLocale.indexOf('-') !== -1) {
    return newLocale;
  } else if (newLocale.indexOf('_') !== -1) {
    return newLocale.split('_').join('-');
  } else if (newLocale) {
    var normalizedLocale = void 0;
    var locales = ['zh-cn', 'en-us'];
    for (var i = 0; i < locales.length; i++) {
      var item = locales[i];
      if (item.indexOf(newLocale) !== -1) {
        normalizedLocale = item;
        break;
      }
    }
    return normalizedLocale;
  }
  return undefined;
};

exports.default = {
  getData: getData,
  normalizeLocale: normalizeLocale
};
module.exports = exports['default'];