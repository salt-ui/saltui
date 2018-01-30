import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass, noop } from '../Context';
import Mask from '../Mask';

class LayerBody extends React.Component {
  static propTypes = {
    onDidShow: PropTypes.func,
    onWillHide: PropTypes.func,
    onMaskClick: PropTypes.func,
    onDidHide: PropTypes.func,
    maskOpacity: PropTypes.number,
    maskCloseable: PropTypes.bool,
    hasMask: PropTypes.bool,
    visible: PropTypes.bool,
    zIndex: PropTypes.number,
    fullScreen: PropTypes.bool,
    // more: top, left, bottom, right, width, height
  };

  // zIndex no defalut value, we use auto generate way to handle it
  static defaultProps = {
    onDidShow: noop,
    onWillHide: noop,
    onDidHide: noop,
    maskOpacity: 0.6,
    maskCloseable: false,
    hasMask: true,
    visible: false,
    zIndex: 1000,
    fullScreen: false,
    onMaskClick: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    const t = this;
    const { visible } = nextProps;
    if (visible === false && t.props.onWillHide() === false) {
      return;
    }
    this.setState({
      visible: nextProps.visible,
    }, visible ? t.props.onDidShow : t.props.onDidHide);
  }

  getStyle() {
    const t = this;
    const { visible } = t.state;
    const { fullScreen } = t.props;

    const hasWidth = 'width' in t.props;
    const hasHeight = 'height' in t.props;
    const height = hasHeight ? t.props.height : 'auto';
    const hasTop = 'top' in t.props;
    const hasBottom = 'bottom' in t.props;
    const hasLeft = 'left' in t.props;
    const hasRight = 'right' in t.props;

    const style = {
      width: fullScreen || !hasWidth ? '100%' : t.props.width,
      height: fullScreen ? '100%' : height,
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
        style.WebkitTransform = `${style.WebkitTransform || ''} translateY(-50%)`;
        style.transform = `${style.transform || ''} translateY(-50%)`;
      }

      if (hasLeft) {
        style.left = t.props.left;
      } else if (hasRight) {
        style.right = t.props.right;
      } else {
        style.left = '50%';
        style.WebkitTransform = `${style.WebkitTransform || ''} translateX(-50%)`;
        style.transform = `${style.transform || ''} translateX(-50%)`;
      }
    }

    style.zIndex = t.props.zIndex;
    style.display = visible ? 'block' : 'none';

    return style;
  }

  handleMaskClick() {
    const t = this;
    // 如果禁止了点击Mask关闭Layer, 则Mask的onWillHide必须返回false
    if (t.props.maskCloseable === false || t.props.onWillHide() === false) {
      return false;
    }
    t.setState({
      visible: false,
    }, () => {
      t.props.onDidHide();
    });
    return null;
  }

  render() {
    const t = this;
    const {
      className, top, left, right, bottom, visible, zIndex,
      maskCloseable, renderToBody, onDidShow, onWillHide, onDidHide,
      maskOpacity, hasMask, fullScreen, style, onMaskClick, ...other
    } = t.props;
    return (
      <div>
        <div
          {...other}
          className={classnames(prefixClass('layer'), {
            [className]: !!className,
          })}
          style={t.getStyle()}
        >
          {t.props.children}
        </div>
        {
          this.props.hasMask &&
            <Mask
              zIndex={this.props.zIndex - 1}
              onWillHide={() => (t.props.onMaskClick || t.handleMaskClick).call(t)}
              closeable
              visible={t.state.visible}
              opacity={0.6}
            />
        }
      </div>
    );
  }
}

export default LayerBody;
