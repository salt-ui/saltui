/**
 * Dialog Component for SaltUI
 * @author minjie,cm
 *
 * Copyright 2018-2019, SaltUI Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import RcDialog from 'rc-dialog';
import IconToastError from 'salt-icon/lib/ToastError';
import Context from '../Context';
import { stopBodyScroll, getLocale } from '../Utils';
import i18nData from './i18n';

const { prefixClass } = Context;

const TYPES = ['alert', 'confirm'];

const EMPTY_FUNC = function EMPTY_FUNC() { };
/**
 * 简单的 i18n 实现
 * @param {String} lang 语言类型 'zh-cn' | 'en-us'
 * @param {String} key 关键 key 'ok' | 'cancel' 其他值直接返回 key
 */
const getI18nVal = function getI18nVal(lang = 'zh-cn', key) {
  switch (lang) {
    case 'en-us':
      return i18nData[lang][key] || key;
    case 'zh-cn':
      return i18nData[lang][key] || key;
    default:
      return key;
  }
};

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    // 设置到 state 作为渲染的依据
    this.state = {
      show: props.show,
      prevShow: props.show,
    };
    this.getContentDom = this.getContentDom.bind(this);
  }


  componentDidMount() {
    if (this.state.show === true) {
      this.bodyScroll = stopBodyScroll(this.getContentDom);
    }
  }

  static getDerivedStateFromProps(nextProps, { prevShow }) {
    if (nextProps.show !== prevShow) {
      return {
        show: nextProps.show,
        prevShow: nextProps.show,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show === false && this.state.show === true) {
      this.bodyScroll = stopBodyScroll(this.getContentDom);
    } else if (prevState.show === true && this.state.show === false && this.bodyScroll) {
      this.bodyScroll.enable();
      this.bodyScroll = null;
    }
  }


  componentWillUnmount() {
    if (this.bodyScroll) {
      this.bodyScroll.enable();
      this.bodyScroll = null;
    }
  }

  getContentDom() {
    return this.content;
  }

  getButtons() {
    const { props } = this;
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
      ({ buttons } = props);
    }
    return buttons;
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


  /**
   * 渲染 btn 方法
   */
  renderBtns() {
    const { props } = this;
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
            fill="#ffffff"
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
            {getI18nVal(getLocale(props.locale), item.content)}
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
        <div ref={(c) => {
          this.content = c;
        }}
        >
          {displayContent}
        </div>
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
  locale: 'zh-cn',
  buttons: null,
  btnDir: '',
  transitionName: prefixClass('dialog-superScale'),
  maskTransitionName: prefixClass('dialog-fade'),
  className: '',
  wrapClassName: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
Dialog.propTypes = {
  transparentMode: PropTypes.bool, // 是否为透明背景
  // 弹窗头信息
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // 弹窗内容 String || React.Element
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onConfirm: PropTypes.func, // 点击确认的回调事件
  onCancel: PropTypes.func, // 点击取消的回调事件
  type: PropTypes.string, // alert | confirm 添加默认 buttons
  buttons: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    callback: PropTypes.func,
    primary: PropTypes.bool,
  })), // 自定义按钮
  btnDir: PropTypes.oneOf(['horizontal', 'vertical', '']), // 按钮排布方式
  show: PropTypes.bool, // 当前弹窗是否可见
  locale: PropTypes.string, // 语言信息
  confirmText: PropTypes.string, // 确认文字
  cancelText: PropTypes.string, // 取消文字
  transitionName: PropTypes.string, // 弹窗动画内容名称
  maskTransitionName: PropTypes.string, // 遮罩背景动画内容名称
  wrapClassName: PropTypes.string, // 弹窗容器 CSS 类名
  className: PropTypes.string, // 弹窗内容 CSS 类名
};

let uid = 0;

const getUid = () => {
  uid += 1;
  return `dialog${uid}`;
};


// 用来收集全局实例 close，方便 Dialog.hide 销毁
const dialogMap = {};

/**
 * Dialog.confirm/Dialog.alert 依赖的方法，插入 DOM 节点，并在这个 DOM 节点上实例化 Dialog 组件
 * @param {object} options 弹窗相关参数
 */

const show = function show(options = {}) {
  const wrapper = document.createElement('div');
  document.body.appendChild(wrapper);

  const newOptions = { ...options };
  const dialogId = getUid();

  const close = () => {
    if (document.body.contains(wrapper)) {
      ReactDOM.unmountComponentAtNode(wrapper);
      document.body.removeChild(wrapper);
    }
    delete dialogMap[dialogId];
  };

  const getCloseFunc = func => () => {
    close();
    if (typeof func === 'function') {
      func();
    }
    return false;
  };


  dialogMap[dialogId] = close;

  if (newOptions.type === 'alert') {
    newOptions.buttons = [{
      content: newOptions.confirmText || 'ok',
      callback: getCloseFunc(newOptions.onConfirm),
      primary: true,
    }];
  } else if (newOptions.type === 'confirm') {
    newOptions.buttons = [{
      content: newOptions.cancelText || 'cancel',
      callback: getCloseFunc(newOptions.onCancel),
    }, {
      content: newOptions.confirmText || 'ok',
      callback: getCloseFunc(newOptions.onConfirm),
      primary: true,
    }];
  }

  ReactDOM.render(<Dialog {...newOptions} show />, wrapper);
};

/**
 * 隐藏通过 alert/confirm 展示出来的弹窗实例
 */
Dialog.hide = function hide() {
  Object.keys(dialogMap).forEach((dialogId) => {
    const close = dialogMap[dialogId];
    close();
  });
};

/**
 * alert api
 * @param { object } options alert 相关参数
 */
Dialog.alert = function alert(options) {
  const alertOptions = { ...options, type: 'alert' };
  show(alertOptions);
};

/**
 * confirm api
 * @param { object } options confirm 相关参数
 */
Dialog.confirm = function confirm(options) {
  const confirmOptions = { ...options, type: 'confirm' };
  show(confirmOptions);
};


// 留了一个 rcDialog 引用
Dialog.rcDialog = RcDialog;

Dialog.displayName = 'Dialog';

polyfill(Dialog);

export default Dialog;
