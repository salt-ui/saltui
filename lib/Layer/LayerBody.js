'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Mask = require('../Mask');

var _Mask2 = _interopRequireDefault(_Mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayerBody = function (_React$Component) {
  _inherits(LayerBody, _React$Component);

  function LayerBody(props) {
    _classCallCheck(this, LayerBody);

    var _this = _possibleConstructorReturn(this, (LayerBody.__proto__ || Object.getPrototypeOf(LayerBody)).call(this, props));

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  // zIndex no defalut value, we use auto generate way to handle it


  _createClass(LayerBody, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var visible = nextProps.visible;
      if (visible === false && t.props.onWillHide() === false) {
        return;
      }
      this.setState({
        visible: nextProps.visible
      }, visible ? t.props.onDidShow : t.props.onDidHide);
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var t = this;
      var visible = t.state.visible;
      var fullScreen = t.props.fullScreen;


      var hasWidth = 'width' in t.props;
      var hasHeight = 'height' in t.props;
      var height = hasHeight ? t.props.height : 'auto';
      var hasTop = 'top' in t.props;
      var hasBottom = 'bottom' in t.props;
      var hasLeft = 'left' in t.props;
      var hasRight = 'right' in t.props;

      var style = {
        width: fullScreen || !hasWidth ? '100%' : t.props.width,
        height: fullScreen ? '100%' : height
      };

      if (fullScreen) {
        style.top = 0;
        style.left = 0;
      } else {
        if (hasTop) {
          style.top = t.props.top;
        } else if (hasBottom) {
          style.bottom = t.props.bottom;
        } else {
          style.top = '50%';
          style.WebkitTransform = (style.WebkitTransform || '') + ' translateY(-50%)';
          style.transform = (style.transform || '') + ' translateY(-50%)';
        }

        if (hasLeft) {
          style.left = t.props.left;
        } else if (hasRight) {
          style.right = t.props.right;
        } else {
          style.left = '50%';
          style.WebkitTransform = (style.WebkitTransform || '') + ' translateX(-50%)';
          style.transform = (style.transform || '') + ' translateX(-50%)';
        }
      }

      style.zIndex = t.props.zIndex;
      style.display = visible ? 'block' : 'none';

      return style;
    }
  }, {
    key: 'handleMaskClick',
    value: function handleMaskClick() {
      var t = this;

      // 如果禁止了点击Mask关闭Layer, 则Mask的onWillHide必须返回false
      if (t.props.maskCloseable === false || t.props.onWillHide() === false) {
        return false;
      }
      t.setState({
        visible: false
      }, function () {
        t.props.onDidHide();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;

      var _t$props = t.props,
          className = _t$props.className,
          style = _t$props.style,
          other = _objectWithoutProperties(_t$props, ['className', 'style']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          _extends({}, other, {
            className: (0, _classnames3.default)((0, _Context.prefixClass)('layer'), _defineProperty({}, className, !!className)),
            style: t.getStyle()
          }),
          t.props.children
        ),
        this.props.hasMask && _react2.default.createElement(_Mask2.default, {
          zIndex: this.props.zIndex - 1,
          onWillHide: function onWillHide() {
            return (t.props.onMaskClick || t.handleMaskClick).call(t);
          },
          closeable: true,
          visible: t.state.visible,
          opacity: 0.6
        })
      );
    }
  }]);

  return LayerBody;
}(_react2.default.Component);

LayerBody.propTypes = {
  onDidShow: _react2.default.PropTypes.func,
  onWillHide: _react2.default.PropTypes.func,
  onMaskClick: _react2.default.PropTypes.func,
  onDidHide: _react2.default.PropTypes.func,
  maskOpacity: _react2.default.PropTypes.number,
  maskCloseable: _react2.default.PropTypes.bool,
  hasMask: _react2.default.PropTypes.bool,
  visible: _react2.default.PropTypes.bool,
  zIndex: _react2.default.PropTypes.number,
  fullScreen: _react2.default.PropTypes.bool
  // more: top, left, bottom, right, width, height
};
LayerBody.defaultProps = {
  onDidShow: _Context.noop,
  onWillHide: _Context.noop,
  onDidHide: _Context.noop,
  maskOpacity: 0.6,
  maskCloseable: false,
  hasMask: true,
  visible: false,
  zIndex: 1000,
  fullScreen: false
};
exports.default = LayerBody;
module.exports = exports['default'];