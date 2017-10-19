

import Context from '../Context';
import FieldRequired from 'salt-icon/lib/FieldRequired';
import React from 'react';
import classnames from 'classnames';

const { prefixClass } = Context;

const requiredTag = (
  <FieldRequired
    className={prefixClass('field-layout-label-required')}
    width={6}
    height={6}
    fill="red"
  />
);

const Label = props => (
  <div
    className={classnames(prefixClass(`field-layout-${props.layout}-label`), {
      [props.className]: !!props.className,
    })}
  >
    {props.label}
    {props.required && requiredTag}
  </div>
);

Label.propTypes = {
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  layout: React.PropTypes.oneOf(['h', 'v']),
  required: React.PropTypes.bool,
};

export default Label;
