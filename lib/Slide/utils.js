'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Context = require('../Context');

var prefixClass = exports.prefixClass = function prefixClass(name) {
  if (Context.prefixClass) {
    return Context.prefixClass(name);
  }
  return 't-' + name;
};

exports.default = {
  prefixClass: prefixClass
};