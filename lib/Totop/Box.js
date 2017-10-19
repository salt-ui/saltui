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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
  }

  _createClass(Box, [{
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props = t.props,
          children = _t$props.children,
          className = _t$props.className,
          size = _t$props.size,
          type = _t$props.type,
          onClick = _t$props.onClick;

      var prefixCls = _Context2.default.prefixClass('totop-wrap');
      var finalClass = (0, _classnames2.default)(prefixCls, prefixCls + '-' + size, prefixCls + '-' + type, className);
      return _react2.default.createElement(
        'div',
        {
          className: finalClass,
          onClick: onClick
        },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-inner' },
          children
        )
      );
    }
  }]);

  return Box;
}(_react2.default.Component);

Box.defaultProps = {
  type: 'primary',
  size: 'medium'
};
Box.propTypes = {
  type: _react.PropTypes.oneOf(['primary', 'secondary']),
  size: _react.PropTypes.oneOf(['large', 'medium', 'small'])
};
exports.default = Box;
module.exports = exports['default'];