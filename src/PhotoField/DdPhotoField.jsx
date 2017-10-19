/**
 * PhotoField Component for tingle
 * @author
 * alex.mm
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PhotoFieldPane from './PhotoFieldPane';
import i18n from './i18n';

const noop = () => { };

const autoFixUrl = (url) => {
  let newUrl = url;
  if (newUrl) {
    // auto fix cdn url
    if (newUrl.indexOf('//') === 0) {
      newUrl = `${location.protocol}${newUrl}`;
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
    const { columns, placeholder, label,
      photoList, required, layout,
      maxUpload, readOnly, className, tip } = this.props;
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
      layout,
      onPickerClick: () => { this.onPickHandler(); },
      onImageDelete: (index) => { this.handleDeleteImage(index); },
      onImagePreview: (index) => { this.handlePreview(index); },
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
  photoList: [],
  locale: 'zh-cn',
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: React.PropTypes.object,
  columns: React.PropTypes.number,
  multiple: React.PropTypes.bool,
  corpId: React.PropTypes.string,
  className: React.PropTypes.string,
  layout: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  locale: React.PropTypes.string,
  label: React.PropTypes.string,
  max: React.PropTypes.number,
  maxUpload: React.PropTypes.number,
  photoList: React.PropTypes.array,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  required: React.PropTypes.bool,
  tip: React.PropTypes.string,
};

PhotoField.displayName = 'PhotoField';

module.exports = PhotoField;
