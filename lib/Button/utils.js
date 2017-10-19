'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixClass = function prefixClass(name) {
  return _Context2.default.prefixClass ? _Context2.default.prefixClass(name) : 't-' + name;
};

exports.default = {
  prefixClass: prefixClass
};
module.exports = exports['default'];