import React from 'react';
import classnames from 'classnames';

class IconTotop extends React.Component {
  render() {
    try {
      const Svg = require('../svg/totop.svg');
      return <Svg {...this.props} />
    } catch(e) {
      console.error(`cant't find svg: totop`);
      return null;
    }
  }
}

IconTotop.defaultProps = {
  className: '',
  name: '',
  width: '32px',
  height: '32px',
  fill: '#000',
  onClick: () => {},
};


// http://facebook.github.io/react/docs/reusable-components.html
IconTotop.propTypes = {
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

IconTotop.displayName = 'IconTotop';

export default IconTotop;