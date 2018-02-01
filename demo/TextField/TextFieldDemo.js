/**
 * TextField Component Demo for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';

import Group from 'salt-group';
import Toast from 'salt-toast';
import TextField from 'salt-text-field';

const { LeftAddon, RightAddon, Count } = TextField;

console.log(RightAddon);

// build之后, 测试一下下面一行, 把上面一行注释掉
// const TextField = require('../../dist');

const numberRegExp = /^(\d+\.\d*)|(\d+\.)|\d+/;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t1: '',
      t2: '',
      number: '',
    };
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

  handleNumberChange(newValue) {
    this.setState({
      number: newValue,
    });
  }

  numberFilter(originValue) {
    const matches = originValue.match(numberRegExp);
    let number = '';
    if (matches) {
      number = matches[0];
    }
    return number;
  }

  handleNumberBlur(originValue) {
    this.setState({
      number: originValue.replace(/\.$/, '').replace(/^0*([0-9]+)/, '$1'),
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">Label文字长度测试</Group.Head>
        <Group.List >
          <TextField
            label="标题"
            placeholder="请输入"
            value={t.state.t1}
            tip="这里是提示信息"
            onChange={(value) => { t.handleTextChange('t1', value); }}
          />
          <TextField
            label="仅限数字" placeholder="请输入"
            filter={value => t.numberFilter(value)}
            value={t.state.number}
            onBlur={(value) => { t.handleNumberBlur(value); }}
            onChange={(value) => { t.handleNumberChange(value); }}
          />
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">不可修改</Group.Head>
        <Group.List>
          <TextField label="只读" value="不能更改不能更改不能更改不能更改不能更改不能更改不能更改不能更改" readOnly />
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">只读没有placeholder</Group.Head>
        <Group.List>
          <TextField label="不可修改" value="这是一个只读的状态" readOnly />
        </Group.List>
        <Group.List>
          <TextField
            placeholder="请输入"
            label="上下结构"
            layout="v"
            value={t.state.t2}
            onChange={(value) => { t.handleTextChange('t2', value); }}
          />
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">前缀</Group.Head>
        <Group.List>
          <TextField
            label="前缀"
            value={t.state.t1}
            onChange={(value) => { t.handleTextChange('t1', value); }}
            placeholder="请输入"
          >
            <LeftAddon>
              <span>￥</span>
            </LeftAddon>
          </TextField>
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">后缀</Group.Head>
        <Group.List>
          <TextField
            label="后缀" value={t.state.t1}
            onChange={(value) => { t.handleTextChange('t1', value); }}
          >
            <RightAddon>
              <span>PST</span>
            </RightAddon>
          </TextField>
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">计数器</Group.Head>
        <Group.List>
          <TextField
            label="计数器" value={t.state.t1}
            onChange={(value) => { t.handleTextChange('t1', value); }}
          >
            <Count total={20} length={t.state.t1.length} />
          </TextField>
        </Group.List>
        <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">即时校验</Group.Head>
        <Group.List>
          <TextField
            label="即时校验" value={t.state.t1}
            onChange={(value) => { t.handleTextChange('t1', value); }}
            errMsg={t.state.errMsg}
            toastComponent={Toast}
          />
        </Group.List>
      </div>
    );
  }
}
export default Demo;
