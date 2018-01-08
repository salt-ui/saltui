'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Boxs = require('../Boxs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Collection Component Demo for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author gnosaij, changming.zy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var prefixClass = _Context2.default.prefixClass;

var Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  _createClass(Row, [{
    key: 'fillEmptyItem',

    // 根据`col`的设置，补充空的`item`
    value: function fillEmptyItem(n) {
      if (n === 0) {
        return null;
      }

      var t = this;
      var ret = [];

      while (n-- > 0) {
        ret.push(_react2.default.createElement(_Boxs.VBox, {
          flex: 1,
          hAlign: t.props.itemHAlign,
          vAlign: t.props.itemVAlign,
          className: prefixClass('grid-item'),
          style: t.props.square ? { height: 10 / t.props.col + 'rem' } : {}
        }));
      }
      return _react2.default.Children.toArray(ret);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var toFilledItemNumber = t.props.col - _react2.default.Children.count(t.props.children);

      return _react2.default.createElement(
        'div',
        { className: prefixClass('grid-row') + ' ' + prefixClass('FBH') },
        _react2.default.Children.map(t.props.children, function (child, i) {
          return _react2.default.createElement(
            _Boxs.VBox,
            {
              flex: 1,
              hAlign: t.props.itemHAlign,
              vAlign: t.props.itemVAlign,
              className: prefixClass('grid-item'), key: i,
              style: t.props.square ? { height: 10 / t.props.col + 'rem' } : {}
            },
            child
          );
        }),
        t.fillEmptyItem(toFilledItemNumber)
      );
    }
  }]);

  return Row;
}(_react2.default.Component);

Row.defaultProps = {
  col: 4,
  square: false
};

Row.propTypes = {
  col: _propTypes2.default.number,
  square: _propTypes2.default.bool,
  // 单个格子的水平对其方式
  itemHAlign: _Boxs.VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: _Boxs.VBox.propTypes.vAlign
};

exports.default = Row;
module.exports = exports['default'];