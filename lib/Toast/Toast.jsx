/**
 * Toast Component for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const classnames = require('classnames');
const { VBox } = require('../Box');
const Icon = require('@ali/tingle-icon');
const { prefixClass, noop } = require('../Context');
const Dialog = require('rc-dialog');

const iconNames = {
  success: 'check-round',
  error: 'cross-round',
  fail: 'toast-fail',
  loading: 'toast-loading',
  light: 'info-round',
};

class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      hasMask: props.hasMask,
      icon: this.getIconName(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      hasMask: nextProps.hasMask,
      icon: this.getIconName(nextProps),
    });
  }

  getIconName(props) {
    return props.icon || iconNames[props.type];
  }

  startCountdown() {
    const t = this;
    t.timer = setTimeout(() => {
      t.setState({
        visible: false,
        hasMask: false,
      });
      clearTimeout(t.timer);
    }, t.props.duration);
  }

  handleDidHide() {
    this.props.onDidHide();
  }

  renderIcon(icon) {
    if (!icon) {
      return null;
    }
    // svg loader 无法解析 loading 的 svg
    // 使用 dangerouslySetInnerHTML={{__html: toastLoading}} 在 uc 内核也有问题
    // 临时方案使用 background
    if (icon === 'toast-loading') {
      return (
        <div className={prefixClass('toast-icon toast-icon-loading')} />
      );
    }
    return (
      <Icon
        className={classnames(prefixClass('toast-icon'), {
          [icon]: !!icon,
        })} name={icon} fill="#fff" width="44px" height="44px"
      />
    );
  }

  render() {
    const t = this;
    const { visible, icon, hasMask } = t.state;
    const { className, content, autoHide, transitionName, prefixCls, type, maskTransitionName, ...other } = t.props;
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
    if(!maskTransitionName) {
      maskTransName = prefixClass('toast-fade');
    }else {
      maskTransName = prefixClass(`toast-mask-${maskTransitionName}`)
    }
    return (<Dialog
      prefixCls={prefixCls}
      visible={visible}
      title=""
      footer=""
      style={customStyle}
      closable={false}
      mask={hasMask}
      maskTransitionName={maskTransName}
      className={classnames({
        [prefixClass(`toast-${type} toast-has-icon`)]: !!icon,
        [className]: !!className,
        [transName]: !!transName,
      })}
      transitionName={transName}
      afterClose={() => { t.handleDidHide(); }}
    >
      <VBox hAlign="center">
        {this.renderIcon(icon)}
        {content && <div className={prefixClass('toast-content')}>{content}</div>}
      </VBox>
    </Dialog>);
  }
}

Toast.defaultProps = {
  prefixCls: 't-toast',
  hasMask: false,
  onDidHide: noop,
  visible: false,
  autoHide: true,
  content: '',
  icon: '',
  duration: 1500,
};

// http://facebook.github.io/react/docs/reusable-components.html
Toast.propTypes = {
  visible: React.PropTypes.bool,
  hasMask: React.PropTypes.bool,
  autoHide: React.PropTypes.bool,
  onDidHide: React.PropTypes.func,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  content: React.PropTypes.string,
  icon: React.PropTypes.string,
  duration: React.PropTypes.number,
  transitionName: React.PropTypes.string,
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
  ReactDOM.render(<Toast visible={true} {...props} />, wrapper);
};

Toast.hide = (fn) => {
  ReactDOM.render(<Toast visible={false} onDidHide={fn}/>, wrapper);
};

Toast.displayName = 'Toast';

module.exports = Toast;
