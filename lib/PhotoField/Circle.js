'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  strokeWidth: 1,
  trailWidth: 1
};

var Circle = function (_React$Component) {
  _inherits(Circle, _React$Component);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
  }

  _createClass(Circle, [{
    key: 'render',
    value: function render() {
      var props = _extends({}, this.props);
      var strokeWidth = props.strokeWidth;
      var radius = 50 - strokeWidth / 2;
      var pathString = 'M 50,50 m 0,-' + radius + '\n        a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n        a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
      var len = Math.PI * 2 * radius;
      var pathStyle = {
        strokeDasharray: len + 'px ' + len + 'px',
        strokeDashoffset: (100 - props.percent) / 100 * len + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };

      ['strokeWidth', 'trailWidth'].forEach(function (item) {
        if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
          props.trailWidth = props.strokeWidth;
          return;
        }
        if (!props[item]) {
          props[item] = defaultProps[item];
        }
      });

      return _react2.default.createElement(
        'svg',
        { className: 't-progress-circle', viewBox: '0 0 100 100' },
        _react2.default.createElement('path', {
          className: 't-progress-circle-trail',
          d: pathString,
          strokeWidth: props.trailWidth,
          fillOpacity: '0'
        }),
        _react2.default.createElement('path', {
          className: 't-progress-circle-path',
          d: pathString,
          strokeLinecap: 'round',
          strokeWidth: props.strokeWidth,
          fillOpacity: '0',
          style: pathStyle
        })
      );
    }
  }]);

  return Circle;
}(_react2.default.Component);

Circle.displayName = 'Progress-Circle';
Circle.propTypes = {
  status: _react2.default.PropTypes.oneOf(['normal', 'exception', 'success']),
  percent: _react2.default.PropTypes.number,
  strokeWidth: _react2.default.PropTypes.number,
  size: _react2.default.PropTypes.number,
  showInfo: _react2.default.PropTypes.bool
};
Circle.defaultProps = {
  status: 'normal', // exception active
  percent: 0,
  strokeWidth: 10,
  size: 156,
  showInfo: true
};
exports.default = Circle;
module.exports = exports['default'];