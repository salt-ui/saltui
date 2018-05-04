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

let globalInstance;

const iconCompMap = {
  success: IconCheckRound,
  error: IconCrossRound,
  fail: IconToastFail,
  loading: IconToastLoading,
  light: IconInfoRound,
};

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      hasMask: props.hasMask,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      hasMask: nextProps.hasMask,
    });
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
      this.hide();
      clearTimeout(t.timer);
    }, duration);
  }

  hide(fn) {
    this.setState({
      visible: false,
      hasMask: false,
    }, () => {
      this.props.onDidHide();
      if (typeof fn === 'function') {
        fn();
      }
    });
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

Toast.defaultProps = {
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
};

// http://facebook.github.io/react/docs/reusable-components.html
Toast.propTypes = {
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
};

const WRAPPER_ID = '__TingleGlobalToast__';
const doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);
if (!wrapper) {
  wrapper = doc.createElement('div');
  wrapper.id = WRAPPER_ID;
  doc.body.appendChild(wrapper);
}
ReactDOM.render(<Toast visible={false} />, wrapper);

Toast.show = (props) => {
  ReactDOM.render(<Toast visible {...props} ref={(c) => { globalInstance = c; }} />, wrapper);
};

Toast.hide = (fn) => {
  if (globalInstance) {
    globalInstance.hide(fn);
  }
};

Toast.displayName = 'Toast';

export default Toast;
