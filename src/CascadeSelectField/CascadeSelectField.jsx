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
import { shouldUpdate } from '../Utils';

function parseProps(props) {
  const { options, readOnly } = props;
  const value = cloneDeep(props.value || []);
  let cursor = options;
  const newOptions = [];
  const confirmedValue = value.length ? value : [];
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    newOptions[deep] = cursor.map((o, i) => {
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
  if (readOnly && options && options.length <= 0) {
    const values = value.map(v => ({ text: v, value: v }));
    return {
      options: [],
      value: values,
      confirmedValue: values,
      originOptions: options,
    };
  }
  return {
    options: newOptions,
    value,
    confirmedValue,
    originOptions: options,
  };
}

function parseState(value, options) {
  let cursor = options;
  const newOptions = [];
  const newValue = cloneDeep(value);
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    let valueIsFound = false;
    newOptions[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      if ((deep in value) && o.value === value[deep].value) {
        index = i;
        newValue[deep] = option;
        valueIsFound = true;
      }
      return option;
    });
    if (!valueIsFound) {
      [newValue[deep]] = newOptions[deep];
    }
    cursor = cursor[index] ? cursor[index].children : null;
  }
  return {
    options: newOptions,
    value: newValue,
  };
}

class CascadeSelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;

    // 数据格式化
    t.state = parseProps(props);
    t.state.popupVisible = false;
    t.state.confirmedValue = props.value ? t.state.value : [];
    t.handleClick = t.handleClick.bind(t);
    t.handleCancel = t.handleCancel.bind(t);
    t.handleChange = t.handleChange.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
  }

  // 外部变更选中值
  componentWillReceiveProps(nextProps) {
    if (shouldUpdate(this.props, nextProps, ['readOnly', 'options', 'value'])) {
      const t = this;
      t.setState(parseProps(nextProps));
    }
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly && !t.props.disabled) {
      if (t.props.mode === 'normal') {
        t.slot.show();
      } else if (t.props.mode === 'complex') {
        this.showCascadeTab();
      }
    }
  }

  showCascadeTab() {
    const t = this;
    t.setState({
      popupVisible: true,
    });
  }

  hideCascadeTab() {
    const t = this;
    t.setState({
      popupVisible: false,
    });
  }

  handleChange(value) {
    const t = this;
    t.setState(parseState(value, t.props.options));
  }

  handleConfirm(value) {
    const t = this;
    // 确认选中项目
    t.hideCascadeTab();
    t.props.onSelect(value);
  }

  handleCancel() {
    const t = this;
    if (t.state.confirmedValue.length) {
      t.setState(parseState(t.state.confirmedValue, t.props.options));
    }
    t.hideCascadeTab();
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
        <Popup
          content={<CascadeTab
            title={t.props.label}
            locale={t.props.locale}
            confirmText={t.props.confirmText || i18n[t.props.locale].confirmText}
            cancelText={t.props.cancelText || i18n[t.props.locale].cancelText}
            options={t.state.originOptions}
            value={t.state.value}
            onChange={t.handleChange}
            onCancel={t.handleCancel}
            onConfirm={t.handleConfirm}
          />}
          stopBodyScrolling={false}
          visible={this.state.popupVisible}
          maskClosable={false}
        />
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
