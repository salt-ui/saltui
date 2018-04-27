/**
 * RefeshControl Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Loading from 'salt-icon/lib/Loading';
import Context from '../Context';
import transitionEnd from './transitionEnd';
import Drag from './Drag';
import getOffset from './getOffset';

const Status = {
  pending: 'pending',
  ready: 'ready',
  dragStart: 'dragStart',
  draging: 'draging',
  dragAnimate: 'dragAnimate',
  refreshing: 'refreshing',
  refreshAnimate: 'refreshAnimate',
};

function op(percent) {
  let percentNew = percent;
  percentNew = Number(percentNew.toFixed(2)) - 0.2;

  return percentNew > 0 ? percentNew : 0;
}

class RefreshControl extends React.Component {
  static defaultProps = {
    refreshing: false,
    onRefresh() {},
    threshold: 74,
    max: 110,
    className: '',
    children: null,
    beforePullLoadText: '下拉显示更多',
    afterPullLoadText: '松开显示更多',
    refreshingText: '加载中...',
    refreshIcon: null,
    showIcon: true,
    showText: true,
    showRefreshing: true,
    getScrollContainer: undefined,
  };

  static propTypes = {
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    beforePullLoadText: PropTypes.string,
    afterPullLoadText: PropTypes.string,
    refreshingText: PropTypes.string,
    threshold: PropTypes.number,
    max: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.any,
    refreshIcon: PropTypes.element,
    showIcon: PropTypes.bool,
    showText: PropTypes.bool,
    showRefreshing: PropTypes.bool,
    getScrollContainer: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.y = 0;
    this.oldY = 0;
    this.initTop = 0;
    this.state = {};
  }

  componentDidMount() {
    this.bindDrag();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.refreshing !== nextProps.refreshing) {
      this.onRefreshingChanged(nextProps.refreshing);
    }
  }

  componentDidUpdate() {
    if (this.y > 0) {
      this.triggerStyle(this.props.showRefreshing);
    }
  }


  componentWillUnmount() {
    if (!this.drager) return;

    this.drager.destory();
    this.drager = null;
  }


  onRefreshingChanged(val) {
    if (!val) {
      transitionEnd(this.trigger, this.clearState.bind(this));
    } else {
      this.status = Status.refreshAnimate;
    }
  }

  onDragStart() {
    if (!this.getEnable()) return;
    this.status = Status.dragStart;

    const { top } = getOffset(this.trigger);
    if (top === this.initTop) {
      this.draging = true;
    }
    this.forceUpdate();
  }

  onDrag(pos, event) {
    if (!this.getEnable()) return;
    if (pos.y < 0) return;

    // 消除误差
    const { initTop } = this;
    const { threshold } = this.props;
    const { top } = getOffset(this.trigger);

    if (this.refreshing || top < initTop) {
      this.draging = false;
      return;
    }

    if (top === initTop && !this.draging) {
      this.draging = true;
      this.drager.reset(event);
    }

    if (this.draging && pos.y > 0) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.oldY = this.y;
    this.y = pos.y;
    if (this.y < 0) {
      this.y = 1;
    }
    if (
      (this.oldY < threshold && this.y >= threshold)
        || (this.oldY > threshold && this.y <= threshold)) {
      this.forceUpdate();
    }
    this.triggerStyle(this.props.showRefreshing);
  }

  onDragEnd(pos) {
    if (!this.getEnable()) return;
    if (pos.y <= 0) {
      this.clearState();
      return;
    }

    const canRefresh = pos.y >= this.props.threshold && this.draging;
    this.status = Status.dragAnimate;
    if (canRefresh) {
      this.draging = false;

      if (!this.props.refreshing) {
        this.props.onRefresh();
      }
    } else {
      this.y = 0;
      transitionEnd(this.trigger, this.clearState.bind(this));
    }
    this.triggerStyle(this.props.showRefreshing);
  }

  get max() {
    return this.props.max;
  }
  get refreshing() {
    return this.props.refreshing;
  }

  get draging() {
    return this._draging;
  }

  get y() {
    return Math.min(Math.max(this._y, 0), this.max);
  }


  set draging(draging) {
    this._draging = draging;
  }
  set y(y) {
    this._y = y;
  }

  getEnable() {
    if (this.props.getScrollContainer && this.props.getScrollContainer()) {
      return this.props.getScrollContainer().scrollTop === 0;
    }
    return true;
  }


  bindDrag() {
    // const drager = new Drag(this.$container);
    this.drager = new Drag(this.$container);
    this.initTop = getOffset(this.trigger).top;
    this.status = Status.ready;

    this.drager.start(this.onDragStart.bind(this));
    this.drager.drag(this.onDrag.bind(this));
    this.drager.end(this.onDragEnd.bind(this));
  }

  clearState() {
    this.status = Status.ready;
    this.draging = false;
    this.y = 0;
  }

  circularStyle(showRefreshing) {
    const { threshold } = this.props;
    const y = Math.min(this.y, threshold);
    const ele = this.innerNode;

    let opacity = 0;
    if (this.refreshing) {
      opacity = 1;
    } else {
      opacity = y >= threshold ? 0.8 : op(y / this.max);
    }

    if (showRefreshing === false) {
      opacity = 0.8;
    }
    ele.style.opacity = opacity;
  }

  refreshText() {
    const {
      threshold, refreshingText, afterPullLoadText, beforePullLoadText,
    } = this.props;
    if (this.refreshing) {
      return refreshingText;
    }
    if (this.draging) {
      const text = this.y >= threshold ? afterPullLoadText : beforePullLoadText;
      return text;
    }

    return '';
  }

  triggerStyle(showRefreshing) {
    let y = 0;
    const ele = this.trigger;

    if (this.refreshing) {
      y = this.props.threshold;
    }
    if (this.draging) {
      ({ y } = this);
    }
    if (showRefreshing === false) {
      y = 0;
      ele.style.visibility = 'hidden';
    } else {
      ele.style.visibility = 'visible';
    }
    ele.style.WebkitTransform = `translate3d(0, ${y}px, 0)`;
    ele.style.transform = `translate3d(0, ${y}px, 0)`;
    this.circularStyle(showRefreshing);
  }

  renderIcon() {
    if (!this.props.showIcon) return null;

    let icon = this.props.refreshIcon;
    if (!icon) {
      icon = <Loading className={classnames('refresh-svg-icon')} />;
    }

    return icon;
  }

  renderRefreshText() {
    const refreshText = this.refreshText();

    if (!this.props.showText || !refreshText) return null;

    return <div className="refresh-text" key="refresh-text">{refreshText}</div>;
  }

  render() {
    const {
      className, children, showRefreshing,
      refreshing, onRefresh, threshold, beforePullLoadText,
      afterPullLoadText, refreshingText, refreshIcon, showIcon,
      showText, getScrollContainer, ...otherProps
    } = this.props;

    return (
      <div
        ref={(node) => {
        this.$container = node;
      }}
        className={classnames(Context.prefixClass('refresh-control'), this.status, className, {
        refreshing: this.refreshing,
        draging: this.draging,
      })}
        {...otherProps}
      >
        <div
          key="refreshControl"
          ref={(c) => { this.innerNode = c; }}
          className={classnames(Context.prefixClass('refresh-control-inner'))}
        >
          {this.renderIcon()}
          {this.renderRefreshText()}
        </div>

        <div
          ref={(node) => {
          this.trigger = node;
        }}
          className={classnames('needsclick', Context.prefixClass('refresh-control-area'))}
        >
          {children}
        </div>
      </div>);
  }
}

export default RefreshControl;
