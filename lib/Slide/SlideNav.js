'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Slide Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author gnosaij,changming
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright 2014-2015, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var prefixClass = function prefixClass(name) {
  return _Context2.default.prefixClass ? _Context2.default.prefixClass(name) : 't-' + name;
};

var SlideNav = function (_React$Component) {
  _inherits(SlideNav, _React$Component);

  function SlideNav(props) {
    _classCallCheck(this, SlideNav);

    var _this = _possibleConstructorReturn(this, (SlideNav.__proto__ || Object.getPrototypeOf(SlideNav)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SlideNav, [{
    key: 'render',
    value: function render() {
      var t = this;
      var arr = [];
      for (var i = 0; i < t.props.num; i++) {
        var _classnames;

        arr.push(_react2.default.createElement('div', {
          key: i, className: (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, '' + prefixClass('M2 slide-nav-item'), true), _defineProperty(_classnames, 'active', i === t.props.active), _classnames))
        }));
      }
      return _react2.default.createElement(
        'div',
        null,
        this.props.position === 'RIGHT' ? _react2.default.createElement(
          'div',
          { className: '' + prefixClass('slide-nav FBH FBAC FBJE') },
          arr
        ) : _react2.default.createElement(
          'div',
          { className: '' + prefixClass('slide-nav FBH FBAC FBJC') },
          arr
        )
      );
    }
  }]);

  return SlideNav;
}(_react2.default.Component);

SlideNav.defaultProps = {
  num: 0,
  active: 0,
  position: 'CENTER'
};

// http://facebook.github.io/react/docs/reusable-components.html
SlideNav.propTypes = {
  num: _react2.default.PropTypes.number,
  active: _react2.default.PropTypes.number,
  position: _react2.default.PropTypes.oneOf(['CENTER', 'RIGHT'])
};

SlideNav.displayName = 'SlideNav';

exports.default = SlideNav;
module.exports = exports['default'];