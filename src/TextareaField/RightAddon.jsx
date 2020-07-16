import React from 'react';
import { prefixClass } from '../Context';

const RightAddon = props => (
  <div className={prefixClass('textarea-field-right-addon')}>
    {props.children}
  </div>
);

RightAddon.displayName = 'RightAddon';

export default RightAddon;
