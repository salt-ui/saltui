'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _MinusRound = require('salt-icon/lib/MinusRound');

var _MinusRound2 = _interopRequireDefault(_MinusRound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefixClass = _Context2.default.prefixClass;

var PhotoFieldItem = function (_React$Component) {
  _inherits(PhotoFieldItem, _React$Component);

  function PhotoFieldItem(props) {
    _classCallCheck(this, PhotoFieldItem);

    var _this = _possibleConstructorReturn(this, (PhotoFieldItem.__proto__ || Object.getPrototypeOf(PhotoFieldItem)).call(this, props));

    _this.state = {
      loaded: false
    };
    return _this;
  }

  _createClass(PhotoFieldItem, [{
    key: 'getDom',
    value: function getDom() {
      return this.root;
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview() {
      this.props.onPreviewImage(this.props.index);
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      this.props.onDeleteImage(this.props.index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var t = this;
      var style = {
        width: t.props.width
      };
      if (!this.state.loaded) {
        style.paddingTop = style.width;
      }
      return _react2.default.createElement(
        'div',
        { className: prefixClass('PR FL photo-item'), style: style, ref: function ref(c) {
            _this2.root = c;
          } },
        _react2.default.createElement('img', {
          src: '//gw.alicdn.com/tps/TB18GJsIpXXXXatXFXXXXXXXXXX.png',
          preview: t.props.pic,
          onLoad: function onLoad() {
            _this2.setState({
              loaded: true
            });
          },
          className: prefixClass('photo-item-img'),
          style: { backgroundImage: 'url(' + t.props.url + ')' }, alt: t.props.name,
          onClick: t.handlePreview.bind(t)
        }),
        !t.props.readOnly && _react2.default.createElement(_MinusRound2.default, { className: prefixClass('photo-delete-icon'), onClick: function onClick() {
            _this2.handleDelete();
          } })
      );
    }
  }]);

  return PhotoFieldItem;
}(_react2.default.Component);

PhotoFieldItem.defaultProps = {
  readOnly: false
};

PhotoFieldItem.propTypes = {
  index: _react2.default.PropTypes.number,
  readOnly: _react2.default.PropTypes.bool,
  onPreviewImage: _react2.default.PropTypes.func,
  onDeleteImage: _react2.default.PropTypes.func
};

module.exports = PhotoFieldItem;