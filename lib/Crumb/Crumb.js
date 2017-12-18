'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Scroller = require('../Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _CrumbItem = require('./CrumbItem');

var _CrumbItem2 = _interopRequireDefault(_CrumbItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Crumb Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author quanyun.mqy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Crumb = function (_React$Component) {
  _inherits(Crumb, _React$Component);

  function Crumb() {
    _classCallCheck(this, Crumb);

    return _possibleConstructorReturn(this, (Crumb.__proto__ || Object.getPrototypeOf(Crumb)).apply(this, arguments));
  }

  _createClass(Crumb, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 计算宽度和滚动
      var t = this;
      if (t.props.showScroll) {
        var w = 0;
        var scrollEl = t.scroll;
        var chNodes = scrollEl.childNodes;
        for (var i = 0, l = chNodes.length; i < l; i += 1) {
          w += chNodes[i].offsetWidth + 1;
        }

        scrollEl.style.width = w + 'px';
        // t.refs.root.scroller.scrollTo(-w, 0, 1000, IScroll.utils.ease.elastic);
        t.root.scroller.scrollTo(-w);
        // 实例化滚动
        t.root.scroller.refresh();
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var t = this;
      var len = _react2.default.Children.count(t.props.children);
      var crumbArray = [];
      _react2.default.Children.forEach(t.props.children, function (child, idx) {
        if (child.type.displayName === 'CrumbItem') {
          crumbArray.push(_react2.default.cloneElement(child, {
            key: idx,
            className: t.props.showScroll ? _Context2.default.prefixClass('FL') : '',
            disabled: idx === len - 1,
            onClick: t.props.onClick.bind(t, idx)
          }));
          if (idx !== len - 1) {
            crumbArray.push(_react2.default.createElement(
              'span',
              {
                key: 'nav-' + idx,
                className: (0, _classnames4.default)(_Context2.default.prefixClass('crumb-nav-icon'), _defineProperty({}, _Context2.default.prefixClass('FL'), t.props.showScroll))
              },
              t.props.separator
            ));
          }
        }
      });
      return crumbArray;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var scroll = t.props.showScroll;
      var classNames = (0, _classnames4.default)(_Context2.default.prefixClass('crumb'), _defineProperty({}, t.props.className, !!t.props.className));
      if (scroll) {
        return _react2.default.createElement(
          _Scroller2.default,
          {
            ref: function ref(c) {
              _this2.root = c;
            },
            className: classNames,
            scrollX: true,
            scrollY: false
          },
          _react2.default.createElement(
            'div',
            { className: _Context2.default.prefixClass('CL crumb-scroll'), ref: function ref(c) {
                _this2.scroll = c;
              } },
            t.renderItems()
          )
        );
      }
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            _this2.root = c;
          },
          className: classNames
        },
        t.renderItems()
      );
    }
  }]);

  return Crumb;
}(_react2.default.Component);

Crumb.defaultProps = {
  className: '',
  showScroll: true,
  onClick: function onClick() {},
  separator: '>'
};

// http://facebook.github.io/react/docs/reusable-components.html
Crumb.propTypes = {
  className: _react2.default.PropTypes.string,
  showScroll: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  separator: _react2.default.PropTypes.string
};

Crumb.displayName = 'Crumb';

Crumb.Item = _CrumbItem2.default;

exports.default = Crumb;
module.exports = exports['default'];