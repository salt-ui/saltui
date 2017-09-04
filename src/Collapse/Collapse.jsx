/**
 * Collapse Component for tingle
 * @author 
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import RcCollapse from 'rc-collapse';
import assign from 'object-assign';

class Collapse extends RcCollapse {}

Collapse.displayName = 'tingle-collapse';
Collapse.propTypes = RcCollapse.propTypes;
Collapse.defaultProps = assign({}, RcCollapse.defaultProps, {
  prefixCls: 'tingle-collapse',
});

export default Collapse;
