'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Group.List Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author gnosaij
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2015, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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
      if (_react2.default.isValidElement(icon) && icon.type && icon.type.displayName === 'Icon') {
        return _react2.default.cloneElement(icon, {
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
        dotStyle.borderColor = t.props.color;
      }
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-item'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, 'active', t.props.active), _classnames)), key: t.props.index
        },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-header')) },
          t.props.icon ? _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-icon')) },
            typeof t.props.icon === 'string' ? _react2.default.createElement('img', {
              src: t.props.icon,
              alt: ''
            }) : t.genIcon(t.props.icon)
          ) : _react2.default.createElement(
            'div',
            {
              style: dotStyle,
              className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-header-dot'), {
                active: t.props.active
              })
            },
            _react2.default.createElement('i', { className: 'dot-core' })
          ),
          !t.props.last && _react2.default.createElement('div', {
            style: tailBackground,
            className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-tail'))
          })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-main')) },
          t.props.children ? _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-main-title')) },
            t.props.children
          ) : undefined,
          t.props.description ? _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_Context2.default.prefixClass('timeline-main-description')) },
            t.props.description
          ) : undefined
        )
      );
    }
  }]);

  return Item;
}(_react2.default.Component);

Item.displayName = 'Timeline.Item';

var indentType = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]);

Item.propTypes = {
  className: _propTypes2.default.string,
  icon: indentType,
  index: indentType,
  last: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  title: indentType,
  description: indentType
};

Item.defaultProps = {};

exports.default = Item;
module.exports = exports['default'];