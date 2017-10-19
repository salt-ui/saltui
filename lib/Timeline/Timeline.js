'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Timeline Component for tingle
 * @author zhongsisi
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');

var classnames = require('classnames');

var Context = require('../Context');
var Item = require('./Item');

var Timeline = function (_React$Component) {
  _inherits(Timeline, _React$Component);

  function Timeline(props) {
    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Timeline, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      var hasActive = false;
      var hasIcon = false;
      t.props.children.forEach(function (child) {
        if (child.props.active) {
          hasActive = true;
        }
        if (child.props.icon) {
          hasIcon = true;
        }
      });
      return React.createElement(
        'div',
        {
          className: classnames(Context.prefixClass('timeline'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, 'has-active', hasActive), _defineProperty(_classnames, 'has-icon', hasIcon), _classnames))
        },
        t.props.children.map(function (ele, idx) {
          return React.cloneElement(ele, {
            index: idx,
            last: idx === t.props.children.length - 1
          });
        })
      );
    }
  }]);

  return Timeline;
}(React.Component);

Timeline.defaultProps = {};

Timeline.propTypes = {
  className: React.PropTypes.string
};

Timeline.displayName = 'Timeline';
Timeline.Item = Item;

module.exports = Timeline;