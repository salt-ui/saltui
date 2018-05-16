/**
 * ScrollView Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    className: undefined,
    children: undefined,
  };

  static propTypes = {
    className: PropTypes.string,
    refreshControl: PropTypes.bool,
    refreshControlOptions: PropTypes.object,

    infiniteScroll: PropTypes.bool,
    infiniteScrollOptions: PropTypes.object,
    children: PropTypes.any,
  };

  tryWrapRefreshControl() {
    const { refreshControl, refreshControlOptions = {} } = this.props;
    let element = null;

    if (refreshControl) {
      element = (<RefreshControl
        key="refreshControl"
        getScrollContainer={() => this.scrollView}
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
    return (
      <InfiniteScroll
        key="infiniteScroll"
        ref={(ref) => {
          this.infiniteScroll = ref;
        }}
        enabled={this.props.infiniteScroll}
        {...this.props.infiniteScrollOptions}
        getDOMNode={(node) => {
          if (node) {
            this.scrollNode = node;
          }
        }}
      >
        <div
          className={classnames(Context.prefixClass('scroll-view'), this.props.className)}
        >
          {this.tryWrapRefreshControl()}
        </div>
      </InfiniteScroll>
    );
  }
}

export default ScrollView;
