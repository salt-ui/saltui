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

var _Boxs = require('../Boxs');

var _TabBarItemBadge = require('./TabBarItemBadge');

var _TabBarItemBadge2 = _interopRequireDefault(_TabBarItemBadge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* more Items of Tab Bar,  on the Mask Layer
*/

var TabBarItemMore = function (_React$Component) {
  _inherits(TabBarItemMore, _React$Component);

  function TabBarItemMore(props) {
    _classCallCheck(this, TabBarItemMore);

    var _this = _possibleConstructorReturn(this, (TabBarItemMore.__proto__ || Object.getPrototypeOf(TabBarItemMore)).call(this, props));

    _this.doClick = _this.doClick.bind(_this);
    return _this;
  }

  _createClass(TabBarItemMore, [{
    key: 'doClick',
    value: function doClick(e) {
      e.stopPropagation();
      this.props.onClick(this.props.index, this.props.path);
      this.props.hideMoreItems(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props = t.props,
          active = _t$props.active,
          iconHeight = _t$props.iconHeight;

      return _react2.default.createElement(
        _Boxs.Box,
        {
          className: (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item'), _Context2.default.prefixClass('tabs-bar-item-more'), {
            active: active
          }),
          onClick: this.doClick,
          flex: 1
        },
        _react2.default.createElement(_TabBarItemBadge2.default, _extends({}, t.props, { iconHeight: iconHeight, active: active, showTitle: false }))
      );
    }
  }]);

  return TabBarItemMore;
}(_react2.default.Component);

TabBarItemMore.displayName = 'TabBarItemMore';
TabBarItemMore.propTypes = {
  onClick: _react2.default.PropTypes.func,
  key: _react2.default.PropTypes.string,
  path: _react2.default.PropTypes.string,
  hideMoreItems: _react2.default.PropTypes.func,
  index: _react2.default.PropTypes.number
};
exports.default = TabBarItemMore;
module.exports = exports['default'];