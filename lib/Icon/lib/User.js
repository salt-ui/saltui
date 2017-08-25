import React from 'react';
import classnames from 'classnames';

class IconUser extends React.Component {
  render() {
    try {
      const Svg = require('../svg/user.svg');
      return <Svg {...this.props} />
    } catch(e) {
      console.error(`cant't find svg: user`);
      return null;
    }
  }
}

IconUser.defaultProps = {
  className: '',
  name: '',
  width: '32px',
  height: '32px',
  fill: '#000',
  onClick: () => {},
};


// http://facebook.github.io/react/docs/reusable-components.html
IconUser.propTypes = {
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

IconUser.displayName = 'IconUser';

export default IconUser;