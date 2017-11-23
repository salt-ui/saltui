'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _nattyFetch = require('natty-fetch');

var _nattyFetch2 = _interopRequireDefault(_nattyFetch);

var _BottomTip = require('./BottomTip');

var _BottomTip2 = _interopRequireDefault(_BottomTip);

var _EmptyContent = require('./EmptyContent');

var _EmptyContent2 = _interopRequireDefault(_EmptyContent);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ScrollList Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author xiaohe.wp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PropTypes = _react2.default.PropTypes;


function odd(i) {
  return !!((i + 1) % 2);
}

var ScrollList = function (_React$Component) {
  _inherits(ScrollList, _React$Component);

  function ScrollList(props) {
    _classCallCheck(this, ScrollList);

    var _this = _possibleConstructorReturn(this, (ScrollList.__proto__ || Object.getPrototypeOf(ScrollList)).call(this, props));

    _this.state = {
      dataGetted: props.dataGetted,
      data: props.data,
      hasError: props.hasError,
      refreshing: props.refreshing,
      loading: props.loading,
      noMore: props.noMore,
      currentPage: 1,
      fetchData: props.fetchDataOnOpen
    };
    return _this;
  }

  _createClass(ScrollList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      if (!this.props.url) {
        var change = {};
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

        if (!(0, _isEqual2.default)(props.data, nextProps.data)) {
          change.data = nextProps.data;
        }

        if (Object.keys(change).length) {
          this.setState(change);
        }
      }
    }
  }, {
    key: 'onFetch',
    value: function onFetch(refresh, from) {
      var _this2 = this;

      this.setState(refresh ? { refreshing: true } : { loading: true });

      this.fetchFrom = this.fetchFrom || from;
      var pageOption = _defineProperty({
        pageSize: this.props.pageSize
      }, this.props.currentPageKey, refresh ? 1 : this.state.currentPage);
      var data = this.props.beforeFetch((0, _cloneDeep2.default)(pageOption), this.fetchFrom) || pageOption;
      this.fetchFrom = '';

      var numKey = data[this.props.currentPageKey];
      delete data[this.props.currentPageKey];
      var queryData = JSON.stringify(data);
      data[this.props.currentPageKey] = numKey;

      var fetchOption = (0, _assign2.default)({
        url: this.props.url,
        data: data,
        withCredentials: false
      }, this.props.fetchOption);

      if (this.props.dataType) {
        fetchOption.jsonp = this.props.dataType === 'jsonp';
      } else {
        fetchOption.jsonp = /\.jsonp/.test(this.props.url);
      }

      _nattyFetch2.default.create(fetchOption)().then(function (con) {
        var content = (0, _cloneDeep2.default)(_this2.props.processData(con));
        var state = _this2.state;
        var nextState = {
          refreshing: false,
          loading: false,
          dataGetted: true,
          hasError: false
        };

        nextState.noMore = content.data.length < _this2.props.pageSize;

        if (refresh) {
          nextState.data = content.data;
          nextState.currentPage = 2;
          _this2.scrollTop();
        } else {
          if (state.lastQueryData && queryData !== state.lastQueryData || content.currentPage !== state.currentPage) {
            nextState.currentPage = 1;
            nextState.data = [];
            _this2.scrollTop();
          } else {
            nextState.data = state.data;
            nextState.currentPage = state.currentPage + 1;
          }
          nextState.data = nextState.data.concat(content.data);
        }
        nextState.lastQueryData = queryData;
        nextState.showRefreshing = true;
        _this2.setState(nextState, function () {
          if (refresh) {
            _this2.scrollViewRef.tryEmitScrollEvent();
          }
        });
      }).catch(function (error) {
        _this2.setState({
          refreshing: false,
          loading: false,
          dataGetted: true,
          noMore: false,
          hasError: true
        });
        console.error(error);
      });
    }
  }, {
    key: 'fetchData',
    value: function fetchData(from) {
      this.fetchFrom = from;

      if (this.state.fetchData) {
        this.scrollTop();
        if (this.props.url) {
          this.setState({
            showRefreshing: false
          });
          this.onFetch(true, from);
        } else if (this.props.onRefresh) {
          this.props.onRefresh();
        }
      } else {
        this.setState({
          fetchData: true,
          showRefreshing: !this.props.url
        });
      }
    }
  }, {
    key: 'scrollTop',
    value: function scrollTop() {
      /* eslint-disable react/no-find-dom-node */
      /* TODO: need scrollView support getDomNode method */
      this.scrollView = this.scrollView || _reactDom2.default.findDOMNode(this.scrollViewRef);
      /* eslint-enable react/no-find-dom-node */
      if (this.scrollView) {
        this.scrollView.scrollTop = 0;
      }
    }
  }, {
    key: 'refreshOptions',
    value: function refreshOptions() {
      var onRefresh = this.props.url ? this.onFetch.bind(this, true, 'top') : this.props.onRefresh;
      return {
        refreshControl: this.props.scrollRefresh,
        refreshControlOptions: {
          showRefreshing: this.state.showRefreshing,
          refreshing: this.state.refreshing,
          beforePullLoadText: this.props.pullLoadTip,
          afterPullLoadText: this.props.loadDataTip,
          refreshingText: this.props.loadingTip,
          onRefresh: onRefresh
        }
      };
    }
  }, {
    key: 'infiniteScrollOptions',
    value: function infiniteScrollOptions() {
      var onLoad = this.props.url ? this.onFetch.bind(this, false, 'bottom') : this.props.onLoad;
      var _state = this.state,
          fetchData = _state.fetchData,
          noMore = _state.noMore,
          hasError = _state.hasError;

      return {
        infiniteScroll: fetchData && !noMore && !hasError && this.props.scrollLoad,
        infiniteScrollOptions: {
          loading: this.state.loading,
          loadingText: this.props.loadingTip,
          onLoad: onLoad
        }
      };
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.state.dataGetted && (0, _isEmpty3.default)(this.state.data);
    }
  }, {
    key: 'renderPrevSiblings',
    value: function renderPrevSiblings() {
      var children = this.props.children;

      if (!Array.isArray(children)) {
        return null;
      }
      var prevs = children.slice(0, children.length - 1);
      return prevs.map(function (element, i) {
        return _react2.default.cloneElement(element, {
          /* eslint-disable react/no-array-index-key */
          key: 'prev-sibling-' + i,
          /* eslint-enable react/no-array-index-key */
          index: i
        });
      });
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      var data = this.state.data;
      var children = this.props.children;

      var len = data.length;
      if (!children) {
        return null;
      }
      var lastChild = !Array.isArray(children) ? children : children[children.length - 1];
      var isLastChildFunc = typeof lastChild === 'function';
      if (!isLastChildFunc) {
        return data.map(function (item, i) {
          return _react2.default.cloneElement(lastChild, _extends({
            /* eslint-disable react/no-array-index-key */
            key: 'child-' + i,
            /* selint-enable react/no-array-index-key */
            index: i,
            first: i === 0,
            last: i === len,
            odd: odd(i),
            data: item
          }, item));
        });
      }
      return data.map(function (item, i) {
        return lastChild(item, i);
      });
    }
  }, {
    key: 'renderBottomTip',
    value: function renderBottomTip() {
      var noMore = this.state.dataGetted && this.state.noMore;
      var hasError = this.state.dataGetted && this.state.hasError;

      if (hasError) {
        return _react2.default.createElement(_BottomTip2.default, { key: 'bottom-tip', text: this.props.errorTip });
      }

      if (noMore) {
        return _react2.default.createElement(_BottomTip2.default, { key: 'bottom-tip', text: this.props.noMoreDataTip });
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.isEmpty()) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames3.default)(_Context2.default.prefixClass('scroll-list'), this.props.className) },
          _react2.default.createElement(_EmptyContent2.default, { text: this.props.noDataTip, image: this.props.noDataImage })
        );
      }

      return _react2.default.createElement(
        _ScrollView2.default,
        _extends({
          ref: function ref(_ref) {
            _this3.scrollViewRef = _ref;
          },
          className: (0, _classnames3.default)(this.props.prefixCls, _defineProperty({}, this.props.className, !!this.props.className))
        }, this.refreshOptions(), this.infiniteScrollOptions()),
        this.renderPrevSiblings(),
        this.renderList(),
        this.renderBottomTip()
      );
    }
  }]);

  return ScrollList;
}(_react2.default.Component);

ScrollList.displayName = 'ScrollList';
ScrollList.defaultProps = {
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
  beforeFetch: function beforeFetch(data) {
    return data;
  },
  processData: function processData(data) {
    return data;
  },
  currentPageKey: 'currentPage',
  noMore: false, // 没有更多内容提示
  noMoreDataTip: '没有更多了',
  hasError: false,
  errorTip: '获取数据失败',
  noDataTip: '暂无数据',
  noDataImage: 'https://img.alicdn.com/tps/TB1K6mHNpXXXXXiXpXXXXXXXXXX-1000-1000.svg',
  fetchDataOnOpen: true
};
ScrollList.propTypes = {
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
  fetchDataOnOpen: PropTypes.bool
};


ScrollList.Item = _Item2.default;

exports.default = ScrollList;
module.exports = exports['default'];