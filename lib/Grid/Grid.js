'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
var classnames = require('classnames');
var Context = require('../Context');

var _require = require('../Boxs'),
    VBox = _require.VBox;

var Row = require('./Row');

var prefixClass = Context.prefixClass;

var Grid = function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: 'cutIndexesIntoRows',

    /**
    * 将子元素的索引值根据列数划分成组
    * @returns {Array}
    */
    value: function cutIndexesIntoRows() {
      var t = this;
      var rowIndexes = [];
      var childrenCount = React.Children.count(t.props.children);
      var dummyIndexArray = [];
      var dummyIndex = 0;
      while (childrenCount > 0) {
        childrenCount -= 1;
        dummyIndexArray.push(dummyIndex);
        dummyIndex += 1;
      }

      while (dummyIndexArray.length) {
        rowIndexes.push(dummyIndexArray.splice(0, t.props.col));
      }

      return rowIndexes;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      // react0.14
      var children = React.Children.toArray(t.props.children);

      var rows = t.cutIndexesIntoRows();

      var _t$props = t.props,
          className = _t$props.className,
          noLine = _t$props.noLine,
          rowProps = _objectWithoutProperties(_t$props, ['className', 'noLine']);

      return React.createElement(
        'div',
        {
          className: classnames(prefixClass('grid'), (_classnames = {}, _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, prefixClass('no-line'), noLine), _defineProperty(_classnames, prefixClass('has-line'), !noLine), _defineProperty(_classnames, prefixClass('grid-touchable'), this.props.touchable), _classnames))
        },
        rows.map(function (indexes, i) {
          return React.createElement(
            Row,
            _extends({}, rowProps, { key: i }),
            indexes.map(function (index) {
              return children[index];
            })
          );
        })
      );
    }
  }]);

  return Grid;
}(React.Component);

Grid.defaultProps = {
  className: '',
  col: 4,
  square: false,
  noLine: false,
  itemHAlign: 'center',
  itemVAlign: 'center',
  touchable: false
};

// http://facebook.github.io/react/docs/reusable-components.html
Grid.propTypes = {
  className: React.PropTypes.string,
  // 列数
  col: React.PropTypes.number,
  // 是否自适应单元格的高度 使单元格成为正方形
  square: React.PropTypes.bool,
  // 是否隐藏分割线
  noLine: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign,
  // 单元格是否可点击
  touchable: React.PropTypes.bool
};

Grid.displayName = 'Grid';

module.exports = Grid;