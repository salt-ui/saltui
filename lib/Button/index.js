'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TextButton = require('./TextButton');

var _TextButton2 = _interopRequireDefault(_TextButton);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Button Component Style for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
_Button2.default.TextButton = _TextButton2.default;
_Button2.default.IconButton = _IconButton2.default;
_Button2.default.ButtonGroup = _ButtonGroup2.default;
_Button2.default.Group = _ButtonGroup2.default;
exports.default = _Button2.default;
module.exports = exports['default'];