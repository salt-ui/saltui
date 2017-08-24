/**
 * Icon Component for tinglejs
 * @auther guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';

class Icon extends React.Component {
  render() {
    try {
      const CamelName = this.props.name.split('-').map(item => item[0].toUpperCase() + item.slice(1)).join('');
      const Svg = require(`../lib/${CamelName}.js`);
      return <Svg {...this.props} />;
    } catch (e) {
      console.error(`cant't find svg: ${this.props.name}`);
      return null;
    }
  }
}

Icon.defaultProps = {
  className: '',
  name: '',
  width: '32px',
  height: '32px',
  fill: '#000',
  onClick: () => {},
};


// http://facebook.github.io/react/docs/reusable-components.html
Icon.propTypes = {
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

Icon.displayName = 'Icon';

export default Icon;
