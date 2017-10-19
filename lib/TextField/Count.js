'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Count = function Count(props) {
  var _classnames2;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames4.default)((0, _Context.prefixClass)('text-field-count'), _defineProperty({}, (0, _Context.prefixClass)('text-field-count-overflow'), parseInt(props.length, 10) > parseInt(props.total, 10)))
    },
    _react2.default.createElement(
      'span',
      {
        className: (0, _classnames4.default)((_classnames2 = {}, _defineProperty(_classnames2, (0, _Context.prefixClass)('text-field-count-actual'), true), _defineProperty(_classnames2, (0, _Context.prefixClass)('text-field-count-actual-overflow'), parseInt(props.length, 10) > parseInt(props.total, 10)), _classnames2))
      },
      props.length
    ),
    _react2.default.createElement(
      'span',
      { className: (0, _Context.prefixClass)('text-field-count-slash') },
      '/'
    ),
    _react2.default.createElement(
      'span',
      { className: (0, _Context.prefixClass)('text-field-count-max') },
      props.total
    )
  );
};

Count.defaultProps = {
  length: 0
};

Count.propTypes = {
  length: _react2.default.PropTypes.number,
  total: _react2.default.PropTypes.number
};

Count.displayName = 'Count';

exports.default = Count;
module.exports = exports['default'];