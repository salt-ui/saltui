/**
 * Dialog Component for tingle
 * @author minjie,cm
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const classnames = require('classnames');
const Context = require('../Context');
const RcDialog = require('rc-dialog');
const IconToastError = require('salt-icon/lib/ToastError');

const i18nData = require('./i18n');

const { prefixClass } = Context;

const TYPES = ['alert', 'confirm'];

const EMPTY_FUNC = function EMPTY_FUNC() { };

/**
 * 简单的 i18n 实现
 * @param {String} lang 语言类型 'zh_CN' | 'en_US'
 * @param {String} key 关键 key 'ok' | 'cancel' 其他值直接返回 key
 */
const getI18nVal = function (lang = 'zh_CN', key) {
  switch (lang) {
    case 'en_US':
      return i18nData[lang][key] || key;
    case 'zh_CN':
      return i18nData[lang][key] || key;
    default:
      return key;
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    // 设置到 state 作为渲染的依据
    this.state = {
      show: props.show,
    };
  }

  // 属性变化时把响应状态设置到 state
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const changeState = {};
    changeState.show = nextProps.show;
    this.setState(changeState);
  }

  // deprecated
  hide() {
    const { props } = this;
    this.setState({
      show: false,
    });
    // 未写在文档中
    if (props.onClose && typeof props.onClose === 'function') {
      props.onClose();
    }
  }

  // deprecated
  show() {
    this.setState({
      show: true,
    });
  }

  // 按钮的点击处理事件
  // 调用 buttons 上设置的 callback 如果 callback 返回 false 不关闭
  handleClick(callback) {
    if (callback() !== false) {
      this.hide();
    }
  }

  getButtons() {
    const { props, state } = this;
    // 构造的时候根据 type 生成对应的 btn
    // 默认 alert
    let buttons = [{
      content: props.confirmText || 'ok',
      callback: props.onConfirm || EMPTY_FUNC,
      primary: true,
    }];

    // confirm
    if (this.props.type === TYPES[1]) {
      buttons = [{
        content: this.props.cancelText || 'cancel',
        callback: this.props.onCancel || EMPTY_FUNC,
      }, {
        content: this.props.confirmText || 'ok',
        callback: this.props.onConfirm || EMPTY_FUNC,
        primary: true,
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
  renderBtns() {
    const { props, state } = this;
    const { btnDir, transparentMode } = props;
    const buttons = this.getButtons();
    // 1. 透明模式
    if (transparentMode) {
      const callback = props.onConfirm || (() => true);
      return (
        <div className={prefixClass('dialog-operation dialog-operation-trans-mode')}>
          <IconToastError
            width={31.5}
            height={31.5}
            fill={'#ffffff'}
            onClick={this.handleClick.bind(this, callback)}
          />
        </div>
      );
    }

    // 非透明模式下 buttons 从 state 中取
    let btns = null;
    if (buttons && buttons.length > 0) {
      btns = buttons.map((item, i) => {
        const callback = item.callback || (() => true);
        return (
          <div
            key={`tDialogButtonKey${i.toString()}`}
            className={classnames(prefixClass('FB1 dialog-button TE'), {
              [prefixClass('dialog-primary')]: item.primary,
              [prefixClass('dialog-secondary')]: !item.primary,
            })}
            onClick={this.handleClick.bind(this, callback)}
          >
            {getI18nVal(props.locale, item.content)}
          </div>
        );
      });
    }

    // 不存在 btns 直接返回 null
    if (btns == null) {
      return btns;
    }

    // 判断排布方向
    switch (btnDir) {
      case 'horizontal': {
        return (
          <div className={prefixClass('dialog-operation TE FBH')}>
            {btns}
          </div>
        );
      }
      case 'vertical': {
        return (
          <div className={prefixClass('dialog-operation dialog-operation-vertical')}>
            {btns}
          </div>
        );
      }
      default: {
        return (
          <div className={btns.length === 2 ? prefixClass('dialog-operation TE FBH') : prefixClass('dialog-operation dialog-operation-vertical')}>
            {btns}
          </div>
        );
      }
    }
  }

  render() {
    const t = this;
    const {
      title,
      content,
      children,
      className = '',
      wrapClassName = '',
      transparentMode,
    } = t.props;
    const { show } = t.state;
    const classSet = {
      [prefixClass('dialog')]: true,
      [t.props.className]: !!t.props.className,
      [prefixClass('dialog-trans-mode')]: transparentMode,
    };

    // 内容
    let displayContent = children;
    if (content) {
      displayContent = content;
    }

    return (
      <RcDialog
        visible={show}
        title={title}
        prefixCls={prefixClass('dialog')}
        wrapClassName={wrapClassName}
        className={classnames(classSet)}
        footer={this.renderBtns()}
        closable={false}
        transitionName={prefixClass('dialog-slideDown')}
        maskTransitionName={prefixClass('dialog-fade')}
      >
        {displayContent}
      </RcDialog>
    );
  }
}

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
  wrapClassName: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
Dialog.propTypes = {
  transparentMode: React.PropTypes.bool,        // 是否为透明背景
  // 弹窗头信息
  title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  // 弹窗内容 String || React.Element
  content: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  onConfirm: React.PropTypes.func,            // 点击确认的回调事件
  onCancel: React.PropTypes.func,             // 点击取消的回调事件
  type: React.PropTypes.string,               // alert | confirm 添加默认 buttons
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    content: React.PropTypes.string,
    callback: React.PropTypes.func,
    primary: React.PropTypes.bool,
  })),                                        // 自定义按钮
  btnDir: React.PropTypes.oneOf(['horizontal', 'vertical', '']),  // 按钮排布方式
  show: React.PropTypes.bool,                 // 当前弹窗是否可见
  locale: React.PropTypes.string,             // 语言信息
  confirmText: React.PropTypes.string,        // 确认文字
  cancelText: React.PropTypes.string,         // 取消文字
  transitionName: React.PropTypes.string,     // 弹窗动画内容名称
  maskTransitionName: React.PropTypes.string, // 遮罩背景动画内容名称
  wrapClassName: React.PropTypes.string,      // 弹窗容器 CSS 类名
  className: React.PropTypes.string,          // 弹窗内容 CSS 类名
};

// 全局 Dialog 组件 render 的 DOM ID
const WRAPPER_ID = '__TingleGlobalDialog__';
const doc = document;
let wrapper = null;

Dialog.global = null;
/**
 * Dialog.confirm/Dialog.alert 依赖的方法，插入 DOM 节点，并在这个 DOM 节点上实例化 Dialog 组件
 * @param {object} options 弹窗相关参数
 */
const show = function show(options = {}) {
  options.show = true;
  if (!wrapper) {
    wrapper = doc.getElementById(WRAPPER_ID);
    const { ...other } = options;

    if (!wrapper) {
      wrapper = doc.createElement('div');
      wrapper.id = WRAPPER_ID;
      doc.body.appendChild(wrapper);
    }
    Dialog.global = ReactDOM.render(<Dialog key={WRAPPER_ID} {...other} />, wrapper);
  }

  Dialog.global = ReactDOM.render(<Dialog key={WRAPPER_ID} {...options} />, wrapper);
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
  const alertOptions = { ...options };
  alertOptions.buttons = [{
    content: alertOptions.confirmText || 'ok',
    callback: alertOptions.onConfirm,
    primary: true,
  }];
  show(alertOptions);
};

/**
 * confirm api
 * @param { object } options confirm 相关参数
 */
Dialog.confirm = function confirm(options) {
  const confirmOptions = { ...options };
  confirmOptions.buttons = [{
    content: confirmOptions.cancelText || 'cancel',
    callback: confirmOptions.onCancel,
  }, {
    content: confirmOptions.confirmText || 'ok',
    callback: confirmOptions.onConfirm,
    primary: true,
  }];
  show(confirmOptions);
};

/**
 * 比 alert 和 confirm 更灵活的全局 dialog 方法
 */
Dialog.custom = function custom(options) {
  const customOptions = { ...options };
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
