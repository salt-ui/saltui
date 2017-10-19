/**
 * SwitchField Component for tingle
 * @dongrui.yang
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const Switch = require('../Switch');
const Field = require('../Field');
const classnames = require('classnames');
const Context = require('../Context');

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

module.exports = SwitchField;
