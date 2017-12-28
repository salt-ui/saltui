'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixClass = undefined;

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixClass = exports.prefixClass = function prefixClass(name) {
  if (_Context2.default.prefixClass) {
    return _Context2.default.prefixClass(name);
  }
  return 't-' + name;
};

exports.default = {
  prefixClass: prefixClass
};