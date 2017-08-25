import React from 'react';
import classnames from 'classnames';

class IconPhoto extends React.Component {
  render() {
    try {
      const Svg = require('../svg/photo.svg');
      return <Svg {...this.props} />
    } catch(e) {
      console.error(`cant't find svg: photo`);
      return null;
    }
  }
}

IconPhoto.defaultProps = {
  className: '',
  name: '',
  width: '32px',
  height: '32px',
  fill: '#000',
  onClick: () => {},
};


// http://facebook.github.io/react/docs/reusable-components.html
IconPhoto.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  fill: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

IconPhoto.displayName = 'IconPhoto';

export default IconPhoto;