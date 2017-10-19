'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BottomTip = function (_React$Component) {
  _inherits(BottomTip, _React$Component);

  function BottomTip() {
    _classCallCheck(this, BottomTip);

    return _possibleConstructorReturn(this, (BottomTip.__proto__ || Object.getPrototypeOf(BottomTip)).apply(this, arguments));
  }

  _createClass(BottomTip, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'bottom-tip' },
        this.props.icon,
        _react2.default.createElement(
          'div',
          { className: 'text' },
          this.props.text
        )
      );
    }
  }]);

  return BottomTip;
}(_react2.default.Component);

BottomTip.displayName = 'BottomTip';
BottomTip.defaultProps = {
  text: '',
  icon: null
};
BottomTip.propTypes = {
  icon: _react2.default.PropTypes.element,
  text: _react2.default.PropTypes.string.isRequired
};
exports.default = BottomTip;
module.exports = exports['default'];