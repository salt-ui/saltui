import classnames from 'classnames';
import React from 'react';
import { prefixClass } from '../Context';

const LeftAddon = props => (
  <div
    className={classnames({
      [prefixClass('text-field-left-addon')]: true,
    })}
  >
    {props.children}
  </div>
);

LeftAddon.defaultProps = {};
LeftAddon.propTypes = {
  focus: React.PropTypes.bool,
  hover: React.PropTypes.bool,
  children: React.PropTypes.any,
};
LeftAddon.displayName = 'LeftAddon';

export default LeftAddon;
