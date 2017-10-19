'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Group.List Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Item, [{
    key: 'genIcon',
    value: function genIcon(icon) {
      if (React.isValidElement(icon) && icon.type && icon.type.displayName === 'Icon') {
        return React.cloneElement(icon, {
          width: 14,
          height: 14,
          fill: '#fff'
        });
      }
      return icon;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var t = this;
      var tailBackground = {
        background: t.props.color
      };
      var dotStyle = {
        background: t.props.color
      };
      if (t.props.active) {
        dotStyle['border-color'] = t.props.color;
      }
      return React.createElement(
        'div',
        {
          className: classnames(Context.prefixClass('timeline-item'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, 'active', t.props.active), _classnames)), key: t.props.index
        },
        React.createElement(
          'div',
          { className: classnames(Context.prefixClass('timeline-header')) },
          t.props.icon ? React.createElement(
            'div',
            { className: classnames(Context.prefixClass('timeline-icon')) },
            typeof t.props.icon === 'string' ? React.createElement('img', {
              src: t.props.icon,
              alt: ''
            }) : t.genIcon(t.props.icon)
          ) : React.createElement(
            'div',
            {
              style: dotStyle,
              className: classnames(Context.prefixClass('timeline-header-dot'), {
                active: t.props.active
              })
            },
            React.createElement('i', { className: 'dot-core' })
          ),
          !t.props.last && React.createElement('div', {
            style: tailBackground,
            className: classnames(Context.prefixClass('timeline-tail'))
          })
        ),
        React.createElement(
          'div',
          { className: classnames(Context.prefixClass('timeline-main')) },
          t.props.children ? React.createElement(
            'div',
            { className: classnames(Context.prefixClass('timeline-main-title')) },
            t.props.children
          ) : undefined,
          t.props.description ? React.createElement(
            'div',
            { className: classnames(Context.prefixClass('timeline-main-description')) },
            t.props.description
          ) : undefined
        )
      );
    }
  }]);

  return Item;
}(React.Component);

Item.displayName = 'Timeline.Item';

var indentType = React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]);

Item.propTypes = {
  className: React.PropTypes.string,
  icon: indentType,
  index: indentType,
  last: React.PropTypes.bool,
  active: React.PropTypes.bool,
  title: indentType,
  description: indentType
};

Item.defaultProps = {};

module.exports = Item;