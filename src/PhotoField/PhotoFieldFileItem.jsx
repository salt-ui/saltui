import React from 'react';
import PropTypes from 'prop-types';
import DelIcon from 'salt-icon/lib/MinusRound';
import EmptyIcon from 'salt-icon/lib/FileEmpty';
import ExcelIcon from 'salt-icon/lib/FileExcel';
import MusicIcon from 'salt-icon/lib/FileMusic';
import PDFIcon from 'salt-icon/lib/FilePdf';
import PictureIcon from 'salt-icon/lib/FilePicture';
import PPTIcon from 'salt-icon/lib/FilePowerpoint';
import TextIcon from 'salt-icon/lib/FileText';
import VideoIcon from 'salt-icon/lib/FileVideo';
import WordIcon from 'salt-icon/lib/FileWord';
import XMLIcon from 'salt-icon/lib/FileXml';
import ZIPIcon from 'salt-icon/lib/FileZip';
import UploadIcon from 'salt-icon/lib/Refresh';
import { Status } from 'uploadcore';
import classnames from 'classnames';
import Circle from './Circle';
import { prefixClass } from '../Context';

const IconMap = {
  empty: EmptyIcon,
  excel: ExcelIcon,
  music: MusicIcon,
  pdf: PDFIcon,
  picture: PictureIcon,
  powerpoint: PPTIcon,
  text: TextIcon,
  video: VideoIcon,
  word: WordIcon,
  xml: XMLIcon,
  zip: ZIPIcon,
};

const imgExts = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg', 'tiff', 'tif', 'ico', 'jpe',
  'svgz', 'pct', 'psp', 'ai', 'psd', 'raw', 'webp'];

const audioExts = ['aac', 'aif', 'flac', 'iff', 'm4a', 'm4b',
  'mid', 'midi', 'mp3', 'mpa', 'mpc', 'oga', 'ogg', 'ra', 'ram', 'snd', 'wav', 'wma',
];

const videoExts = ['avi', 'divx', 'flv', 'm4v', 'mkv', 'mov',
  'mp4', 'mpeg', 'mpg', 'ogm', 'ogv', 'ogx', 'rm', 'rmvb', 'smil', 'webm', 'wmv', 'xvid',
];

const codeExts = ['js', 'css', 'java', 'php', 'html', 'xml', 'json'];

const compressExts = ['zip', 'rar', '7z'];


class PhotoFieldFileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  getDom() {
    return this.root;
  }

  getTypeIcon() {
    const { ext } = this.props;
    const isImage = extName => imgExts.indexOf(extName) !== -1;
    const isAudios = extName => audioExts.indexOf(extName) !== -1;
    const isVideo = extName => videoExts.indexOf(extName) !== -1;
    const isCode = extName => codeExts.indexOf(extName) !== -1;
    const isZip = extName => compressExts.indexOf(extName) !== -1;
    const isPdf = extName => extName === 'pdf';
    const isExcel = extName => extName === 'excel';
    const isPPT = extName => extName === 'powerpoint';
    const isWord = extName => extName === 'word';
    const isText = extName => extName === 'text';

    switch (true) {
      case isImage(ext):
        return IconMap.picture;
      case isAudios(ext):
        return IconMap.music;
      case isVideo(ext):
        return IconMap.video;
      case isCode(ext):
        return IconMap.xml;
      case isZip(ext):
        return IconMap.zip;
      case isPdf(ext):
        return IconMap.pdf;
      case isExcel(ext):
        return IconMap.excel;
      case isPPT(ext):
        return IconMap.powerpoint;
      case isWord(ext):
        return IconMap.word;
      case isText(ext):
        return IconMap.text;
      default:
        return IconMap.empty;
    }
  }

  handlePreview() {
    this.props.onPreviewImage(this.props.index);
  }

  handleDelete() {
    this.props.onDeleteImage(this.props.index);
  }

  renderProgressIcon() {
    const { file } = this.props;
    if (file.status === Status.PROGRESS) {
      return (
        <Circle
          className={prefixClass('photo-progress-icon')}
          percent={file.progress.percentage}
        />
      );
    }
    if (file.status === Status.ERROR) {
      return (<UploadIcon
        onClick={() => {
          file.pending();
        }}
        className={prefixClass('photo-file-item-type-icon')}
      />);
    }
    return null;
  }

  renderIcon() {
    const { file } = this.props;
    if (file) {
      return this.renderProgressIcon();
    }
    return this.renderTypeIcon();
  }

  renderTypeIcon() {
    const TypeIcon = this.getTypeIcon();
    return <TypeIcon className={prefixClass('photo-file-item-type-icon')} />;
  }

  renderFileName() {
    const { name, file } = this.props;
    return (
      <span className={prefixClass('photo-file-item-name')}>
        {file ? file.name : name}
      </span>
    );
  }

  render() {
    const t = this;
    const { file } = this.props;
    return (
      <div
        className={classnames(prefixClass('photo-file-item'), {
          'is-error': file ? file.status === Status.ERROR : false,
          'is-progress': file ? file.status === Status.PROGRESS : false,
        })}
        ref={(c) => { this.root = c; }}
      >
        {t.renderIcon()}
        {t.renderFileName()}
        {
          !t.props.readOnly &&
          <DelIcon className={prefixClass('photo-file-item-delete-icon')} onClick={() => { this.handleDelete(); }} />
        }

      </div>
    );
  }
}

PhotoFieldFileItem.defaultProps = {
  readOnly: false,
  index: undefined,
  onPreviewImage: undefined,
  onDeleteImage: undefined,
  ext: '',
  name: '',
  file: undefined,
};

PhotoFieldFileItem.propTypes = {
  index: PropTypes.number,
  readOnly: PropTypes.bool,
  onPreviewImage: PropTypes.func,
  onDeleteImage: PropTypes.func,
  ext: PropTypes.string,
  name: PropTypes.string,
  file: PropTypes.object,
};

export default PhotoFieldFileItem;
