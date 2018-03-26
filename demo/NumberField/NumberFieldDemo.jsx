/**
 * NumberField Component Demo for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Group from 'salt-group';
import Toast from 'salt-toast';
import NumberField from 'salt-number-field';

class NumberFieldDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '15132321.3225',
      cnmobile: '13666666666',
      card: '95599898978788787',
      cnidcard: '331004198309234598w',
      custom: '1232132421424214',
    };
  }

  handleChange(value, key) {
    this.setState({
      [key]: value,
    });
    if (key === 'custom') {
      if (value.length > 5) {
        this.setState({
          errMsg: '不能超过5位',
        });
      } else {
        this.setState({
          errMsg: null,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Group.List>
          <NumberField formatOnBlur tip="请输入金额" label="金额" value={this.state.money} type="money" fixedNum={4} onChange={(value) => { this.handleChange(value, 'money'); }} />
          <NumberField label="手机号" value={this.state.cnmobile} type="cnmobile" onChange={(value) => { this.handleChange(value, 'cnmobile'); }} />
          <NumberField label="银行卡号" value={this.state.card} type="card" onChange={(value) => { this.handleChange(value, 'card'); }} />
          <NumberField label="身份证号" value={this.state.cnidcard} type="cnidcard" onChange={(value) => { this.handleChange(value, 'cnidcard'); }} />
          <NumberField
            label="自定义格式"
            value={this.state.custom}
            onChange={(value) => { this.handleChange(value, 'custom'); }}
            format={(value, delimiter) => value.replace(/(\d{3})(?!$)/g, `$1${delimiter}`)}
          />
          <NumberField
            label="即时校验"
            value={this.state.custom}
            onChange={(value) => { this.handleChange(value, 'custom'); }}
            errMsg={this.state.errMsg}
            toastComponent={Toast}
          />
        </Group.List>
      </div>
    );
  }
}

export default NumberFieldDemo;
