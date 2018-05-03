/**
 * EmployeeField Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Group from 'salt-group';
import EmployeeField from 'salt-employee-field';


const testData = [{
  label: '范范',
  key: '023456',
  avatar: 'https://gw.alicdn.com/tfs/TB1D9YIkb9YBuNjy0FgXXcxcXXa-200-200.jpg',
}, {
  label: '笑笑',
  key: '023457',
}, {
  label: '闹闹',
  key: '023458',
}];

class EmployeeFieldDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: testData,
    };
  }

  onChange(val) {
    this.setState({
      value: val,
    });
  }

  handleTextChange(name, newValue) {
    this.setState({
      [name]: newValue,
    });
    if (newValue.length > 5) {
      this.setState({
        errMsg: '最多输入5个字',
      });
    } else {
      this.setState({
        errMsg: null,
      });
    }
  }

  render() {
    return (
      <Group>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">EmployeeField演示</Group.Head>
        <Group.List>
          <EmployeeField
            tip="这是一个 tip"
            corpId="dingd8e1123006514592"
            label="选择人员"
            layout="v"
            multiple
            placeholder="请选择"
            locale="en-us"
            enableNW
            value={this.state.value}
            onChange={(value) => { this.onChange(value); }}
          />
        </Group.List>
      </Group>
    );
  }
}

export default EmployeeFieldDemo;
