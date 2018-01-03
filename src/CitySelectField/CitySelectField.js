/**
 * CitySelectField Component for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { prefixClass } from '../Context';
import Field from '../Field';
import Selector from './CitySelector';
import { findDistrictObjs, clearChildren } from './utils';

export default class CitySelectField extends Component {
  static displayName = 'CitySelectField';

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    selectorType: PropTypes.string,
    layout: PropTypes.string,
    tip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    value: PropTypes.array,
    districtData: PropTypes.array,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    label: '省市区',
    placeholder: '请选择',
    layout: 'h',    // v | h
    tip: '',
    selectorType: 'default', // default | city | province
    value: [],
    districtData: [],
    required: false,
    readOnly: false,
    onSelect: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // 当前选中值
      value: this.props.value || [],
      // 选择城市的浮层是否弹出
      selectorIsOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  openSelector() {
    if (this.props.readOnly) return;
    this.setState({ selectorIsOpen: true });
  }

  closeSelector() {
    this.setState({ selectorIsOpen: false });
    this.props.onCancel.call(null);
  }

  selectValue(value) {
    this.setState({ value, selectorIsOpen: false });
    this.props.onSelect.call(null, value);
  }

  renderSelector() {
    if (!this.state.selectorIsOpen) return '';
    return (
      <Selector
        {...this.props}
        districtData={clearChildren(this.props.districtData, this.props.selectorType)}
        value={[...this.state.value]}
        onSelect={this.selectValue.bind(this)}
        onCancel={this.closeSelector.bind(this)}
      />
    );
  }

  render() {
    const { className, label, layout, required,
      placeholder, readOnly, districtData, tip } = this.props;
    const fieldProps = { label, layout, required, tip, readOnly };
    const isSelectedValue = !!this.state.value.length;
    const fieldClassName = classnames(
      prefixClass('city-select-field'),
      { [className]: !!className },
    );
    const fieldPlaceholderClassName =
      prefixClass(`omit city-field-placeholder ${isSelectedValue ? 'DN' : ''}`);
    const fieldValueClassName =
      prefixClass(`city-field-value FBH FBAC ${isSelectedValue ? '' : 'DN'}`);
    const fieldValueInnerClassName = classnames(
      prefixClass('FB1 omit'),
      { [prefixClass('city-field-readonly')]: readOnly },
    );
    const iconConfig = readOnly ? null : {
      className: prefixClass('city-field-icon'),
      name: 'angle-right',
      width: 26,
      height: 26,
      onClick: this.openSelector.bind(this),
    };
    let fieldValue = findDistrictObjs(districtData, this.state.value)
      .map(i => i.label).join(' / ');

    // 针对只读模式下，如果没有匹配省份的值，则默认选择 props 传递过来的值
    if (readOnly && !fieldValue) {
      fieldValue = this.props.value.join(' / ');
    }

    return (
      <div className={fieldClassName}>
        <Field {...fieldProps} icon={iconConfig}>
          <div onClick={this.openSelector.bind(this)}>
            <div className={fieldPlaceholderClassName}>
              {placeholder}
            </div>
            <div className={fieldValueClassName}>
              <span className={fieldValueInnerClassName}>
                {fieldValue}
              </span>
            </div>
          </div>
          {this.renderSelector()}
        </Field>
      </div>
    );
  }
}
