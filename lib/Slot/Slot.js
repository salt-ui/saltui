'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Header = require('./tpls/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Pane = require('./tpls/Pane');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Slot Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author caoke.ck
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

var Slot = function (_React$Component) {
  _inherits(Slot, _React$Component);

  function Slot(props) {
    _classCallCheck(this, Slot);

    var _this = _possibleConstructorReturn(this, (Slot.__proto__ || Object.getPrototypeOf(Slot)).call(this, props));

    var t = _this;

    _this.lastChoose = (0, _cloneDeep2.default)(props.value);

    // 初始状态
    t.state = {
      childPaneIsScrolling: false,
      visible: false
    };
    return _this;
  }

  _createClass(Slot, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(this.props.value, nextProps.value)) {
        this.lastChoose = (0, _cloneDeep2.default)(nextProps.value);
      }
    }
  }, {
    key: 'setDefaultLastChoose',
    value: function setDefaultLastChoose(value) {
      if (value && value.length > 0) {
        return value;
      }

      var ret = [];
      this.props.data.forEach(function (item) {
        ret.push(item[0]);
      });

      return ret;
    }
  }, {
    key: 'createPaneContent',
    value: function createPaneContent() {
      var t = this;
      var _t$props = t.props,
          className = _t$props.className,
          title = _t$props.title,
          value = _t$props.value,
          data = _t$props.data,
          scrollMod = _t$props.scrollMod,
          columns = _t$props.columns,
          cancelText = _t$props.cancelText,
          confirmText = _t$props.confirmText,
          columnsFlex = _t$props.columnsFlex;


      var headerProps = {
        title: title,
        cancelText: cancelText,
        confirmText: confirmText,
        onConfirm: function onConfirm() {
          t.handleConfirm();
        },
        onCancel: function onCancel() {
          t.handleCancel();
        },
        isScrolling: t.state.childPaneIsScrolling
      };

      var paneProps = {
        visible: t.state.visible,
        data: data,
        value: value,
        onChange: t.handleChange.bind(t),
        scrollMod: scrollMod,
        columns: columns,
        columnsFlex: columnsFlex,
        onScrolling: t.childPaneOnScrolling.bind(t)
      };

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('slot'), _defineProperty({}, className, !!className))
        },
        _react2.default.createElement(_Header2.default, headerProps),
        _react2.default.createElement(_Pane2.default, paneProps)
      );
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var t = this;
      if (t.state.childPaneIsScrolling) {
        return;
      }
      try {
        t.props.onCancel();
      } finally {
        t.hide();
      }
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      var t = this;
      if (t.state.childPaneIsScrolling) {
        return;
      }
      // value can be only an array or undefined or null
      var isNotEmptyValue = function isNotEmptyValue(value) {
        return !!(value && value.length);
      };
      try {
        var confirmValue = isNotEmptyValue(t.lastChoose) ? t.lastChoose : t.setDefaultLastChoose();
        t.props.onConfirm(confirmValue);
      } finally {
        t.hide();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(data, column, index) {
      var t = this;
      t.lastChoose = data;
      t.props.onChange((0, _cloneDeep2.default)(data), column, index);
    }
  }, {
    key: 'handleMaskClick',
    value: function handleMaskClick() {
      if (this.props.maskCloseable) {
        this.setState({ visible: false });
      }
    }
  }, {
    key: 'childPaneOnScrolling',
    value: function childPaneOnScrolling(scrollingState) {
      this.setState({
        childPaneIsScrolling: scrollingState
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_Popup2.default, {
        visible: this.state.visible,
        content: this.createPaneContent(),
        onMaskClick: function onMaskClick() {
          _this2.handleMaskClick();
        }
      });
    }
  }]);

  return Slot;
}(_react2.default.Component);

Slot.defaultProps = {
  title: '',
  value: [],
  maskCloseable: true,
  data: [],
  className: '',
  confirmText: '完成',
  cancelText: '取消',
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {},
  onChange: function onChange() {},

  scrollMod: 'reset',
  columns: []
};

// http://facebook.github.io/react/docs/reusable-components.html
Slot.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  data: _propTypes2.default.array.isRequired,
  value: _propTypes2.default.array,
  maskCloseable: _propTypes2.default.bool,
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  scrollMod: _propTypes2.default.string,
  columns: _propTypes2.default.array
};

// 格式化单列数据
Slot.formatColumnValue = function (columnData, value) {
  var newColumnData = (0, _cloneDeep2.default)(columnData);
  var newValue = (0, _cloneDeep2.default)(value);
  // 兼容简单选中值
  var columnValue = void 0;
  if (typeof newValue !== 'undefined') {
    if (Object.prototype.hasOwnProperty.call(newValue, 'value')) {
      columnValue = newValue.value;
    } else {
      columnValue = newValue;
    }
  }
  newValue = undefined;

  // 遍历每一项
  for (var i = 0; i < newColumnData.length; i++) {
    var cell = newColumnData[i];

    // 兼容非对象的数据
    if ((typeof cell === 'undefined' ? 'undefined' : _typeof(cell)) !== 'object') {
      newColumnData[i] = {
        text: cell,
        value: cell
      };
      cell = newColumnData[i];
    }

    // 补全缺失数据
    if (!Object.prototype.hasOwnProperty.call(cell, 'text')) {
      cell.text = cell.value;
    }
    if (!Object.prototype.hasOwnProperty.call(cell, 'value')) {
      cell.value = cell.text;
    }

    // 定位选中值
    if (cell.value === columnValue) {
      newValue = cell;
    }
  }

  // 默认选中第一项
  if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) !== 'object') {
    var _newColumnData = _slicedToArray(newColumnData, 1);

    newValue = _newColumnData[0];
  }

  return {
    columnData: newColumnData,
    columnValue: newValue
  };
};

// 格式化多列数据
Slot.formatDataValue = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  // 兼容单列数据的缩略写法
  var newData = (0, _cloneDeep2.default)(data);
  var newValue = (0, _cloneDeep2.default)(value);
  if (!isArray(newData[0])) {
    newData = [newData];
  }
  if (!isArray(newValue)) {
    newValue = [newValue];
  }

  // 遍历数据模型
  newData = newData.map(function (columnData, column) {
    // 格式化列数据
    var ret = Slot.formatColumnValue(columnData, value[column]);
    newValue[column] = ret.columnValue;
    return ret.columnData;
  });

  return {
    data: newData,
    value: newValue
  };
};

Slot.displayName = 'Slot';

Slot.Pane = _Pane2.default;
exports.default = Slot;
module.exports = exports['default'];