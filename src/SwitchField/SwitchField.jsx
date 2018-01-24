/**
 * SwitchField Component for tingle
 * @dongrui.yang
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Switch from '../Switch';
import Field from '../Field';
import Context from '../Context';

class SwitchField extends React.Component {
  handleChange(on) {
    this.props.onChange(on);
  }

  render() {
    const t = this;
    return (
      <Field
        {...t.props}
        layout="h"
        className={classnames(Context.prefixClass('switch-field'), t.props.className, {
          readOnly: t.props.readOnly,
        })}
      >
        <div className="t-FBH">
          <div className="t-FB1" />
          <Switch
            on={this.props.on}
            readOnly={t.props.readOnly}
            onChange={(on) => { this.handleChange(on); }}
          />
        </div>
      </Field>
    );
  }
}

SwitchField.defaultProps = {
  className: '',
  onChange() { },
  on: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  on: PropTypes.bool,
  onChange: PropTypes.func,
};

SwitchField.displayName = 'SwitchField';

export default SwitchField;
