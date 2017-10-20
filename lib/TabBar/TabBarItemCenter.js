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

var _Layer = require('../Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _TabBarItemIcon = require('./TabBarItemIcon');

var _TabBarItemIcon2 = _interopRequireDefault(_TabBarItemIcon);

var _TabBarItemMore = require('./TabBarItemMore');

var _TabBarItemMore2 = _interopRequireDefault(_TabBarItemMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Center Item of Tab Bar, be center of Tab Bar
*/
var TabBarItemCenter = function (_React$Component) {
  _inherits(TabBarItemCenter, _React$Component);

  function TabBarItemCenter() {
    _classCallCheck(this, TabBarItemCenter);

    return _possibleConstructorReturn(this, (TabBarItemCenter.__proto__ || Object.getPrototypeOf(TabBarItemCenter)).apply(this, arguments));
  }

  _createClass(TabBarItemCenter, [{
    key: 'hideMoreItems',
    value: function hideMoreItems(e) {
      e.stopPropagation();
      this.props.onMoreVisibleChange(false);
    }
  }, {
    key: 'toggleMoreItems',
    value: function toggleMoreItems(e) {
      e.stopPropagation();
      this.props.onMoreVisibleChange(!this.props.moreVisible);
    }
  }, {
    key: 'doClick',
    value: function doClick() {
      this.props.onClick(this.props.index, this.props.path);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var active = t.props.active;
      var item = t.props.item ? t.props.item : t;
      var clickCB = void 0;
      if (item.props.items.length > 0) {
        clickCB = function clickCB(e) {
          t.toggleMoreItems(e);
        };
      } else {
        clickCB = function clickCB(e) {
          t.doClick(e);
        };
      }
      return _react2.default.createElement(
        _Boxs.Box,
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('tabs-bar-item'), {
            active: active
          }),
          onClick: clickCB,
          flex: 1
        },
        _react2.default.createElement(_TabBarItemIcon2.default, _extends({}, item.props, {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('tabs-bar-item-icon-more-center'), _defineProperty({}, _Context2.default.prefixClass('tabs-bar-item-icon-more-center__more-visible'), this.props.moreVisible)),
          active: active,
          iconHeight: t.props.iconHeight
        })),
        _react2.default.createElement(
          _rcAnimate2.default,
          { showProp: 'visible', transitionName: _Context2.default.prefixClass('tabs-bar-item-fade'), transitionAppear: true, component: '' },
          _react2.default.createElement(
            _Layer2.default,
            {
              key: 'fade',
              className: (0, _classnames3.default)(_Context2.default.prefixClass('tabs-bar-item-more-container')),
              visible: this.props.moreVisible,
              bottom: '0',
              hasMask: false,
              renderToBody: false
            },
            _react2.default.createElement(
              _Boxs.HBox,
              { className: _Context2.default.prefixClass('tabs-bar-item-more-container-inner') },
              item.props.items.map(function (it, idx) {
                return _react2.default.createElement(_TabBarItemMore2.default, _extends({
                  key: idx.toString(),
                  index: t.props.index - idx
                }, it, {
                  iconHeight: t.props.childIconHeight,
                  onClick: t.props.onClick,
                  hideMoreItems: function hideMoreItems(e) {
                    t.hideMoreItems(e);
                  },
                  type: 'more'
                }));
              })
            )
          )
        )
      );
    }
  }]);

  return TabBarItemCenter;
}(_react2.default.Component);

TabBarItemCenter.displayName = 'TabBarItemCenter';
TabBarItemCenter.propTypes = {
  onClick: _react2.default.PropTypes.func,
  onMoreVisibleChange: _react2.default.PropTypes.func,
  path: _react2.default.PropTypes.string,
  index: _react2.default.PropTypes.number,
  moreVisible: _react2.default.PropTypes.bool
};
TabBarItemCenter.defaultProps = {
  onMoreVisibleChange: function onMoreVisibleChange() {}
};
exports.default = TabBarItemCenter;
module.exports = exports['default'];