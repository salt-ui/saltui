/**
 * Card Component for SaltUI
 * @author caiyongmin
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from '../Context';
import Header from './Header';
import Body from './Body'
import Footer from './Footer'
import { PropContext } from './prop-context';

class Carder extends Component {
  static Header = Header;
  static Footer = Footer;
  static Body = Body;
  render() {
    const t = this;
    const className = classnames(
      prefixClass('carder'),
      {
        [t.props.className]: !!t.props.className,
      },
    );
    return (
      <PropContext.Provider value={this.props}>
        <div className={className}>
          {t.props.children}
        </div>
      </PropContext.Provider>
    )
  }
}

Carder.defaultProps = {
  className: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
Carder.propTypes = {
  className: PropTypes.string
};

Carder.displayName = 'Carder';

export default Carder;
