/**
* Slide Component for tingle
* @author gnosaij,changming
*
* Copyright 2014-2017, Tingle Team, Alinw.
* All rights reserved.
*/
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import SlideNav from './SlideNav';
import SlideItem from './SlideItem';
import { prefixClass, _getItemUnready } from './utils';

const {
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
  support3D,
  supportTouch,
  isPC,
  noop,
  RESIZE,
} = Context;

const win = window;
const doc = document;
const OFFSET = 'offset';
const POS_MAP = {
  '-1': '_prevEl',
  0: '_currentEl',
  1: '_nextEl',
};

// 创建translate字符串
// TODO: translate(0,0) translateZ(0);
const makeTranslate = (function () {
  const prefix = support3D ? 'translate3d(' : 'translate(';
  const suffix = support3D ? ', 0)' : ')';
  const join = ',';

  function v(n) {
    let back = `${n || 0}`;
    back = back.indexOf('%') > -1 ? back : `${back}px`;
    return back;
  }

  return function (x, y) {
    return prefix + v(x) + join + v(y) + suffix;
  };
}());

// 获取兼容PC和Device的event对象的page属性
const getCursorPage = supportTouch ? function (event, page) {
  return event.changedTouches[0][page];
} : function (event, page) {
  return event[page];
};

class Slide extends React.Component {
  constructor(props) {
    super(props);

    // 切换动画的时长
    this.duration = 200;

    // 能够触发切换的偏移量
    this.effectiveDelta = Math.floor(window.innerWidth / 1.8);

    // 当偏移量不足时，使用速度来决定是否移动 单位：px/s
    this.speed = 300;

    this.state = {
      auto: props.auto,
      // 当前item的索引值 以0开始
      index: props.active,
      disabled: false,
    };
  }

  componentWillMount() {
    const t = this;
    t._getLength();
  }

  componentDidMount() {
    const t = this;

    t.el = t.root;

    // 确定容器宽度
    t.width = isPC ? t.el.clientWidth : win.innerWidth;

    t._setContext();

    // 当屏幕旋转的时候，修正布局
    win.addEventListener(RESIZE, t, false);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.active !== 'undefined' && nextProps.active !== this.props.active) {
      this._goto(nextProps.active, true, true);
    }
  }

  componentDidUpdate(prevProps) {
    const t = this;
    const oldChildrenLength = prevProps.children.length;
    const newChildrenLength = this.props.children.length;
    if (newChildrenLength !== oldChildrenLength) {
      t._getLength();
      t._setContext(prevProps);
    }
  }

  componentWillUnmount() {
    const t = this;
    if (t.length > 1) {
      t.el.removeEventListener(TOUCH_START, t, false);
    }
    win.removeEventListener(RESIZE, t, false);
    clearTimeout(t._autoSlideTimer);
  }

  /**
  * 获取 slide 列表的真正长度，主要是考虑 children
  * 长度是 1 和 2 的情况下
  */
  _getLength() {
    const t = this;
    const originLength = React.Children.count(t.props.children);

    // check
    if (originLength === 1) {
      t.setState({
        disabled: true,
      });
    } else if (originLength === 2) { // item的长度经处理后不存在为2的情况
      t._dummy = true;
      t._realIndex = {
        0: 0,
        1: 1,
        2: 0,
        3: 1,
      };
    }

    // 处理以后的长度，即item的个数
    t.length = t._dummy ? 4 : originLength;
  }

  /**
  * 根据 slide 列表长度设置正确的内部变量
  *
  */
  _setContext(prevProps) {
    const t = this;

    // 由于子元素数量有变化，先解绑与数量相关的监听，再根据数量重新绑定。
    t.el.removeEventListener(TOUCH_START, t, false);
    clearTimeout(t._autoSlideTimer);

    // 至少有2张slide时，才初始化事件
    if (t.length > 1) {
      t.el.addEventListener(TOUCH_START, t, false);
    } else {
      t.el.addEventListener('click', () => {
        t.props.onSlideClick({
          index: 0,
          item: t._currentEl,
          data: t.props.children[0],
        });
      });
    }

    // 前一个，当前的，后一个item的element引用
    t._prevEl = null;
    t._currentEl = null;
    t._nextEl = null;

    t._deltaX = 0;
    t._minIndex = 0;
    t._maxIndex = t.length - 1;
    if (!prevProps) {
      t.props.onMount(t);
    } else {
      t.setState({
        index: t.props.index,
      });
    }
    if (t.length !== 0) {
      t._goto(t.state.index, true);
      t._autoSlide();
    }
  }

  _autoSlide() {
    const t = this;
    if (!t.state.auto) return;
    t._autoSlideTimer = setTimeout(() => {
      t.goNext();
      t._autoSlide();
    }, this.props.autoSlideTime || 4000);
  }

  /**
  * @param {number} index 目标位置的索引值
  * @param {boolean} callFromDidMount 是否是在 componentDidMount 中被调用的
  */
  _goto(posIndex, callFromDidMount, noAnimation) {
    const t = this;
    const callFromDidMountBool = !!callFromDidMount;

    if (t.length === 1 || callFromDidMountBool) {
      // `_getItemReady` 方法被调用之前，需要先更新 `currentPosIndex` 的值
      t.currentPosIndex = posIndex;
      t._getItemReady(0, noAnimation);

      if (t.length > 2) {
        t._getItemReady(1, noAnimation);
        t._getItemReady(-1, noAnimation);
      }

      // t._slideEnd();
    } else if (!callFromDidMountBool) {
      // 通过goNext/goPrev调用的_goto，一直有方向(_dir)值 向左:-1 / 向右:1
      if (t._dir) {
        _getItemUnready(t._dir === 1 ? t._nextEl : t._prevEl);
        t._moveItem(t._currentEl, t._dir);
        t._moveItem(t._dir === 1 ? t._prevEl : t._nextEl, t._dir);

        // `_getItemReady`方法被调用之前，需要先更新`currentPosIndex`的值
        t.currentPosIndex = posIndex;
        t._getItemReady(t._dir * -1);

        setTimeout(() => {
          t._slideEnd();
        }, t.duration);
      } else if (posIndex === t.currentPosIndex) { // 归位的情况：移动距离小于有效距离时
        // 归位当前item
        t._moveItem(t._currentEl, 0);
        // 归位进入屏幕的另一个item
        // 说明:任意一个时间点,出现在屏幕内的item数量最多为2个,要么左边,要么右边,取决于移动方向
        if (t._moveBack) {
          t._moveItem(t._moveBack, 0);
        } else { // 当resize时
          t._moveItem(t._prevEl, 0);
          t._moveItem(t._nextEl, 0);
        }
      }
    }

    t._moveBack = null;
    t._dir = null;
  }

  goNext() {
    const t = this;
    // 方向是向左(-1)，要展现的是后一张(1)
    t._dir = -1;
    t._goto(t._getPosIndex(1));
  }

  goPrev() {
    const t = this;
    // 方向是向右(1)，要展现的是前一张(-1)
    t._dir = 1;
    t._goto(t._getPosIndex(-1));
  }

  /**
  * 移动item到新的位置
  * @param {element} item
  * @param {number} dir 移动的方向 -1:向左移动 / 1:向右移动 / 0:移动到原位
  */
  /* eslint-disable no-param-reassign */
  // DOM节点
  _moveItem(item, dir) {
    const t = this;
    item.style.webkitTransitionDuration = `${t.duration}ms`;

    const newOffset = +item.getAttribute(OFFSET) + dir;

    t._setItemX(item, t._getPosX(newOffset));

    // 如果进行了切换行为，即dir为-1或1
    if (dir) {
      item.setAttribute(OFFSET, newOffset);
      t[POS_MAP[newOffset]] = item;
    }
  }
  /* eslint-enable no-param-reassign */


  /**
  * 根据指定的偏移量，找到对应的item，将其切换到可移动状态
  * @param {number} offset -1:前一个位置 / 0:当前位置 / 1: 后一个位置
  * @note 任何时刻，可移动状态的item数量只有三个
  * @note 该方法依赖`currentPosIndex`和`offset`查找目标`item`，
  *       而`_getItemUnready`方法直接给定了`item`，不需要依赖`currentPosIndex`和`offset`
  */
  _getItemReady(offset, noAnimation) {
    const t = this;
    const targetPosIndex = t._getPosIndex(offset);
    const item = t.refs[`item${targetPosIndex}`];
    item.classList.add('ready');
    item.setAttribute(OFFSET, offset);
    item.style.webkitTransform = makeTranslate(t._getPosX(offset));

    if (noAnimation) {
      item.style.webkitTransitionDuration = '0ms';
    }

    t[POS_MAP[offset]] = item;
  }


  /**
  * 获取指定的offset所对应的X坐标值(0点在当前item的左边缘)
  * @param {number} offset -1:前一个位置 / 0:当前位置 / 1: 后一个位置
  */
  _getPosX(offset) {
    const t = this;
    if (offset === -1) {
      return -t.width;
    } else if (offset === 1) {
      return t.width;
    }
    return 0;
  }

  /**
  *
  */
  /* eslint-disable no-param-reassign */
  // DOM元素
  _setItemX(item, x) {
    this[`${POS_MAP[item.getAttribute(OFFSET)]}X`] = x;
    item.style.webkitTransform = makeTranslate(x);
  }
  /* eslint-enable no-param-reassign */

  /**
  * 获取前一个或后一个位置的索引值，相对值是currentPosIndex
  * @param {number} offset -1:取前一个位置 / 0:取当前位置 / 1: 取后一个位置
  */
  _getPosIndex(offset) {
    const t = this;
    let index;
    if (offset === -1) {
      index = t.currentPosIndex === t._minIndex ? t._maxIndex : t.currentPosIndex - 1;
    } else if (offset === 1) {
      index = t.currentPosIndex === t._maxIndex ? t._minIndex : t.currentPosIndex + 1;
    } else if (offset === 0) {
      index = t.currentPosIndex;
    } else {
      throw new Error('error offset');
    }
    return index;
  }

  handleEvent(e) {
    const t = this;
    switch (e.type) {
      case TOUCH_START:
        t._touchStart(e);
        break;
      case TOUCH_MOVE:
        t._touchMove(e);
        break;
      case TOUCH_END:
        t._touchEnd(e);
        break;
      case TOUCH_CANCEL:
        t._touchEnd(e);
        break;
      case RESIZE:
        t._resize(e);
        break;
      default:
        break;
    }
  }

  _touchStart(e) {
    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    const t = this;

    clearTimeout(t._autoSlideTimer);

    // 恢复到0 拖拽过程中快速响应移动距离
    t._prevEl.style.webkitTransitionDuration = '0ms';
    t._currentEl.style.webkitTransitionDuration = '0ms';
    t._nextEl.style.webkitTransitionDuration = '0ms';

    // 移动初始值
    t._prevElX = t._getPosX(-1);
    t._currentElX = t._getPosX(0);
    t._nextElX = t._getPosX(1);

    // 浏览器默认滚动
    t.browserScrolling = false;

    // 是否是切换状态 此时忽略浏览器默认的滚动行为
    t.sliding = false;

    t.startPageX = getCursorPage(e, 'pageX');
    t.startPageY = getCursorPage(e, 'pageY');
    t.basePageX = t.startPageX;
    t.startTime = e.timeStamp;

    doc.addEventListener(TOUCH_MOVE, t, false);
    doc.addEventListener(TOUCH_END, t, false);
  }

  _touchMove(e) {
    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    const t = this;

    // 如果浏览器默认滚动行为已被触发，则不执行Slider的滚动
    if (t.browserScrolling) {
      return;
    }

    const pageX = getCursorPage(e, 'pageX');
    const pageY = getCursorPage(e, 'pageY');
    let distX;
    let newPrevX;
    let newCurrentX;
    let newNextX;
    let deltaY;

    t.deltaX = pageX - t.startPageX;

    // 如果slide开始滚动
    if (t.sliding) {
      e.preventDefault();
      e.stopPropagation();

      // 任意时刻的位移值
      distX = pageX - t.basePageX;

      // 当不是循环模式的时候，第一张和最后一张添加粘性
      if (t.props.loop === false &&
        (
          (distX >= 0 && t.currentPosIndex === t._minIndex) ||
          (distX < 0 && t.currentPosIndex === t._maxIndex) ||
          (distX < 0 && t._dummy && t.currentPosIndex === 1)
        )
      ) {
        distX -= (distX / 1.3);
      }

      // 位移后的X坐标
      newPrevX = t._prevElX + distX;
      newCurrentX = t._currentElX + distX;
      newNextX = t._nextElX + distX;

      // 更新DOM位置
      t._setItemX(t._prevEl, newPrevX);
      t._setItemX(t._currentEl, newCurrentX);
      t._setItemX(t._nextEl, newNextX);

      if (t.deltaX >= 0) {
        t._moveBack = t._prevEl;
      } else {
        t._moveBack = t._nextEl;
      }
    } else {
      deltaY = pageY - t.startPageY;

      // 如果X轴的移动距离先达到5px，则执行Slider的滚动
      // 如果Y轴的移动距离先达到5px，则执行浏览器默认的页面滚动
      if (Math.abs(t.deltaX) > 5) {
        e.preventDefault();
        e.stopPropagation();
        t.sliding = true;
      } else if (Math.abs(deltaY) > 5) {
        t.browserScrolling = true;
      }
    }

    t.basePageX = pageX;
  }

  _touchEnd(e) {
    // 只响应单指操作
    if (supportTouch && e.touches.length > 1) {
      return;
    }

    const t = this;

    // 如果浏览器默认滚动行为已被触发，则不执行Slider的滚动
    if (t.browserScrolling) {
      return;
    }

    t.browserScrolling = false;

    const endTime = e.timeStamp;
    const speed = Math.floor((t.deltaX / (t.startTime - endTime)) * 1000);

    // 向右滑动
    if (t.deltaX > t.effectiveDelta || speed < -t.speed) {
      if (t.props.loop === false && t.currentPosIndex === t._minIndex) {
        t._goto(t.currentPosIndex);
      } else {
        t.goPrev();
      }
    } else if (t.deltaX < -t.effectiveDelta || speed > t.speed) { // 向左滑动
      if (t.props.loop === false &&
        (t.currentPosIndex === t._maxIndex || (t._dummy && t.currentPosIndex === 1))
      ) {
        t._goto(t.currentPosIndex);
      } else {
        t.goNext();
      }
    } else if (endTime - t.startTime < 500 && Math.abs(t.deltaX) < 5) { // 点击
      t._slideClick();
    } else { // 保持原有位置
      t._goto(t.currentPosIndex);
    }

    t.deltaX = 0;

    doc.removeEventListener(TOUCH_MOVE, t, false);
    doc.removeEventListener(TOUCH_END, t, false);

    t._autoSlide();
  }

  _slideClick() {
    const t = this;
    const realIndex = t._getRealIndex(t.currentPosIndex);
    t.props.onSlideClick({
      index: realIndex,
      item: t._currentEl,
      data: t.props.children[realIndex],
    });
  }

  _slideEnd() {
    const t = this;
    const realIndex = t._getRealIndex(t.currentPosIndex);
    t.props.onSlideEnd({
      index: realIndex,
      item: t._currentEl,
      data: t.props.children[realIndex],
    });
    // https://facebook.github.io/react/docs/component-api.html#forceupdate
    // 通常情况下我们不使用 forcecUpdate，但我们需要 slide 过程中的中间变量
    // 而非最终 state 去触发插件的更新，因此这里我们用到了 forceUpdate。
    t.forceUpdate();
  }

  _getRealIndex(posIndex) {
    const t = this;
    return t._dummy ? t._realIndex[posIndex] : posIndex;
  }

  /**
  * 当屏幕旋转时，更新基本数据 && 再次定位
  */
  _resize() {
    const t = this;
    t.width = isPC ? t.el.clientWidth : win.innerWidth;
    t._goto(t.currentPosIndex);
  }

  /**
  * 渲染items 当item数量为2时，该方法会被调用两次，第二次函数为true，以实现循环轮播
  * @param {boolean} dummyMode 是否是在渲染补位的item，
  * @note 只有当`props.children`的长度为2时，才需要进行补位
  */
  _renderItems(dummyMode) {
    const t = this;
    /* eslint-disable react/no-array-index-key */
    return t.props.children.map((child, index) => (
      <div
        key={index + (dummyMode ? 2 : 0)}
        ref={`item${index + (dummyMode ? 2 : 0)}`}
        className={classnames({
          [prefixClass('slide-item')]: true,
          [`${prefixClass('slide-item')}${t._getRealIndex(index)}`]: true,
          //  [prefixClass('slide-item-active')]: index === t._getRealIndex(t.currentPosIndex),
        })}
      >
        {child}
      </div>
    ));
    /* eslint-enable react/no-array-index-key */
  }

  render() {
    const t = this;
    let { showTitle } = this.props;
    const { displayMode } = this.props;
    if (displayMode === 'card') {
      showTitle = false;
    }
    return (
      <div
        ref={(c) => { this.root = c; }}
        className={classnames({
          [prefixClass('slide')]: true,
          [prefixClass('slide-off')]: t.state.disabled,
          [prefixClass('slide-show-title')]: showTitle,
          [prefixClass('slide-card-mode')]: displayMode === 'card',
          [t.props.className]: !!t.props.className,
        })}
      >
        <div className={`${prefixClass('3D')} ${prefixClass('slide-view')}`} style={{ height: t.props.height }}>
          {t._renderItems()}
          {t._dummy && t._renderItems(true)}
        </div>

        {t.props.showNav && t.length > 1 && (
          <SlideNav
            active={t._getRealIndex(t.currentPosIndex)}
            num={t.props.children.length}
            position={showTitle ? 'RIGHT' : 'CENTER'}
          />
        )}
      </div>
    );
  }
}

Slide.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  active: PropTypes.number,
  auto: PropTypes.bool,
  loop: PropTypes.bool,
  showNav: PropTypes.bool,
  onMount: PropTypes.func,
  onSlideEnd: PropTypes.func,
  onSlideClick: PropTypes.func,
  autoSlideTime: PropTypes.number,
  showTitle: PropTypes.bool,
  children: PropTypes.node,
  displayMode: PropTypes.oneOf(['normal', 'card']),
};

Slide.defaultProps = {
  height: '5rem',
  active: 0,
  auto: false,
  loop: true,
  showNav: false,
  onMount: noop,
  onSlideEnd: noop,
  onSlideClick: noop,
  autoSlideTime: 4000,
  showTitle: false,
  displayMode: 'normal',
  className: undefined,
  children: undefined,
};

Slide.displayName = 'Slide';

Slide.Item = SlideItem;

export default Slide;
