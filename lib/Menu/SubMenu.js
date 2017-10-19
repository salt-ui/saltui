'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _DirectionBottom = require('salt-icon/lib/DirectionBottom');

var _DirectionBottom2 = _interopRequireDefault(_DirectionBottom);

var _Check = require('salt-icon/lib/Check');

var _Check2 = _interopRequireDefault(_Check);

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


var Submenu = function (_Component) {
  _inherits(Submenu, _Component);

  function Submenu(props) {
    _classCallCheck(this, Submenu);

    var _this = _possibleConstructorReturn(this, (Submenu.__proto__ || Object.getPrototypeOf(Submenu)).call(this, props));

    _this.state = {
      expand: props.openKeys.indexOf(props.value) > -1 || false
    };

    _this.onClickdMenu = _this.onClickdMenu.bind(_this);
    return _this;
  }

  /*
   * 点击子菜单的回调
   */


  _createClass(Submenu, [{
    key: 'onClickdMenu',
    value: function onClickdMenu(e) {
      e.stopPropagation();
      var _props = this.props,
          childrenLen = _props.childrenLen,
          pos = _props.pos,
          disabled = _props.disabled,
          renderedData = _props.renderedData,
          selectedKeys = _props.selectedKeys,
          multiple = _props.multiple,
          onSelect = _props.onSelect,
          value = _props.value,
          onDeselect = _props.onDeselect,
          onClick = _props.onClick;

      if (disabled) {
        return;
      }
      var expand = this.state.expand;

      if (childrenLen > 0) {
        this.setState({
          expand: !expand
        });
      } else {
        var key = value;
        var selectedKeysBak = selectedKeys.slice();
        var keyPath = [];
        var selectIndex = selectedKeys.indexOf(key);
        (0, _utils.getParentPos)(pos, function (index) {
          keyPath.unshift(renderedData[index].key);
        });

        if (multiple) {
          if (selectIndex === -1) {
            selectedKeysBak.push(key);
            onSelect({ item: this, key: key, selectedKeys: selectedKeysBak });
          } else {
            selectedKeysBak.splice(selectIndex, 1);
            onDeselect({ item: this, key: key, selectedKeys: selectedKeysBak });
          }
        } else if (selectIndex === -1) {
          selectedKeysBak = (0, _utils.toArray)(key);
          onSelect({ item: this, key: key, selectedKeys: selectedKeysBak });
        }

        onClick({ key: key, keyPath: keyPath, item: this, domEvent: e });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _iconCls, _selectIconCls, _itemCls;

      var _props2 = this.props,
          children = _props2.children,
          childrenLen = _props2.childrenLen,
          prefixCls = _props2.prefixCls,
          title = _props2.title,
          level = _props2.level,
          disabled = _props2.disabled,
          isLastLeft = _props2.isLastLeft,
          value = _props2.value,
          selectedKeys = _props2.selectedKeys;
      var expand = this.state.expand;

      var subMenuPrefixCls = prefixCls + '-submenu';

      var liCls = _defineProperty({}, subMenuPrefixCls, true);

      var iconCls = (_iconCls = {}, _defineProperty(_iconCls, subMenuPrefixCls + '-icon', true), _defineProperty(_iconCls, subMenuPrefixCls + '-icon-expand', expand), _iconCls);

      var selectIconCls = (_selectIconCls = {}, _defineProperty(_selectIconCls, subMenuPrefixCls + '-icon', true), _defineProperty(_selectIconCls, subMenuPrefixCls + '-icon-selected', childrenLen < 1 && selectedKeys.indexOf(value) > -1), _selectIconCls);

      var itemCls = (_itemCls = {}, _defineProperty(_itemCls, subMenuPrefixCls + '-unit', true), _defineProperty(_itemCls, subMenuPrefixCls + '-unit-sub', level > 1), _defineProperty(_itemCls, subMenuPrefixCls + '-unit-disabled', disabled), _defineProperty(_itemCls, subMenuPrefixCls + '-unit-selected', selectedKeys.indexOf(value) > -1), _defineProperty(_itemCls, subMenuPrefixCls + '-unit-superSub', level > 2), _defineProperty(_itemCls, subMenuPrefixCls + '-unit-sub-isLastLeft', isLastLeft && !expand), _itemCls);

      // 偏移量是个比较基础的值，与层级有关
      var offset = 12 * (level - 1);

      // 如果有图标，那么为了文字不覆盖图标，要额外有一些padding
      var hasIcon = childrenLen > 0 || selectedKeys.indexOf(value) > -1;

      var style = {
        marginLeft: offset + 'px',
        paddingRight: 16 + offset + (hasIcon ? 21 : 0) + 'px'
      };

      var renderContent = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: subMenuPrefixCls + '-title', style: style },
          _react2.default.createElement(
            'span',
            { className: subMenuPrefixCls + '-title-inner' },
            title
          )
        ),
        childrenLen > 0 && _react2.default.createElement(_DirectionBottom2.default, {
          className: (0, _classnames2.default)(iconCls),
          width: 18,
          height: 18
        }),
        childrenLen < 1 && selectedKeys.indexOf(value) > -1 && _react2.default.createElement(_Check2.default, {
          className: (0, _classnames2.default)(selectIconCls),
          width: 20,
          height: 20
        }),
        level > 1 && !(isLastLeft && !expand) && _react2.default.createElement('div', {
          style: {
            left: offset + 'px'
          }, className: subMenuPrefixCls + '-line'
        })
      );
      return _react2.default.createElement(
        'li',
        { className: (0, _classnames2.default)(liCls) },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(itemCls), onClick: this.onClickdMenu },
          renderContent
        ),
        childrenLen > 0 && _react2.default.createElement(
          _rcAnimate2.default,
          {
            component: 'ul',
            transitionName: subMenuPrefixCls + '-animate'
          },
          expand ? children : _react2.default.createElement('li', null)
        )
      );
    }
  }]);

  return Submenu;
}(_react.Component);

Submenu.propTypes = {
  children: _react.PropTypes.node,
  childrenLen: _react.PropTypes.number,
  pos: _react.PropTypes.string,
  level: _react.PropTypes.number,
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.node]),
  multiple: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  isLastLeft: _react.PropTypes.bool,
  prefixCls: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  selectedKeys: _react.PropTypes.array,
  openKeys: _react.PropTypes.array,
  renderedData: _react.PropTypes.object,
  onSelect: _react.PropTypes.func,
  onDeselect: _react.PropTypes.func
};

Submenu.defaultProps = {
  target: '_self',
  href: '',
  disabled: false,
  expandPos: []
};

exports.default = Submenu;
module.exports = exports['default'];