'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _uploadcore = require('uploadcore');

var _uploadcore2 = require('uploadcore/dist/uploadcore');

var _uploadcore3 = _interopRequireDefault(_uploadcore2);

var _PhotoFieldPane = require('./PhotoFieldPane');

var _PhotoFieldPane2 = _interopRequireDefault(_PhotoFieldPane);

var _util = require('./util');

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.core = this.getCore();
      var picker = this.core.getPickerCollector();
      var uploadIcon = this.pane.getUploadIcon();
      var listUploadIcon = this.pane.getListUploadIcon();
      if (uploadIcon && this.getMax() > 0) {
        this.picker = picker.addArea(uploadIcon);
      }
      if (listUploadIcon) {
        picker.addArea(listUploadIcon);
      }
      window.core = this.core;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.getMax() === 0 && this.picker) {
        this.picker.destroy();
        this.picker = null;
      } else if (this.getMax() > 0 && !this.picker) {
        var uploadIcon = this.pane.getUploadIcon();
        var picker = this.core.getPickerCollector();
        if (uploadIcon) {
          this.picker = picker.addArea(uploadIcon);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListen();
    }
  }, {
    key: 'getCore',
    value: function getCore() {
      var _this2 = this;

      var options = {
        queueCapcity: this.getMax()
      };
      ['name', 'url', 'params', 'action', 'data', 'headers', 'withCredentials', 'timeout', 'chunkEnable', 'chunkSize', 'chunkRetries', 'chunkProcessThreads', 'processThreads', 'autoPending', 'multiple', 'accept', 'sizeLimit', 'preventDuplicate'].forEach(function (key) {
        if (key in _this2.props) {
          options[key] = _this2.props[key];
        }
      });
      var core = new _uploadcore3.default(options);
      var hijackEvents = ['fileuploadsuccess'];
      Object.keys(this.props).forEach(function (key) {
        var m = /^on(\w+)$/i.exec(key);
        if (m && typeof _this2.props[key] === 'function' && hijackEvents.indexOf(m[1]) === -1) {
          core.on(m[1], _this2.props[key]);
        }
      });
      this.fileuploadstart = function (file) {
        if (file.status === _uploadcore.Status.PROGRESS) {
          _this2.forceUpdate();
        }
      };
      this.fileuploadprogress = function () {
        _this2.forceUpdate();
      };
      this.fileuploadsuccess = function (file) {
        _this2.handleSuccess(file);
      };
      this.fileuploaderror = function () {
        _this2.forceUpdate();
      };
      this.filecancel = function () {
        _this2.forceUpdate();
      };
      core.on(_uploadcore.Events.FILE_UPLOAD_START, this.fileuploadstart);
      core.on(_uploadcore.Events.FILE_UPLOAD_PROGRESS, this.fileuploadprogress);
      core.on(_uploadcore.Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
      core.on(_uploadcore.Events.FILE_UPLOAD_ERROR, this.fileuploaderror);
      core.on(_uploadcore.Events.FILE_CANCEL, this.filecancel);
      return core;
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
    key: 'getFiles',
    value: function getFiles() {
      if (this.core) {
        return this.core.getFiles().filter(function (file) {
          return [_uploadcore.Status.CANCELLED, _uploadcore.Status.SUCCESS, _uploadcore.Status.QUEUED].indexOf(file.status) === -1;
        });
      }
      return [];
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(file) {
      var _props2 = this.props,
          photoList = _props2.photoList,
          onChange = _props2.onChange;

      var response = file.response ? file.response.getJson() : null;
      var data = (0, _util.getData)(response);
      var result = {
        ext: file.ext,
        name: file.name,
        size: file.size,
        fileType: file.type,
        type: 'upload',
        url: data.url,
        response: response
      };
      var photos = [result];
      var newPhotoList = photoList.concat(photos);
      file.cancel(true);
      this.core.getStat().remove(file);
      onChange({
        value: photos
      }, newPhotoList);
    }
  }, {
    key: 'stopListen',
    value: function stopListen() {
      this.core.off(_uploadcore.Events.FILE_UPLOAD_START, this.fileuploadstart);
      this.core.off(_uploadcore.Events.FILE_UPLOAD_PROGRESS, this.fileuploadprogress);
      this.core.off(_uploadcore.Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
      this.core.off(_uploadcore.Events.FILE_UPLOAD_ERROR, this.fileuploaderror);
    }
  }, {
    key: 'handleDeleteImage',
    value: function handleDeleteImage(index) {
      this.props.onDelete(index);
    }

    // 点击预览

  }, {
    key: 'handlePreview',
    value: function handlePreview(current) {
      var t = this;
      var photos = t.props.photoList.map(function (item) {
        return { src: autoFixUrl(item.url || item.response && item.response.url || '') };
      });
      _ImageViewer2.default.show({
        photos: photos,
        current: current
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          columns = _props3.columns,
          placeholder = _props3.placeholder,
          label = _props3.label,
          photoList = _props3.photoList,
          required = _props3.required,
          layout = _props3.layout,
          locale = _props3.locale,
          maxUpload = _props3.maxUpload,
          readOnly = _props3.readOnly,
          className = _props3.className,
          tip = _props3.tip;

      var paneProps = {
        columns: columns,
        placeholder: placeholder,
        className: className,
        label: label,
        locale: locale,
        photoList: photoList,
        maxUpload: maxUpload,
        readOnly: readOnly,
        tip: tip,
        required: required,
        files: this.getFiles(),
        layout: layout,
        ref: function ref(c) {
          _this3.pane = c;
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
  max: 3, // 钉钉组件一次性最多选择上传3张照片
  maxUpload: 12, // 总共上传图片总数
  readOnly: false,
  onChange: noop,
  photoList: [],
  locale: 'zh-cn',
  autoPending: true
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: _react2.default.PropTypes.object,
  columns: _react2.default.PropTypes.number,
  multiple: _react2.default.PropTypes.bool,
  corpId: _react2.default.PropTypes.string,
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
  name: _react2.default.PropTypes.string,
  url: _react2.default.PropTypes.string,
  autoPending: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  tip: _react2.default.PropTypes.string
};

PhotoField.displayName = 'PhotoField';

module.exports = PhotoField;