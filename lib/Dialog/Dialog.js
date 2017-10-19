'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dialog Component for tingle
 * @author minjie,cm
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var classnames = require('classnames');
var Context = require('../Context');
var RcDialog = require('rc-dialog');
var IconToastError = require('salt-icon/lib/ToastError');

var i18nData = require('./i18n');

var prefixClass = Context.prefixClass;


var TYPES = ['alert', 'confirm'];

var EMPTY_FUNC = function EMPTY_FUNC() {};

/**
 * 简单的 i18n 实现
 * @param {String} lang 语言类型 'zh_CN' | 'en_US'
 * @param {String} key 关键 key 'ok' | 'cancel' 其他值直接返回 key
 */
var getI18nVal = function getI18nVal() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zh_CN';
  var key = arguments[1];

  switch (lang) {
    case 'en_US':
      return i18nData[lang][key] || key;
    case 'zh_CN':
      return i18nData[lang][key] || key;
    default:
      return key;
  }
};

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    // 设置到 state 作为渲染的依据
    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      show: props.show
    };
    return _this;
  }

  // 属性变化时把响应状态设置到 state


  _createClass(Dialog, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      var changeState = {};
      changeState.show = nextProps.show;
      this.setState(changeState);
    }

    // deprecated

  }, {
    key: 'hide',
    value: function hide() {
      var props = this.props;

      this.setState({
        show: false
      });
      // 未写在文档中
      if (props.onClose && typeof props.onClose === 'function') {
        props.onClose();
      }
    }

    // deprecated

  }, {
    key: 'show',
    value: function show() {
      this.setState({
        show: true
      });
    }

    // 按钮的点击处理事件
    // 调用 buttons 上设置的 callback 如果 callback 返回 false 不关闭

  }, {
    key: 'handleClick',
    value: function handleClick(callback) {
      if (callback() !== false) {
        this.hide();
      }
    }
  }, {
    key: 'getButtons',
    value: function getButtons() {
      var props = this.props,
          state = this.state;
      // 构造的时候根据 type 生成对应的 btn
      // 默认 alert

      var buttons = [{
        content: props.confirmText || 'ok',
        callback: props.onConfirm || EMPTY_FUNC,
        primary: true
      }];

      // confirm
      if (this.props.type === TYPES[1]) {
        buttons = [{
          content: this.props.cancelText || 'cancel',
          callback: this.props.onCancel || EMPTY_FUNC
        }, {
          content: this.props.confirmText || 'ok',
          callback: this.props.onConfirm || EMPTY_FUNC,
          primary: true
        }];
      }
      // 如果用户传递了 butons 属性，以用户的 buttons 为准
      if (props.buttons) {
        buttons = props.buttons;
      }
      return buttons;
    }

    /**
     * 渲染 btn 方法
     */

  }, {
    key: 'renderBtns',
    value: function renderBtns() {
      var _this2 = this;

      var props = this.props,
          state = this.state;
      var btnDir = props.btnDir,
          transparentMode = props.transparentMode;

      var buttons = this.getButtons();
      // 1. 透明模式
      if (transparentMode) {
        var callback = props.onConfirm || function () {
          return true;
        };
        return React.createElement(
          'div',
          { className: prefixClass('dialog-operation dialog-operation-trans-mode') },
          React.createElement(IconToastError, {
            width: 31.5,
            height: 31.5,
            fill: '#ffffff',
            onClick: this.handleClick.bind(this, callback)
          })
        );
      }

      // 非透明模式下 buttons 从 state 中取
      var btns = null;
      if (buttons && buttons.length > 0) {
        btns = buttons.map(function (item, i) {
          var _classnames;

          var callback = item.callback || function () {
            return true;
          };
          return React.createElement(
            'div',
            {
              key: 'tDialogButtonKey' + i.toString(),
              className: classnames(prefixClass('FB1 dialog-button TE'), (_classnames = {}, _defineProperty(_classnames, prefixClass('dialog-primary'), item.primary), _defineProperty(_classnames, prefixClass('dialog-secondary'), !item.primary), _classnames)),
              onClick: _this2.handleClick.bind(_this2, callback)
            },
            getI18nVal(props.locale, item.content)
          );
        });
      }

      // 不存在 btns 直接返回 null
      if (btns == null) {
        return btns;
      }

      // 判断排布方向
      switch (btnDir) {
        case 'horizontal':
          {
            return React.createElement(
              'div',
              { className: prefixClass('dialog-operation TE FBH') },
              btns
            );
          }
        case 'vertical':
          {
            return React.createElement(
              'div',
              { className: prefixClass('dialog-operation dialog-operation-vertical') },
              btns
            );
          }
        default:
          {
            return React.createElement(
              'div',
              { className: btns.length === 2 ? prefixClass('dialog-operation TE FBH') : prefixClass('dialog-operation dialog-operation-vertical') },
              btns
            );
          }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classSet;

      var t = this;
      var _t$props = t.props,
          title = _t$props.title,
          content = _t$props.content,
          children = _t$props.children,
          _t$props$className = _t$props.className,
          className = _t$props$className === undefined ? '' : _t$props$className,
          _t$props$wrapClassNam = _t$props.wrapClassName,
          wrapClassName = _t$props$wrapClassNam === undefined ? '' : _t$props$wrapClassNam,
          transparentMode = _t$props.transparentMode;
      var show = t.state.show;

      var classSet = (_classSet = {}, _defineProperty(_classSet, prefixClass('dialog'), true), _defineProperty(_classSet, t.props.className, !!t.props.className), _defineProperty(_classSet, prefixClass('dialog-trans-mode'), transparentMode), _classSet);

      // 内容
      var displayContent = children;
      if (content) {
        displayContent = content;
      }

      return React.createElement(
        RcDialog,
        {
          visible: show,
          title: title,
          prefixCls: prefixClass('dialog'),
          wrapClassName: wrapClassName,
          className: classnames(classSet),
          footer: this.renderBtns(),
          closable: false,
          transitionName: prefixClass('dialog-slideDown'),
          maskTransitionName: prefixClass('dialog-fade')
        },
        displayContent
      );
    }
  }]);

  return Dialog;
}(React.Component);

Dialog.defaultProps = {
  transparentMode: false,
  title: '',
  content: '',
  onConfirm: null,
  onCancel: null,
  confirmText: null,
  cancelText: null,
  type: 'alert',
  show: true,
  locale: 'zh_CN',
  buttons: null,
  btnDir: '',
  transitionName: prefixClass('dialog-superScale'),
  maskTransitionName: prefixClass('dialog-fade'),
  className: '',
  wrapClassName: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
Dialog.propTypes = {
  transparentMode: React.PropTypes.bool, // 是否为透明背景
  // 弹窗头信息
  title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  // 弹窗内容 String || React.Element
  content: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  onConfirm: React.PropTypes.func, // 点击确认的回调事件
  onCancel: React.PropTypes.func, // 点击取消的回调事件
  type: React.PropTypes.string, // alert | confirm 添加默认 buttons
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    content: React.PropTypes.string,
    callback: React.PropTypes.func,
    primary: React.PropTypes.bool
  })), // 自定义按钮
  btnDir: React.PropTypes.oneOf(['horizontal', 'vertical', '']), // 按钮排布方式
  show: React.PropTypes.bool, // 当前弹窗是否可见
  locale: React.PropTypes.string, // 语言信息
  confirmText: React.PropTypes.string, // 确认文字
  cancelText: React.PropTypes.string, // 取消文字
  transitionName: React.PropTypes.string, // 弹窗动画内容名称
  maskTransitionName: React.PropTypes.string, // 遮罩背景动画内容名称
  wrapClassName: React.PropTypes.string, // 弹窗容器 CSS 类名
  className: React.PropTypes.string // 弹窗内容 CSS 类名
};

// 全局 Dialog 组件 render 的 DOM ID
var WRAPPER_ID = '__TingleGlobalDialog__';
var doc = document;
var wrapper = null;

Dialog.global = null;
/**
 * Dialog.confirm/Dialog.alert 依赖的方法，插入 DOM 节点，并在这个 DOM 节点上实例化 Dialog 组件
 * @param {object} options 弹窗相关参数
 */
var show = function show() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options.show = true;
  if (!wrapper) {
    wrapper = doc.getElementById(WRAPPER_ID);

    var other = _objectWithoutProperties(options, []);

    if (!wrapper) {
      wrapper = doc.createElement('div');
      wrapper.id = WRAPPER_ID;
      doc.body.appendChild(wrapper);
    }
    Dialog.global = ReactDOM.render(React.createElement(Dialog, _extends({ key: WRAPPER_ID }, other)), wrapper);
  }

  Dialog.global = ReactDOM.render(React.createElement(Dialog, _extends({ key: WRAPPER_ID }, options)), wrapper);
};

/**
 * 隐藏通过 alert/confirm 展示出来的弹窗实例
 */
Dialog.hide = function hide() {
  if (Dialog.global) {
    Dialog.global.hide();
  }
};

/**
 * alert api
 * @param { object } options alert 相关参数
 */
Dialog.alert = function alert(options) {
  var alertOptions = _extends({}, options);
  alertOptions.buttons = [{
    content: alertOptions.confirmText || 'ok',
    callback: alertOptions.onConfirm,
    primary: true
  }];
  show(alertOptions);
};

/**
 * confirm api
 * @param { object } options confirm 相关参数
 */
Dialog.confirm = function confirm(options) {
  var confirmOptions = _extends({}, options);
  confirmOptions.buttons = [{
    content: confirmOptions.cancelText || 'cancel',
    callback: confirmOptions.onCancel
  }, {
    content: confirmOptions.confirmText || 'ok',
    callback: confirmOptions.onConfirm,
    primary: true
  }];
  show(confirmOptions);
};

/**
 * 比 alert 和 confirm 更灵活的全局 dialog 方法
 */
Dialog.custom = function custom(options) {
  var customOptions = _extends({}, options);
  if (options.buttons) {
    return show(customOptions);
  }
  if (options.type && options.type === TYPES[1]) {
    return Dialog.confirm(customOptions);
  }
  return Dialog.alert(customOptions);
};

// 留了一个 rcDialog 引用
Dialog.rcDialog = RcDialog;

Dialog.displayName = 'Dialog';

module.exports = Dialog;