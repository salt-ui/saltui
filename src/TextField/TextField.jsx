/**
 * TextField Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CrossRound from 'salt-icon/lib/CrossRound';
import Context, { prefixClass } from '../Context';
import { renderRight, renderLeft } from './utils';
import Field from '../Field';


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
    const { readOnly } = t.props;
    return (
      <div className={prefixClass('text-field-content-main')}>
        <div
          className={classnames(prefixClass('omit text-field-placeholder'), {
            [prefixClass('DN')]: t.props.value !== '',
          })}
        >{t.props.placeholder}
        </div>
        {!readOnly ? (
          <input
            className={prefixClass('text-field-input')}
            type={t.props.type}
            value={t.props.value}
            readOnly={t.props.readOnly}
            onChange={(e) => { t.handleChange(e); }}
            onFocus={(e) => { t.handleFocus(e); }}
            onBlur={(e) => { t.handleBlur(e); }}
          />
        ) : <span>{t.props.value}</span>}
      </div>
    );
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


  render() {
    const t = this;
    const addons = t.getAddons();
    return (
      <Field
        {...t.props}
        multiLine={t.props.readOnly}
        className={classnames(prefixClass('text-field'), t.props.className, {
          readonly: t.props.readOnly,
        })}
      >
        <div className={prefixClass('text-field-content')}>
          {renderLeft(addons)}
          {t.renderInput()}
          {t.renderClear(addons)}
          {renderRight(addons)}
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
  children: undefined,
};

TextField.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.func,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.any,
  allowClear: PropTypes.bool,
};

TextField.displayName = 'TextField';

export default TextField;
