/**
 * CitySelectField Component Demo for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import CitySelectField from 'salt-city-select-field';
import nattyFetch from 'natty-fetch';

// import districtData from './staticData';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      districtData: [],
    };
  }

  componentDidMount() {
    const fetch = nattyFetch.create({
      url: 'https://www.easy-mock.com/mock/5a2f75a26ce8af6869ec49f0/saltui/city-data?jsonp_param_name=callback',
      jsonp: true,
    });
    fetch().then((reuslt) => {
      this.setState({
        districtData: reuslt,
      });
    });
  }

  render() {
    const { districtData } = this.state;
    return (
      <div>
        <CitySelectField
          value={this.state.value}
          selectorType="province"
          label="省选择"
          required
          confirmText="确认"
          cancelText="取消"
          mode="slot"
          districtData={districtData}
          onSelect={value => this.setState({ value })}
        />
        <CitySelectField
          value={this.state.value2}
          selectorType="city"
          label="市选择"
          required
          confirmText="确认"
          cancelText="取消"
          mode="slot"
          districtData={districtData}
          onSelect={value => this.setState({ value2: value })}
        />
        <CitySelectField
          value={this.state.value3}
          label="区选择"
          required
          confirmText="确认"
          cancelText="取消"
          mode="slot"
          districtData={districtData}
          onSelect={value => this.setState({ value3: value })}
        />
        <CitySelectField
          value={['110000', '110100', '110102']}
          label="只读"
          readOnly
          districtData={districtData}
        />
        <CitySelectField
          value={this.state.value4}
          label="级联模式"
          required
          confirmText="确认"
          cancelText="取消"
          districtData={districtData}
          onSelect={value => this.setState({ value4: value })}
        />
        <CitySelectField
          value={this.state.value5}
          label="检索模式"
          required
          selectorType="city"
          mode="picker"
          districtData={districtData}
          onSelect={value => this.setState({ value5: value })}
        />
      </div>
    );
  }
}

export default Demo;
