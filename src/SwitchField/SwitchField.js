/**
 * SwitchField Component for tingle
 * @dongrui.yang
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
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
        className={classnames(Context.prefixClass('switch-field'), t.props.className, {
          readOnly: t.props.readOnly,
        })}
      >
        <div className="t-FBH">
          <div className="t-FB1" />
          <Switch
            on={this.props.on}
            readOnly={t.props.readOnly}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </Field>
    );
  }
}

SwitchField.defaultProps = {
  label: '',
  className: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
SwitchField.propTypes = {
  label: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  on: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

SwitchField.displayName = 'SwitchField';

export default SwitchField;
