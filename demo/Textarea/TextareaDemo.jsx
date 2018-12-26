/**
 * TextareaField Component Demo for SaltUI
 * @author zhangshun@alipay.com
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import Group from 'salt-group';
import React from 'react';
import Textarea from 'salt-textarea';


// build之后, 测试一下下面一行, 把上面一行注释掉
// const TextareaField = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t1: '曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。',
      t2: '',
    };
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h2>Value</h2>
        <Textarea value={this.state.t1} onChange={(e) => { this.handleChange('t1', e.target.value); }} />
        <h2>Placeholder</h2>
        <Textarea placeholder={this.state.t1} value={this.state.t2} onChange={(e) => { this.handleChange('t2', e.target.value); }} />
      </div>
    );
  }
}

export default Demo;
