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

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _InfiniteScroll = require('../InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Refreshcontrol = require('../Refreshcontrol');

var _Refreshcontrol2 = _interopRequireDefault(_Refreshcontrol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ScrollView Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author xiaohe.wp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ScrollView = function (_React$Component) {
  _inherits(ScrollView, _React$Component);

  function ScrollView(props) {
    _classCallCheck(this, ScrollView);

    var _this = _possibleConstructorReturn(this, (ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call(this, props));

    _this.hasInfiniteScroll = false;
    var throttle = _this.props.infiniteScrollOptions.throttle || 250;
    _this.onScroll = (0, _throttle3.default)(_this.doScroll.bind(_this), throttle);
    return _this;
  }

  _createClass(ScrollView, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // 由于infiniteScroll的变化导致react会去替换scroll-view元素, 导致scroll-view元素的scroll信息丢失
      if (!this.props.infiniteScroll && prevProps.infiniteScroll) {
        this.scrollView.scrollTop = this.scrollTop;
      }
    }
  }, {
    key: 'doScroll',
    value: function doScroll() {
      var scrollTop = this.scrollView.scrollTop;

      var onScroll = this.props.infiniteScrollOptions.onScroll || _Context2.default.noop;
      onScroll(scrollTop);
    }
  }, {
    key: 'tryWrapRefreshControl',
    value: function tryWrapRefreshControl() {
      var _props = this.props,
          refreshControl = _props.refreshControl,
          _props$refreshControl = _props.refreshControlOptions,
          refreshControlOptions = _props$refreshControl === undefined ? {} : _props$refreshControl;

      var element = null;

      if (refreshControl) {
        element = _react2.default.createElement(_Refreshcontrol2.default, _extends({
          key: 'refreshControl'
        }, refreshControlOptions, {
          className: _Context2.default.prefixClass('scroll-view-inner')
        }));
      } else {
        element = _react2.default.createElement('div', { key: 'scroll-inner', className: _Context2.default.prefixClass('scroll-view-inner') });
      }

      return _react2.default.cloneElement(element, {
        children: this.props.children
      });
    }
  }, {
    key: 'tryEmitScrollEvent',
    value: function tryEmitScrollEvent() {
      if (this.infiniteScroll) {
        this.infiniteScroll.tryEmitScrollEvent();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var element = _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref) {
            _this2.scrollView = _ref;
          },
          onScroll: this.onScroll,
          className: (0, _classnames2.default)(_Context2.default.prefixClass('scroll-view'), this.props.className)
        },
        this.tryWrapRefreshControl()
      );

      if (this.props.infiniteScroll) {
        element = _react2.default.createElement(
          _InfiniteScroll2.default,
          _extends({
            key: 'infiniteScroll',
            ref: function ref(_ref2) {
              _this2.infiniteScroll = _ref2;
            }
          }, this.props.infiniteScrollOptions, {
            getDOMNode: function getDOMNode(node) {
              if (node) {
                _this2.scrollNode = node;
              }
            }
          }),
          element
        );
        this.hasInfiniteScroll = true;
      } else if (this.hasInfiniteScroll) {
        this.scrollTop = this.scrollNode.scrollTop;
      }

      return element;
    }
  }]);

  return ScrollView;
}(_react2.default.Component);

ScrollView.displayName = 'ScrollView';
ScrollView.defaultProps = {
  refreshControl: false,
  refreshControlOptions: {},
  infiniteScroll: false,
  infiniteScrollOptions: {}
};
ScrollView.propTypes = {
  className: _react.PropTypes.string,
  refreshControl: _react.PropTypes.bool,
  refreshControlOptions: _react.PropTypes.object,

  infiniteScroll: _react.PropTypes.bool,
  infiniteScrollOptions: _react.PropTypes.object,
  children: _react.PropTypes.any
};
exports.default = ScrollView;
module.exports = exports['default'];