/**
 * Field Component Demo for SaltUI
 * @author
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import React from 'react';
import FormGroup from '../../src/FormGroup';
import TextField from '../../src/TextField';
import Group from '../../src/Group';
import SelectField from '../../src/SelectField';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const Field = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 0, text: '一月' },
        { value: 1, text: '二月' },
        { value: 2, text: '三月' },
        { value: 3, text: '四月' },
        { value: 4, text: '五月' },
        { value: 5, text: '六月' },
        { value: 6, text: '七月' },
        { value: 7, text: '八月' },
        { value: 8, text: '九月' },
        { value: 9, text: '十月' },
        { value: 10, text: '十一月' },
        { value: 11, text: '十二月' },
      ],
    };
    this.textChange = this.textChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.groupChange = this.groupChange.bind(this);
  }

  textChange(value, index) {
    console.log('Field Change: ', value, index);
  }

  selectChange(value, index) {
    console.log('Field Change: ', value, index);
  }

  groupChange(type, value, data) {
    console.info('Group Change: ', type, value, data);
  }

  render() {
    return (
      <div>
        <Group.List >
          <FormGroup
            onChange={this.groupChange}
            data={[{ textValue: 'test' }]}
            title={index => `表单组${index}`}
            className="other-classname"
          >
            <TextField
              label="标题"
              placeholder="请输入"
              layout="v"
              onChange={this.textChange}
              name="textValue"
            />
            <SelectField
              label="下拉选择"
              options={this.state.options}
              onSelect={this.selectChange}
              name="selectValue"
            />
          </FormGroup>
        </Group.List>
      </div>
    );
  }
}

export default Demo;
