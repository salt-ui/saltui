'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _LeftAddon = require('./LeftAddon');

var _LeftAddon2 = _interopRequireDefault(_LeftAddon);

var _RightAddon = require('./RightAddon');

var _RightAddon2 = _interopRequireDefault(_RightAddon);

var _Count = require('./Count');

var _Count2 = _interopRequireDefault(_Count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TextField Component Style for tingle
 * @author jiasong.js
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */

_TextField2.default.LeftAddon = _LeftAddon2.default;
_TextField2.default.RightAddon = _RightAddon2.default;
_TextField2.default.Count = _Count2.default;

exports.default = _TextField2.default;
module.exports = exports['default'];