'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Badge Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author minjie.lmj
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Badge = function (_React$Component) {
  _inherits(Badge, _React$Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: 'render',
    value: function render() {
      var t = this;
      var cls = _defineProperty({}, t.props.className, !!t.props.className);
      var _props = this.props,
          dot = _props.dot,
          text = _props.text,
          corner = _props.corner,
          overflowCount = _props.overflowCount;
      var count = this.props.count;

      count = count > overflowCount ? overflowCount + '+' : count;

      if (text) {
        count = text;
      }

      var style = t.props.style || {};

      if ('left' in style) {
        style.right = 'auto';
      }

      if (corner) {
        cls['badge-corner'] = true;
        cls['badge-' + t.props.corner] = true;
      } else {
        if (dot) {
          count = '';
          cls['badge-dot'] = true;
        }

        if (t.props.children) {
          style.webkitTransform = 'translate(50%, -50%)';
          style.transform = 'translate(50%, -50%)'; // fix https://aone.alibaba-inc.com/req/11690248
        }
      }

      if (!t.props.children) {
        cls['badge-no-child'] = true;
      }

      var showBadge = true;
      if ((!count || count === '0' || count < 0) && !dot) {
        showBadge = false;
      }

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_Context2.default.prefixClass('badge'), cls) },
        showBadge ? _react2.default.createElement(
          'div',
          { className: 'badge-inner', style: style },
          count
        ) : null,
        t.props.children
      );
    }
  }]);

  return Badge;
}(_react2.default.Component);

Badge.propTypes = {
  className: _react2.default.PropTypes.string,
  count: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  text: _react2.default.PropTypes.string,
  corner: _react2.default.PropTypes.oneOf(['rt', 'lt', 'rb', 'lb']),
  dot: _react2.default.PropTypes.bool,
  overflowCount: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};
Badge.defaultProps = {
  className: '',
  count: 0,
  text: '',
  dot: false,
  overflowCount: 99
};
Badge.displayName = 'Badge';
exports.default = Badge;
module.exports = exports['default'];