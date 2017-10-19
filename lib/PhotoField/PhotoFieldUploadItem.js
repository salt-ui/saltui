'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('../Context');

var _uploadcore = require('uploadcore');

var _Upload = require('salt-icon/lib/Upload');

var _Upload2 = _interopRequireDefault(_Upload);

var _MinusRound = require('salt-icon/lib/MinusRound');

var _MinusRound2 = _interopRequireDefault(_MinusRound);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoFieldUploadItem = function (_React$Component) {
  _inherits(PhotoFieldUploadItem, _React$Component);

  function PhotoFieldUploadItem() {
    _classCallCheck(this, PhotoFieldUploadItem);

    return _possibleConstructorReturn(this, (PhotoFieldUploadItem.__proto__ || Object.getPrototypeOf(PhotoFieldUploadItem)).apply(this, arguments));
  }

  _createClass(PhotoFieldUploadItem, [{
    key: 'handleDelete',
    value: function handleDelete() {
      this.props.file.cancel();
    }
  }, {
    key: 'renderProgress',
    value: function renderProgress() {
      var _this2 = this;

      if (this.props.file.status === _uploadcore.Status.PROGRESS) {
        return _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('photo-upload-item-box photo-upload-item-box__progress') },
          _react2.default.createElement(_Circle2.default, { className: (0, _Context.prefixClass)('photo-progress-icon'), percent: this.props.file.progress.percentage }),
          _react2.default.createElement(_MinusRound2.default, { className: (0, _Context.prefixClass)('photo-delete-icon'), onClick: function onClick() {
              _this2.handleDelete();
            } })
        );
      }
      return null;
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      var _this3 = this;

      var locale = _i18n2.default[this.props.locale];
      if (this.props.file.status === _uploadcore.Status.ERROR) {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _Context.prefixClass)('photo-upload-item-box photo-upload-item-box__error'),
            onClick: function onClick() {
              _this3.props.file.pending();
            }
          },
          _react2.default.createElement(_Upload2.default, { className: (0, _Context.prefixClass)('photo-upload-error-icon'), fill: '' }),
          _react2.default.createElement(
            'span',
            { className: (0, _Context.prefixClass)('photo-upload-error-msg') },
            locale.retry
          ),
          _react2.default.createElement(_MinusRound2.default, { className: (0, _Context.prefixClass)('photo-delete-icon'), onClick: function onClick() {
              _this3.handleDelete();
            } })
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var t = this;
      var style = {
        width: t.props.width,
        paddingTop: t.props.width,
        paddingBottom: '4px'
      };
      return _react2.default.createElement(
        'div',
        { className: (0, _Context.prefixClass)('PR FL photo-item'), style: style, ref: function ref(c) {
            _this4.root = c;
          } },
        _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('photo-upload-item') },
          this.renderProgress(),
          this.renderError()
        )
      );
    }
  }]);

  return PhotoFieldUploadItem;
}(_react2.default.Component);

PhotoFieldUploadItem.propTypes = {
  file: _react.PropTypes.object,
  locale: _react.PropTypes.string
};

exports.default = PhotoFieldUploadItem;
module.exports = exports['default'];