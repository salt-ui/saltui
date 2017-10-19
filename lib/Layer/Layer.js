'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _LayerBody = require('./LayerBody');

var _LayerBody2 = _interopRequireDefault(_LayerBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Layer Component, all model tips's base backbone
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (Dialog, loading...) for tinglejs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author gnosaij
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team, Alinw.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Layer = function (_React$Component) {
  _inherits(Layer, _React$Component);

  function Layer() {
    _classCallCheck(this, Layer);

    return _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).apply(this, arguments));
  }

  _createClass(Layer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.renderToBody) {
        _reactDom2.default.render(_react2.default.createElement(_LayerBody2.default, this.props), this.getWrapper());
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.renderToBody) {
        _reactDom2.default.render(_react2.default.createElement(_LayerBody2.default, this.props), this.getWrapper());
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.renderToBody && this.wrapper) {
        _reactDom2.default.unmountComponentAtNode(this.wrapper);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
  }, {
    key: 'getWrapper',
    value: function getWrapper() {
      if (!this.wrapper) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        this.wrapper = div;
      }
      return this.wrapper;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.renderToBody) {
        return null;
      }
      return _react2.default.createElement(_LayerBody2.default, this.props);
    }
  }]);

  return Layer;
}(_react2.default.Component);

Layer.propTypes = {
  renderToBody: _react2.default.PropTypes.bool
};
Layer.defaultProps = {
  renderToBody: true
};
Layer.displayName = 'Layer';
exports.default = Layer;
module.exports = exports['default'];