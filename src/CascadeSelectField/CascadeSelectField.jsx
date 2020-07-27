/**
 * CascadeSelectField Component for SaltUI
 * @author caoke.ck
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
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
import { filter, concat } from 'lodash';

function parseProps(props) {
  const { options, readOnly, mode } = props;
  let value = cloneDeep(props.value || []);
  // 过滤undefinded
  value = value.filter(i => i);
  let cursor = options;
  const newOptions = [];
  const confirmedValue = value.length ? value : [];
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    newOptions[deep] = cursor.map((o, i) => {
      let option;
      if(mode === 'dynamic'){
        option = {
          value: o.value,
          text: o.label,
        }
      } else {
        option = {
          value: o.value,
          text: o.label,
          defaultChecked: o.defaultChecked,
        };
      }
      
      let val = value[deep];
      if (typeof val === 'object' && 'value' in value[deep]) {
        val = value[deep].value;
      }
      if (o.value === val) {
        index = i;
        value[deep] = option;
      }
      return option;
    });
    const checkedCursor = cursor.find(o => o.defaultChecked);

    if ((!value || !value.length) && checkedCursor) {
      cursor = checkedCursor.children;
    } else {
      cursor = cursor[index] ? cursor[index].children : null;
    }
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
  // 过滤value，如果数组存在undefinded则过滤掉
  const filterdValue = value.filter(item => item);
  let cursor = options;
  const newOptions = [];
  const newValue = cloneDeep(filterdValue);
  for (let deep = 0; cursor; deep += 1) {
    let index = 0;
    let valueIsFound = false;
    newOptions[deep] = cursor.map((o, i) => {
      const option = {
        value: o.value,
        text: o.label,
      };
      if (deep in filterdValue && o.value === filterdValue[deep].value) {
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

function findOption(target, origin) {
  const newOrigin = origin;
  for (let i = 0; i < newOrigin.length; i++) {
    if (target[0].value === newOrigin[i].value) {
      newOrigin[i].children = target[0].children;
    } else if (newOrigin[i].children) {
      newOrigin[i].children = findOption(target, newOrigin[i].children);
    }
  }
  return newOrigin;
}

function parseOptions(subOptions, currValue, oldOptions, oldOriginOptions) {
  if(subOptions[0].value === currValue[currValue.length - 1].value && subOptions[0].children.length !== 0) {
    const newOriginOptions = findOption(subOptions, oldOriginOptions); 
    const newOptions = parseState(currValue, newOriginOptions);

    return {
      options: newOptions.options,
      originOptions: newOriginOptions,
      value: newOptions.value,
    };
  }
  return {
    options: oldOptions,
    originOptions: oldOriginOptions,
    value: currValue,
  };
}


class CascadeSelectField extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
    // 数据格式化
    t.state = parseProps(props);
    t.state.prevProps = props;
    t.state.popupVisible = false;
    t.state.confirmedValue = props.value ? t.state.value : [];
    t.handleClick = t.handleClick.bind(t);
    t.handleCancel = t.handleCancel.bind(t);
    t.handleChange = t.handleChange.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
  }

  // 外部变更选中值
  static getDerivedStateFromProps(nextProps, state) {
    if (shouldUpdate(state.prevProps, nextProps, ['readOnly', 'options', 'value'])) {
      return { ...parseProps(nextProps), prevProps: nextProps };
    }
    return null;
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly && !t.props.disabled) {
      if (t.props.mode === 'normal') {
        t.slot.show();
      } else if (t.props.mode === 'complex' || 'dynamic') {
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
    if(t.props.mode === 'dynamic') {
      this.props.onChange && this.props.onChange(value)      
    }
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
      />
    ) : null;
    return (
      <Field
        {...t.props}
        middleIcon={icon}
        className={classnames(Context.prefixClass('cascade-select-field'), {
          [t.props.className]: !!t.props.className,
        })}
        onClick={t.handleClick}
      >
        <div>
          {!t.state.confirmedValue.length ? (
            <div className={Context.prefixClass('omit cascade-select-field-placeholder')}>
              {t.props.readOnly ? '' : t.props.placeholder}
            </div>
          ) : (
            ''
          )}
          <div className={Context.prefixClass('cascade-select-field-value FBH FBAC')}>
            <span
              className={classnames(Context.prefixClass('FB1 omit'), {
                [Context.prefixClass('cascade-select-field-readonly')]: !!t.props.readOnly,
              })}
            >
              {t.props.formatter(t.state.confirmedValue)}
            </span>
          </div>
        </div>
        <Popup
          content={
            <CascadeTab
              title={t.props.label}
              locale={t.props.locale}
              confirmText={t.props.confirmText || i18n[t.props.locale].confirmText}
              cancelText={t.props.cancelText || i18n[t.props.locale].cancelText}
              options={t.state.originOptions}
              value={t.state.value}
              onChange={t.handleChange}
              onCancel={t.handleCancel}
              onConfirm={t.handleConfirm}
              activeTab={`tab-${t.props.activeTab}`}
              isDynamic={t.props.mode === 'dynamic'}
              cascadeSize={t.props.cascadeSize}
            />
          }
          stopBodyScrolling={false}
          visible={this.state.popupVisible}
          maskClosable={false}
        />
        {this.props.mode === 'normal' ? (
          <Slot
            ref={(c) => {
              this.slot = c;
            }}
            title={t.props.label}
            data={t.state.options}
            value={t.state.value}
            confirmText={t.props.confirmText || i18n[t.props.locale].confirmText}
            cancelText={t.props.cancelText || i18n[t.props.locale].cancelText}
            onChange={t.handleChange}
            onCancel={t.handleCancel}
            onConfirm={t.handleConfirm}
            columns={t.props.columns}
          />
        ) : null}
      </Field>
    );
  }
}

CascadeSelectField.defaultProps = {
  options: [],
  value: [],
  formatter: value => value.map(v => v.text).join('/'),
  onChange: () => {},
  onSelect: () => {},
  onCancel: () => {},
  readOnly: false,
  placeholder: '',
  columns: [],
  mode: 'normal',
  locale: 'zh-cn',
  className: '',
  confirmText: undefined,
  cancelText: undefined,
  activeTab: 1,
  cascadeSize: 3,
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
  mode: PropTypes.oneOf(['normal', 'complex', 'dynamic']),
  activeTab: PropTypes.number,
  cascadeSize: PropTypes.oneOf(1,2,3,4),
};

CascadeSelectField.displayName = 'CascadeSelectField';

polyfill(CascadeSelectField);

export default CascadeSelectField;
