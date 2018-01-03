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

var _Loading = require('salt-icon/lib/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * InfiniteScroll Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author xiaohe.wp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InfiniteScroll = function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

    _this.onScroll = (0, _throttle3.default)(_this.tryEmitScrollEvent.bind(_this), _this.props.throttle);
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tryEmitScrollEvent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.loading !== this.props.loading) {
        this.tryEmitScrollEvent();
      }
    }
  }, {
    key: 'scrollArea',
    value: function scrollArea() {
      var props = this.props;

      var iconElement = null;
      var textElement = null;

      if (props.loading && props.showIcon) {
        iconElement = props.loadingIcon || _react2.default.createElement(_Loading2.default, { className: 'loading-icon', key: 'icon' });
      }

      if (props.loading && props.showText && props.loadingText) {
        textElement = _react2.default.createElement(
          'div',
          { className: 'loading-text', key: 'text' },
          props.loadingText
        );
      }

      return _react2.default.createElement(
        'div',
        {
          key: 'scrollArea',
          className: (0, _classnames2.default)(_Context2.default.prefixClass('infinity-scroll'), { loading: props.loading })
        },
        iconElement,
        textElement
      );
    }
  }, {
    key: 'tryEmitScrollEvent',
    value: function tryEmitScrollEvent() {
      if (this.props.loading) return false;

      var $scroller = this.$scroller;
      var threshold = this.props.threshold;
      var clientHeight = $scroller.clientHeight,
          scrollHeight = $scroller.scrollHeight,
          scrollTop = $scroller.scrollTop;

      var h = scrollHeight - scrollTop - threshold;

      if (h <= clientHeight) {
        this.props.onLoad();
      }

      this.props.onScroll(scrollTop, scrollHeight);

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var element = _react2.default.Children.only(this.props.children);
      var elementChildren = _react2.default.Children.only(element.props.children);

      return _react2.default.cloneElement(element, _extends({}, element.props, {
        ref: function ref(node) {
          _this2.$scroller = node;
          _this2.props.getDOMNode(node);
        },
        onScroll: this.onScroll,
        children: _react2.default.cloneElement(elementChildren, {
          children: [].concat(_toConsumableArray(_react2.default.Children.toArray(elementChildren.props.children)), [this.scrollArea()])
        })
      }));
    }
  }]);

  return InfiniteScroll;
}(_react2.default.Component);

InfiniteScroll.defaultProps = {
  loading: false,
  throttle: 250,
  loadingIcon: null,
  loadingText: '正在加载...',
  showIcon: true,
  showText: true,
  threshold: 66,
  onLoad: function onLoad() {},
  onScroll: function onScroll() {},
  getDOMNode: function getDOMNode() {}
};
InfiniteScroll.propTypes = {
  loading: _react2.default.PropTypes.bool,
  threshold: _react2.default.PropTypes.number,
  throttle: _react2.default.PropTypes.number,
  showIcon: _react2.default.PropTypes.bool,
  showText: _react2.default.PropTypes.bool,
  loadingIcon: _react2.default.PropTypes.element,
  loadingText: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  onLoad: _react2.default.PropTypes.func,
  onScroll: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.element,
  getDOMNode: _react2.default.PropTypes.func
};
exports.default = InfiniteScroll;
module.exports = exports['default'];