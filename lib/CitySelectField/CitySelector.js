'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Layer = require('../Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CitySelectField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingnan.yqn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var containerClassName = (0, _Context.prefixClass)('city-selector FBV');
var topBarClassName = (0, _Context.prefixClass)('city-selector-top-bar FBH');
var topBarTextActiveClassName = (0, _Context.prefixClass)('city-selector-top-text-active');
var tabClassName = (0, _Context.prefixClass)('city-selector-tab-bar FBH');
var selectPaneClassName = (0, _Context.prefixClass)('city-selector-pane city-selector-pane-anime');
var selectItemClassName = (0, _Context.prefixClass)('city-selector-item omit');
var selectedItemClassName = (0, _Context.prefixClass)('city-selector-item-active omit');
var tabActiveClassName = (0, _Context.prefixClass)('city-selector-tab-active omit');
var tabNormalClassName = (0, _Context.prefixClass)('city-selector-tab-item');
var topBarLabelClassName = (0, _Context.prefixClass)('city-selector-top-bar-label');

var REQUIRED_LENGTH = {
  default: 3,
  city: 2,
  province: 1
};

var CitySelector = function (_Component) {
  _inherits(CitySelector, _Component);

  function CitySelector(props) {
    _classCallCheck(this, CitySelector);

    // 存储用于渲染动画的省市区三个面板
    var _this = _possibleConstructorReturn(this, (CitySelector.__proto__ || Object.getPrototypeOf(CitySelector)).call(this, props));

    _this.selectionPanes = [];
    _this.state = {
      // 当前选中的值
      value: _this.props.value,
      isValueValid: (_this.props.value || []).length === REQUIRED_LENGTH[_this.props.selectorType],
      // 0: 选择省
      // 1: 选择市
      // 2: 选择区
      currentPanePosition: 0,
      currentSelectedItem: null
    };
    return _this;
  }

  _createClass(CitySelector, [{
    key: 'confirm',
    value: function confirm() {
      this.props.onSelect(this.state.value);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.props.onCancel();
    }
  }, {
    key: 'selectTab',
    value: function selectTab(position) {
      var dataCursor = position - 1 <= 0 ? 0 : position - 1;
      // 不可在无父节点的情况下，选择子节点的值
      if (!this.state.value[dataCursor]) return;
      this.setState({
        isValueValid: this.state.value.length === REQUIRED_LENGTH[this.props.selectorType],
        currentPanePosition: position
      });
    }
  }, {
    key: 'selectItem',
    value: function selectItem(listItem) {
      var _state = this.state,
          value = _state.value,
          currentPanePosition = _state.currentPanePosition;

      var newPosition = currentPanePosition;

      // 部分省市是直辖市，没有第三项目
      if (listItem.children) {
        newPosition += 1;
      }
      value[currentPanePosition] = listItem.value;
      this.setState({
        value: value.slice(0, currentPanePosition + 1),
        isValueValid: currentPanePosition + 1 === REQUIRED_LENGTH[this.props.selectorType],
        currentPanePosition: newPosition > 2 ? 2 : newPosition,
        currentSelectedItem: listItem
      });
    }
  }, {
    key: 'renderDistrictTab',
    value: function renderDistrictTab() {
      var _this2 = this;

      var _props = this.props,
          provinceText = _props.provinceText,
          cityText = _props.cityText,
          districtText = _props.districtText,
          districtData = _props.districtData;
      var _state2 = this.state,
          value = _state2.value,
          currentSelectedItem = _state2.currentSelectedItem,
          currentPanePosition = _state2.currentPanePosition;

      var gapStyle = { marginLeft: '30px', padding: '0 10px' };
      var districts = (0, _utils.findDistrictObjs)(districtData, value);
      var districtPanes = [{ name: districts[0] && districts[0].label || provinceText }, { name: districts[1] && districts[1].label || cityText, style: gapStyle }, { name: districts[2] && districts[2].label || districtText, style: gapStyle }];

      // 高亮当前面板
      districtPanes[currentPanePosition].active = true;

      // 保证当前面板的出场顺序正确
      var panes = [];
      if (currentSelectedItem && currentSelectedItem.children) {
        panes = districtPanes.slice(0, value.length + 1);
      } else {
        panes = districtPanes.slice(0, value.length > 0 ? value.length : 1);
      }

      return panes.map(function (pane, key) {
        return _react2.default.createElement(
          'div',
          {
            key: key,
            className: pane.active ? tabActiveClassName : tabNormalClassName,
            style: pane.style,
            onClick: _this2.selectTab.bind(_this2, key)
          },
          pane.name
        );
      });
    }
  }, {
    key: 'renderSelectionPane',
    value: function renderSelectionPane() {
      var _this3 = this;

      var districtData = this.props.districtData;
      var _state3 = this.state,
          value = _state3.value,
          currentPanePosition = _state3.currentPanePosition;

      var list = (0, _utils.findCityList)(districtData, value, currentPanePosition) || [];
      var selectionPanesClassName = (0, _Context.prefixClass)('city-selector-panes');
      var renderList = list.map(function (listItem, key) {
        var classNames = (0, _classnames3.default)(selectItemClassName, _defineProperty({}, selectedItemClassName, listItem.value === value[currentPanePosition]));
        return _react2.default.createElement(
          'div',
          {
            key: key,
            className: classNames,
            onClick: _this3.selectItem.bind(_this3, listItem)
          },
          listItem.label
        );
      });

      // 动画需要，预置三个空白面板
      this.selectionPanes[currentPanePosition] = _react2.default.createElement(
        'div',
        {
          key: currentPanePosition,
          style: { width: window.innerWidth },
          className: selectPaneClassName
        },
        renderList
      );

      // 填补中间未经初始化的数据集为空白的占位符，否则无法凑齐三个面板
      // 从第一个 Tab 跳转到第三个的时候动画会失效
      for (var i = 0; i < this.selectionPanes.length; i += 1) {
        if (!this.selectionPanes[i]) {
          this.selectionPanes[i] = _react2.default.createElement('div', {
            key: 'fill',
            style: { width: window.innerWidth },
            className: selectPaneClassName
          });
        }
      }

      return _react2.default.createElement(
        'div',
        {
          style: {
            width: window.innerWidth * this.selectionPanes.length,
            WebkitTransition: '.3s ease transform',
            transition: '.3s ease transform',
            WebkitTransform: 'translateX(' + -window.innerWidth * currentPanePosition + 'px)',
            transform: 'translateX(' + -window.innerWidth * currentPanePosition + 'px)'
          },
          className: selectionPanesClassName
        },
        this.selectionPanes
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          confirmText = _props2.confirmText,
          cancelText = _props2.cancelText,
          label = _props2.label;

      return _react2.default.createElement(
        _Layer2.default,
        {
          visible: true,
          hasMask: true,
          onMaskClick: this.cancel.bind(this),
          bottom: '0'
        },
        _react2.default.createElement(
          'div',
          { className: containerClassName },
          _react2.default.createElement(
            'div',
            { className: topBarClassName },
            _react2.default.createElement(
              'div',
              { onClick: this.cancel.bind(this) },
              cancelText
            ),
            _react2.default.createElement(
              'div',
              { className: topBarLabelClassName },
              label
            ),
            _react2.default.createElement(
              'div',
              {
                onClick: this.confirm.bind(this),
                className: this.state.isValueValid ? topBarTextActiveClassName : ''
              },
              confirmText
            )
          ),
          _react2.default.createElement(
            'div',
            { className: tabClassName },
            this.renderDistrictTab()
          ),
          this.renderSelectionPane()
        )
      );
    }
  }]);

  return CitySelector;
}(_react.Component);

CitySelector.displayName = 'CitySelector';
CitySelector.propTypes = {
  value: _react.PropTypes.array,
  districtData: _react.PropTypes.array,
  label: _react.PropTypes.string,
  selectorType: _react.PropTypes.string,
  provinceText: _react.PropTypes.string,
  cityText: _react.PropTypes.string,
  districtText: _react.PropTypes.string,
  confirmText: _react.PropTypes.string,
  cancelText: _react.PropTypes.string,
  onSelect: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};
CitySelector.defaultProps = {
  enableAnimation: true,
  value: [],
  confirmText: '完成',
  cancelText: '取消',
  provinceText: '省/自治区/直辖市',
  cityText: '市',
  districtText: '县区'
};
exports.default = CitySelector;
module.exports = exports['default'];