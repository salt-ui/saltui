/**
 * CascadeSelectField Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import AngleRight from 'salt-icon/lib/AngleRight';
import Context from '../Context';
import Slot from '../Slot';
import Field from '../Field';
import Popup from '../Popup';
import CascadeTab from './CascadeTab';
import i18n from './i18n';

function parseProps(p) {
  const props = cloneDeep(p);
  let { options, value } = props;
  let cursor = options;
  options = [];
  value = value || [];
  const confirmedValue = value.length ? value : [];
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    options[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      let val = value[deep];
      if ((typeof val === 'object') && ('value' in value[deep])) {
        val = value[deep].value;
      }
      if (o.value === val) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    cursor = cursor[index] ? cursor[index].children : null;
  }
  // when its readOnly mode show whatever passed in values
  if (props.readOnly && props.options && props.options.length <= 0) {
    const values = value.map(v => ({ text: v, value: v }));
    return {
      options: [],
      value: values,
      confirmedValue: values,
      originOptions: p.options,
    };
  }
  return {
    options,
    value,
    confirmedValue,
    originOptions: p.options,
  };
}
/* eslint-disable no-param-reassign */
function parseState(value, options) {
  let cursor = options;
  options = [];
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    let valueIsFound = false;
    options[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      if ((deep in value) && o.value === value[deep].value) {
        index = i;
        value[deep] = option;
        valueIsFound = true;
      }
      return option;
    });
    if (!valueIsFound) {
      [value[deep]] = options[deep];
    }
    cursor = cursor[index] ? cursor[index].children : null;
  }
  return {
    options,
    value,
  };
}
/* eslint-enable no-param-reassign */

class CascadeSelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;

    // 数据格式化
    t.state = parseProps(props);
    t.state.confirmedValue = props.value ? t.state.value : [];
    t.handleClick = t.handleClick.bind(t);
    t.handleCancel = t.handleCancel.bind(t);
    t.handleChange = t.handleChange.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    const t = this;
    t.setState(parseProps(nextProps));
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly) {
      if (t.props.mode === 'normal') {
        t.slot.show();
      } else if (t.props.mode === 'complex') {
        this.showCascadeTab();
      }
    }
  }

  showCascadeTab() {
    const t = this;
    Popup.show(<CascadeTab
      visible
      title={t.props.label}
      locale={t.props.locale}
      confirmText={t.props.confirmText || i18n[t.props.locale].confirmText}
      cancelText={t.props.cancelText || i18n[t.props.locale].cancelText}
      options={t.state.originOptions}
      value={t.state.value}
      onChange={t.handleChange}
      onCancel={t.handleCancel}
      onConfirm={t.handleConfirm}
    />, { maskClosable: false });
  }

  handleChange(value) {
    const t = this;
    t.setState(parseState(value, t.props.options));
  }

  handleConfirm(value) {
    const t = this;
    // 确认选中项目
    t.props.onSelect(value);
    Popup.hide();
  }

  handleCancel() {
    const t = this;
    if (t.state.confirmedValue.length) {
      t.setState(parseState(t.state.confirmedValue, t.props.options));
    }
    Popup.hide();
    t.props.onCancel();
  }

  render() {
    const t = this;
    const icon = !t.props.readOnly ? (
      <AngleRight
        className={Context.prefixClass('cascade-select-field-icon')}
        width={26}
        height={26}
        onClick={t.handleClick}
      />
    ) : null;
    return (
      <Field
        {...t.props}
        layout="h"
        icon={icon}
        className={classnames(Context.prefixClass('cascade-select-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick}>
          {!t.state.confirmedValue.length ? <div className={Context.prefixClass('omit cascade-select-field-placeholder')}>{t.props.placeholder}</div> : ''}
          <div className={Context.prefixClass('cascade-select-field-value FBH FBAC')}>
            <span
              className={classnames(Context.prefixClass('FB1 omit'), {
                [Context.prefixClass('cascade-select-field-readonly')]: !!t.props.readOnly,
              })}
            >{t.props.formatter(t.state.confirmedValue)}
            </span>
          </div>
        </div>
        {
          this.props.mode === 'normal' ?
            <Slot
              ref={(c) => { this.slot = c; }}
              title={t.props.label}
              data={t.state.options}
              value={t.state.value}
              confirmText={t.props.confirmText || i18n[t.props.locale].confirmText}
              cancelText={t.props.cancelText || i18n[t.props.locale].cancelText}
              onChange={t.handleChange}
              onCancel={t.handleCancel}
              onConfirm={t.handleConfirm}
              columns={t.props.columns}
            /> :
            null
        }
      </Field>
    );
  }
}

CascadeSelectField.defaultProps = {
  options: [],
  value: [],
  formatter: value => value.map(v => v.text).join('/'),
  onChange: () => { },
  onSelect: () => { },
  onCancel: () => { },
  readOnly: false,
  placeholder: '',
  columns: [],
  mode: 'normal',
  locale: 'zh-cn',
  className: '',
  confirmText: undefined,
  cancelText: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
CascadeSelectField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  value: PropTypes.array,
  formatter: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  columns: PropTypes.array,
  locale: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'complex']),
};

CascadeSelectField.displayName = 'CascadeSelectField';

export default CascadeSelectField;
