/**
 * PhotoField Component for tingle
 * @author
 * alex.mm
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import PhotoFieldPane from './PhotoFieldPane';
import i18n from './i18n';

const noop = () => { };

// const ddUpload = (opt, fn) => {
//   if (typeof window === 'undefined' || !window.dd) return;
//   const { dd } = window;
//   if (opt.cameraOnly) {
//     dd.biz.util.uploadImageFromCamera({
//       compression: opt.compression !== undefined ? opt.compression : true,
//       onSuccess(result) {
//         result.photo = result['0'];
//         result.photos = result;
//         fn(result); // 返回的参数还是不一样
//       },
//       onFail(err) {
//         fn(err);
//       },
//     });
//   } else {
//     dd.biz.util.uploadImage({
//       multiple: opt.multiple, // 是否多选，默认false
//       max: opt.max, // 最多可选个数 0.0.3
//       compression: opt.compression !== undefined ? opt.compression : true,
//       onSuccess(result) {
//         result.photo = result['0'];
//         result.photos = result;
//         fn(result); // 返回的参数还是不一样
//       },
//       onFail(err) {
//         fn(err);
//       },
//     });
//   }
// };

const autoFixUrl = (url) => {
  let newUrl = url;
  if (newUrl) {
    // auto fix cdn url
    if (newUrl.indexOf('//') === 0) {
      newUrl = `${window.location.protocol}${newUrl}`;
    }
  }
  return newUrl;
};

const Ali = window.Ali || {};

class PhotoField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: `${100 / props.columns}%`,
    };
  }

  onPickHandler() {
    const locale = i18n[this.props.locale];
    if (this.props.readOnly) {
      return;
    }
    const option = {
      multiple: !!this.props.multiple,
      max: this.getMax(),
    };
    if (Ali.isDingDing) {
      if (!this.props.corpId) {
        Ali.alert({
          message: locale.corpIdError,
          okButton: locale.ok,
        });
        return;
      }
      option.corpId = this.props.corpId;
      Ali.photo(option, (result) => {
        if (result && !result.errorCode) {
          const newPhotos = (result.photos || []).map((photo, i) => (
            { name: i, url: photo, response: { url: photo } }
          ));
          const newPhotoList = this.props.photoList.concat(newPhotos);
          this.props.onChange({
            value: result.photos,
          }, newPhotoList);
        } else {
          Ali.alert({
            message: result.errorMessage,
            okButton: locale.ok,
          });
        }
      });
    }
  }

  getMax() {
    const { maxUpload, max, photoList } = this.props;
    if (maxUpload && (max > maxUpload - photoList.length)) {
      return maxUpload - photoList.length;
    }
    return max;
  }


  handleDeleteImage(index) {
    this.props.onDelete(index);
  }

  // 点击预览
  handlePreview(index) {
    const t = this;
    const urls = t.props.photoList.map((item) => {
      const u = autoFixUrl(item.url);
      return { u };
    });

    Ali.imageViewer({
      images: urls,
      init: index,
    }, (result) => {
      console.log(result);
    });
  }

  render() {
    const {
      columns, placeholder, label,
      photoList, required,
      maxUpload, readOnly, className, tip,
      onImagePreview,
    } = this.props;
    const paneProps = {
      columns,
      className,
      placeholder,
      label,
      photoList,
      maxUpload,
      readOnly,
      required,
      tip,
      onPickerClick: () => { this.onPickHandler(); },
      onImageDelete: (index) => { this.handleDeleteImage(index); },
      onImagePreview: (index) => {
        if (onImagePreview) {
          onImagePreview(index);
        } else {
          this.handlePreview(index);
        }
      },
    };
    return (
      <PhotoFieldPane {...paneProps} />
    );
  }
}

PhotoField.defaultProps = {
  columns: 4,
  multiple: true, // 是否同时上传多张照片
  layout: 'h',
  label: '',
  max: 9, // 钉钉组件一次性最多选择上传3张照片
  maxUpload: 12, // 总共上传图片总数
  readOnly: false,
  onChange: noop,
  onImagePreview: undefined,
  photoList: [],
  locale: 'zh-cn',
  icon: undefined,
  corpId: undefined,
  className: undefined,
  placeholder: undefined,
  onDelete: undefined,
  required: undefined,
  tip: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: PropTypes.object,
  columns: PropTypes.number,
  multiple: PropTypes.bool,
  corpId: PropTypes.string,
  className: PropTypes.string,
  layout: PropTypes.string,
  placeholder: PropTypes.string,
  locale: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  maxUpload: PropTypes.number,
  photoList: PropTypes.array,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onImagePreview: PropTypes.func,
  required: PropTypes.bool,
  tip: PropTypes.string,
};

PhotoField.displayName = 'PhotoField';

export default PhotoField;
