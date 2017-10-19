'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _cssAnimation = require('css-animation');

var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Mask Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MaskBody = function (_React$Component) {
  _inherits(MaskBody, _React$Component);

  function MaskBody(props) {
    _classCallCheck(this, MaskBody);

    var _this = _possibleConstructorReturn(this, (MaskBody.__proto__ || Object.getPrototypeOf(MaskBody)).call(this, props));

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  _createClass(MaskBody, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevPorps) {
      if (this.props.visible && !prevPorps.visible) {
        document.body.style.overflow = 'hidden';
      } else if (!this.props.visible && prevPorps.visible) {
        document.body.style.overflow = '';
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var t = this;
      if (t.props.closeable === false || t.props.onWillHide() === false) {
        return;
      }
      t.setState({
        visible: false
      }, function () {
        t.props.onDidHide();
      });
    }
  }, {
    key: 'toggle',
    value: function toggle(node, show, done) {
      var opacity = this.props.opacity;

      (0, _cssAnimation2.default)(node, '__css-animation__' + (0, _Context.prefixClass)('mask'), {
        start: function start() {
          if (show) {
            node.style.opacity = 0;
          }
        },
        active: function active() {
          node.style.opacity = show ? opacity : 0;
        },
        end: function end() {
          done();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;

      var _t$props = t.props,
          className = _t$props.className,
          zIndex = _t$props.zIndex,
          other = _objectWithoutProperties(_t$props, ['className', 'zIndex']);

      var visible = t.state.visible;


      var styleMap = {
        display: visible ? 'block' : 'none',
        zIndex: zIndex
      };

      return _react2.default.createElement(
        _rcAnimate2.default,
        {
          component: '',
          animation: {
            appear: function appear(node, done) {
              _this2.toggle(node, true, done);
            },
            enter: function enter(node, done) {
              _this2.toggle(node, true, done);
            },
            leave: function leave(node, done) {
              _this2.toggle(node, false, done);
            }
          }
        },
        visible ? _react2.default.createElement('div', _extends({
          ref: function ref(c) {
            _this2.root = c;
          },
          className: (0, _classnames3.default)((0, _Context.prefixClass)('mask'), _defineProperty({
            visible: visible
          }, className, !!className)),
          style: styleMap,
          onClick: function onClick() {
            t.handleClick();
          }
        }, other)) : null
      );
    }
  }]);

  return MaskBody;
}(_react2.default.Component);

MaskBody.defaultProps = {
  opacity: 0.4,
  closeable: true,
  onDidHide: _Context.noop,
  onWillHide: _Context.noop,
  visible: false,
  zIndex: 1000
};

// http://facebook.github.io/react/docs/reusable-components.html
MaskBody.propTypes = {
  className: _react2.default.PropTypes.string,
  closeable: _react2.default.PropTypes.bool,
  opacity: _react2.default.PropTypes.number,
  onDidHide: _react2.default.PropTypes.func,
  onWillHide: _react2.default.PropTypes.func,
  visible: _react2.default.PropTypes.bool,
  zIndex: _react2.default.PropTypes.number
};

MaskBody.displayName = 'MaskBody';

var Mask = function (_React$Component2) {
  _inherits(Mask, _React$Component2);

  function Mask() {
    _classCallCheck(this, Mask);

    return _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).apply(this, arguments));
  }

  _createClass(Mask, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var div = document.createElement('div');
      document.body.appendChild(div);
      this.wrapper = div;
      if (this.props.renderToBody) {
        this.mountInBody();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.renderToBody && !nextProps.renderToBody) {
        this.unmountInBody();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.renderToBody) {
        this.mountInBody();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmountInBody();
      document.body.removeChild(this.wrapper);
    }
  }, {
    key: 'mountInBody',
    value: function mountInBody() {
      _reactDom2.default.render(this.renderMaskBody(), this.wrapper);
    }
  }, {
    key: 'unmountInBody',
    value: function unmountInBody() {
      _reactDom2.default.unmountComponentAtNode(this.wrapper);
    }
  }, {
    key: 'renderMaskBody',
    value: function renderMaskBody() {
      var newProps = _extends({}, this.props);
      delete newProps.renderToBody;
      return _react2.default.createElement(MaskBody, newProps);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.renderToBody) {
        return null;
      }
      return this.renderMaskBody();
    }
  }]);

  return Mask;
}(_react2.default.Component);

Mask.defaultProps = _extends({}, MaskBody.defaultProps, {
  renderToBody: true
});

Mask.propTypes = _extends({}, MaskBody.propTypes, {
  renderToBody: _react2.default.PropTypes.bool
});

exports.default = Mask;
module.exports = exports['default'];