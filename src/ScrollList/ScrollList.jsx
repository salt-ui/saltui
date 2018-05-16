/**
 * ScrollList Component for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import NattyFetch from 'natty-fetch';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import classnames from 'classnames';
import Context from '../Context';
import ScrollView from '../ScrollView';
import BottomTip from './BottomTip';
import EmptyContent from './EmptyContent';
import Item from './Item';


function odd(i) {
  return !!((i + 1) % 2);
}


class ScrollList extends React.Component {
  static displayName = 'ScrollList';
  static defaultProps = {
    scrollLoad: true, // 是否支持滚动,来自设计器配置
    scrollRefresh: true,
    dataGetted: false,
    data: [],
    refreshing: false,
    prefixCls: 't-scroll-list',
    pullLoadTip: '下拉显示更多',
    loadDataTip: '释放加载数据',
    onRefresh: null,
    loading: false, // 触底加载
    loadingTip: '加载中...',
    onLoad: null,
    beforeFetch: data => data,
    processData: data => data,
    currentPageKey: 'currentPage',
    noMore: false, // 没有更多内容提示
    noMoreDataTip: '没有更多了',
    hasError: false,
    errorTip: '获取数据失败',
    noDataTip: '暂无数据',
    noDataImage: 'https://img.alicdn.com/tps/TB1K6mHNpXXXXXiXpXXXXXXXXXX-1000-1000.svg',
    fetchDataOnOpen: true,
    className: undefined,
    children: undefined,
    url: undefined,
    pageSize: undefined,
    dataType: undefined,
    fetchOption: undefined,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    scrollLoad: PropTypes.bool,
    scrollRefresh: PropTypes.bool,

    // 数据是否已就位标识符
    dataGetted: PropTypes.bool,
    data: PropTypes.array,
    // 下拉配置
    refreshing: PropTypes.bool,
    pullLoadTip: PropTypes.string,
    loadDataTip: PropTypes.string,
    onRefresh: PropTypes.func,
    // 触底加载配置
    loading: PropTypes.bool,
    loadingTip: PropTypes.string,
    onLoad: PropTypes.func,
    // 无更多数据提示文案
    noMore: PropTypes.bool,
    noMoreDataTip: PropTypes.string,
    // 加载错误文案
    hasError: PropTypes.bool,
    errorTip: PropTypes.string,
    // 无数据提示文案
    noDataTip: PropTypes.string,
    noDataImage: PropTypes.string,
    //
    url: PropTypes.string,
    pageSize: PropTypes.number,
    beforeFetch: PropTypes.func,
    processData: PropTypes.func,
    currentPageKey: PropTypes.string,
    dataType: PropTypes.oneOf(['json', 'jsonp']),
    fetchOption: PropTypes.object,
    fetchDataOnOpen: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataGetted: props.dataGetted,
      data: props.data,
      hasError: props.hasError,
      refreshing: props.refreshing,
      loading: props.loading,
      noMore: props.noMore,
      currentPage: 1,
      fetchData: props.fetchDataOnOpen,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (!this.props.url) {
      const change = {};
      if (props.dataGetted !== nextProps.dataGetted) {
        change.dataGetted = nextProps.dataGetted;
      }

      if (props.hasError !== nextProps.hasError) {
        change.hasError = nextProps.hasError;
      }

      if (props.refreshing !== nextProps.refreshing) {
        change.refreshing = nextProps.refreshing;
      }

      if (props.loading !== nextProps.loading) {
        change.loading = nextProps.loading;
      }

      if (props.noMore !== nextProps.noMore) {
        change.noMore = nextProps.noMore;
      }

      if (!isEqual(props.data, nextProps.data)) {
        change.data = nextProps.data;
      }

      if (Object.keys(change).length) {
        this.setState(change);
      }
    }
  }

  onFetch(refresh, from) {
    if (this.state.loading) return;
    this.setState(refresh ? { refreshing: true } : { loading: true });

    this.fetchFrom = this.fetchFrom || from;
    const pageOption = {
      pageSize: this.props.pageSize,
      [this.props.currentPageKey]: refresh ? 1 : this.state.currentPage,
    };
    const data = this.props.beforeFetch(cloneDeep(pageOption), this.fetchFrom) || pageOption;
    this.fetchFrom = '';


    const numKey = data[this.props.currentPageKey];
    delete data[this.props.currentPageKey];
    const queryData = JSON.stringify(data);
    data[this.props.currentPageKey] = numKey;

    const fetchOption = assign({
      url: this.props.url,
      data,
      withCredentials: false,
    }, this.props.fetchOption);

    if (this.props.dataType) {
      fetchOption.jsonp = this.props.dataType === 'jsonp';
    } else {
      fetchOption.jsonp = /\.jsonp/.test(this.props.url);
    }

    NattyFetch.create(fetchOption)().then((con) => {
      const content = cloneDeep(this.props.processData(con));
      const { state } = this;
      const nextState = {
        refreshing: false,
        loading: false,
        dataGetted: true,
        hasError: false,
      };

      nextState.noMore = content.data.length < this.props.pageSize;

      if (refresh) {
        nextState.data = content.data;
        nextState.currentPage = 2;
        this.scrollTop();
      } else {
        if ((state.lastQueryData && queryData !== state.lastQueryData) ||
          content.currentPage !== state.currentPage) {
          nextState.currentPage = 1;
          nextState.data = [];
          this.scrollTop();
        } else {
          nextState.data = state.data;
          nextState.currentPage = state.currentPage + 1;
        }
        nextState.data = nextState.data.concat(content.data);
      }
      nextState.lastQueryData = queryData;
      nextState.showRefreshing = true;
      this.setState(nextState, () => {
        if (refresh) {
          this.scrollViewRef.tryEmitScrollEvent();
        }
      });
    }).catch((error) => {
      this.setState({
        refreshing: false,
        loading: false,
        dataGetted: true,
        noMore: false,
        hasError: true,
      });
      console.error(error);
    });
  }

  fetchData(from) {
    this.fetchFrom = from;

    if (this.state.fetchData) {
      this.scrollTop();
      if (this.props.url) {
        this.setState({
          showRefreshing: false,
        });
        this.onFetch(true, from);
      } else if (this.props.onRefresh) {
        this.props.onRefresh();
      }
    } else {
      this.setState({
        fetchData: true,
        showRefreshing: !this.props.url,
      });
    }
  }

  scrollTop() {
    /* eslint-disable react/no-find-dom-node */
    /* TODO: need scrollView support getDomNode method */
    this.scrollView = this.scrollView || ReactDOM.findDOMNode(this.scrollViewRef);
    /* eslint-enable react/no-find-dom-node */
    if (this.scrollView) {
      this.scrollView.scrollTop = 0;
    }
  }

  refreshOptions() {
    const onRefresh = this.props.url ? this.onFetch.bind(this, true, 'top') : this.props.onRefresh;
    return {
      refreshControl: this.props.scrollRefresh,
      refreshControlOptions: {
        showRefreshing: this.state.showRefreshing,
        refreshing: this.state.refreshing,
        beforePullLoadText: this.props.pullLoadTip,
        afterPullLoadText: this.props.loadDataTip,
        refreshingText: this.props.loadingTip,
        onRefresh,
      },
    };
  }

  infiniteScrollOptions() {
    const onLoad = this.props.url ? this.onFetch.bind(this, false, 'bottom') : this.props.onLoad;
    const {
      fetchData, noMore, hasError, refreshing,
    } = this.state;
    return {
      infiniteScroll: !refreshing && fetchData && !noMore && !hasError && this.props.scrollLoad,
      infiniteScrollOptions: {
        loading: this.state.loading,
        loadingText: this.props.loadingTip,
        onLoad,
      },
    };
  }

  isEmpty() {
    return this.state.dataGetted && isEmpty(this.state.data);
  }

  renderPrevSiblings() {
    const { children } = this.props;
    if (!Array.isArray(children)) {
      return null;
    }
    const prevs = children.slice(0, children.length - 1);
    return prevs.map((element, i) => React.cloneElement(element, {
      /* eslint-disable react/no-array-index-key */
      key: `prev-sibling-${i}`,
      /* eslint-enable react/no-array-index-key */
      index: i,
    }));
  }

  renderList() {
    const { data } = this.state;
    const { children } = this.props;
    const len = data.length;
    if (!children) {
      return null;
    }
    const lastChild = !Array.isArray(children) ? children : children[children.length - 1];
    const isLastChildFunc = typeof lastChild === 'function';
    if (!isLastChildFunc) {
      return data.map((item, i) => React.cloneElement(lastChild, {
        /* eslint-disable react/no-array-index-key */
        key: `child-${i}`,
        /* selint-enable react/no-array-index-key */
        index: i,
        first: i === 0,
        last: i === len,
        odd: odd(i),
        data: item,
        ...item,
      }));
    }
    return data.map((item, i) => lastChild(item, i));
  }

  renderBottomTip() {
    const noMore = this.state.dataGetted && this.state.noMore;
    const hasError = this.state.dataGetted && this.state.hasError;

    if (hasError) {
      return <BottomTip key="bottom-tip" text={this.props.errorTip} />;
    }

    if (noMore) {
      return <BottomTip key="bottom-tip" text={this.props.noMoreDataTip} />;
    }

    return null;
  }

  render() {
    if (this.isEmpty()) {
      return (
        <div className={classnames(Context.prefixClass('scroll-list'), this.props.className)}>
          <EmptyContent text={this.props.noDataTip} image={this.props.noDataImage} />
        </div>
      );
    }

    return (
      <ScrollView
        ref={(ref) => {
          this.scrollViewRef = ref;
        }}
        className={classnames(this.props.prefixCls, {
          [this.props.className]: !!this.props.className,
        })}
        {...this.refreshOptions()}
        {...this.infiniteScrollOptions()}
      >
        {this.renderPrevSiblings()}
        {this.renderList()}
        {this.renderBottomTip()}
      </ScrollView>
    );
  }
}

ScrollList.Item = Item;

export default ScrollList;
