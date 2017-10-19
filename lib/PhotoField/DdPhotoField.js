'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PhotoFieldPane = require('./PhotoFieldPane');

var _PhotoFieldPane2 = _interopRequireDefault(_PhotoFieldPane);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * PhotoField Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * alex.mm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var noop = function noop() {};

var autoFixUrl = function autoFixUrl(url) {
  var newUrl = url;
  if (newUrl) {
    // auto fix cdn url
    if (newUrl.indexOf('//') === 0) {
      newUrl = '' + location.protocol + newUrl;
    }
  }
  return newUrl;
};

var Ali = window.Ali || {};

var PhotoField = function (_React$Component) {
  _inherits(PhotoField, _React$Component);

  function PhotoField(props) {
    _classCallCheck(this, PhotoField);

    var _this = _possibleConstructorReturn(this, (PhotoField.__proto__ || Object.getPrototypeOf(PhotoField)).call(this, props));

    _this.state = {
      width: 100 / props.columns + '%'
    };
    return _this;
  }

  _createClass(PhotoField, [{
    key: 'onPickHandler',
    value: function onPickHandler() {
      var _this2 = this;

      var locale = _i18n2.default[this.props.locale];
      if (this.props.readOnly) {
        return;
      }
      var option = {
        multiple: !!this.props.multiple,
        max: this.getMax()
      };
      if (Ali.isDingDing) {
        if (!this.props.corpId) {
          Ali.alert({
            message: locale.corpIdError,
            okButton: locale.ok
          });
          return;
        }
        option.corpId = this.props.corpId;
        Ali.photo(option, function (result) {
          if (result && !result.errorCode) {
            var newPhotos = (result.photos || []).map(function (photo, i) {
              return { name: i, url: photo, response: { url: photo } };
            });
            var newPhotoList = _this2.props.photoList.concat(newPhotos);
            _this2.props.onChange({
              value: result.photos
            }, newPhotoList);
          } else {
            Ali.alert({
              message: result.errorMessage,
              okButton: locale.ok
            });
          }
        });
      }
    }
  }, {
    key: 'getMax',
    value: function getMax() {
      var _props = this.props,
          maxUpload = _props.maxUpload,
          max = _props.max,
          photoList = _props.photoList;

      if (maxUpload && max > maxUpload - photoList.length) {
        return maxUpload - photoList.length;
      }
      return max;
    }
  }, {
    key: 'handleDeleteImage',
    value: function handleDeleteImage(index) {
      this.props.onDelete(index);
    }

    // 点击预览

  }, {
    key: 'handlePreview',
    value: function handlePreview(index) {
      var t = this;
      var urls = t.props.photoList.map(function (item) {
        var u = autoFixUrl(item.url);
        return { u: u };
      });

      Ali.imageViewer({
        images: urls,
        init: index
      }, function (result) {
        console.log(result);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          columns = _props2.columns,
          placeholder = _props2.placeholder,
          label = _props2.label,
          photoList = _props2.photoList,
          required = _props2.required,
          layout = _props2.layout,
          maxUpload = _props2.maxUpload,
          readOnly = _props2.readOnly,
          className = _props2.className,
          tip = _props2.tip;

      var paneProps = {
        columns: columns,
        className: className,
        placeholder: placeholder,
        label: label,
        photoList: photoList,
        maxUpload: maxUpload,
        readOnly: readOnly,
        required: required,
        tip: tip,
        layout: layout,
        onPickerClick: function onPickerClick() {
          _this3.onPickHandler();
        },
        onImageDelete: function onImageDelete(index) {
          _this3.handleDeleteImage(index);
        },
        onImagePreview: function onImagePreview(index) {
          _this3.handlePreview(index);
        }
      };
      return _react2.default.createElement(_PhotoFieldPane2.default, paneProps);
    }
  }]);

  return PhotoField;
}(_react2.default.Component);

PhotoField.defaultProps = {
  columns: 4,
  multiple: true, // 是否同时上传多张照片
  layout: 'h',
  label: '',
  max: 9, // 钉钉组件一次性最多选择上传3张照片
  maxUpload: 12, // 总共上传图片总数
  readOnly: false,
  onChange: noop,
  photoList: [],
  locale: 'zh-cn'
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: _react2.default.PropTypes.object,
  columns: _react2.default.PropTypes.number,
  multiple: _react2.default.PropTypes.bool,
  corpId: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  layout: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  locale: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  max: _react2.default.PropTypes.number,
  maxUpload: _react2.default.PropTypes.number,
  photoList: _react2.default.PropTypes.array,
  readOnly: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  onDelete: _react2.default.PropTypes.func,
  required: _react2.default.PropTypes.bool,
  tip: _react2.default.PropTypes.string
};

PhotoField.displayName = 'PhotoField';

module.exports = PhotoField;