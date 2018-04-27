/**
 * InfiniteScroll Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconLoading from 'salt-icon/lib/Loading';
import _throttle from 'lodash/throttle';
import Context from '../Context';


class InfiniteScroll extends React.Component {
  static defaultProps = {
    children: undefined,
    enabled: true,
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
    getDOMNode() {

    },
  };

  static propTypes = {
    enabled: PropTypes.bool,
    loading: PropTypes.bool,
    threshold: PropTypes.number,
    throttle: PropTypes.number,
    showIcon: PropTypes.bool,
    showText: PropTypes.bool,
    loadingIcon: PropTypes.element,
    loadingText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    onLoad: PropTypes.func,
    onScroll: PropTypes.func,
    children: PropTypes.element,
    getDOMNode: PropTypes.func,
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

  componentWillUnmount() {
    this.onScroll.cancel(); // cancel pending throttled calls
  }

  scrollArea() {
    const { props } = this;
    let iconElement = null;
    let textElement = null;

    if (props.loading && props.showIcon) {
      iconElement = props.loadingIcon ||
        <IconLoading className="loading-icon" key="icon" />;
    }

    if (props.loading && props.showText && props.loadingText) {
      textElement = <div className="loading-text" key="text">{props.loadingText}</div>;
    }

    return (
      <div
        key="scrollArea"
        className={classnames(Context.prefixClass('infinity-scroll'), { loading: props.loading })}
      >
        {iconElement}
        {textElement}
      </div>);
  }

  tryEmitScrollEvent() {
    if (this.props.loading || !this.$scroller) return false;

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
        this.props.getDOMNode(node);
      },
      ...(this.props.enabled ? { onScroll: this.onScroll } : {}),
      children: React.cloneElement(elementChildren, {
        children: [
          ...React.Children.toArray(elementChildren.props.children),
          ...(this.props.enabled ? [this.scrollArea()] : []),
        ],
      }),
    });
  }
}

export default InfiniteScroll;
