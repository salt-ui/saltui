'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 标准化成功Callback
function wrapSuccessCB(cb, result) {
  var newResult = (0, _assign2.default)({
    errorCode: 0,
    errorMessage: ''
  }, result || {});
  if (cb) {
    cb(newResult);
  }
}

// 标准化失败Callback
function wrapFailCB(cb, result) {
  var errorCode = 3; // 默认为发生未知错误, 如果不是，对应的方法要传入具体的
  if (result && result.errorCode !== undefined) {
    if (result.errorCode === -1) {
      errorCode = 6; // 把钉钉错误码和集团标准同步，6 为用户取消
    } else {
      errorCode = result.errorCode;
    }
  }
  var newResult = (0, _assign2.default)({
    errorMessage: ''
  }, result || {}, {
    errorCode: errorCode
  });
  if (cb) {
    cb(newResult);
  }
}

/**
 * config.photos {array} like [{src: xxx, photo: xxx}]
 * config.current {number} the number of photo which is currently viewed.
 * config.callback {function}
 */
var show = function show(config) {
  var _config$photos = config.photos,
      photos = _config$photos === undefined ? [] : _config$photos,
      _config$current = config.current,
      current = _config$current === undefined ? 0 : _config$current,
      _config$callback = config.callback,
      callback = _config$callback === undefined ? function () {} : _config$callback;

  if (window.Ali) {
    var images = photos.map(function (photo) {
      return { u: photo.src, t: photo.thumbnail || photo.src };
    });
    window.Ali.ready(function () {
      window.Ali.imageViewer({
        images: images,
        init: current
      }, callback);
    });
  } else if (window.dd) {
    window.dd.ready(function () {
      var urls = photos.map(function (obj) {
        return obj.src;
      });
      window.dd.biz.util.previewImage({
        urls: urls, // 图片地址列表
        current: urls[current || 0], // 当前显示的图片链接
        onSuccess: function onSuccess(result) {
          wrapSuccessCB(callback, result);
        },
        onFail: function onFail(err) {
          wrapFailCB(callback, err);
        }
      });
    });
  }
};

var ImageViewer = {
  show: show
};

exports.default = ImageViewer;
module.exports = exports['default'];