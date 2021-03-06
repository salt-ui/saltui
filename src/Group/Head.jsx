/**
 * Group.Head Component for SaltUI
 * @author gnosaij
 *
 * Copyright 2018-2019, SaltUI Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

const Head = props => (
  <div
    className={classnames(Context.prefixClass('group-head'), {
      [props.className]: !!props.className,
    })}
  >{props.children}
  </div>
);

Head.displayName = 'Group.Head';

Head.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

Head.defaultProps = {
  className: undefined,
  children: undefined,
};

export default Head;
