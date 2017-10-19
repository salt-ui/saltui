'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Loading = require('salt-icon/lib/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _transitionEnd = require('./transitionEnd');

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

var _Drag = require('./Drag');

var _Drag2 = _interopRequireDefault(_Drag);

var _getOffset2 = require('./getOffset');

var _getOffset3 = _interopRequireDefault(_getOffset2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * RefeshControl Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author xiaohe.wp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Status = {
  pending: 'pending',
  ready: 'ready',
  dragStart: 'dragStart',
  draging: 'draging',
  dragAnimate: 'dragAnimate',
  refreshing: 'refreshing',
  refreshAnimate: 'refreshAnimate'
};

function op(percent) {
  percent = Number(percent.toFixed(2)) - 0.2;

  return percent > 0 ? percent : 0;
}

var RefreshControl = function (_React$Component) {
  _inherits(RefreshControl, _React$Component);

  function RefreshControl(props) {
    _classCallCheck(this, RefreshControl);

    var _this = _possibleConstructorReturn(this, (RefreshControl.__proto__ || Object.getPrototypeOf(RefreshControl)).call(this, props));

    _this.state = {
      y: 0
    };

    _this.initTop = 0;
    return _this;
  }

  _createClass(RefreshControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindDrag();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.refreshing !== nextProps.refreshing) {
        this.onRefreshingChanged(nextProps.refreshing);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.drager) return;

      this.drager.destory();
      this.drager = null;
    }
  }, {
    key: 'onRefreshingChanged',
    value: function onRefreshingChanged(val) {
      if (!val) {
        (0, _transitionEnd2.default)(this.trigger, this.clearState.bind(this));
      } else {
        this.status = Status.refreshAnimate;
      }
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart() {
      if (this.refreshing) return;

      this.status = Status.dragStart;

      var top = (0, _getOffset3.default)(this.trigger).top;
      if (top === this.initTop) {
        this.draging = true;
      }
    }
  }, {
    key: 'onDrag',
    value: function onDrag(pos, event) {
      if (pos.y < 0) return;

      // 消除误差
      var initTop = this.initTop;

      var _getOffset = (0, _getOffset3.default)(this.trigger),
          top = _getOffset.top;

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
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(pos) {
      if (pos.y <= 0) {
        this.clearState();
        return;
      }

      var canRefresh = pos.y >= this.props.threshold && this.draging;
      this.status = Status.dragAnimate;
      if (canRefresh) {
        this.draging = false;

        if (!this.props.refreshing) {
          this.props.onRefresh();
        }
      } else {
        this.y = 0;
        (0, _transitionEnd2.default)(this.trigger, this.clearState.bind(this));
      }
    }
  }, {
    key: 'bindDrag',
    value: function bindDrag() {
      var drager = new _Drag2.default(this.$container);
      this.drager = new _Drag2.default(this.$container);
      this.initTop = (0, _getOffset3.default)(this.trigger).top;
      this.status = Status.ready;

      drager.start(this.onDragStart.bind(this));
      drager.drag(this.onDrag.bind(this));
      drager.end(this.onDragEnd.bind(this));
    }
  }, {
    key: 'clearState',
    value: function clearState() {
      this.status = Status.ready;
      this.draging = false;
      this.y = 0;
    }
  }, {
    key: 'circularStyle',
    value: function circularStyle(showRefreshing) {
      var threshold = this.props.threshold;

      var y = Math.min(this.y, threshold);

      var opacity = 0;
      if (this.refreshing) {
        opacity = 1;
      } else {
        opacity = y >= threshold ? 0.8 : op(y / this.max);
      }

      if (showRefreshing === false) {
        opacity = 0.8;
      }

      return { opacity: opacity };
    }
  }, {
    key: 'refreshText',
    value: function refreshText() {
      var _props = this.props,
          threshold = _props.threshold,
          refreshingText = _props.refreshingText,
          afterPullLoadText = _props.afterPullLoadText,
          beforePullLoadText = _props.beforePullLoadText;

      if (this.refreshing) {
        return refreshingText;
      }

      if (this.draging) {
        return this.y >= threshold ? afterPullLoadText : beforePullLoadText;
      }

      return '';
    }
  }, {
    key: 'triggerStyle',
    value: function triggerStyle(showRefreshing) {
      var style = {};
      var y = 0;

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

      style.WebkitTransform = 'translate3d(0, ' + y + 'px, 0)';
      style.transform = 'translate3d(0, ' + y + 'px, 0)';

      return style;
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      if (!this.props.showIcon) return null;

      var icon = this.props.refreshIcon;
      if (!icon) {
        icon = _react2.default.createElement(_Loading2.default, { className: (0, _classnames2.default)('refresh-svg-icon') });
      }

      return icon;
    }
  }, {
    key: 'renderRefreshText',
    value: function renderRefreshText() {
      var refreshText = this.refreshText();

      if (!this.props.showText || !refreshText) return null;

      return _react2.default.createElement(
        'div',
        { className: 'refresh-text', key: 'refresh-text' },
        refreshText
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          children = _props2.children,
          showRefreshing = _props2.showRefreshing,
          otherProps = _objectWithoutProperties(_props2, ['className', 'children', 'showRefreshing']);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(node) {
            _this2.$container = node;
          },
          className: (0, _classnames2.default)(_Context2.default.prefixClass('refresh-control'), this.status, className, {
            refreshing: this.refreshing,
            draging: this.draging
          })
        }, otherProps),
        _react2.default.createElement(
          'div',
          {
            key: 'refreshControl',
            className: (0, _classnames2.default)(_Context2.default.prefixClass('refresh-control-inner')),
            style: this.circularStyle()
          },
          this.renderIcon(),
          this.renderRefreshText()
        ),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(node) {
              _this2.trigger = node;
            },
            className: (0, _classnames2.default)(_Context2.default.prefixClass('refresh-control-area')),
            style: this.triggerStyle(showRefreshing)
          },
          children
        )
      );
    }
  }, {
    key: 'max',
    get: function get() {
      return this.props.max;
    }
  }, {
    key: 'refreshing',
    get: function get() {
      return this.props.refreshing;
    }
  }, {
    key: 'draging',
    get: function get() {
      return this._draging;
    },
    set: function set(draging) {
      this._draging = draging;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    },
    set: function set(status) {
      this.setState({ status: status });
    }
  }, {
    key: 'y',
    get: function get() {
      return Math.min(Math.max(this.state.y, 0), this.max);
    },
    set: function set(y) {
      this.setState({ y: y });
    }
  }]);

  return RefreshControl;
}(_react2.default.Component);

RefreshControl.defaultProps = {
  refreshing: false,
  onRefresh: function onRefresh() {},

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
  showRefreshing: true
};
RefreshControl.propTypes = {
  refreshing: _react2.default.PropTypes.bool,
  onRefresh: _react2.default.PropTypes.func,
  beforePullLoadText: _react2.default.PropTypes.string,
  afterPullLoadText: _react2.default.PropTypes.string,
  refreshingText: _react2.default.PropTypes.string,
  threshold: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any,
  refreshIcon: _react2.default.PropTypes.element,
  showIcon: _react2.default.PropTypes.bool,
  showText: _react2.default.PropTypes.bool,
  showRefreshing: _react2.default.PropTypes.bool
};
exports.default = RefreshControl;
module.exports = exports['default'];