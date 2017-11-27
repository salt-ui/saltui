/**
 * ScrollView Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _throttle from 'lodash/throttle';
import Context from '../Context';
import InfiniteScroll from '../InfiniteScroll';
import RefreshControl from '../Refreshcontrol';

class ScrollView extends React.Component {
  static displayName = 'ScrollView';
  static defaultProps = {
    refreshControl: false,
    refreshControlOptions: {},
    infiniteScroll: false,
    infiniteScrollOptions: {},
  };

  static propTypes = {
    className: PropTypes.string,
    refreshControl: PropTypes.bool,
    refreshControlOptions: PropTypes.object,

    infiniteScroll: PropTypes.bool,
    infiniteScrollOptions: PropTypes.object,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.hasInfiniteScroll = false;
    const throttle = this.props.infiniteScrollOptions.throttle || 250;
    this.onScroll = _throttle(this.doScroll.bind(this), throttle);
  }

  componentDidUpdate(prevProps) {
    // 由于infiniteScroll的变化导致react会去替换scroll-view元素, 导致scroll-view元素的scroll信息丢失
    if (!this.props.infiniteScroll && prevProps.infiniteScroll) {
      this.scrollView.scrollTop = this.scrollTop;
    }
  }

  doScroll() {
    const { scrollTop } = this.scrollView;
    const onScroll = this.props.infiniteScrollOptions.onScroll || Context.noop;
    onScroll(scrollTop);
  }

  tryWrapRefreshControl() {
    const { refreshControl, refreshControlOptions = {} } = this.props;
    let element = null;

    if (refreshControl) {
      element = (<RefreshControl
        key="refreshControl"
        {...refreshControlOptions}
        className={Context.prefixClass('scroll-view-inner')}
      />);
    } else {
      element = <div key="scroll-inner" className={Context.prefixClass('scroll-view-inner')} />;
    }

    return React.cloneElement(element, {
      children: this.props.children,
    });
  }

  tryEmitScrollEvent() {
    if (this.infiniteScroll) {
      this.infiniteScroll.tryEmitScrollEvent();
    }
  }

  render() {
    let element = (
      <div
        ref={(ref) => { this.scrollView = ref; }}
        onScroll={this.onScroll}
        className={classnames(Context.prefixClass('scroll-view'), this.props.className)}
      >
        {this.tryWrapRefreshControl()}
      </div>
    );

    if (this.props.infiniteScroll) {
      element = (
        <InfiniteScroll
          key="infiniteScroll"
          ref={(ref) => {
            this.infiniteScroll = ref;
          }}
          {...this.props.infiniteScrollOptions}
          getDOMNode={(node) => {
            if (node) {
              this.scrollNode = node;
            }
          }}
        >
          {element}
        </InfiniteScroll>
      );
      this.hasInfiniteScroll = true;
    } else if (this.hasInfiniteScroll) {
      this.scrollTop = this.scrollNode.scrollTop;
    }

    return element;
  }
}

export default ScrollView;
