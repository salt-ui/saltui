/**
 * CitySelectField Component Demo for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import districtData from './staticData';
import CitySelectField from 'salt-city-select-field';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  render() {
    return (
      <div>
        <CitySelectField
          // value={['110000', '110100']}
          layout="v"
          selectorType="province"
          label="省选择"
          placeholder="请选择"
          required
          confirmText="确认"
          cancelText="取消"
          provinceText="省"
          cityText="市"
          districtText="区"
          // readOnly
          districtData={districtData}
          // onSelect={value => this.setState({ value })}
        />
        <CitySelectField
          // value={['110000', '110100']}
          layout="v"
          selectorType="city"
          label="市选择"
          placeholder="请选择"
          required
          confirmText="确认"
          cancelText="取消"
          provinceText="省"
          cityText="市"
          districtText="区"
          // readOnly
          districtData={districtData}
        // onSelect={value => this.setState({ value })}
        />
        <CitySelectField
          // value={['110000', '110100']}
          layout="v"
          selectorType="district"
          label="区选择"
          placeholder="请选择"
          required
          confirmText="确认"
          cancelText="取消"
          provinceText="省"
          cityText="市"
          districtText="区"
          // readOnly
          districtData={districtData}
        // onSelect={value => this.setState({ value })}
        />
        <CitySelectField
          // value={['110000', '110100']}
          layout="v"
          // selectorType="city"
          label="省市区选择"
          placeholder="请选择"
          required
          confirmText="确认"
          cancelText="取消"
          provinceText="省"
          cityText="市"
          districtText="区"
          // readOnly
          districtData={districtData}
          // onSelect={value => this.setState({ value })}
          tip="这里是提示信息"
        />
        <CitySelectField
          // value={['110000', '110100']}
          layout="v"
          // selectorType="city"
          label="省市区选择"
          placeholder="请选择"
          required
          confirmText="确认"
          cancelText="取消"
          provinceText="省"
          cityText="市"
          districtText="区"
          readOnly
          value={['***']}
          districtData={districtData}
        />
      </div>
    );
  }
}

export default Demo;
