/**
 * Group Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Context from '../Context';
import Head from './Head';
import List from './List';

const Group = props => (
  <div className={classnames(Context.prefixClass('group'), {
    [props.className]: !!props.className,
  })}
  >{props.children}
  </div>
);

Group.displayName = 'Group';

Group.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

Group.defaultProps = {
  className: undefined,
  children: undefined,
};

Group.Head = Head;
Group.List = List;

export default Group;
