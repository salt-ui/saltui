'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RightAddon = function RightAddon(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames3.default)(_defineProperty({}, (0, _Context.prefixClass)('text-field-right-addon'), true))
    },
    props.children
  );
};

RightAddon.defaultProps = {};
RightAddon.propTypes = {
  focus: _react2.default.PropTypes.bool,
  hover: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.any
};
RightAddon.displayName = 'RightAddon';

exports.default = RightAddon;
module.exports = exports['default'];