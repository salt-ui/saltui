/**
 * InfiniteScroll Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import _throttle from 'lodash/throttle';
import Context from '../Context';
import TingleIcon from '@ali/tingle-icon';

class InfiniteScroll extends React.Component {

  static defaultProps = {
    loading: false,
    throttle: 250,
    loadingIcon: null,
    loadingText: '正在加载...',
    showIcon: true,
    showText: true,
    threshold: 66,
    onLoad() {

    },
    onScroll() {

    },
    getRef() {

    },
  };

  static propTypes = {
    loading: React.PropTypes.bool,
    threshold: React.PropTypes.number,
    throttle: React.PropTypes.number,
    showIcon: React.PropTypes.bool,
    showText: React.PropTypes.bool,
    loadingIcon: React.PropTypes.element,
    loadingText: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    onLoad: React.PropTypes.func,
    onScroll: React.PropTypes.func,
    children: React.PropTypes.element,
    getRef: React.PropTypes.func,
  };

  constructor(props) {
    super(props);


    this.onScroll = _throttle(this.tryEmitScrollEvent.bind(this), this.props.throttle);
  }

  componentDidMount() {
    this.tryEmitScrollEvent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.tryEmitScrollEvent();
    }
  }

  scrollArea() {
    const { props } = this;
    let iconElement = null;
    let textElement = null;

    if (props.loading && props.showIcon) {
      iconElement = props.loadingIcon ||
        <TingleIcon name="loading" className="loading-icon" key="icon" />;
    }

    if (props.loading && props.showText && props.loadingText) {
      textElement = <div className="loading-text" key="text">{props.loadingText}</div>;
    }

    return (<div
      key="scrollArea"
      className={classnames(Context.prefixClass('infinity-scroll'), { loading: props.loading })}
    >
      {iconElement}
      {textElement}
    </div>);
  }

  tryEmitScrollEvent() {
    if (this.props.loading) return false;

    const { $scroller } = this;
    const { threshold } = this.props;
    const { clientHeight, scrollHeight, scrollTop } = $scroller;
    const h = scrollHeight - scrollTop - threshold;

    if (h <= clientHeight) {
      this.props.onLoad();
    }

    this.props.onScroll(scrollTop, scrollHeight);

    return true;
  }

  render() {
    const element = React.Children.only(this.props.children);
    const elementChildren = React.Children.only(element.props.children);

    return React.cloneElement(element, {
      ...element.props,
      ref: (node) => {
        this.$scroller = node;
        this.props.getRef(node);
      },
      onScroll: this.onScroll,
      children: React.cloneElement(elementChildren, {
        children: [
          ...React.Children.toArray(elementChildren.props.children),
          this.scrollArea(),
        ],
      }),
    });
  }
}

export default InfiniteScroll;
