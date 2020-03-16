/**
 * Toast Component for SaltUI
 * @author minjie
 *
 * Copyright 2018-2019, SaltUI Team.
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
import { polyfill } from 'react-lifecycles-compat';
import { VBox } from '../Boxs';
import { prefixClass, noop } from '../Context';

const WRAPPER_ID = '__TingleGlobalToast__';
const doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);
let wrapperRef = null;

const iconCompMap = {
  success: IconCheckRound,
  error: IconCrossRound,
  fail: IconToastFail,
  loading: IconToastLoading,
  light: IconInfoRound
};

class Toast extends React.Component {
  static show = props => {
    if (wrapper) {
      Toast.hide();
    }
    wrapper = doc.createElement('div');
    wrapper.id = WRAPPER_ID;
    doc.body.appendChild(wrapper);
    // 挂载组件
    ReactDOM.render(<Toast visible {...props} />, wrapper);
  };

  static hide = fn => {
    if (wrapper) {
      if (fn && typeof fn === 'function') {
        fn();
      }
      wrapperRef.props.onDidHide();
      ReactDOM.unmountComponentAtNode(wrapper);
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
      wrapper = null;
      wrapperRef = null;
    }
  };
  static displayName = 'Toast';

  static propTypes = {
    prefixCls: PropTypes.string,
    visible: PropTypes.bool,
    hasMask: PropTypes.bool,
    autoHide: PropTypes.bool,
    onDidHide: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    icon: PropTypes.string,
    duration: PropTypes.number,
    transitionName: PropTypes.string,
    type: PropTypes.string,
    textWrap: PropTypes.bool
  };

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
    textWrap: false
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      hasMask: props.hasMask,
      prevVisible: props.visible
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      visible: props.visible,
      hasMask: props.hasMask
    };
  }

  componentDidMount() {
    const { visible } = this.state;
    const { autoHide } = this.props;
    // 如果可见 且 可自动关闭 则开始倒计时
    if (visible && autoHide) {
      this.startCountdown();
    }
    wrapperRef = this;
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
    const defaultDuration = type === 'light' || !type ? 3000 : 1500;
    const duration = t.props.duration || defaultDuration;
    t.timer = setTimeout(() => {
      Toast.hide();
      clearTimeout(t.timer);
    }, duration);
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
      return <div className={prefixClass('toast-icon toast-icon-loading')} />;
    }
    const iconProps = {
      fill: '#fff',
      width: '44px',
      height: '44px',
      className: prefixClass('toast-icon')
    };
    if (icon) {
      return React.cloneElement(icon, iconProps);
    }
    return <Icon {...iconProps} />;
  }

  render() {
    const t = this;
    const { visible, hasMask } = t.state;
    const {
      className,
      content,
      autoHide,
      transitionName,
      prefixCls,
      type,
      maskTransitionName,
      textWrap,
      ...other
    } = t.props;
    const customStyle = {
      width: other.width,
      height: other.height
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
            [transName]: !!transName
          })}
          transitionName={transName}
        >
          <VBox hAlign="center">
            {this.renderIcon()}
            {content && (
              <div
                className={classnames(prefixClass('toast-content'), {
                  [prefixClass(
                    textWrap ? 'toast-content-wrap' : 'toast-content-noWrap'
                  )]: true
                })}
              >
                {content}
              </div>
            )}
          </VBox>
        </Dialog>
      );
    }
    return null;
  }
}

polyfill(Toast);

export default Toast;
