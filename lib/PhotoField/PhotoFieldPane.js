'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Photo = require('salt-icon/lib/Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _Context = require('../Context');

var _PlusThin = require('salt-icon/lib/PlusThin');

var _PlusThin2 = _interopRequireDefault(_PlusThin);

var _FoldablePane = require('../FoldablePane');

var _FoldablePane2 = _interopRequireDefault(_FoldablePane);

var _PhotoFieldItem = require('./PhotoFieldItem');

var _PhotoFieldItem2 = _interopRequireDefault(_PhotoFieldItem);

var _PhotoFieldUploadItem = require('./PhotoFieldUploadItem');

var _PhotoFieldUploadItem2 = _interopRequireDefault(_PhotoFieldUploadItem);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getStyle = function getStyle(oElm, strCssRule) {
  var strValue = '';
  if (window && window.getComputedStyle) {
    strValue = window.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    var camelCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[camelCssRule];
  }
  return strValue;
};

var PhotoFieldPane = function (_React$Component) {
  _inherits(PhotoFieldPane, _React$Component);

  function PhotoFieldPane(props) {
    _classCallCheck(this, PhotoFieldPane);

    var _this = _possibleConstructorReturn(this, (PhotoFieldPane.__proto__ || Object.getPrototypeOf(PhotoFieldPane)).call(this, props));

    _this.foldHeight = 300;
    return _this;
  }

  _createClass(PhotoFieldPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.item && this.list) {
        this.foldHeight = this.item.getDom().clientHeight * 2 + parseInt(getStyle(this.list, 'padding-top'), 10) + 1;
        this.forceUpdate();
      }
    }
  }, {
    key: 'getUploadIcon',
    value: function getUploadIcon() {
      if (this.uploadIcon) {
        /* eslint-disable react/no-find-dom-node */
        return _reactDom2.default.findDOMNode(this.uploadIcon);
        /* eslint-enable react/no-find-dom-node */
      }
      return null;
    }
  }, {
    key: 'getListUploadIcon',
    value: function getListUploadIcon() {
      if (this.listUploadIcon) {
        return this.listUploadIcon;
      }
      return null;
    }
  }, {
    key: 'isUploadDisabled',
    value: function isUploadDisabled() {
      var t = this;
      return t.props.maxUpload && t.props.photoList.length >= t.props.maxUpload;
    }
  }, {
    key: 'renderUploadIcon',
    value: function renderUploadIcon() {
      var _this2 = this;

      var t = this;
      var itemWidth = 100 / t.props.columns + '%';
      var style = { width: itemWidth, paddingTop: itemWidth, paddingBottom: '4px' };
      if (t.isUploadDisabled() || t.props.readOnly) {
        style.display = 'none';
      }
      return _react2.default.createElement(
        'div',
        {
          className: (0, _Context.prefixClass)('PR FL photo-item'),
          style: style,
          onClick: function onClick() {
            t.props.onPickerClick();
          },
          ref: function ref(c) {
            _this2.listUploadIcon = c;
          }
        },
        _react2.default.createElement(
          'div',
          { className: (0, _Context.prefixClass)('photo-upload-icon-item') },
          _react2.default.createElement(
            'div',
            { className: (0, _Context.prefixClass)('photo-list-upload-icon') },
            _react2.default.createElement(_PlusThin2.default, null)
          )
        )
      );
    }
  }, {
    key: 'renderPhotoList',
    value: function renderPhotoList() {
      var _this3 = this;

      var t = this;
      var itemWidth = 100 / t.props.columns + '%';
      var photoItem = t.props.photoList.map(function (item, index) {
        var props = {
          index: index,
          url: item.url || (0, _util.getData)(item.response).url,
          name: item.name,
          width: itemWidth,
          key: index,
          columns: t.props.columns,
          readOnly: t.props.readOnly,
          ref: function ref(c) {
            if (index === 0) {
              _this3.item = c;
            }
          },
          onDeleteImage: function onDeleteImage(i) {
            t.props.onImageDelete(i);
          },
          onPreviewImage: function onPreviewImage(i) {
            t.props.onImagePreview(i);
          }
        };
        return _react2.default.createElement(_PhotoFieldItem2.default, props);
      });
      var files = t.props.files.map(function (file, index) {
        var props = {
          file: file,
          width: itemWidth,
          key: index,
          locale: t.props.locale
        };
        return _react2.default.createElement(_PhotoFieldUploadItem2.default, props);
      });
      var list = _react2.default.createElement(
        'div',
        {
          className: (0, _classnames6.default)((0, _Context.prefixClass)('photo-list'), _defineProperty({}, (0, _Context.prefixClass)('hide'), photoItem.length === 0 && files.length === 0)),
          ref: function ref(c) {
            _this3.list = c;
          }
        },
        files,
        photoItem.reverse(),
        this.renderUploadIcon()
      );
      if (t.props.readOnly) {
        return _react2.default.createElement(
          _FoldablePane2.default,
          { isFold: true, foldHeight: this.foldHeight },
          list
        );
      }
      return list;
    }
  }, {
    key: 'renderPlaceholder',
    value: function renderPlaceholder() {
      var t = this;
      if (t.props.maxUpload) {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames6.default)((0, _Context.prefixClass)('omit select-field-placeholder'), _defineProperty({}, (0, _Context.prefixClass)('hide'), t.props.readOnly))
          },
          t.props.photoList.length + '/' + t.props.maxUpload
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames3,
          _this4 = this;

      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames6.default)((0, _Context.prefixClass)('photo-field'), (_classnames3 = {}, _defineProperty(_classnames3, t.props.className, !!t.props.className), _defineProperty(_classnames3, (0, _Context.prefixClass)('hide'), t.props.hide), _defineProperty(_classnames3, 'readOnly', t.props.readOnly), _classnames3))
        },
        _react2.default.createElement(
          _Field2.default,
          {
            required: t.props.required,
            label: t.props.label,
            tip: t.props.tip,
            layout: t.props.layout,
            readOnly: t.props.readOnly,
            icon: !t.props.readOnly ? _react2.default.createElement(_Photo2.default, {
              onClick: function onClick() {
                if (!t.isUploadDisabled()) {
                  t.props.onPickerClick();
                }
              },
              className: (0, _classnames6.default)((0, _Context.prefixClass)('photo-upload-icon'), _defineProperty({}, (0, _Context.prefixClass)('photo-upload-icon__disabled'), t.isUploadDisabled())),
              ref: function ref(c) {
                _this4.uploadIcon = c;
              },
              fill: t.props.fill,
              width: 24, height: 24
            }) : null
          },
          t.renderPlaceholder()
        ),
        this.renderPhotoList()
      );
    }
  }]);

  return PhotoFieldPane;
}(_react2.default.Component);

PhotoFieldPane.defaultProps = {
  photoList: [],
  files: [],
  onPickerClick: function onPickerClick() {},
  onImageDelete: function onImageDelete() {},
  onImagePreview: function onImagePreview() {}
};
// http://facebook.github.io/react/docs/reusable-components.html
PhotoFieldPane.propTypes = {
  columns: _react2.default.PropTypes.number,
  placeholder: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  photoList: _react2.default.PropTypes.array,
  files: _react2.default.PropTypes.array,
  readOnly: _react2.default.PropTypes.bool,
  required: _react2.default.PropTypes.bool,
  onPickerClick: _react2.default.PropTypes.func,
  onImageDelete: _react2.default.PropTypes.func,
  onImagePreview: _react2.default.PropTypes.func
};

exports.default = PhotoFieldPane;
module.exports = exports['default'];