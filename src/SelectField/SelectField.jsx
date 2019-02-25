/**
 * SelectField Component for SaltUI
 * @author caoke.ck
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AngleRight from 'salt-icon/lib/AngleRight';
import Context from '../Context';
import Slot from '../Slot';
import Field from '../Field';
import isEqual from 'lodash/isEqual';

const isNil = value => (value === null || value === undefined);

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
    const { value } = props;
    t.state = {
      value: isNil(value) ? value : [value],
      confirmedValue: [value],
      preValue: value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(state.preValue, props.value)) {
      const { value } = props;
      return ({
        value: isNil(value) ? value : [value],
        confirmedValue: [value],
        preValue: value,
      });
    }
    return null;
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly && !t.props.disabled) {
      t.slot.show();
    }
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  handleConfirm(value) {
    this.props.onSelect(value[0]);
  }

  handleCancel() {
    const t = this;
    t.setState({
      value: t.state.confirmedValue,
    });
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon;
    }
    return null;
  }

  render() {
    const t = this;
    const middleIcon = !t.props.readOnly ? (
      <AngleRight
        className={Context.prefixClass('select-field-icon')}
        width={26}
        height={26}
        onClick={t.handleClick.bind(t)}
      />
    ) : null;
    return (
      <Field
        {...t.props}
        middleIcon={middleIcon}
        className={classnames(Context.prefixClass('select-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick.bind(t)} className={Context.prefixClass('select-field-content')}>
          {
            !t.state.confirmedValue[0]
            ? <div className={Context.prefixClass('omit select-field-placeholder')}>{t.props.placeholder}</div>
            : null
          }
          {t.state.confirmedValue[0] ? (
            <div className={Context.prefixClass('select-field-value FBH FBAC')}>
              <span
                className={classnames(Context.prefixClass('FB1 omit'), {
                  [Context.prefixClass('select-field-readonly')]: !!t.props.readOnly,
                })}
              >{t.props.formatter(t.state.confirmedValue[0])}
              </span>
            </div>
          ) : null}
          {/*{t.renderIcon(middleIcon)}*/}
        </div>
        <Slot
          ref={(c) => { this.slot = c; }}
          title={t.props.label}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          data={[t.props.options]}
          value={t.state.value}
          onChange={t.handleChange.bind(t)}
          onCancel={t.handleCancel.bind(t)}
          onConfirm={t.handleConfirm.bind(t)}
        />
      </Field>
    );
  }
}

SelectField.defaultProps = {
  formatter: (value) => {
    if (value) {
      if (value.text !== undefined) {
        return value.text;
      }
      if (value.value !== undefined) {
        return value.value;
      }
    }
    return '';
  },
  onSelect() { },
  readOnly: false,
  placeholder: '',
  className: undefined,
  value: undefined,
  disabled: false,
  icon: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  formatter: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
};

SelectField.displayName = 'SelectField';
polyfill(SelectField);
export default SelectField;
