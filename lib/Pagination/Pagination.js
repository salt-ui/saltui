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

var _Context2 = _interopRequireDefault(_Context);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Slot = require('../Slot');

var _Slot2 = _interopRequireDefault(_Slot);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Pagination Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author changming.zy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var makeArray = function makeArray(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(i + 1);
  }
  return arr;
};

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

    _this.state = {
      current: props.current,
      pageSize: props.pageSize
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.current !== this.state.current || nextProps.pageSize !== this.state.pageSize) {
        this.setState({
          current: nextProps.current,
          pageSize: nextProps.pageSize
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(current) {
      if (this.props.onChange) {
        this.props.onChange(current, this.state.pageSize);
      }
      this.setState({ current: current });
    }
  }, {
    key: 'getTotalPage',
    value: function getTotalPage() {
      var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.pageSize;
      var total = this.props.total;

      return Math.ceil(total / pageSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          className = _props.className,
          locale = _props.locale,
          simple = _props.simple;
      var current = this.state.current;


      var totalPageCount = this.getTotalPage();

      var disablePrev = current === 1;
      var disableNext = current >= totalPageCount;
      var langs = _i18n2.default[locale];

      if (current > totalPageCount || current < 0) {
        console.warn('Pagination 组件异常, current 为 %d，totalPageCount 为 %d ', current, totalPageCount);
      }

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, _Context2.default.prefixClass('FBH'), true), _defineProperty(_classnames, _Context2.default.prefixClass('pagination'), true), _defineProperty(_classnames, className, !!className), _classnames))
        },
        _react2.default.createElement(
          _Button2.default,
          {
            disabled: disablePrev,
            display: 'inline',
            type: 'secondary',
            size: 'small',
            onClick: function onClick(e) {
              if (!disablePrev) {
                _this2.onChange(current - 1);
              }
              e.preventDefault();
            }
          },
          langs.prev
        ),
        !simple ? _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              _this2.current = current;
              _this2.slotCpnt.show();
            }, className: (0, _classnames3.default)(_Context2.default.prefixClass('FB1 FBH FBJC FBAC pagination-page-count'))
          },
          _react2.default.createElement(
            'span',
            { className: _Context2.default.prefixClass('pagination-page-current') },
            current + ' '
          ),
          '/ ' + totalPageCount
        ) : _react2.default.createElement('div', { className: _Context2.default.prefixClass('FB1') }),
        _react2.default.createElement(
          _Button2.default,
          {
            disabled: disableNext,
            display: 'inline',
            type: 'secondary',
            size: 'small',
            onClick: function onClick(e) {
              if (!disableNext) {
                _this2.onChange(current + 1);
              }
              e.preventDefault();
            }
          },
          langs.next
        ),
        _react2.default.createElement(_Slot2.default, {
          title: langs.choosePageSize,
          ref: function ref(c) {
            _this2.slotCpnt = c;
          },
          data: [makeArray(this.getTotalPage()).map(function (item) {
            return { text: item, value: item };
          })],
          value: [{ text: current, value: current }],
          onChange: function onChange(value) {
            _this2.setState({
              current: value[0].value
            });
          },
          onCancel: function onCancel() {
            _this2.setState({
              current: _this2.current
            });
          },
          onConfirm: function onConfirm(selected) {
            _this2.onChange(selected[0].value);
          }
        })
      );
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  className: _react.PropTypes.string,
  locale: _react.PropTypes.oneOf(['zh-cn', 'en-us']),
  current: _react.PropTypes.number,
  total: _react.PropTypes.number,
  pageSize: _react.PropTypes.number,
  onChange: _react.PropTypes.func,
  simple: _react.PropTypes.bool,
  sizeOptions: _react.PropTypes.arrayOf(_react.PropTypes.number),
  onShowSizeChange: _react.PropTypes.func
};

Pagination.defaultProps = {
  className: '',
  locale: 'zh-cn',
  current: 1,
  total: 0,
  pageSize: 10,
  onChange: function onChange() {},
  simple: false,
  sizeOptions: [10, 20, 30, 40],
  onShowSizeChange: function onShowSizeChange() {}
};

Pagination.displayName = 'Pagination';

exports.default = Pagination;
module.exports = exports['default'];