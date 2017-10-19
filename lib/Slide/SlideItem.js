'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                  * Slide Component for tingle
                                                                                                                                                                                                                                                                  * @author gnosaij,changming
                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                  * Copyright 2014-2017, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                  * All rights reserved.
                                                                                                                                                                                                                                                                  */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideItem = function SlideItem(_ref) {
  var title = _ref.title,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style;

  var defaultStyle = { height: '100%' };
  return _react2.default.createElement(
    'div',
    {
      className: (0, _utils.prefixClass)('slide-item-inner') + ' ' + className,
      style: _extends({}, defaultStyle, style)
    },
    children,
    title ? _react2.default.createElement(
      'div',
      { className: '' + (0, _utils.prefixClass)('slide-item-title') },
      _react2.default.createElement(
        'div',
        null,
        title
      )
    ) : null
  );
};

SlideItem.displayName = 'SlideItem';

SlideItem.defaultProps = {
  className: '',
  style: {}
};

SlideItem.propTypes = {
  title: _react.PropTypes.node,
  children: _react.PropTypes.any.isRequired,
  showTitle: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};

exports.default = SlideItem;
module.exports = exports['default'];