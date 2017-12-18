'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _rcTabs = require('rc-tabs');

var _rcTabs2 = _interopRequireDefault(_rcTabs);

var _SwipeableTabContent = require('rc-tabs/lib/SwipeableTabContent');

var _SwipeableTabContent2 = _interopRequireDefault(_SwipeableTabContent);

var _TabContent = require('rc-tabs/lib/TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _InkTabBar = require('rc-tabs/lib/InkTabBar');

var _InkTabBar2 = _interopRequireDefault(_InkTabBar);

var _SwipeableInkTabBar = require('rc-tabs/lib/SwipeableInkTabBar');

var _SwipeableInkTabBar2 = _interopRequireDefault(_SwipeableInkTabBar);

var _DirectionBottom = require('salt-icon/lib/DirectionBottom');

var _DirectionBottom2 = _interopRequireDefault(_DirectionBottom);

var _DirectionTop = require('salt-icon/lib/DirectionTop');

var _DirectionTop2 = _interopRequireDefault(_DirectionTop);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefixClass = _Context2.default.prefixClass;


var getActiveKey = function getActiveKey(props) {
  if (props.active !== undefined) {
    console.warn('props.active is deprecated, use props.activeKey instead');
    return props.active;
  }
  return props.activeKey;
};

// https://github.com/hammerjs/hammer.js/issues/1050
// a hack bug fix for chrome 55, side effect may be involved.
var isChromeLargerThan55 = function isChromeLargerThan55() {
  if (typeof navigator !== 'undefined') {
    var match = navigator.userAgent.match(/Chrome\/(\d\d)/);
    if (match instanceof Array) {
      var chromeVer = match[1] || 0;
      return parseInt(chromeVer, 10) >= 55;
    }
    return false;
  }
  return false;
};

// https://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes
// in some case(maybe iOS 11 & dingtalk 4.2 ?),
// table content cannot be shown if repaint is not called

var forceRepaint = function forceRepaint(node) {
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-unused-expressions */
  node.style.display = 'none';
  node.offsetHeight; // no need to store this anywhere, the reference is enough
  node.style.display = '';
  /* eslint-enable no-unused-expressions */
  /* eslint-enable no-param-reassign */
};

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _this.renderTabContent = function () {
      var _this$props = _this.props,
          animated = _this$props.animated,
          swipeable = _this$props.swipeable,
          hammerOptions = _this$props.hammerOptions;

      return swipeable ? _react2.default.createElement(_SwipeableTabContent2.default, { animated: animated, hammerOptions: hammerOptions }) : _react2.default.createElement(_TabContent2.default, { animated: animated });
    };

    _this.renderTabBar = function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          animated = _this$props2.animated,
          speed = _this$props2.speed,
          pageSize = _this$props2.pageSize,
          tabBarhammerOptions = _this$props2.tabBarhammerOptions,
          onTabClick = _this$props2.onTabClick;

      if (children.length > pageSize) {
        return _react2.default.createElement(_SwipeableInkTabBar2.default, {
          onTabClick: function onTabClick() {},
          speed: speed,
          pageSize: pageSize,
          hammerOptions: tabBarhammerOptions,
          styles: {
            inkBar: {
              width: _this.props.inkBarWidth
            }
          }
        });
      }
      return _react2.default.createElement(_InkTabBar2.default, {
        inkBarAnimated: animated,
        onTabClick: onTabClick,
        styles: {
          inkBar: {
            width: _this.props.inkBarWidth
          }
        }
      });
    };

    _this.state = {
      activeKey: getActiveKey(props)
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.root) {
        forceRepaint(this.root);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.active !== this.props.active || nextProps.activeKey !== this.props.activeKey) {
        this.setState({
          activeKey: getActiveKey(nextProps)
        });
      }
    }
  }, {
    key: 'doChange',
    value: function doChange(activeKey, data) {
      var _this2 = this;

      var preActive = this.state.activeKey;

      this.setState({
        activeKey: activeKey
      }, function () {
        _this2.props.onChange({
          active: activeKey,
          activeKey: activeKey,
          preActive: preActive,
          preActiveKey: preActive,
          data: data
        });
      });
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(key, data) {
      if ('' + key === '' + this.state.activeKey) {
        return;
      }

      this.toggleAll(true);
      this.doChange('' + key, data);
    }
  }, {
    key: 'handleTabChange',
    value: function handleTabChange(key) {
      var active = '' + key;
      var tabItem = void 0;
      for (var i = 0; i < this.tabs.length; i++) {
        var item = this.tabs[i];
        if ('' + item.key === active) {
          tabItem = item;
          break;
        }
      }
      if (tabItem) {
        this.doChange(active, tabItem.data);
      }
    }
  }, {
    key: 'toggleAll',
    value: function toggleAll(prompt) {
      var tabHeight = 42;
      var allTabsHeight = this.allTabs.offsetHeight;
      var classList = this.root.classList;

      var arrow = this.arrowBtnWrap.querySelector('.arrow-icon');
      this.arrowRotate = this.arrowRotate || 0;
      this.arrowRotate += 180;
      arrow.style.transform = 'rotate(' + this.arrowRotate + 'deg)';

      if (classList.contains('show-all-layer')) {
        this.root.style.minHeight = '';
        if (prompt) {
          classList.remove('show-all-layer');
        } else {
          classList.add('show-all-title');
          classList.remove('show-all-layer');
          setTimeout(function () {
            classList.remove('show-all-title');
          }, 250);
        }
      } else {
        this.root.style.minHeight = allTabsHeight + tabHeight + 10 + 'px';
        classList.add('show-all-layer');
      }
    }
  }, {
    key: 'renderAllBtn',
    value: function renderAllBtn(fix) {
      var _this3 = this;

      var bottom = fix === 'fix-bottom';
      var BottomIcon = bottom ? _DirectionTop2.default : _DirectionBottom2.default;

      return _react2.default.createElement(
        'div',
        { className: prefixClass('tab-all-wrap') },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref) {
              _this3.allTitle = _ref;
            },
            className: prefixClass('tab-all-title PA')
          },
          _react2.default.createElement(
            'span',
            null,
            '\u5168\u90E8\u7C7B\u76EE'
          )
        ),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref2) {
              _this3.arrowBtnWrap = _ref2;
            },
            className: prefixClass('tab-all PA FBH FBAC FBJC'),
            onClick: function onClick() {
              _this3.toggleAll();
            }
          },
          _react2.default.createElement(BottomIcon, { className: 'arrow-icon', width: 16, height: 16 })
        ),
        _react2.default.createElement('div', { className: prefixClass('tab-all PA tab-curve-shadow') }),
        _react2.default.createElement(
          'div',
          { className: prefixClass('tab-popup-container PA') },
          _react2.default.createElement(
            'ul',
            {
              ref: function ref(_ref3) {
                _this3.allTabs = _ref3;
              },
              className: prefixClass('tab-all-body FBH')
            },
            this.tabs.map(function (item, i) {
              var _classnames;

              return _react2.default.createElement(
                'li',
                {
                  key: 'tab-item-' + i,
                  onClick: function onClick(e) {
                    _this3.handleItemClick(item.key, item.datas, e);
                  },
                  className: (0, _classnames4.default)(prefixClass('tab-all-item'), (_classnames = {}, _defineProperty(_classnames, prefixClass('tab-all-item__disabled'), '' + item.key === '' + _this3.state.activeKey), _defineProperty(_classnames, prefixClass('tab-all-item-row-last'), i % 3 == 2), _classnames))
                },
                item.title
              );
            })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this,
          _classnames2;

      var children = this.props.children;

      var shouldFixBug = isChromeLargerThan55();
      var clonedChildren = [];
      var fix = '';
      if (this.props.fixedTop) {
        fix = 'fix-top';
      } else if (this.props.fixedBottom) {
        fix = 'fix-bottom';
      }

      this.tabs = [];
      _react2.default.Children.forEach(children, function (child, index) {
        _this4.tabs.push({
          title: child.props.title,
          key: child.key || index,
          data: child.props.data
        });
        clonedChildren.push(_react2.default.cloneElement(child, {
          tab: child.props.title,
          key: child.key || index
        }));
      });

      var showAllBtn = this.props.showExpandAll && this.tabs.length > this.props.pageSize;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref4) {
            _this4.root = _ref4;
          },
          className: (0, _classnames4.default)(prefixClass('tab-wrap PR ' + fix), (_classnames2 = {}, _defineProperty(_classnames2, prefixClass('tab-pan-bugfix'), shouldFixBug), _defineProperty(_classnames2, 'show-all-btn', showAllBtn), _classnames2))
        },
        _react2.default.createElement(
          _rcTabs2.default,
          _extends({}, this.props, {
            renderTabBar: this.renderTabBar,
            renderTabContent: this.renderTabContent,
            activeKey: this.state.activeKey,
            onChange: function onChange(key) {
              _this4.handleTabChange(key);
            }
          }),
          clonedChildren
        ),
        showAllBtn ? this.renderAllBtn(fix) : null
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.TabPane = _rcTabs.TabPane;
Tabs.Item = _rcTabs.TabPane;
Tabs.propTypes = {
  activeKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  active: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  defaultActive: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  showExpandAll: _react.PropTypes.bool,
  fixedTop: _react.PropTypes.bool,
  fixedBottom: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  onTabClick: _react.PropTypes.func,
  tabBarPosition: _react.PropTypes.oneOf(['top', 'bottom']),
  animated: _react.PropTypes.bool,
  swipeable: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  prefixCls: _react.PropTypes.string,
  destroyInactiveTabPane: _react.PropTypes.bool,
  pageSize: _react.PropTypes.number,
  speed: _react.PropTypes.number,
  tabBarhammerOptions: _react.PropTypes.any,
  hammerOptions: _react.PropTypes.any,
  inkBarWidth: _react.PropTypes.number
};
Tabs.defaultProps = {
  prefixCls: 't-tab',
  activeKey: '0',
  animated: true,
  swipeable: false,
  showExpandAll: true,
  fixedTop: false,
  fixedBottom: false,
  tabBarPosition: 'top',
  hammerOptions: {},
  tabBarhammerOptions: {},
  pageSize: 5,
  speed: 8,
  inkBarWidth: 20,
  onChange: function onChange() {},
  onTabClick: function onTabClick() {}
};
exports.default = Tabs;
module.exports = exports['default'];