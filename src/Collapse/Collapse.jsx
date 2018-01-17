/**
 * Collapse Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import RcCollapse from 'rc-collapse';
import assign from 'object-assign';
import Context from '../Context';

class Collapse extends RcCollapse {}

Collapse.displayName = 'Collapse';
Collapse.propTypes = RcCollapse.propTypes;
Collapse.defaultProps = assign({}, RcCollapse.defaultProps, {
  prefixCls: Context.prefixClass('collapse'),
});

export default Collapse;
