'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Box Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var React = require('react');
var classnames = require('classnames');

var _require = require('../Context'),
    prefixClass = _require.prefixClass;

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

  var c = classnames(prefixClass('FBH'), (_classnames = {}, _defineProperty(_classnames, prefixClass('FB' + flex), !!flex), _defineProperty(_classnames, prefixClass('FBAS'), vAlign === START), _defineProperty(_classnames, prefixClass('FBAC'), vAlign === CENTER), _defineProperty(_classnames, prefixClass('FBAE'), vAlign === END), _defineProperty(_classnames, prefixClass('FBJS'), hAlign === START), _defineProperty(_classnames, prefixClass('FBJC'), hAlign === CENTER), _defineProperty(_classnames, prefixClass('FBJE'), hAlign === END), _defineProperty(_classnames, className, !!className), _classnames));

  return React.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};

HBox.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES)
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

  var c = classnames(prefixClass('FBV'), (_classnames2 = {}, _defineProperty(_classnames2, prefixClass('FB' + flex), !!flex), _defineProperty(_classnames2, prefixClass('FBJS'), vAlign === START), _defineProperty(_classnames2, prefixClass('FBJC'), vAlign === CENTER), _defineProperty(_classnames2, prefixClass('FBJE'), vAlign === END), _defineProperty(_classnames2, prefixClass('FBAS'), hAlign === START), _defineProperty(_classnames2, prefixClass('FBAC'), hAlign === CENTER), _defineProperty(_classnames2, prefixClass('FBAE'), hAlign === END), _defineProperty(_classnames2, className, !!className), _classnames2));

  return React.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};

VBox.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES)
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

  var c = classnames((_classnames3 = {}, _defineProperty(_classnames3, prefixClass('FB' + flex), !!flex), _defineProperty(_classnames3, className, !!className), _classnames3));

  return React.createElement(
    'div',
    _extends({}, other, { className: c }),
    props.children
  );
};

Box.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.number,
  hAlign: React.PropTypes.oneOf(ALIGN_VALUES),
  vAlign: React.PropTypes.oneOf(ALIGN_VALUES)
};

Box.displayName = 'Box';

module.exports = { HBox: HBox, VBox: VBox, Box: Box };