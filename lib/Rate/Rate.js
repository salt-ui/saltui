'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Style = require('../Style');

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _StarFull = require('salt-icon/lib/StarFull');

var _StarFull2 = _interopRequireDefault(_StarFull);

var _StarLine = require('salt-icon/lib/StarLine');

var _StarLine2 = _interopRequireDefault(_StarLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Rate Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Rate = function (_React$Component) {
  _inherits(Rate, _React$Component);

  function Rate() {
    _classCallCheck(this, Rate);

    return _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).apply(this, arguments));
  }

  _createClass(Rate, [{
    key: 'getValue',
    value: function getValue() {
      var _props = this.props,
          value = _props.value,
          score = _props.score;

      if (score !== undefined) {
        console.warn('Rate: score is deprecated, use value instead');
        return score;
      }
      return value;
    }

    // http://facebook.github.io/react/docs/reusable-components.html

  }, {
    key: 'getTotal',
    value: function getTotal() {
      var _props2 = this.props,
          total = _props2.total,
          totalScore = _props2.totalScore;

      if (totalScore !== undefined) {
        console.warn('Rate: totalScore is deprecated, use total instead');
        return totalScore;
      }
      return total;
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(v) {
      var t = this;
      if (t.props.readOnly) {
        return;
      }
      t.props.onChange(v);
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var size = t.props.size;
      var width = size && size === 'large' ? 36 : 26;
      var gap = size && size === 'large' ? 4 : 2.5;
      var items = [];
      var value = this.getValue();
      var total = this.getTotal();

      var _loop = function _loop(i) {
        var item = _react2.default.createElement(
          'div',
          {
            className: (0, _classnames3.default)(_Context2.default.prefixClass('rate-item'), {
              't-DIB': true,
              't-PR': true,
              active: i <= value
            }),
            key: i,
            onClick: function onClick() {
              t.handleItemClick(i);
            },
            style: {
              width: (0, _Style.unitize)(width),
              height: (0, _Style.unitize)(width - 1),
              paddingLeft: (0, _Style.unitize)(gap),
              paddingRight: (0, _Style.unitize)(gap)
            }
          },
          i <= value ? _react2.default.createElement(_StarFull2.default, { className: (0, _classnames3.default)(_Context2.default.prefixClass('rate-icon')) }) : _react2.default.createElement(_StarLine2.default, { className: (0, _classnames3.default)(_Context2.default.prefixClass('rate-icon')) })
        );
        items.push(item);
      };

      for (var i = 1; i <= total; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('rate'), _defineProperty({
            't-FBH': t.props.size === 'normal',
            readOnly: t.props.readOnly
          }, t.props.className, !!t.props.className))
        },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames3.default)({ 't-FBH': true, 'show-center': t.props.size === 'large' }), style: { width: (0, _Style.unitize)((width + 3) * 5) } },
          items
        ),
        t.props.showTip ? _react2.default.createElement(
          'div',
          { className: 'rate-tip', style: { lineHeight: (0, _Style.unitize)(width), textAlign: t.props.size === 'large' ? 'center' : 'left' } },
          t.props.scoreTips[value - 1]
        ) : ''
      );
    }
  }]);

  return Rate;
}(_react2.default.Component);

Rate.displayName = 'Rate';
Rate.defaultProps = {
  total: 5,
  value: 0,
  showTip: true,
  size: 'normal',
  scoreTips: ['不满意', '一般', '基本满意', '满意', '非常满意'],
  readOnly: false,
  onChange: function onChange() {}
};
Rate.propTypes = {
  className: _react2.default.PropTypes.string,
  totalScore: _react2.default.PropTypes.number,
  total: _react2.default.PropTypes.number,
  scoreTips: _react2.default.PropTypes.array,
  showTip: _react2.default.PropTypes.bool,
  score: _react2.default.PropTypes.number,
  value: _react2.default.PropTypes.number,
  readOnly: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func
};
exports.default = Rate;
module.exports = exports['default'];