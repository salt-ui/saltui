'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Slide = require('../Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Mask = require('./Mask');

var _Mask2 = _interopRequireDefault(_Mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pinch = new _hammerjs2.default.Pinch();

var PopupView = function (_React$Component) {
  _inherits(PopupView, _React$Component);

  function PopupView(props) {
    _classCallCheck(this, PopupView);

    var _this = _possibleConstructorReturn(this, (PopupView.__proto__ || Object.getPrototypeOf(PopupView)).call(this, props));

    _this.state = {
      current: props.current
    };
    return _this;
  }

  _createClass(PopupView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindHammer();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.visible && nextProps.visible) {
        this.setState({
          current: nextProps.current
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.visible) {
        this.bindHammer();
      } else {
        this.removeHammer();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeHammer();
    }
  }, {
    key: 'bindHammer',
    value: function bindHammer() {
      if (this.mc) return;
      this.mc = new _hammerjs2.default.Manager(this.imageBox);
      /* eslint-disable  react/no-find-dom-node */
      var sliderNode = _reactDom2.default.findDOMNode(this.slider);
      /* eslint-enable  react/no-find-dom-node */
      var currentScale = 1;
      var scale = 1;
      this.mc.add([pinch]);
      this.mc.on('pinchmove', function (ev) {
        // in zoom-in mode, make sure scale can be inherited from last zoom-in
        currentScale = ev.scale - 1 + scale;
        if (currentScale < 0) {
          currentScale = ev.scale;
        }
        sliderNode.style.webkitTransition = 'none';
        sliderNode.style.webkitTransform = 'scale(' + currentScale + ',' + currentScale + ')';
      });

      this.mc.on('pinchend', function () {
        scale = currentScale;
        if (scale < 1) {
          scale = 1;
          sliderNode.style.webkitTransition = 'transform 0.5s ease-out';
          sliderNode.style.webkitTransform = 'scale(1,1)';
        }
      });
    }
  }, {
    key: 'removeHammer',
    value: function removeHammer() {
      if (!this.mc) return;
      this.mc.off('pinchmove');
      this.mc.off('pinchend');
      this.mc = null;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.props.onClick();
    }
  }, {
    key: 'updateActive',
    value: function updateActive(active) {
      this.setState({
        current: active.index
      });
    }
  }, {
    key: 'renderNavBar',
    value: function renderNavBar() {
      if (!this.props.visible) return null;
      var _props = this.props,
          photos = _props.photos,
          prefixCls = _props.prefixCls;
      var current = this.state.current;

      return _react2.default.createElement(
        'ul',
        { className: prefixCls + '-nav' },
        photos.map(function (photo, index) {
          return _react2.default.createElement('li', {
            key: index,
            className: (0, _classnames2.default)(prefixCls + '-nav-item', {
              active: index === current,
              last: index === photos.length - 1
            })
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          photos = _props2.photos,
          visible = _props2.visible;

      var windowHeight = window.innerHeight;
      return _react2.default.createElement(
        'div',
        { className: '' + prefixCls },
        _react2.default.createElement(
          _rcAnimate2.default,
          { transitionAppear: true, transitionName: prefixCls + '-mask', component: '', showProp: 'visible' },
          _react2.default.createElement(_Mask2.default, { className: prefixCls + '-mask', visible: visible })
        ),
        _react2.default.createElement(
          _rcAnimate2.default,
          { transitionAppear: true, transitionName: prefixCls + '-view', component: '' },
          visible ? _react2.default.createElement(
            'div',
            {
              className: prefixCls + '-view',
              ref: function ref(c) {
                _this2.imageBox = c;
              },
              onClick: function onClick() {
                _this2.handleClick();
              }
            },
            _react2.default.createElement(
              _Slide2.default,
              {
                height: windowHeight - 40 + 'px',
                active: this.state.current,
                auto: false,
                showNav: false,
                loop: false,
                onSlideEnd: this.updateActive.bind(this),
                ref: function ref(c) {
                  _this2.slider = c;
                }
              },
              photos.map(function (item, index) {
                return _react2.default.createElement('img', {
                  role: 'presentation',
                  key: index,
                  src: item.src
                });
              })
            )
          ) : null
        ),
        _react2.default.createElement(
          _rcAnimate2.default,
          { transitionAppear: true, transitionName: prefixCls + '-nav', component: '' },
          this.renderNavBar()
        )
      );
    }
  }]);

  return PopupView;
}(_react2.default.Component);

PopupView.propTypes = {
  prefixCls: _react2.default.PropTypes.string,
  photos: _react2.default.PropTypes.array,
  current: _react2.default.PropTypes.number,
  onClick: _react2.default.PropTypes.func,
  visible: _react2.default.PropTypes.bool
};

PopupView.defaultProps = {
  photos: [],
  onClick: function onClick() {},
  current: 0,
  visible: true
};

module.exports = PopupView;