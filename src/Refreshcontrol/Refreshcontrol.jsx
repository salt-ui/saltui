/**
 * RefeshControl Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import Loading from 'salt-icon/lib/Loading';
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
  percent = Number(percent.toFixed(2)) - 0.2;

  return percent > 0 ? percent : 0;
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
  };

  static propTypes = {
    refreshing: React.PropTypes.bool,
    onRefresh: React.PropTypes.func,
    beforePullLoadText: React.PropTypes.string,
    afterPullLoadText: React.PropTypes.string,
    refreshingText: React.PropTypes.string,
    threshold: React.PropTypes.number,
    max: React.PropTypes.number,
    className: React.PropTypes.string,
    children: React.PropTypes.any,
    refreshIcon: React.PropTypes.element,
    showIcon: React.PropTypes.bool,
    showText: React.PropTypes.bool,
    showRefreshing: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      y: 0,
    };

    this.initTop = 0;
  }

  componentDidMount() {
    this.bindDrag();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.refreshing !== nextProps.refreshing) {
      this.onRefreshingChanged(nextProps.refreshing);
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
    if (this.refreshing) return;

    this.status = Status.dragStart;

    const top = getOffset(this.trigger).top;
    if (top === this.initTop) {
      this.draging = true;
    }
  }

  onDrag(pos, event) {
    if (pos.y < 0) return;

    // 消除误差
    const { initTop } = this;
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

    this.y = pos.y;
    if (this.y < 0) {
      this.y = 1;
    }
  }

  onDragEnd(pos) {
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

  set draging(draging) {
    this._draging = draging;
  }

  get status() {
    return this.state.status;
  }

  set status(status) {
    this.setState({ status });
  }

  get y() {
    return Math.min(Math.max(this.state.y, 0), this.max);
  }

  set y(y) {
    this.setState({ y });
  }

  bindDrag() {
    const drager = new Drag(this.$container);
    this.drager = new Drag(this.$container);
    this.initTop = getOffset(this.trigger).top;
    this.status = Status.ready;

    drager.start(this.onDragStart.bind(this));
    drager.drag(this.onDrag.bind(this));
    drager.end(this.onDragEnd.bind(this));
  }

  clearState() {
    this.status = Status.ready;
    this.draging = false;
    this.y = 0;
  }

  circularStyle(showRefreshing) {
    const { threshold } = this.props;
    const y = Math.min(this.y, threshold);

    let opacity = 0;
    if (this.refreshing) {
      opacity = 1;
    } else {
      opacity = y >= threshold ? 0.8 : op(y / this.max);
    }

    if (showRefreshing === false) {
      opacity = 0.8;
    }

    return { opacity };
  }

  refreshText() {
    const { threshold, refreshingText, afterPullLoadText, beforePullLoadText } = this.props;
    if (this.refreshing) {
      return refreshingText;
    }

    if (this.draging) {
      return this.y >= threshold ? afterPullLoadText : beforePullLoadText;
    }

    return '';
  }

  triggerStyle(showRefreshing) {
    const style = {};
    let y = 0;

    if (this.refreshing) {
      y = this.props.threshold;
    }

    if (this.draging) {
      y = this.y;
    }

    if (showRefreshing === false) {
      y = 0;
      style.visibility = 'hidden';
    } else {
      style.visibility = 'visible';
    }

    style.WebkitTransform = `translate3d(0, ${y}px, 0)`;
    style.transform = `translate3d(0, ${y}px, 0)`;

    return style;
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
    const { className, children, showRefreshing, ...otherProps } = this.props;

    return (<div
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
        className={classnames(Context.prefixClass('refresh-control-inner'))}
        style={this.circularStyle()}
      >
        {this.renderIcon()}
        {this.renderRefreshText()}
      </div>

      <div
        ref={(node) => {
          this.trigger = node;
        }}
        className={classnames(Context.prefixClass('refresh-control-area'))}
        style={this.triggerStyle(showRefreshing)}
      >
        {children}
      </div>
    </div>);
  }
}

export default RefreshControl;
