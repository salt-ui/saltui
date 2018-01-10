import React from 'react';
import Icon from 'salt-icon';
import classnames from 'classnames';
import { prefixClass } from '../Context';

function renderIcon(checked, disable) {
  const iconClassName = classnames(prefixClass('checkbox-field-icon'), {
    checked,
    'un-checked': !checked,
    disable,
  });
  return (
    checked ?
      <Icon
        key="check-round"
        width={26}
        height={26}
        name="check-round"
        className={iconClassName}
      /> : <div className={iconClassName} />
  );
}

export default renderIcon;
