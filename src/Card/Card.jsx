/**
 * Card Component for SaltUI
 * @author shixin
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

class Card extends Component {
  static Header = Header;
  static Footer = Footer;
  static Body = Body;

  getChildContext () {
    return {
      locale: this.props.locale
    }
  }
  
  render() {
    const t = this;
    const className = classnames(
      prefixClass('card'),
      {
        'card-mode-full': t.props.mode === 'full',
        [t.props.className]: !!t.props.className,
      },
    );
    return (
      <div className={className}>
        {t.props.children}
      </div>
    )
  }
}

Card.childContextTypes = {
  locale: PropTypes.string,
}

Card.defaultProps = {
  mode: 'normal',
  className: '',
  locale: 'zh-cn'
};
// http://facebook.github.io/react/docs/reusable-components.html
Card.propTypes = {
  mode: PropTypes.oneOf(['normal', 'full']),
  className: PropTypes.string,
  locale: PropTypes.string
};

Card.displayName = 'Card';

export default Card;
