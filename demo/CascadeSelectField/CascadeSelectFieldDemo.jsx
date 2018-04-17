/**
 * CascadeSelectField Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';

import Group from 'salt-group';
import CascadeSelectField from 'salt-cascade-select-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const CascadeSelectField = require('../../dist');

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [{
          value: 'xihu',
          label: '西湖',
        }, {
          value: 'xixi',
          label: '西溪',
        }, {
          value: 'long',
          label: '名称加长测试名称加长测试名称加长测试名称加长测试名称加长测试名称加长测试名称加长测试名称加长测试名称加长测试',
        }],
      }],
  }, {
    value: 'jiangsu',
    label: '江苏',
    children: [{
      value: 'nanjing',
      label: '南京',
      children: [{
        value: 'zhonghuamen',
        label: '中华门',
      }, {
        value: 'zongtongfu',
        label: '总统府',
      }],
    }, {
      value: 'suzhou',
      label: '苏州',
      children: [{
        value: 'zhuozhengyuan',
        label: '拙政园',
      }, {
        value: 'shizilin',
        label: '狮子林',
      }],
    }],
  },
  // {
  //   value: 'sichuan',
  //   label: '四川',
  // }, {
  //   value: 'hubei',
  //   label: '湖北',
  // }, {
  //   value: 'hunan',
  //   label: '湖南',
  // }, {
  //   value: 'liaoning',
  //   label: '辽宁',
  // },
];
const columns = ['省', '市', '景点'];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    t.state = {
      value: [],
      value1: [
        'zhejiang',
        'hangzhou',
        'xixi',
      ],
    };
  }

  handleChange(field, value) {
    console.log(value);
    this.setState({
      [field]: value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">级联选择器演示</Group.Head>
          <Group.List>
            <CascadeSelectField locale="en-us" layout="v" label="普通模式" onSelect={t.handleChange.bind(t, 'value')} options={options} value={t.state.value} placeholder="请输入" tip="这里是提示信息" />
            <CascadeSelectField locale="en-us" label="级联模式" mode="complex" onSelect={t.handleChange.bind(t, 'value1')} options={options} value={t.state.value1} placeholder="请输入" columns={columns} />
            <CascadeSelectField label="只读模式" onSelect={t.handleChange.bind(t, 'value')} options={[]} value={['***']} placeholder="请输入" columns={columns} tip="这里是提示信息" readOnly />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
