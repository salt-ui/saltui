'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Boxs = require('../Boxs');

var _TabBarItem = require('./TabBarItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TabBar Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zhouwenjie
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TabBar = function (_React$Component) {
  _inherits(TabBar, _React$Component);

  function TabBar(props) {
    _classCallCheck(this, TabBar);

    var _this = _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call(this, props));

    _this.state = {
      activeIndex: props.activeIndex,
      centerMoreVisible: false
    };
    return _this;
  }

  _createClass(TabBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var t = this;
      var nextActiveIndex = nextProps.activeIndex;
      if (nextActiveIndex !== t.state.activeIndex) {
        t.setActiveIndex(nextActiveIndex);
      }
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(index, path) {
      if (index !== this.state.activeIndex) {
        this.setActiveIndex(index, path);
      }
      // this.props.onChange(index, path);
    }
  }, {
    key: 'setActiveIndex',
    value: function setActiveIndex(index, path) {
      var t = this;
      if (t.centerTabIndex && t.centerTabIndex === index) {
        t.props.onChange(index, path);
      } else {
        t.setState({
          activeIndex: index
        }, function () {
          t.props.onChange(index, path);
        });
      }
    }
  }, {
    key: 'handleCenterMoreVisibleChange',
    value: function handleCenterMoreVisibleChange(visible) {
      this.setState({
        centerMoreVisible: visible
      });
    }

    /**
    * Tab bar items data from child React Element
    * like: <TabBar><TabBar.Item></TabBar.Item></TabBar> Render way
    */

  }, {
    key: 'childrenRenderWay',
    value: function childrenRenderWay() {
      var _this2 = this;

      var t = this;
      return _react2.default.Children.map(this.props.children, function (child, idx) {
        if (!child) {
          return null;
        }
        if (child.props.items) {
          t.centerTabIndex = idx;
          return _react2.default.createElement(_TabBarItem.TabBarItemCenter, {
            key: idx,
            index: idx,
            item: child,
            moreVisible: _this2.state.centerMoreVisible,
            iconHeight: child.cIconHeight || t.props.cIconHeight,
            onMoreVisibleChange: function onMoreVisibleChange(visible) {
              _this2.handleCenterMoreVisibleChange(visible);
            },
            childIconHeight: 36,
            active: idx === t.state.activeIndex,
            type: 'center',
            onClick: function onClick() {
              t.onItemClick();
            }
          });
        }
        return _react2.default.createElement(_TabBarItem.TabBarItem, {
          key: idx,
          item: child,
          iconHeight: t.props.iconHeight,
          active: idx === t.state.activeIndex,
          onClick: function onClick() {
            t.onItemClick(idx, child.props.path);
          }
        });
      });
    }

    /**
    * Tab bar items data from props, like <TabBar items={}/>
    */

  }, {
    key: 'propsRenderWay',
    value: function propsRenderWay() {
      var _this3 = this;

      var t = this;
      return this.props.items.map(function (item, idx) {
        if (item.items) {
          t.centerTabIndex = idx;
          return _react2.default.createElement(_TabBarItem.TabBarItemCenter, _extends({}, item, {
            key: idx.toString(),
            index: idx,
            moreVisible: _this3.state.centerMoreVisible,
            onMoreVisibleChange: function onMoreVisibleChange(visible) {
              _this3.handleCenterMoreVisibleChange(visible);
            },
            iconHeight: item.cIconHeight || t.props.cIconHeight,
            childIconHeight: 36,
            active: idx === t.state.activeIndex,
            type: 'center',
            onClick: function onClick() {
              t.onItemClick();
            }
          }));
        }
        return _react2.default.createElement(_TabBarItem.TabBarItem, _extends({
          key: idx.toString()
        }, item, {
          iconHeight: t.props.iconHeight,
          active: idx === t.state.activeIndex,
          onClick: function onClick() {
            t.onItemClick(idx, item.path);
          }
        }));
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var t = this;
      var content = void 0;
      if (this.props.children) {
        content = t.childrenRenderWay();
      } else {
        content = t.propsRenderWay();
      }
      var style = _extends({}, t.props.tabBarStyle);

      return _react2.default.createElement(
        _Boxs.HBox,
        {
          className: _Context2.default.prefixClass('tabs-bar-items'),
          style: style,
          hAlign: 'center',
          vAlign: 'center'
        },
        content
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      var className = (0, _classnames3.default)(_Context2.default.prefixClass('tabs-bar'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, _Context2.default.prefixClass('tabs-bar-dark'), this.props.theme === 'dark'), _classnames));
      var style = {};
      if (this.state.centerMoreVisible) {
        style.zIndex = 1010;
      }
      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        t.renderItems()
      );
    }
  }]);

  return TabBar;
}(_react2.default.Component);

TabBar.displayName = 'TabBar';
TabBar.propTypes = {
  className: _react2.default.PropTypes.string,
  activeIndex: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  iconHeight: _react2.default.PropTypes.number,
  cIconHeight: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  tabBarStyle: _react2.default.PropTypes.object,
  menuFlat: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.any,
  items: _react2.default.PropTypes.array,
  theme: _react2.default.PropTypes.string
};
TabBar.defaultProps = {
  className: '',
  activeIndex: 0,
  height: 50,
  iconHeight: 24,
  cIconHeight: 50,
  onChange: function onChange() {},
  tabBarStyle: {}
};


TabBar.Item = _TabBarItem.TabBarItem;
TabBar.Item2 = _TabBarItem.TabBarItemCenter;

exports.default = TabBar;
module.exports = exports['default'];