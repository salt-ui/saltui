import assign from 'lodash/assign';

// 标准化成功Callback
function wrapSuccessCB(cb, result) {
  const newResult = assign({
    errorCode: 0,
    errorMessage: '',
  }, result || {});
  if (cb) {
    cb(newResult);
  }
}

// 标准化失败Callback
function wrapFailCB(cb, result) {
  let errorCode = 3; // 默认为发生未知错误, 如果不是，对应的方法要传入具体的
  if (result && result.errorCode !== undefined) {
    if (result.errorCode === -1) {
      errorCode = 6; // 把钉钉错误码和集团标准同步，6 为用户取消
    } else {
      ({ errorCode } = result);
    }
  }
  const newResult = assign({
    errorMessage: '',
  }, (result || {}), {
      errorCode,
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
const show = (config) => {
  const { photos = [], current = 0, callback = () => {} } = config;
  if (window.Ali) {
    const images = photos.map(photo => ({ u: photo.src, t: photo.thumbnail || photo.src }));
    window.Ali.ready(() => {
      window.Ali.imageViewer({
        images,
        init: current,
      }, callback);
    });
  } else if (window.dd) {
    window.dd.ready(() => {
      const urls = photos.map(obj => obj.src);
      window.dd.biz.util.previewImage({
        urls, // 图片地址列表
        current: urls[current || 0], // 当前显示的图片链接
        onSuccess(result) {
          wrapSuccessCB(callback, result);
        },
        onFail(err) {
          wrapFailCB(callback, err);
        },
      });
    });
  }
  return {
    // make api same as h5 version
    remove: () => {},
  };
};

const ImageViewer = {
  show,
};

export default ImageViewer;
