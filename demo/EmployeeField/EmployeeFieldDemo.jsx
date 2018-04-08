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
import TextField from 'salt-text-field';
import Button from 'salt-button';


const testData = [
];

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
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">Label文字长度测试</Group.Head>
        <Group.List >
          <TextField
            label="标题"
            placeholder="请输入"
            value={this.state.t1}
            tip="这里是提示信息"
            onChange={(value) => { this.handleTextChange('t1', value); }}
          />
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">EmployeeField演示</Group.Head>
        <Group.List>
          <EmployeeField
            tip="这是一个 tip"
            corpId="dingd8e1123006514592"
            label="选择人员"
            layout="v"
            placeholder="请选择"
            locale="en-us"
            value={this.state.value}
            onChange={(value) => { this.onChange(value); }}
          />
        </Group.List>
        <div
          onTouchEnd={() => { this.delay = Date.now(); }}
          onClick={() => { alert(Date.now() - this.delay); }}
        >测试三百毫秒延迟
        </div>
      </Group>
    );
  }
}

export default EmployeeFieldDemo;
