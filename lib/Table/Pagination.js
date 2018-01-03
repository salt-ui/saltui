'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

    _this.state = {};
    return _this;
  }

  /**
   * 计算总页数
   */


  _createClass(Pagination, [{
    key: 'calcPage',
    value: function calcPage() {
      var t = this;
      var _t$props = t.props,
          total = _t$props.total,
          pageSize = _t$props.pageSize;

      return Math.floor((total - 1) / pageSize) + 1;
    }
  }, {
    key: 'handlePageChange',
    value: function handlePageChange(direction) {
      var t = this;
      var _t$props2 = t.props,
          current = _t$props2.current,
          onChange = _t$props2.onChange;

      var totalPages = t.calcPage();
      var newCurrent = current + direction;
      if (newCurrent < 1 || newCurrent > totalPages) return;
      onChange(newCurrent);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props3 = t.props,
          className = _t$props3.className,
          current = _t$props3.current;

      var totalPages = t.calcPage();
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_defineProperty({}, className, !!className))
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames3.default)({
              goPrev: true,
              disable: current === 1
            }), onClick: t.handlePageChange.bind(t, -1)
          },
          '\u4E0A\u4E00\u9875'
        ),
        _react2.default.createElement(
          'div',
          { className: 'options' },
          current + '/' + totalPages
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames3.default)({
              goNext: true,
              disable: current === totalPages
            }), onClick: t.handlePageChange.bind(t, 1)
          },
          '\u4E0B\u4E00\u9875'
        )
      );
    }
  }]);

  return Pagination;
}(_react2.default.Component);

Pagination.defaultProps = {
  current: 1,
  total: 0,
  pageSize: 10,
  onChange: function onChange() {}
};

Pagination.propTypes = {
  current: _react2.default.PropTypes.number,
  total: _react2.default.PropTypes.number,
  pageSize: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func
};

Pagination.displayName = 'Pagination';

exports.default = Pagination;
module.exports = exports['default'];