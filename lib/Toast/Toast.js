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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _CheckRound = require('salt-icon/lib/CheckRound');

var _CheckRound2 = _interopRequireDefault(_CheckRound);

var _CrossRound = require('salt-icon/lib/CrossRound');

var _CrossRound2 = _interopRequireDefault(_CrossRound);

var _ToastFail = require('salt-icon/lib/ToastFail');

var _ToastFail2 = _interopRequireDefault(_ToastFail);

var _ToastLoading = require('salt-icon/lib/ToastLoading');

var _ToastLoading2 = _interopRequireDefault(_ToastLoading);

var _InfoRound = require('salt-icon/lib/InfoRound');

var _InfoRound2 = _interopRequireDefault(_InfoRound);

var _Boxs = require('../Boxs');

var _Context = require('../Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Toast Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author minjie
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var globalInstance = void 0;

var iconCompMap = {
  success: _CheckRound2.default,
  error: _CrossRound2.default,
  fail: _ToastFail2.default,
  loading: _ToastLoading2.default,
  light: _InfoRound2.default
};

var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

    _this.state = {
      visible: props.visible,
      hasMask: props.hasMask
    };
    return _this;
  }

  _createClass(Toast, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        visible: nextProps.visible,
        hasMask: nextProps.hasMask
      });
    }
  }, {
    key: 'getIconComp',
    value: function getIconComp() {
      return iconCompMap[this.props.type];
    }
  }, {
    key: 'hasIcon',
    value: function hasIcon() {
      return this.getIconComp() || this.props.icon;
    }
  }, {
    key: 'startCountdown',
    value: function startCountdown() {
      var _this2 = this;

      var t = this;
      t.timer = setTimeout(function () {
        _this2.hide();
        clearTimeout(t.timer);
      }, t.props.duration);
    }
  }, {
    key: 'hide',
    value: function hide(fn) {
      this.setState({
        visible: false,
        hasMask: false
      }, function () {
        if (typeof fn === 'function') {
          fn();
        }
      });
    }
  }, {
    key: 'handleDidHide',
    value: function handleDidHide() {
      this.props.onDidHide();
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      var Icon = this.getIconComp();
      var icon = this.props.icon;
      if (!icon && !Icon) {
        return null;
      }
      // svg loader 无法解析 loading 的 svg
      // 使用 dangerouslySetInnerHTML={{__html: toastLoading}} 在 uc 内核也有问题
      // 临时方案使用 background
      if (Icon === _ToastLoading2.default) {
        return _react2.default.createElement('div', { className: (0, _Context.prefixClass)('toast-icon toast-icon-loading') });
      }
      var iconProps = {
        fill: '#fff',
        width: '44px',
        height: '44px',
        className: (0, _Context.prefixClass)('toast-icon')
      };
      if (icon) {
        return _react2.default.cloneElement(icon, iconProps);
      }
      return _react2.default.createElement(Icon, iconProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      var _t$state = t.state,
          visible = _t$state.visible,
          hasMask = _t$state.hasMask;

      var _t$props = t.props,
          className = _t$props.className,
          content = _t$props.content,
          autoHide = _t$props.autoHide,
          transitionName = _t$props.transitionName,
          prefixCls = _t$props.prefixCls,
          type = _t$props.type,
          maskTransitionName = _t$props.maskTransitionName,
          other = _objectWithoutProperties(_t$props, ['className', 'content', 'autoHide', 'transitionName', 'prefixCls', 'type', 'maskTransitionName']);

      var customStyle = {
        width: other.width,
        height: other.height
      };
      var transName = void 0;
      if (!transitionName) {
        if (type !== 'light') {
          transName = (0, _Context.prefixClass)('toast-fade');
        } else {
          transName = (0, _Context.prefixClass)('toast-light-fix-top');
        }
      } else {
        transName = (0, _Context.prefixClass)('toast-light-' + transitionName);
      }
      // 如果可见 且 可自动关闭 则开始倒计时
      if (visible && autoHide) {
        t.startCountdown();
      }
      var maskTransName = void 0;
      if (!maskTransitionName) {
        maskTransName = (0, _Context.prefixClass)('toast-fade');
      } else {
        maskTransName = (0, _Context.prefixClass)('toast-mask-' + maskTransitionName);
      }
      return _react2.default.createElement(
        _rcDialog2.default,
        {
          prefixCls: prefixCls,
          visible: visible,
          title: '',
          footer: '',
          style: customStyle,
          closable: false,
          mask: hasMask,
          maskTransitionName: maskTransName,
          className: (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, (0, _Context.prefixClass)('toast-' + type + ' toast-has-icon'), !!this.hasIcon()), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, transName, !!transName), _classnames)),
          transitionName: transName,
          afterClose: function afterClose() {
            t.handleDidHide();
          }
        },
        _react2.default.createElement(
          _Boxs.VBox,
          { hAlign: 'center' },
          this.renderIcon(),
          content && _react2.default.createElement(
            'div',
            { className: (0, _Context.prefixClass)('toast-content') },
            content
          )
        )
      );
    }
  }]);

  return Toast;
}(_react2.default.Component);

Toast.defaultProps = {
  prefixCls: 't-toast',
  hasMask: false,
  onDidHide: _Context.noop,
  visible: false,
  autoHide: true,
  content: '',
  duration: 1500
};

// http://facebook.github.io/react/docs/reusable-components.html
Toast.propTypes = {
  prefixCls: _react2.default.PropTypes.string,
  visible: _react2.default.PropTypes.bool,
  hasMask: _react2.default.PropTypes.bool,
  autoHide: _react2.default.PropTypes.bool,
  onDidHide: _react2.default.PropTypes.func,
  width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  content: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.string,
  duration: _react2.default.PropTypes.number,
  transitionName: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string
};

var WRAPPER_ID = '__TingleGlobalToast__';
var doc = document;
var wrapper = doc.getElementById(WRAPPER_ID);
if (!wrapper) {
  wrapper = doc.createElement('div');
  wrapper.id = WRAPPER_ID;
  doc.body.appendChild(wrapper);
}
_reactDom2.default.render(_react2.default.createElement(Toast, { visible: false }), wrapper);

Toast.show = function (props) {
  _reactDom2.default.render(_react2.default.createElement(Toast, _extends({ visible: true }, props, { ref: function ref(c) {
      globalInstance = c;
    } })), wrapper);
};

Toast.hide = function (fn) {
  if (globalInstance) {
    globalInstance.hide(fn);
  }
};

Toast.displayName = 'Toast';

exports.default = Toast;
module.exports = exports['default'];