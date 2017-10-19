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

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Steps Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author muwen.lb
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var Steps = function (_React$Component) {
  _inherits(Steps, _React$Component);

  function Steps(props) {
    _classCallCheck(this, Steps);

    var _this = _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).call(this, props));

    _this.state = {
      init: false,
      tailWidth: 0
    };
    _this.previousStepsWidth = 0;
    _this.itemsWidth = [];
    return _this;
  }

  _createClass(Steps, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.direction === 'vertical') {
        return;
      }

      var $dom = this.root;
      var len = $dom.children.length - 1;
      this.itemsWidth = new Array(len + 1);

      var i = void 0;
      for (i = 0; i <= len - 1; i++) {
        this.itemsWidth[i] = this.props.maxDescriptionWidth;
      }
      this.itemsWidth[i] = this.props.maxDescriptionWidth;
      this.previousStepsWidth = Math.floor(this.root.offsetWidth);
      this.update();

      /*
       * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
       * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
       */
      $dom.children[len].style.position = 'absolute';

      this.fixLastDetailHeight();

      /*
       * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
       * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
       * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，resize里面会判断要不要更新。
       */
      setTimeout(function () {
        _this2.resize();
      });

      this.resizeBind = this.resize.bind(this);

      if (window.attachEvent) {
        window.attachEvent('onresize', this.resizeBind);
      } else {
        window.addEventListener('resize', this.resizeBind);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.children.length !== this.props.children.length) {
        if (this.props.direction === 'vertical') {
          return;
        }
        var len = nextProps.children.length - 1;
        this.itemsWidth = new Array(len + 1);

        var i = void 0;
        for (i = 0; i <= len - 1; i++) {
          this.itemsWidth[i] = nextProps.maxDescriptionWidth;
        }
        this.itemsWidth[i] = nextProps.maxDescriptionWidth;
        this.update(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.resize();
      var $dom = this.root;

      var len = $dom.children.length - 1;
      /*
       * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
       * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
       */
      for (var i = 0; i <= len; i++) {
        $dom.children[i].style.position = 'relative';
      }
      $dom.children[len].style.position = 'absolute';
      this.fixLastDetailHeight();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.direction === 'vertical') {
        return;
      }
      if (window.attachEvent) {
        window.detachEvent('onresize', this.resizeBind);
      } else {
        window.removeEventListener('resize', this.resizeBind);
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.fixLastDetailHeight();
      var w = Math.floor(this.root.offsetWidth);
      if (this.previousStepsWidth === w) {
        return;
      }
      this.previousStepsWidth = w;
      this.update();
    }
  }, {
    key: 'fixLastDetailHeight',
    value: function fixLastDetailHeight() {
      /*
       * 把整体高度调整为适合高度,处理最后一个detail是绝对定位的问题
       * */
      var $dom = this.root;
      var len = $dom.children.length - 1;
      var $domLastDetail = $dom.children[len];
      if (this.props.currentDetail === len && $dom.offsetHeight <= $domLastDetail.offsetHeight) {
        $dom.style.height = $domLastDetail.offsetHeight + 'px';
      } else {
        $dom.style.height = 'auto';
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var len = props.children.length - 1;
      var tw = this.itemsWidth.reduce(function (prev, w) {
        return prev + w;
      }, 0);
      var dw = Math.floor((this.previousStepsWidth - tw) / len) - 1;
      if (dw <= 0) {
        return;
      }
      this.setState({
        init: true,
        tailWidth: dw
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this3 = this;

      var current = this.props.current;
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          maxDescriptionWidth = _props.maxDescriptionWidth,
          iconPrefix = _props.iconPrefix,
          direction = _props.direction,
          showIcon = _props.showIcon,
          type = _props.type,
          showDetail = _props.showDetail,
          currentDetail = _props.currentDetail,
          onChange = _props.onChange;

      var len = children.length - 1;
      var iws = this.itemsWidth;
      var clsName = (0, _classnames3.default)(prefixClass('steps'), className, (_classnames = {}, _defineProperty(_classnames, prefixClass('steps-vertical'), direction === 'vertical'), _defineProperty(_classnames, prefixClass('steps-type-' + type), direction !== 'vertical'), _defineProperty(_classnames, prefixClass('steps-noicon'), !showIcon), _classnames));

      var fixStyle = void 0;
      if (direction !== 'vertical') {
        // fix #5
        if (type === 'default') {
          var descItemsCount = children.filter(function (d) {
            return d.props.description;
          }).length;
          if (descItemsCount > 0 && descItemsCount !== len + 1) {
            fixStyle = {
              marginTop: 70
            };
          }
        }
      }
      if (typeof current !== 'number') {
        current = Number(current);
      }
      return _react2.default.createElement(
        'div',
        { className: clsName, ref: function ref(c) {
            _this3.root = c;
          } },
        _react2.default.Children.map(children, function (ele, idx) {
          var np = {
            stepNumber: showIcon ? (idx + 1).toString() : '',
            stepLast: idx === len,
            tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + _this3.state.tailWidth,
            iconPrefix: iconPrefix,
            maxDescriptionWidth: maxDescriptionWidth,
            fixStyle: fixStyle,
            showDetail: showDetail && currentDetail === idx && direction !== 'vertical' && type !== 'long-desc',
            detailContentFixStyle: {
              marginLeft: !isNaN(-(iws[idx] + _this3.state.tailWidth) * idx) ? -(iws[idx] + _this3.state.tailWidth) * idx : 0,
              width: _this3.previousStepsWidth
            },
            onChange: onChange,
            hasDetail: showDetail && direction !== 'vertical' && type !== 'long-desc'
          };
          if (!ele.props.status) {
            if (idx === current) {
              np.status = 'process';
            } else if (idx < current) {
              np.status = 'finish';
            } else {
              np.status = 'wait';
            }
          }
          return _react2.default.cloneElement(ele, np);
        }, this)
      );
    }
  }]);

  return Steps;
}(_react2.default.Component);

Steps.defaultProps = {
  className: '',
  iconPrefix: '',
  maxDescriptionWidth: 100,
  current: 0,
  direction: '',
  showIcon: true,
  type: 'default',
  showDetail: false,
  currentDetail: 0,
  onChange: function onChange() {},
  children: []
};

// http://facebook.github.io/react/docs/reusable-components.html
Steps.propTypes = {
  className: _react2.default.PropTypes.string,
  iconPrefix: _react2.default.PropTypes.string,
  maxDescriptionWidth: _react2.default.PropTypes.number,
  current: _react2.default.PropTypes.number,
  direction: _react2.default.PropTypes.string,
  showIcon: _react2.default.PropTypes.bool,
  type: _react2.default.PropTypes.oneOf(['default', 'title-on-top', 'long-desc']),
  showDetail: _react2.default.PropTypes.bool,
  currentDetail: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  children: _react2.default.PropTypes.any
};

Steps.displayName = 'Steps';
Steps.Step = _Step2.default;

exports.default = Steps;
module.exports = exports['default'];