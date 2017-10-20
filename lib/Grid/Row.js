'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Collection Component Demo for tingle
 * @author gnosaij, changming.zy
 *
 * Copyright 2014-2017, Tingle Team, Alinw.
 * All rights reserved.
 */

var React = require('react');
var Context = require('../Context');

var _require = require('../Boxs'),
    VBox = _require.VBox;

var prefixClass = Context.prefixClass;

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
        ret.push(React.createElement(VBox, {
          flex: 1,
          hAlign: t.props.itemHAlign,
          vAlign: t.props.itemVAlign,
          className: prefixClass('grid-item'),
          style: t.props.square ? { height: 10 / t.props.col + 'rem' } : {}
        }));
      }
      return React.Children.toArray(ret);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var toFilledItemNumber = t.props.col - React.Children.count(t.props.children);

      return React.createElement(
        'div',
        { className: prefixClass('grid-row') + ' ' + prefixClass('FBH') },
        React.Children.map(t.props.children, function (child, i) {
          return React.createElement(
            VBox,
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
}(React.Component);

Row.defaultProps = {
  col: 4,
  square: false
};

Row.propTypes = {
  col: React.PropTypes.number,
  square: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign
};

module.exports = Row;