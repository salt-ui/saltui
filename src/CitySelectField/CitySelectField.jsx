/**
 * CitySelectField Component for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixClass } from '../Context';
import CascadeSelectField from '../CascadeSelectField';
import PickerField from '../PickerField';
import { find, findTree, clearChildren, joinArray } from './utils';
import { shouldUpdate } from '../Utils';

export default class CitySelectField extends Component {
  static initData(props) {
    const {
      districtData, selectorType, mode, value,
    } = props;
    let data = clearChildren(districtData, selectorType);
    if (mode === 'picker') {
      switch (selectorType) {
        case 'province':
          break;
        case 'city':
          data = joinArray(data.map(province => province.children));
          break;
        default:
          data = joinArray(joinArray(data.map(province => province.children))
            .map(city => city.children));
      }
    }
    return {
      value: value || [],
      options: data,
    };
  }
  static displayName = 'CitySelectField';

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    selectorType: PropTypes.string,
    layout: PropTypes.string,
    mode: PropTypes.string,
    tip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    provinceText: PropTypes.string,
    cityText: PropTypes.string,
    districtText: PropTypes.string,
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
    tip: '',
    selectorType: 'default', // default | city | province
    provinceText: '省',
    cityText: '市',
    districtText: '区',
    value: [],
    districtData: [],
    required: false,
    readOnly: false,
    mode: undefined,
    layout: undefined,
    onSelect: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    this.state = CitySelectField.initData(props);
  }

  componentWillReceiveProps(nextProps) {
    if (shouldUpdate(this.props, nextProps, ['districtData', 'selectorType', 'mode', 'value'])) {
      this.setState(CitySelectField.initData(nextProps));
    }
  }

  getPickerValue() {
    const arr = this.props.value;
    const len = arr.length;
    if (len) {
      let parent = { children: this.props.districtData || [] };
      const found = !arr.some((childValue) => {
        if (parent.children) {
          parent = find(parent.children, childValue);
          return !parent;
        }
        return true;
      });
      if (found) {
        const { label, value } = parent;
        return {
          text: label,
          label,
          value,
        };
      }
    }
    return undefined;
  }

  defaultSearchText() {
    return `请输入${{ province: '省份', city: '城市' }[this.props.selectorType] || '区县'}名称进行搜索`;
  }

  pickerSelect(item) {
    const tree = findTree(this.props.districtData || [], item.value);
    this.props.onSelect.call(null, tree.map(node => node.value));
  }

  cascadeSelect(tree) {
    this.props.onSelect.call(null, tree.map(node => node.value));
  }

  render() {
    const {
      className,
    } = this.props;
    const { options } = this.state;
    const fieldClassName = classnames(
      prefixClass('city-select-field'),
      { [className]: !!className },
    );
    if (this.props.mode === 'picker') {
      return (
        <PickerField
          grouping
          groupingIndicator
          searchText={this.defaultSearchText()}
          {...this.props}
          className={fieldClassName}
          options={options}
          value={this.getPickerValue()}
          onSelect={this.pickerSelect.bind(this)}
          formatter={t => t && t.label}
        />
      );
    }
    const levels = { province: 1, city: 2 }[this.props.selectorType] || 3;
    const labels = ['provinceText', 'cityText', 'districtText'].map(k => this.props[k]).slice(0, levels);
    return (<CascadeSelectField
      {...this.props}
      className={fieldClassName}
      options={options}
      mode={this.props.mode === 'slot' ? 'normal' : 'complex'}
      onSelect={this.cascadeSelect.bind(this)}
      columns={labels}
    />);
  }
}
