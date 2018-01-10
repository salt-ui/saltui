import React from 'react';
import classnames from 'classnames';
import OptionCheckedIcon from 'salt-icon/lib/OptionChecked';
import { prefixClass } from '../Context';

function renderIcon(checked, position) {
  return (
    <div className={classnames(prefixClass('radio-field-icon-wrapper FBAC FBH'), {
            [position]: !!position,
        })}
    >
      <OptionCheckedIcon
        width={16}
        height={16}
        className={classnames(prefixClass('radio-field-icon'), {
                    'un-checked': !checked,
                })}
      />
    </div>
  );
}

export default renderIcon;
