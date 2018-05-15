import React from 'react';
import PropTypes from 'prop-types';
import { Status } from 'uploadcore';
import UploadIcon from 'salt-icon/lib/Upload';
import DelIcon from 'salt-icon/lib/MinusRound';
import { prefixClass } from '../Context';
import Circle from './Circle';
import i18n from './i18n';


class PhotoFieldUploadItem extends React.Component {
  handleDelete() {
    this.props.file.cancel();
  }

  renderProgress() {
    if (this.props.file.status === Status.PROGRESS) {
      return (
        <div className={prefixClass('photo-upload-item-box photo-upload-item-box__progress')}>
          <Circle className={prefixClass('photo-progress-icon')} percent={this.props.file.progress.percentage} />
          <DelIcon className={prefixClass('photo-delete-icon')} onClick={() => { this.handleDelete(); }} />
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
          <DelIcon className={prefixClass('photo-delete-icon')} onClick={() => { this.handleDelete(); }} />
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
PhotoFieldUploadItem.defaultProps = {
  file: undefined,
  locale: undefined,
  disabled: false,
};

PhotoFieldUploadItem.propTypes = {
  file: PropTypes.object,
  locale: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PhotoFieldUploadItem;
