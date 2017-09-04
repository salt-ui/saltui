/**
 * TextField Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const Field = require('../Field');
const CrossRound = require('salt-icon/lib/CrossRound');

const prefixClass = Context.prefixClass;

class TextField extends React.Component {

  getAddons() {
    const addons = {};
    React.Children.forEach(this.props.children, (child) => {
      if (typeof child.type === 'function') {
        if (child.type.displayName === 'LeftAddon' && !addons.left) {
          addons.left = child;
        } else if (child.type.displayName === 'RightAddon' && !addons.right) {
          addons.right = child;
        } else if (child.type.displayName === 'Count' && !addons.count) {
          addons.count = child;
        }
      }
    });
    return addons;
  }

  handleChange(e) {
    const value = this.props.filter(e.target.value);
    this.props.onChange(value, e);
  }

  handleFocus(e) {
    const t = this;
    t.props.onFocus(t.props.value, e);
  }

  handleBlur(e) {
    const t = this;
    t.props.onBlur(t.props.value, e);
  }

  renderInput() {
    const t = this;
    return (
      <div className={prefixClass('text-field-content-main')}>
        <div
          className={classnames(prefixClass('omit text-field-placeholder'), {
            [prefixClass('DN')]: t.props.value !== '',
          })}
        >{t.props.placeholder}</div>
        <input
          className={prefixClass('text-field-input')}
          type={t.props.type} value={t.props.value} readOnly={t.props.readOnly}
          onChange={(e) => { t.handleChange(e); }}
          onFocus={(e) => { t.handleFocus(e); }}
          onBlur={(e) => { t.handleBlur(e); }}
        />
      </div>
    );
  }

  renderLeft(addons) {
    if (addons.left) {
      return addons.left;
    }
    return null;
  }

  renderClear(addons) {
    const { value, allowClear, readOnly } = this.props;
    if (value && allowClear && !readOnly) {
      return (
        <CrossRound
          onClick={(e) => { this.props.onChange('', e); }}
          className={classnames(prefixClass('text-field-clear-icon'), {
            [prefixClass('text-field-clear-icon__hasRight')]: addons.right || addons.count,
          })}
        />
      );
    }
    return null;
  }

  renderRight(addons) {
    if (addons.right) {
      return addons.right;
    }
    if (addons.count) {
      return addons.count;
    }
    return null;
  }

  render() {
    const t = this;
    const addons = t.getAddons();
    return (
      <Field
        {...t.props}
        className={classnames(prefixClass('text-field'), t.props.className, {
          readonly: t.props.readOnly,
        })}
      >
        <div className={prefixClass('text-field-content')}>
          {t.renderLeft(addons)}
          {t.renderInput()}
          {t.renderClear(addons)}
          {t.renderRight(addons)}
        </div>
      </Field>
    );
  }
}

TextField.defaultProps = {
  className: '',
  filter: v => v,
  label: '',
  onChange: Context.noop,
  onFocus: Context.noop,
  onBlur: Context.noop,
  placeholder: '',
  readOnly: false,
  type: 'text',
  value: '',
  allowClear: true,
};

TextField.propTypes = {
  className: React.PropTypes.string,
  filter: React.PropTypes.func,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  children: React.PropTypes.any,
  allowClear: React.PropTypes.bool,
};

TextField.displayName = 'TextField';

module.exports = TextField;
