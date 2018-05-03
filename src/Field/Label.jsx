
import PropTypes from 'prop-types';
import FieldRequired from 'salt-icon/lib/FieldRequired';
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';

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
    <div className={prefixClass(`field-layout-${props.layout}-label-left`)}>
      {props.label}
      {props.required && requiredTag}
    </div>
    {props.right ? (
      <div className={prefixClass(`field-layout-${props.layout}-label-right`)}>
        {props.right}
      </div>
    ) : null}
  </div>
);
Label.defaultProps = {
  label: undefined,
  className: undefined,
  layout: undefined,
  required: undefined,
  right: undefined,
};

Label.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['h', 'v']),
  required: PropTypes.bool,
  right: PropTypes.node,
};

export default Label;
