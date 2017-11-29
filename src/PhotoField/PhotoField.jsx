/**
 * PhotoField Component for tingle
 * @author
 * alex.mm
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import ImageViewer from '../ImageViewer';
import { Events, Status } from 'uploadcore';
import UploadCore from 'uploadcore/dist/uploadcore';
import PhotoFieldPane from './PhotoFieldPane';
import { getData } from './util';

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
      picker.addArea(listUploadIcon);
    }
    window.core = this.core;
  }


  componentDidUpdate() {
    if (this.getMax() === 0 && this.picker) {
      this.picker.destroy();
      this.picker = null;
    } else if (this.getMax() > 0 && !this.picker) {
      const uploadIcon = this.pane.getUploadIcon();
      const picker = this.core.getPickerCollector();
      if (uploadIcon) {
        this.picker = picker.addArea(uploadIcon);
      }
    }
  }

  componentWillUnmount() {
    this.stopListen();
  }


  getCore() {
    const options = {
      queueCapcity: this.getMax(),
    };
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
    return core;
  }

  getMax() {
    const { maxUpload, max, photoList } = this.props;
    if (maxUpload && (max > maxUpload - photoList.length)) {
      return maxUpload - photoList.length;
    }
    return max;
  }

  getFiles() {
    if (this.core) {
      return this.core.getFiles().filter(file =>
        [Status.CANCELLED, Status.SUCCESS, Status.QUEUED].indexOf(file.status) === -1
      );
    }
    return [];
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
    const photos = t.props.photoList.map(item => (
      { src: autoFixUrl(item.url || (item.response && item.response.url) || '') }
    ));
    ImageViewer.show({
      photos,
      current,
    });
  }

  render() {
    const { columns, placeholder, label,
      photoList, required, layout, locale,
      maxUpload, readOnly, className, tip } = this.props;
    const paneProps = {
      columns,
      placeholder,
      className,
      label,
      locale,
      photoList,
      maxUpload,
      readOnly,
      tip,
      required,
      files: this.getFiles(),
      layout,
      ref: (c) => { this.pane = c; },
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
  max: 3, // 钉钉组件一次性最多选择上传3张照片
  maxUpload: 12, // 总共上传图片总数
  readOnly: false,
  onChange: noop,
  photoList: [],
  locale: 'zh-cn',
  autoPending: true,
};

// http://facebook.github.io/react/docs/reusable-components.html
PhotoField.propTypes = {
  icon: React.PropTypes.object,
  columns: React.PropTypes.number,
  multiple: React.PropTypes.bool,
  corpId: React.PropTypes.string,
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
  name: React.PropTypes.string,
  url: React.PropTypes.string,
  autoPending: React.PropTypes.bool,
  className: React.PropTypes.string,
  tip: React.PropTypes.string,
};

PhotoField.displayName = 'PhotoField';

module.exports = PhotoField;