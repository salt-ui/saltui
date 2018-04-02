import React from 'react';
import PropTypes from 'prop-types';
import DelIcon from 'salt-icon/lib/MinusRound';
import { prefixClass } from '../Context';


class PhotoFieldItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  getDom() {
    return this.root;
  }

  handlePreview() {
    this.props.onPreviewImage(this.props.index);
  }

  handleDelete() {
    this.props.onDeleteImage(this.props.index);
  }

  render() {
    const t = this;
    const style = {
      width: t.props.width,
      height: t.props.width,
    };
    return (
      <div className={prefixClass('PR FL photo-item')} style={style} ref={(c) => { this.root = c; }}>
        <div
          className={prefixClass('photo-item-img')}
          style={{ backgroundImage: `url(${t.props.url})` }}
          alt={t.props.name}
          onClick={t.handlePreview.bind(t)}
        />
        {
          !t.props.readOnly &&
            <DelIcon className={prefixClass('photo-delete-icon')} onClick={() => { this.handleDelete(); }} />
        }

      </div>
    );
  }
}

PhotoFieldItem.defaultProps = {
  readOnly: false,
  index: undefined,
  onPreviewImage: undefined,
  onDeleteImage: undefined,
};

PhotoFieldItem.propTypes = {
  index: PropTypes.number,
  readOnly: PropTypes.bool,
  onPreviewImage: PropTypes.func,
  onDeleteImage: PropTypes.func,
};

export default PhotoFieldItem;
