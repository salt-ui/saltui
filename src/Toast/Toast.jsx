/**
 * Toast Component for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Dialog from 'rc-dialog';
import IconCheckRound from 'salt-icon/lib/CheckRound';
import IconCrossRound from 'salt-icon/lib/CrossRound';
import IconToastFail from 'salt-icon/lib/ToastFail';
import IconToastLoading from 'salt-icon/lib/ToastLoading';
import IconInfoRound from 'salt-icon/lib/InfoRound';
import { VBox } from '../Boxs';
import { prefixClass, noop } from '../Context';
import { polyfill } from 'react-lifecycles-compat';

let globalInstance;
const WRAPPER_ID = '__TingleGlobalToast__';
const doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);

const iconCompMap = {
  success: IconCheckRound,
  error: IconCrossRound,
  fail: IconToastFail,
  loading: IconToastLoading,
  light: IconInfoRound,
};

class Toast extends React.Component {
  static show = (props) => {
    ReactDOM.render(<Toast visible {...props} ref={(c) => { globalInstance = c; }} />, wrapper);
  }

  static hide = (fn) => {
    if (globalInstance) {
      if (fn && typeof fn === 'function') {
        fn();
      }
      ReactDOM.unmountComponentAtNode(wrapper);
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
    }
  }
  static displayName = 'Toast'

  static propTypes = {
    prefixCls: PropTypes.string,
    visible: PropTypes.bool,
    hasMask: PropTypes.bool,
    autoHide: PropTypes.bool,
    onDidHide: PropTypes.func,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    content: PropTypes.string,
    icon: PropTypes.string,
    duration: PropTypes.number,
    transitionName: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: 't-toast',
    hasMask: false,
    onDidHide: noop,
    visible: false,
    autoHide: true,
    content: '',
    duration: undefined,
    width: undefined,
    icon: undefined,
    transitionName: undefined,
    type: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      hasMask: props.hasMask,
      prevVisible: props.visible,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      visible: props.visible,
      hasMask: props.hasMask,
    };
  }

  getIconComp() {
    return iconCompMap[this.props.type];
  }

  hasIcon() {
    return this.getIconComp() || this.props.icon;
  }

  startCountdown() {
    const t = this;
    const { type } = t.props;
    const defaultDuration = (type === 'light' || !type) ? 3000 : 1500;
    const duration = t.props.duration || defaultDuration;
    t.timer = setTimeout(() => {
      Toast.hide();
      clearTimeout(t.timer);
    }, duration);
  }

  handleDidHide() {
    this.props.onDidHide();
  }

  renderIcon() {
    const Icon = this.getIconComp();
    const { icon } = this.props;
    if (!icon && !Icon) {
      return null;
    }
    // svg loader 无法解析 loading 的 svg
    // 使用 dangerouslySetInnerHTML={{__html: toastLoading}} 在 uc 内核也有问题
    // 临时方案使用 background
    if (Icon === IconToastLoading) {
      return (
        <div className={prefixClass('toast-icon toast-icon-loading')} />
      );
    }
    const iconProps = {
      fill: '#fff',
      width: '44px',
      height: '44px',
      className: prefixClass('toast-icon'),
    };
    if (icon) {
      return React.cloneElement(icon, iconProps);
    }
    return (
      <Icon {...iconProps} />
    );
  }

  render() {
    const t = this;
    const { visible, hasMask } = t.state;
    const {
      className, content, autoHide, transitionName,
      prefixCls, type, maskTransitionName, ...other
    } = t.props;
    const customStyle = {
      width: other.width,
      height: other.height,
    };
    let transName;
    if (!transitionName) {
      if (type !== 'light') {
        transName = prefixClass('toast-fade');
      } else {
        transName = prefixClass('toast-light-fix-top');
      }
    } else {
      transName = prefixClass(`toast-light-${transitionName}`);
    }
    // 如果可见 且 可自动关闭 则开始倒计时
    if (visible && autoHide) {
      t.startCountdown();
    }
    let maskTransName;
    if (!maskTransitionName) {
      maskTransName = prefixClass('toast-fade');
    } else {
      maskTransName = prefixClass(`toast-mask-${maskTransitionName}`);
    }
    if (visible) {
      return (
        <Dialog
          prefixCls={prefixCls}
          visible={visible}
          title=""
          footer=""
          style={customStyle}
          closable={false}
          mask={hasMask}
          maskTransitionName={maskTransName}
          className={classnames({
            [prefixClass(`toast-${type} toast-has-icon`)]: !!this.hasIcon(),
            [className]: !!className,
            [transName]: !!transName,
          })}
          transitionName={transName}
          afterClose={() => { t.handleDidHide(); }}
        >
          <VBox hAlign="center">
            {this.renderIcon()}
            {content && <div className={prefixClass('toast-content')}>{content}</div>}
          </VBox>
        </Dialog>
      );
    }
    return null;
  }
}


if (!wrapper) {
  wrapper = doc.createElement('div');
  wrapper.id = WRAPPER_ID;
  doc.body.appendChild(wrapper);
}
ReactDOM.render(<Toast visible={false} />, wrapper);

polyfill(Toast);

export default Toast;
