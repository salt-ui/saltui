/**
 * SwitchField Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';

import SwitchField from 'salt-switch-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const SwitchField = require('../../dist');
import Group from 'salt-group';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
      on1: false,
      on2: true,
      on3: false,
    };
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div>
        <Group.List title="开关控件">
          <SwitchField layout="v" label="默认选中" tip="默认选中" on={this.state.on} onChange={this.handleChange.bind(this, 'on')} />
          <SwitchField label="默认没选中" on={this.state.on1} onChange={this.handleChange.bind(this, 'on1')} />
          <SwitchField label="不可选" on={this.state.on2} readOnly onChange={this.handleChange.bind(this, 'on2')} />
          <SwitchField label="不可选" on={this.state.on3} readOnly onChange={this.handleChange.bind(this, 'on3')} />
        </Group.List>
      </div>
    );
  }
}
export default Demo;
