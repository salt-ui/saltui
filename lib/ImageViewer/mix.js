'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _native = require('./native');

var _native2 = _interopRequireDefault(_native);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = window.navigator.userAgent;
var isDD = /DingTalk/i.test(ua);

var Mix = isDD ? _native2.default : _index2.default;

exports.default = Mix;
module.exports = exports['default'];