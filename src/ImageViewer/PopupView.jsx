import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import Hammer from 'hammerjs';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import Slide from '../Slide';
import Mask from './Mask';

const pinch = new Hammer.Pinch();


class PopupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current,
    };
  }

  componentDidMount() {
    this.bindHammer();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.setState({
        current: nextProps.current,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.bindHammer();
    } else {
      this.removeHammer();
    }
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  bindHammer() {
    if (this.mc) return;
    this.mc = new Hammer.Manager(this.imageBox);
    /* eslint-disable  react/no-find-dom-node */
    const sliderNode = ReactDOM.findDOMNode(this.slider);
    /* eslint-enable  react/no-find-dom-node */
    let currentScale = 1;
    let scale = 1;
    this.mc.add([pinch]);
    this.mc.on('pinchmove', (ev) => {
      // in zoom-in mode, make sure scale can be inherited from last zoom-in
      currentScale = (ev.scale - 1) + scale;
      if (currentScale < 0) {
        currentScale = ev.scale;
      }
      sliderNode.style.webkitTransition = 'none';
      sliderNode.style.webkitTransform = `scale(${currentScale},${currentScale})`;
    });

    this.mc.on('pinchend', () => {
      scale = currentScale;
      if (scale < 1) {
        scale = 1;
        sliderNode.style.webkitTransition = 'transform 0.5s ease-out';
        sliderNode.style.webkitTransform = 'scale(1,1)';
      }
    });
  }

  removeHammer() {
    if (!this.mc) return;
    this.mc.off('pinchmove');
    this.mc.off('pinchend');
    this.mc = null;
  }


  handleClick() {
    this.props.onClick();
  }

  updateActive(active) {
    this.setState({
      current: active.index,
    });
  }

  renderNavBar() {
    if (!this.props.visible) return null;
    const { photos, prefixCls } = this.props;
    const { current } = this.state;
    /* eslint-disable react/no-array-index-key */
    if (photos.length) {
      return (
        <ul className={`${prefixCls}-nav`}>
          {photos.map((photo, index) => (
            <li
              key={index}
              className={classnames(`${prefixCls}-nav-item`, {
                active: index === current,
                last: index === photos.length - 1,
              })}
            />
          ))}
        </ul>
      );
    }
    /* eslint-enable react/no-array-index-key */
    return null;
  }


  render() {
    const { prefixCls, photos, visible } = this.props;
    const windowHeight = window.innerHeight;
    /* eslint-disable react/no-array-index-key */
    return (
      <div className={`${prefixCls}`}>
        <Animate transitionAppear transitionName={`${prefixCls}-mask`} component="" showProp="visible">
          <Mask className={`${prefixCls}-mask`} visible={visible} />
        </Animate>
        <Animate transitionAppear transitionName={`${prefixCls}-view`} component="">
          {visible ?
            <div
              className={`${prefixCls}-view`}
              ref={(c) => {
              this.imageBox = c;
            }}
              onClick={() => {
              this.handleClick();
            }}
            >
              <Slide
                height={`${windowHeight - 40}px`}
                active={this.state.current}
                auto={false}
                showNav={false}
                loop={false}
                onSlideEnd={this.updateActive.bind(this)}
                ref={(c) => {
                this.slider = c;
              }}
              >
                {photos.map((item, index) => (
                  <img
                    role="presentation"
                    key={index}
                    src={item.src}
                    alt=" "
                  />
            ))}
              </Slide>
            </div> : null}
        </Animate>
        <Animate transitionAppear transitionName={`${prefixCls}-nav`} component="">
          {this.renderNavBar()}
        </Animate>
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

PopupView.propTypes = {
  prefixCls: PropTypes.string,
  photos: PropTypes.array,
  current: PropTypes.number,
  onClick: PropTypes.func,
  onUnmount: PropTypes.func,
  visible: PropTypes.bool,
};

PopupView.defaultProps = {
  photos: [],
  onClick: () => {},
  onUnmount: () => {},
  current: 0,
  visible: true,
  prefixCls: undefined,
};

export default PopupView;
