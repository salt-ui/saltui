/**
 * Group.Head Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
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
  className: React.PropTypes.string,
};

Head.defaultProps = {};

export default Head;
