'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LeftAddon = function LeftAddon(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames3.default)(_defineProperty({}, (0, _Context.prefixClass)('text-field-left-addon'), true))
    },
    props.children
  );
};

LeftAddon.defaultProps = {};
LeftAddon.propTypes = {
  focus: _propTypes2.default.bool,
  hover: _propTypes2.default.bool,
  children: _propTypes2.default.any
};
LeftAddon.displayName = 'LeftAddon';

exports.default = LeftAddon;
module.exports = exports['default'];