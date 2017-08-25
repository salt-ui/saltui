/**
 * EmployeeField Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Group from '@ali/tingle-group';
import EmployeeField from '../../src';

const testData = [
  {
    key: '087181',
    label: '王思佳',
    avatar: '',
  },
  {
    key: '006938',
    label: '欧阳丹林',
    avatar: '',
  },
  {
    key: '002155',
    label: '上官汉峰',
    avatar: '//static.dingtalk.com/media/lADOAAkA5M0C7s0C7g_750_750.jpg',
  },
  {
    key: '095988',
    label: 'EVANS, John Michael',
    avatar: '//static.dingtalk.com/media/lADOAKMxp8zAzME_193_192.jpg',
  },
  {
    key: '096792',
    label: 'FREIHERR VON BIBRA,Theodore Terry',
    avatar: '//static.dingtalk.com/media/lADOA4xDIs0E2s0E1w_1239_1242.jpg',
  },
  {
    key: '067955',
    label: '曹柯',
    avatar: '//static.dingtalk.com/media/lADOAH-AccyWzJU_149_150.jpg',
  },
  {
    key: '065301',
    label: '马泉蕴',
    avatar: '//static.dingtalk.com/media/lADOEZlvDs0C7s0C7A_748_750.jpg',
  },
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
            corpId="dingd8e1123006514592"
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
