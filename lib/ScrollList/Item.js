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

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
  }

  _createClass(Item, [{
    key: 'renderImg',
    value: function renderImg() {
      var _props = this.props,
          img = _props.img,
          prefixCls = _props.prefixCls;

      if (typeof img === 'string') {
        return _react2.default.createElement('img', { alt: '', className: prefixCls + '-img', src: img });
      }
      return img;
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle() {
      var _props2 = this.props,
          title = _props2.title,
          prefixCls = _props2.prefixCls;

      return _react2.default.createElement(
        'div',
        { className: prefixCls + '-title' },
        title
      );
    }
  }, {
    key: 'renderDes',
    value: function renderDes() {
      var _props3 = this.props,
          description = _props3.description,
          prefixCls = _props3.prefixCls,
          desMaxLine = _props3.desMaxLine;

      if (description) {
        return _react2.default.createElement(
          'div',
          { className: prefixCls + '-des' },
          _react2.default.createElement(
            'div',
            {
              className: prefixCls + '-des-inner',
              style: {
                WebkitLineClamp: desMaxLine
              }
            },
            description
          )
        );
      }
      return null;
    }
  }, {
    key: 'renderExtra',
    value: function renderExtra() {
      var _props4 = this.props,
          extra = _props4.extra,
          prefixCls = _props4.prefixCls;

      if (extra) {
        return _react2.default.createElement(
          'div',
          { className: prefixCls + '-extra' },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-extra-inner' },
            extra
          )
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props5 = this.props,
          prefixCls = _props5.prefixCls,
          className = _props5.className;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls, true), _defineProperty(_classnames, className, !!className), _classnames))
        },
        this.renderImg(),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-content' },
          this.renderTitle(),
          this.renderDes()
        ),
        this.renderExtra()
      );
    }
  }]);

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  prefixCls: _react.PropTypes.string,
  className: _react.PropTypes.string,
  img: _react.PropTypes.string,
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  description: _react.PropTypes.string,
  desMaxLine: _react.PropTypes.number,
  extra: _react.PropTypes.any
};
Item.defaultProps = {
  prefixCls: 't-scroll-list-item',
  desMaxLine: 2
};
exports.default = Item;
module.exports = exports['default'];