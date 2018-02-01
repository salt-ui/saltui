/**
 * Card Component for tingle
 * @author caiyongmin
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

class Card extends React.Component {
  render() {
    const t = this;
    const className = classnames(
      Context.prefixClass('card'),
      {
        'card-mode-full': t.props.mode === 'full',
        [t.props.className]: !!t.props.className,
      },
    );

    return (
      <div className={className}>
        {t.props.children}
      </div>
    );
  }
}

Card.defaultProps = {
  mode: 'normal',
  className: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
Card.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'full']),
};

Card.displayName = 'Card';

export default Card;
