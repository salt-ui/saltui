'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Crumb Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');
var Scroller = require('../Scroller');
var Item = require('./CrumbItem');

var Crumb = function (_React$Component) {
  _inherits(Crumb, _React$Component);

  function Crumb(props) {
    _classCallCheck(this, Crumb);

    return _possibleConstructorReturn(this, (Crumb.__proto__ || Object.getPrototypeOf(Crumb)).call(this, props));
  }

  _createClass(Crumb, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 计算宽度和滚动
      var t = this;
      if (t.props.showScroll) {
        var w = 0;
        var scrollEl = ReactDOM.findDOMNode(t.refs.scroll);
        var chNodes = scrollEl.childNodes;
        for (var i = 0, l = chNodes.length; i < l; i++) {
          w += chNodes[i].offsetWidth + 1;
        }

        scrollEl.style.width = w + 'px';
        // t.refs.root.scroller.scrollTo(-w, 0, 1000, IScroll.utils.ease.elastic);
        t.refs.root.scroller.scrollTo(-w);
        // 实例化滚动
        t.refs.root.scroller.refresh();
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var t = this;
      var len = React.Children.count(t.props.children);
      var crumbArray = [];
      React.Children.forEach(t.props.children, function (child, idx) {
        if (child.type.displayName === 'CrumbItem') {
          crumbArray.push(React.cloneElement(child, {
            key: idx,
            className: t.props.showScroll ? Context.prefixClass('FL') : '',
            disabled: idx === len - 1,
            onClick: t.props.onClick.bind(t, idx)
          }));
          if (idx !== len - 1) {
            crumbArray.push(React.createElement(
              'span',
              {
                key: 'nav-' + idx,
                className: classnames(Context.prefixClass('crumb-nav-icon'), _defineProperty({}, Context.prefixClass('FL'), t.props.showScroll))
              },
              '>'
            ));
          }
        }
      });
      return crumbArray;
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this;
      var scroll = t.props.showScroll;
      var classNames = classnames(Context.prefixClass('crumb'), _defineProperty({}, t.props.className, !!t.props.className));
      if (scroll) {
        return React.createElement(
          Scroller,
          {
            ref: 'root',
            className: classNames,
            scrollX: true,
            scrollY: false
          },
          React.createElement(
            'div',
            { className: Context.prefixClass('CL crumb-scroll'), ref: 'scroll' },
            t.renderItems()
          )
        );
      }
      return React.createElement(
        'div',
        {
          ref: 'root',
          className: classNames
        },
        t.renderItems()
      );
    }
  }]);

  return Crumb;
}(React.Component);

Crumb.defaultProps = {
  className: '',
  showScroll: true,
  onClick: function onClick() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
Crumb.propTypes = {
  className: React.PropTypes.string,
  showScroll: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

Crumb.displayName = 'Crumb';

Crumb.Item = Item;

module.exports = Crumb;