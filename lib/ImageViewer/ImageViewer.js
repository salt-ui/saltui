'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _PopupView = require('./PopupView');

var _PopupView2 = _interopRequireDefault(_PopupView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ImageViewer Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author guanghong.wsj
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var div = void 0;

var remove = function remove() {
  _reactDom2.default.unmountComponentAtNode(div);
  div.parentNode.removeChild(div);
  div = null;
};

var defaultGetContainer = function defaultGetContainer() {
  var defaultDiv = document.createElement('div');
  document.body.appendChild(defaultDiv);
  return defaultDiv;
};

var ImageViewer = function (_React$Component) {
  _inherits(ImageViewer, _React$Component);

  function ImageViewer() {
    _classCallCheck(this, ImageViewer);

    return _possibleConstructorReturn(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).apply(this, arguments));
  }

  _createClass(ImageViewer, [{
    key: 'render',
    value: function render() {
      var t = this;
      var _t$props = t.props,
          prefixCls = _t$props.prefixCls,
          className = _t$props.className;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(prefixCls, _defineProperty({}, className, !!className))
        },
        'ImageViewer'
      );
    }
  }]);

  return ImageViewer;
}(_react2.default.Component);

ImageViewer.show = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _config$getContainer = config.getContainer,
      getContainer = _config$getContainer === undefined ? defaultGetContainer : _config$getContainer,
      _config$prefixCls = config.prefixCls,
      prefixCls = _config$prefixCls === undefined ? 't-image-viewer' : _config$prefixCls,
      props = _objectWithoutProperties(config, ['getContainer', 'prefixCls']);

  if (!div) {
    div = getContainer();
  }

  var renderComponent = function renderComponent() {
    var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _reactDom2.default.render(_react2.default.createElement(_PopupView2.default, _extends({}, props, {
      visible: visible,
      prefixCls: prefixCls + '-popup',
      onClick: function onClick() {
        renderComponent(false);
      }
    })), div);
  };

  renderComponent();

  return {
    remove: remove
  };
};

ImageViewer.defaultProps = {};

// http://facebook.github.io/react/docs/reusable-components.html
ImageViewer.propTypes = {
  className: _react2.default.PropTypes.string,
  prefixcls: 't-image-viewer'
};

ImageViewer.displayName = 'ImageViewer';

module.exports = ImageViewer;