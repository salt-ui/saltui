'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Box Component for tingle
                                                                                                                                                                                                                              * @author gnosaij
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * Copyright 2014-2015, Tingle Team, Alinw.
                                                                                                                                                                                                                              * All rights reserved.
                                                                                                                                                                                                                              */

var START = 'start';
var CENTER = 'center';
var END = 'end';
var ALIGN_VALUES = [START, CENTER, END];

/**
 * 水平方向弹性容器
 * @param props
 * @returns {XML}
 * @constructor
 */
var HBox = function HBox(props) {
  var _classnames;

  var className = props.className,
      flex = props.flex,
      vAlign = props.vAlign,
      hAlign = props.hAlign,
      other = _objectWithoutProperties(props, ['className', 'flex', 'vAlign', 'hAlign']);

  var c = (0, _classnames5.default)((0, _Context.prefixClass)('FBH'), (_classnames = {}, _defineProperty(_classnames, (0, _Context.prefixClass)('FB' + flex), !!flex), _defineProperty(_classnames, (0, _Context.prefixClass)('FBAS'), vAlign === START), _defineProperty(_classnames, (0, _Context.prefixClass)('FBAC'), vAlign === CENTER), _defineProperty(_classnames, (0, _Context.prefixClass)('FBAE'), vAlign === END), _defineProperty(_classnames, (0, _Context.prefixClass)('FBJS'), hAlign === START), _defineProperty(_classnames, (0, _Context.prefixClass)('FBJC'), hAlign === CENTER), _defineProperty(_classnames, (0, _Context.prefixClass)('FBJE'), hAlign === END), _defineProperty(_classnames, className, !!className), _classnames));

  return _react2.default.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};

HBox.propTypes = {
  className: _react2.default.PropTypes.string,
  flex: _react2.default.PropTypes.number,
  hAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES)
};
HBox.defaultProps = {
  className: '',
  flex: 0
};

HBox.displayName = 'HBox';

/**
 * 垂直方向弹性容器
 * @param props
 * @returns {XML}
 * @constructor
 */
var VBox = function VBox(props) {
  var _classnames2;

  var className = props.className,
      flex = props.flex,
      vAlign = props.vAlign,
      hAlign = props.hAlign,
      other = _objectWithoutProperties(props, ['className', 'flex', 'vAlign', 'hAlign']);

  var c = (0, _classnames5.default)((0, _Context.prefixClass)('FBV'), (_classnames2 = {}, _defineProperty(_classnames2, (0, _Context.prefixClass)('FB' + flex), !!flex), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBJS'), vAlign === START), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBJC'), vAlign === CENTER), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBJE'), vAlign === END), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBAS'), hAlign === START), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBAC'), hAlign === CENTER), _defineProperty(_classnames2, (0, _Context.prefixClass)('FBAE'), hAlign === END), _defineProperty(_classnames2, className, !!className), _classnames2));

  return _react2.default.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};
VBox.propTypes = {
  className: _react2.default.PropTypes.string,
  flex: _react2.default.PropTypes.number,
  hAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES)
};
VBox.defaultProps = {
  className: '',
  flex: 0
};
VBox.displayName = 'VBox';

/**
 * 伸缩子元素
 * @param props
 * @returns {XML}
 * @constructor
 */
var Box = function Box(props) {
  var _classnames3;

  var className = props.className,
      flex = props.flex,
      other = _objectWithoutProperties(props, ['className', 'flex']);

  var c = (0, _classnames5.default)((_classnames3 = {}, _defineProperty(_classnames3, (0, _Context.prefixClass)('FB' + flex), !!flex), _defineProperty(_classnames3, className, !!className), _classnames3));

  return _react2.default.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};

Box.propTypes = {
  className: _react2.default.PropTypes.string,
  flex: _react2.default.PropTypes.number,
  hAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: _react2.default.PropTypes.oneOf(ALIGN_VALUES)
};
Box.defaultProps = {
  className: '',
  flex: 0
};
Box.displayName = 'Box';

exports.default = { HBox: HBox, VBox: VBox, Box: Box };
module.exports = exports['default'];