import React, { PropTypes } from 'react';
import { prefixClass } from '@ali/tingle-context';
import { Status } from 'uploadcore';
import UploadIcon from '@ali/tingle-icon/lib/Upload';
import Circle from './Circle';
import i18n from './i18n';


class PhotoFieldUploadItem extends React.Component {
  renderProgress() {
    if (this.props.file.status === Status.PROGRESS) {
      return (
        <div className={prefixClass('photo-upload-item-box photo-upload-item-box__progress')}>
          <Circle percent={this.props.file.progress.percentage} />
        </div>
      );
    }
    return null;
  }
  renderError() {
    const locale = i18n[this.props.locale];
    if (this.props.file.status === Status.ERROR) {
      return (
        <div
          className={prefixClass('photo-upload-item-box photo-upload-item-box__error')}
          onClick={() => {
            this.props.file.pending();
          }}
        >
          <UploadIcon className={prefixClass('photo-upload-error-icon')} fill="" />
          <span className={prefixClass('photo-upload-error-msg')}>{locale.retry}</span>
        </div>
      );
    }
    return null;
  }
  render() {
    const t = this;
    const style = {
      width: t.props.width,
      paddingTop: t.props.width,
      paddingBottom: '4px',
    };
    return (
      <div className={prefixClass('PR FL photo-item')} style={style} ref={(c) => { this.root = c; }} >
        <div className={prefixClass('photo-upload-item')}>
          {this.renderProgress()}
          {this.renderError()}
        </div>
      </div>
    );
  }
}

PhotoFieldUploadItem.propTypes = {
  file: PropTypes.object,
  locale: PropTypes.string,
};

export default PhotoFieldUploadItem;
