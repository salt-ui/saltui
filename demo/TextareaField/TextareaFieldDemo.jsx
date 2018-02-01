/**
 * TextareaField Component Demo for tingle
 * @author zhangshun@alipay.com
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import Group from 'salt-group';
import React from 'react';
import TextareaField from 'salt-textarea-field';

const { Count } = TextareaField;

// build之后, 测试一下下面一行, 把上面一行注释掉
// const TextareaField = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t1: '默认文案',
      t2: '曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。曾经有一份真诚的爱情摆在我的面前，我没有珍惜，等到失去的时候才后悔莫及，人世间最痛苦的事莫过于此。',
      t3: '',
    };
  }

  handleChange(name, value) {
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">多行文本框</Group.Head>
        <Group.List>
          <TextareaField
            layout="h"
            label="俩字"
            minRows={1}
            maxRows={5}
            placeholder="设置2个行高"
            readOnly
            value={t.state.t1}
            tip={<p>这里有个tip<a href="http://www.taobao.com" target="_blank" rel="noopener noreferrer">这是个链接</a></p>}
            onChange={(value) => { t.handleChange('t2', value); }}
          />
        </Group.List>
        <Group.List>
          <TextareaField
            label="三个字" minRows={2} maxRows={5}
            placeholder="3个行高 最大5个行高"
            value={t.state.t1}
            onChange={(value) => { t.handleChange('t1', value); }}
          />
        </Group.List>
        <Group.List>
          <TextareaField
            layout="v" label="标题如果特别长，可以选择使用上下结构"
            placeholder="请输入"
            tip="这里也有个提示"
            onChange={(value) => { t.handleChange('t3', value); }}
          />
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">计数器</Group.Head>
        <Group.List>
          <TextareaField
            label="计数器"
            value={t.state.t2}
            readOnly
            onChange={(value) => { t.handleChange('t2', value); }}
          >
            <Count total={300} length={t.state.t2.length} />
          </TextareaField>
        </Group.List>
      </div>
    );
  }
}

export default Demo;
