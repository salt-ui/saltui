'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Badge = require('../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _TabBarItemIcon = require('./TabBarItemIcon');

var _TabBarItemIcon2 = _interopRequireDefault(_TabBarItemIcon);

var _TabBarItemTitle = require('./TabBarItemTitle');

var _TabBarItemTitle2 = _interopRequireDefault(_TabBarItemTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBarItemBadge = function (_React$Component) {
  _inherits(TabBarItemBadge, _React$Component);

  function TabBarItemBadge() {
    _classCallCheck(this, TabBarItemBadge);

    return _possibleConstructorReturn(this, (TabBarItemBadge.__proto__ || Object.getPrototypeOf(TabBarItemBadge)).apply(this, arguments));
  }

  _createClass(TabBarItemBadge, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          badge = _props.badge,
          badgeStyle = _props.badgeStyle,
          iconHeight = _props.iconHeight,
          active = _props.active,
          showTitle = _props.showTitle;

      var contentBadge = [];
      if (badge && typeof badge === 'number') {
        contentBadge.push(_react2.default.createElement(
          _Badge2.default,
          { key: 'badge_number', count: badge, style: badgeStyle },
          _react2.default.createElement(_TabBarItemIcon2.default, _extends({}, this.props, { iconHeight: iconHeight, active: active })),
          showTitle ? _react2.default.createElement(_TabBarItemTitle2.default, _extends({}, this.props, { active: active })) : null
        ));
      } else if (badge && typeof badge === 'string') {
        contentBadge.push(_react2.default.createElement(
          _Badge2.default,
          { key: 'badge_string', text: badge, style: badgeStyle },
          _react2.default.createElement(_TabBarItemIcon2.default, _extends({}, this.props, { iconHeight: iconHeight, active: active })),
          showTitle ? _react2.default.createElement(_TabBarItemTitle2.default, _extends({}, this.props, { active: active })) : null
        ));
      } else if (badge && badge.constructor === Object) {
        contentBadge.push(_react2.default.createElement(
          _Badge2.default,
          _extends({}, badge, { key: 'badge_object', style: badgeStyle }),
          _react2.default.createElement(_TabBarItemIcon2.default, _extends({}, this.props, { iconHeight: iconHeight, active: active })),
          showTitle ? _react2.default.createElement(_TabBarItemTitle2.default, _extends({}, this.props, { active: active })) : null
        ));
      } else {
        contentBadge.push(_react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_TabBarItemIcon2.default, _extends({}, this.props, { iconHeight: iconHeight, active: active })),
          showTitle ? _react2.default.createElement(_TabBarItemTitle2.default, _extends({}, this.props, { active: active })) : null
        ));
      }
      return _react2.default.createElement(
        'div',
        null,
        contentBadge
      );
    }
  }]);

  return TabBarItemBadge;
}(_react2.default.Component);

TabBarItemBadge.displayName = 'TabBarItemBadge';
TabBarItemBadge.propTypes = {
  badge: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number, _react2.default.PropTypes.string, _react2.default.PropTypes.object]),
  badgeStyle: _react2.default.PropTypes.object,
  iconHeight: _react2.default.PropTypes.number,
  active: _react2.default.PropTypes.bool,
  showTitle: _react2.default.PropTypes.bool
};
TabBarItemBadge.defaultProps = {
  showTitle: true
};
exports.default = TabBarItemBadge;
module.exports = exports['default'];