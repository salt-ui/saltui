/**
 * PhotoField Component for SaltUI
 * @author
 * alex.mm
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Events, Status } from 'uploadcore';
import UploadCore from 'uploadcore/dist/uploadcore';
import ImageViewer from '../ImageViewer';
import PhotoFieldPane from './PhotoFieldPane';
import { getData } from './util';

const noop = () => { };

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


class PhotoField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: `${100 / props.columns}%`,
    };
  }

  componentDidMount() {
    this.core = this.getCore();
    const picker = this.core.getPickerCollector();
    const uploadIcon = this.pane.getUploadIcon();
    const listUploadIcon = this.pane.getListUploadIcon();
    if (uploadIcon && this.getMax() > 0) {
      this.picker = picker.addArea(uploadIcon);
    }
    if (listUploadIcon) {
      this.listPicker = picker.addArea(listUploadIcon);
    }
  }


  componentDidUpdate() {
    // destory picker when max is 0
    if (this.getMax() === 0 && this.picker) {
      this.picker.destroy();
      this.picker = null;
    // recreate picker when picker is distroyed and max is larger than 0
    } else if (this.getMax() > 0 && !this.picker) {
      const uploadIcon = this.pane.getUploadIcon();
      const picker = this.core.getPickerCollector();
      if (uploadIcon) {
        this.picker = picker.addArea(uploadIcon);
      }
    }
    if (this.getTotalFilesLength() === 0) {
      this.listPicker = null;
    } else {
      const listUploadIcon = this.pane.getListUploadIcon();
      if (listUploadIcon) {
        const picker = this.core.getPickerCollector();
        this.listPicker = picker.addArea(listUploadIcon);
      }
    }
    if (this.core) {
      this.core.setOptions({
        queueCapcity: this.getMax() + this.core.getTotal(),
      });
    }
  }

  componentWillUnmount() {
    this.stopListen();
    if (this.viewer) {
      this.viewer.remove();
    }
  }


  getCore() {
    const options = {
      queueCapcity: this.getMax(),
    };
    const { type } = this.props;
    if (type === 'photo') {
      options.accept = 'images';
    }
    ['name', 'url', 'params', 'action', 'data', 'headers', 'withCredentials', 'timeout',
      'chunkEnable', 'chunkSize', 'chunkRetries', 'chunkProcessThreads', 'processThreads',
      'autoPending', 'multiple', 'accept', 'sizeLimit', 'preventDuplicate',
    ].forEach((key) => {
      if (key in this.props) {
        options[key] = this.props[key];
      }
    });
    const core = new UploadCore(options);
    const hijackEvents = ['fileuploadsuccess'];
    Object.keys(this.props).forEach((key) => {
      const m = /^on(\w+)$/i.exec(key);
      if (m && typeof this.props[key] === 'function' && hijackEvents.indexOf(m[1]) === -1) {
        core.on(m[1], this.props[key]);
      }
    });
    this.fileuploadstart = (file) => {
      if (file.status === Status.PROGRESS) {
        this.forceUpdate();
      }
    };
    this.fileuploadprogress = () => {
      this.forceUpdate();
    };
    this.fileuploadsuccess = (file) => {
      this.handleSuccess(file);
    };
    this.fileuploaderror = () => {
      this.forceUpdate();
    };
    this.filecancel = () => {
      this.forceUpdate();
    };
    core.on(Events.FILE_UPLOAD_START, this.fileuploadstart);
    core.on(Events.FILE_UPLOAD_PROGRESS, this.fileuploadprogress);
    core.on(Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
    core.on(Events.FILE_UPLOAD_ERROR, this.fileuploaderror);
    core.on(Events.FILE_CANCEL, this.filecancel);
    window.core = core;
    return core;
  }

  getMax() {
    const { maxUpload, max, photoList } = this.props;
    let realMax = maxUpload;
    if (maxUpload && (max > maxUpload - photoList.length)) {
      realMax -= photoList.length;
    }
    if (this.core) {
      realMax -= this.core.getTotal();
    }
    return realMax;
  }

  getFiles() {
    if (this.core) {
      return this.core.getFiles().filter(file =>
        [Status.CANCELLED, Status.SUCCESS, Status.QUEUED].indexOf(file.status) === -1);
    }
    return [];
  }

  getTotalFilesLength() {
    return this.props.photoList.length + this.core.getTotal();
  }

  handleSuccess(file) {
    const { photoList, onChange } = this.props;
    const response = file.response ? file.response.getJson() : null;
    const data = getData(response);
    const result = {
      ext: file.ext,
      name: file.name,
      size: file.size,
      fileType: file.type,
      type: 'upload',
      url: data.url,
      response,
    };
    const photos = [result];
    const newPhotoList = photoList.concat(photos);
    file.cancel(true);
    this.core.getStat().remove(file);
    onChange({
      value: photos,
    }, newPhotoList);
  }

  stopListen() {
    this.core.off(Events.FILE_UPLOAD_START, this.fileuploadstart);
    this.core.off(Events.FILE_UPLOAD_PROGRESS, this.fileuploadprogress);
    this.core.off(Events.FILE_UPLOAD_SUCCESS, this.fileuploadsuccess);
    this.core.off(Events.FILE_UPLOAD_ERROR, this.fileuploaderror);
  }


  handleDeleteImage(index) {
    this.props.onDelete(index);
  }

  // 点击预览
  handlePreview(current) {
    const t = this;
    const { type } = t.props;
    if (type === 'photo') {
      const photos = t.props.photoList.map(item => (
        { src: autoFixUrl(item.url || (item.response && item.response.url) || '') }
      ));
      this.viewer = ImageViewer.show({
        photos,
        current,
      });
    }
  }

  render() {
    const {
      columns, placeholder, label,
      photoList, required, locale,
      maxUpload, readOnly, className, tip, errMsg,
      onImagePreview, type,
    } = this.props;
    const paneProps = {
      columns,
      placeholder,
      className,
      type,
      label,
      locale,
      photoList,
      maxUpload,
      readOnly,
      filesLengthInCore: this.core ? this.core.getTotal() : 0,
      tip,
      errMsg,
      required,
      files: this.getFiles(),
      ref: (c) => { this.pane = c; },
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
  max: 3, // 钉钉组件一次性最多选择上传3张照片
  maxUpload: 12, // 总共上传图片总数
  readOnly: false,
  onChange: noop,
  photoList: [],
  locale: 'zh-cn',
  autoPending: true,
  icon: undefined,
  corpId: undefined,
  placeholder: undefined,
  onDelete: undefined,
  onImagePreview: undefined,
  required: undefined,
  name: undefined,
  url: undefined,
  className: undefined,
  tip: undefined,
  errMsg: undefined,
  type: 'photo',
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: PropTypes.object,
  columns: PropTypes.number,
  multiple: PropTypes.bool,
  corpId: PropTypes.string,
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
  name: PropTypes.string,
  url: PropTypes.string,
  autoPending: PropTypes.bool,
  className: PropTypes.string,
  tip: PropTypes.string,
  errMsg: PropTypes.string,
  type: PropTypes.oneOf(['file', 'photo']),
};

PhotoField.displayName = 'PhotoField';

export default PhotoField;
