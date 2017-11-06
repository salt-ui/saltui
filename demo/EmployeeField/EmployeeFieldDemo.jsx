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

  render() {
    return (
      <Group>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">EmployeeField演示</Group.Head>
        <Group.List>
          <EmployeeField
            tip="这是一个 tip"
            label="选择人员"
            placeholder="请选择"
            value={this.state.value}
            onChange={(value) => { this.onChange(value); }}
          />
        </Group.List>
      </Group>
    );
  }
}

export default EmployeeFieldDemo;
