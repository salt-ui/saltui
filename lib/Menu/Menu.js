'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _SubMenu = require('./SubMenu');

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Menu Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author wb-cq231719 chenqiu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          selectedKeys = _props.selectedKeys,
          defaultSelectedKeys = _props.defaultSelectedKeys,
          multiple = _props.multiple,
          openKeys = _props.openKeys,
          defaultOpenKeys = _props.defaultOpenKeys,
          onClick = _props.onClick,
          onSelect = _props.onSelect,
          onDeselect = _props.onDeselect,
          className = _props.className;

      var prefixCls = _Context2.default.prefixClass('menu') || 't-menu';
      var renderedData = {};
      var options = [];
      if (this.props.children) {
        options = (0, _utils.loopChildren)(this.props.children, 0, function (item, pos) {
          renderedData[pos] = item;
        });
      }

      var allProps = {
        prefixCls: prefixCls,
        onClick: onClick,
        onSelect: onSelect,
        onDeselect: onDeselect,
        renderedData: renderedData,
        multiple: multiple,
        selectedKeys: 'selectedKeys' in this.props ? (0, _utils.toArray)(selectedKeys) : (0, _utils.toArray)(defaultSelectedKeys),
        openKeys: 'openKeys' in this.props ? (0, _utils.toArray)(openKeys) : (0, _utils.toArray)(defaultOpenKeys)
      };

      var recursive = function recursive(children) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var isLastLeftofPa = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return children.map(function (item, index) {
          var pos = level + '-' + index;
          var childrenLen = item.children && item.children.length || 0;
          var newprops = {
            pos: pos,
            childrenLen: childrenLen,
            value: item.key,
            level: pos.split('-').length - 1
          };
          newprops.isLastLeft = children.length - 1 === index && isLastLeftofPa || newprops.level === 1;

          (0, _objectAssign2.default)(newprops, item);

          delete newprops.children;
          if (childrenLen > 0) {
            return _react2.default.createElement(
              _SubMenu2.default,
              _extends({}, newprops, allProps, { key: item.key }),
              recursive(item.children, pos, newprops.isLastLeft)
            );
          }
          return _react2.default.createElement(_SubMenu2.default, _extends({}, newprops, allProps, { key: item.key }));
        });
      };

      var menuData = recursive(options);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)('' + prefixCls, _defineProperty({}, className, !!className)),
          style: style
        },
        _react2.default.createElement(
          'ul',
          { className: prefixCls + '-content' },
          menuData
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

Menu.MenuItem = _MenuItem2.default;
Menu.displayName = 'Menu';

Menu.defaultProps = {
  defaultSelectedKeys: [],
  onClick: function onClick() {},
  onSelect: function onSelect() {},
  onDeselect: function onDeselect() {},
  multiple: false,
  style: {}
};

Menu.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  selectedKeys: _react.PropTypes.array,
  defaultSelectedKeys: _react.PropTypes.array,
  openKeys: _react.PropTypes.array,
  defaultOpenKeys: _react.PropTypes.array,
  onClick: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  onDeselect: _react.PropTypes.func,
  children: _react.PropTypes.node
};

exports.default = Menu;
module.exports = exports['default'];