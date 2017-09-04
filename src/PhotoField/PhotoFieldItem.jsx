import React from 'react';
import Context from '../Context';
import DelIcon from 'salt-icon/lib/MinusRound';


const prefixClass = Context.prefixClass;

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
    };
    if (!this.state.loaded) {
      style.paddingTop = style.width;
    }
    return (
      <div className={prefixClass('PR FL photo-item')} style={style} ref={(c) => { this.root = c; }}>
        <img
          src="//gw.alicdn.com/tps/TB18GJsIpXXXXatXFXXXXXXXXXX.png"
          preview={t.props.pic}
          onLoad={() => {
            this.setState({
              loaded: true,
            });
          }}
          className={prefixClass('photo-item-img')}
          style={{ backgroundImage: `url(${t.props.url})` }} alt={t.props.name}
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
};

PhotoFieldItem.propTypes = {
  index: React.PropTypes.number,
  readOnly: React.PropTypes.bool,
  onPreviewImage: React.PropTypes.func,
  onDeleteImage: React.PropTypes.func,
};

module.exports = PhotoFieldItem;
