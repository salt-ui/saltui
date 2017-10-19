'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 级联 Slot
 * @author: changming <mailto:changming.zy@alibaba-inc.com>
 */
var React = require('react');
var Layer = require('../Layer');
var TingleCtx = require('../Context');
var Tab = require('../Tab');
var Scroller = require('../Scroller');
var classnames = require('classnames');
var IconCheck = require('salt-icon/lib/Check');
var i18n = require('./i18n');

var getOptionsByValue = function getOptionsByValue(options) {
  var valueItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var backArr = options.filter(function (item) {
    return item.value === valueItem.value;
  });
  if (backArr.length) {
    return backArr[0].children;
  }
  return [];
};

var CascadeSlot = function (_React$Component) {
  _inherits(CascadeSlot, _React$Component);

  function CascadeSlot(props) {
    _classCallCheck(this, CascadeSlot);

    var _this = _possibleConstructorReturn(this, (CascadeSlot.__proto__ || Object.getPrototypeOf(CascadeSlot)).call(this, props));

    _this.state = {
      value: props.value && props.value.length ? props.value : [{}], // 数据结构：[{ text, value }]
      activeTab: 'tab-1'
    };
    return _this;
  }

  _createClass(CascadeSlot, [{
    key: 'onItemClick',
    value: function onItemClick() {
      var _this2 = this;

      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var selectedValue = arguments[1];

      var value = this.state.value;
      value = value.slice(0, level);
      value[level] = {
        value: selectedValue.value,
        text: selectedValue.label
      };

      var activeTab = this.state.activeTab;

      if (selectedValue.children && selectedValue.children.length) {
        value[level + 1] = {};
        activeTab = 'tab-' + (level + 2);
      }

      this.setState({ value: value, activeTab: activeTab }, function () {
        _this2.handleEvent('change');
      });
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(eventName, e) {
      if (e) {
        e.preventDefault();
      }
      switch (eventName) {
        case 'change':
          this.props.onChange(this.state.value);
          break;
        case 'cancel':
          this.setState({
            value: this.props.value,
            activeTab: 'tab-1'
          });
          this.props.onCancel(this.state.value);
          break;
        case 'confirm':
          this.props.onConfirm(this.state.value);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _props = this.props,
          title = _props.title,
          locale = _props.locale;
      var value = this.state.value;
      var _props2 = this.props,
          confirmText = _props2.confirmText,
          cancelText = _props2.cancelText;

      if (!confirmText) {
        confirmText = i18n[locale].confirmText;
      }
      if (!cancelText) {
        cancelText = i18n[locale].cancelText;
      }
      var confirmEnabled = value && value.length && value[value.length - 1].value !== undefined;
      return React.createElement(
        'div',
        { className: TingleCtx.prefixClass('cascade-slot-header-wrap FBH') },
        React.createElement(
          'button',
          { onClick: this.handleEvent.bind(this, 'cancel') },
          cancelText
        ),
        React.createElement(
          'h1',
          { className: TingleCtx.prefixClass('FB1') },
          title
        ),
        React.createElement(
          'button',
          { disabled: !confirmEnabled, onClick: this.handleEvent.bind(this, 'confirm') },
          confirmText
        )
      );
    }
  }, {
    key: 'renderBody',
    value: function renderBody() {
      var _this3 = this;

      var options = this.props.options;
      var value = this.state.value;

      var textPleaseSelect = i18n[this.props.locale].pleaseSelect;
      var loopOptions = void 0;
      return React.createElement(
        'div',
        { className: TingleCtx.prefixClass('cascade-slot-body-wrap') },
        React.createElement(
          Tab,
          { activeKey: this.state.activeTab, swipeable: false, speed: 1 },
          value.map(function (val, index) {
            if (index === 0) {
              loopOptions = options;
            } else {
              loopOptions = getOptionsByValue(loopOptions, value[index - 1]);
            }
            return React.createElement(
              Tab.Item,
              { key: 'tab-' + (index + 1), title: React.createElement(
                  'div',
                  { className: 'title' },
                  val.text || textPleaseSelect
                ) },
              React.createElement(
                Scroller,
                null,
                React.createElement(
                  'ul',
                  { className: TingleCtx.prefixClass('cascade-slot-list') },
                  loopOptions.map(function (level, levelIndex) {
                    return React.createElement(
                      'li',
                      { key: level.value },
                      React.createElement(
                        'button',
                        {
                          className: classnames({ active: _this3.state.value[index].value === level.value }),
                          onClick: _this3.onItemClick.bind(_this3, index, level, levelIndex)
                        },
                        React.createElement(
                          'span',
                          { className: 'text' },
                          level.label
                        ),
                        ' ',
                        _this3.state.value[index].value === level.value ? React.createElement(IconCheck, { width: 16, height: 16 }) : null
                      )
                    );
                  })
                )
              )
            );
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var visible = this.props.visible;

      return React.createElement(
        'div',
        null,
        this.renderHeader(),
        this.renderBody()
      );
    }
  }]);

  return CascadeSlot;
}(React.Component);

exports.default = CascadeSlot;


CascadeSlot.defaultProps = {
  visible: false,
  options: [],
  value: [],
  locale: 'zh-cn',
  title: '',
  onChange: function onChange() {},
  onCancel: function onCancel() {},
  onConfirm: function onConfirm() {},

  confirmText: i18n['zh-cn'].confirmText,
  cancelText: i18n['zh-cn'].cancelText
};

CascadeSlot.propTypes = {
  visible: React.PropTypes.bool,
  title: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.array,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onChange: React.PropTypes.func,
  locale: React.PropTypes.string
};
module.exports = exports['default'];