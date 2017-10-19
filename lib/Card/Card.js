'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Card Component for tingle
 * @author caiyongmin
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var t = this;
      var className = classnames(Context.prefixClass('card'), _defineProperty({
        'card-mode-full': t.props.mode === 'full'
      }, t.props.className, !!t.props.className));

      return React.createElement(
        'div',
        { className: className },
        t.props.children
      );
    }
  }]);

  return Card;
}(React.Component);

Card.defaultProps = {
  mode: 'normal',
  className: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
Card.propTypes = {
  className: React.PropTypes.string,
  mode: React.PropTypes.oneOf(['normal', 'full'])
};

Card.displayName = 'Card';

module.exports = Card;