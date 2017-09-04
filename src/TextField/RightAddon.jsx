import classnames from 'classnames';
import React from 'react';
import { prefixClass } from '../Context';

const RightAddon = props => (
  <div
    className={classnames({
      [prefixClass('text-field-right-addon')]: true,
    })}
  >
    {props.children}
  </div>
);

RightAddon.defaultProps = {};
RightAddon.propTypes = {
  focus: React.PropTypes.bool,
  hover: React.PropTypes.bool,
  children: React.PropTypes.any,
};
RightAddon.displayName = 'RightAddon';

export default RightAddon;
