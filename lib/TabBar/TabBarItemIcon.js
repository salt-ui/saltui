'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isUrl = function isUrl(str) {
  return (/((\/\/)|^\.{0,2}\/|(^data:image)).+/g.test(str)
  );
};
var isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var TabBarItemIcon = function (_React$Component) {
  _inherits(TabBarItemIcon, _React$Component);

  function TabBarItemIcon() {
    _classCallCheck(this, TabBarItemIcon);

    return _possibleConstructorReturn(this, (TabBarItemIcon.__proto__ || Object.getPrototypeOf(TabBarItemIcon)).apply(this, arguments));
  }

  _createClass(TabBarItemIcon, [{
    key: 'getIcon',
    value: function getIcon() {
      var icon = this.props.icon;

      return isArray(icon) ? icon[0] : icon;
    }
  }, {
    key: 'getActiveIcon',
    value: function getActiveIcon() {
      var _props = this.props,
          icon = _props.icon,
          activeIcon = _props.activeIcon;

      if (activeIcon) {
        return activeIcon;
      }
      return isArray(icon) ? icon[1] : icon;
    }
  }, {
    key: 'renderImgIcon',
    value: function renderImgIcon(icon, title, style) {
      var className = void 0;
      if (this.props.type === 'more') {
        className = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-img-icon'), _Context2.default.prefixClass('tabs-bar-item-img-more-icon'));
      } else {
        className = _Context2.default.prefixClass('tabs-bar-img-icon');
      }
      return _react2.default.createElement('img', {
        className: className,
        style: style,
        src: icon,
        alt: title,
        width: this.props.iconHeight,
        height: this.props.iconHeight
      });
    }
  }, {
    key: 'renderTingleIcon',
    value: function renderTingleIcon(icon) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var className = void 0;
      if (this.props.type === 'more') {
        className = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-tingle-icon'), _Context2.default.prefixClass('tabs-bar-item-more-tingle-icon'));
      } else if (this.props.type === 'center') {
        className = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-tingle-icon'), _Context2.default.prefixClass('tabs-bar-item-center-tingle-icon'));
      } else {
        className = _Context2.default.prefixClass('tabs-bar-item-tingle-icon');
      }
      if (_react2.default.isValidElement(icon)) {
        return _react2.default.cloneElement(icon, {
          width: this.props.iconHeight, height: this.props.iconHeight, className: className, style: style
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var iconElem = void 0;
      var className = void 0;
      var _props2 = this.props,
          active = _props2.active,
          title = _props2.title,
          iconStyle = _props2.iconStyle,
          activeIconStyle = _props2.activeIconStyle;

      var currentIconStyle = (0, _objectAssign2.default)({}, iconStyle, active ? activeIconStyle : {});
      var currentIcon = active ? this.getActiveIcon() : this.getIcon();
      if (!currentIcon) {
        return null;
      }
      if (isUrl(currentIcon)) {
        iconElem = this.renderImgIcon(currentIcon, title, currentIconStyle);
      } else if (_react2.default.isValidElement(currentIcon)) {
        // TODO, DRY the code
        var IconClassName = void 0;
        if (this.props.type === 'more') {
          IconClassName = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-tingle-icon'), _Context2.default.prefixClass('tabs-bar-item-more-tingle-icon'));
        } else if (this.props.type === 'center') {
          IconClassName = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-tingle-icon'), _Context2.default.prefixClass('tabs-bar-item-center-tingle-icon'));
        } else {
          IconClassName = _Context2.default.prefixClass('tabs-bar-item-tingle-icon');
        }
        // icon 支持react element
        iconElem = _react2.default.cloneElement(currentIcon, {
          className: (0, _classnames2.default)(IconClassName, currentIcon.props.className),
          style: currentIconStyle,
          width: this.props.iconHeight,
          height: this.props.iconHeight
        });
      } else {
        iconElem = this.renderTingleIcon(currentIcon, currentIconStyle);
      }

      if (this.props.type === 'more') {
        className = (0, _classnames2.default)(_Context2.default.prefixClass('tabs-bar-item-icon'), _Context2.default.prefixClass('tabs-bar-item-more-icon'));
      } else {
        className = _Context2.default.prefixClass('tabs-bar-item-icon');
      }
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, this.props.className) },
        iconElem
      );
    }
  }]);

  return TabBarItemIcon;
}(_react2.default.Component);

TabBarItemIcon.displayName = 'TabBarItemIcon';
TabBarItemIcon.propTypes = {
  active: _react2.default.PropTypes.bool,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array, _react2.default.PropTypes.element]),
  activeIcon: _react2.default.PropTypes.string,
  iconStyle: _react2.default.PropTypes.object,
  activeIconStyle: _react2.default.PropTypes.object,
  type: _react2.default.PropTypes.string,
  iconHeight: _react2.default.PropTypes.number,
  title: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};
exports.default = TabBarItemIcon;
module.exports = exports['default'];