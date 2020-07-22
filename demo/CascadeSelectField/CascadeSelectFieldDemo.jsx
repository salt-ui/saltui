/**
 * CascadeSelectField Component Demo for SaltUI
 * @author caoke.ck
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';

import Group from 'salt-group';
import CascadeSelectField from 'salt-cascade-select-field';
import { CndzkEntranceApi } from '@alife/cndzk-entrance-api';
const apiModel = 'cdn';
const apiType = 'cndzk';
const applicationType = 'frontend';
const api = new CndzkEntranceApi({
  apiModel, 
  apiType, 
  applicationType, 
})

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
    defaultChecked: true,
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
      defaultChecked: true,
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
const options1 = [
  {
    value: 'zhejiang',
    label: '浙江',
  }, {
    value: 'jiangsu',
    label: '江苏',
    defaultChecked: true,
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
];
const options2 = [
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
  }
    ]
  }
  ];

const temp = [
  {value: "110000", label: "北京"},
  {value: "120000",
    label: "天津", 
    children: [
    {value: "120100",
    label: "天津市", 
    children: [
      {value: "120101", label: "和平区",
      children:
       [
        {value: "120101001", label: "劝业场街道"},
        {value: "120101002", label: "小白楼街道"},
        {value: "120101003", label: "体育馆街道"},
        {value: "120101004", label: "新兴街道"},
        {value: "120101005", label: "南营门街道"},
        {value: "120101006", label: "南市街道"}
      ]
    },
      {value: "120102", label: "河东区"},
      {value: "120103", label: "河西区"},
      {value: "120104", label: "南开区"},
      {value: "120105", label: "河北区"},
      {value: "120106", label: "红桥区"},
      {value: "120107", label: "塘沽区"},
      {value: "120108", label: "汉沽区"},
      {value: "120109", label: "大港区"},
      {value: "120110", label: "东丽区"},
      {value: "120111", label: "西青区"},
      {value: "120112", label: "津南区"},
      {value: "120113", label: "北辰区"},
      {value: "120114", label: "武清区"},
      {value: "120115", label: "宝坻区"},
      {value: "120116", label: "滨海新区"},
      {value: "120221", label: "宁河区"},
      {value: "120223", label: "静海区"},
      {value: "120225", label: "蓟州区"},
      {value: "120226", label: "其它区"}
    ]
    }
    ]},
  {value: "130000", label: "河北省"},
  {value: "140000", label: "山西省"},
  {value: "150000", label: "内蒙古自治区"},
  {value: "210000", label: "辽宁省"},
  {value: "220000", label: "吉林省"},
  {value: "230000", label: "黑龙江省"},
  {value: "310000", label: "上海"},
  {value: "320000", label: "江苏省"},
  {value: "330000", label: "浙江省"},
  {value: "340000", label: "安徽省"},
  {value: "350000", label: "福建省"},
  {value: "360000", label: "江西省"},
  {value: "370000", label: "山东省"},
  {value: "410000", label: "河南省"},
  {value: "420000", label: "湖北省"},
  {value: "430000", label: "湖南省"},
  {value: "440000", label: "广东省"},
  {value: "450000", label: "广西壮族自治区"},
  {value: "460000", label: "海南省"},
  {value: "500000", label: "重庆"},
  {value: "510000", label: "四川省"},
  {value: "520000", label: "贵州省"},
  {value: "530000", label: "云南省"},
  {value: "540000", label: "西藏自治区"},
  {value: "610000", label: "陕西省"},
  {value: "620000", label: "甘肃省"},
  {value: "630000", label: "青海省"},
  {value: "640000", label: "宁夏回族自治区"},
  {value: "650000", label: "新疆维吾尔自治区"},
  {value: "710000", label: "台湾"},
  {value: "810000", label: "香港特别行政区"},
  {value: "820000", label: "澳门特别行政区"},
  {value: "990000", label: "海外"}
  ]

function parseOptions(options) {
  return options.map((item) => {
    return {
      value: item.id,
      label: item.names.CN,
    }
  })
}

function parseSubOptions(options, selected) {
  return [{
    value: selected.value,
    label: selected.text,
    children: parseOptions(options),
  }]
}
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
      dynamicOptions: [],
      dynamicValue: [
        {text: "天津", value: "120000"},
        {text: "天津市", value: "120100"},
        {text: "和平区", value: "120101"},
        {text: "劝业场街道", value: "120101001"}
      ],
    };
  }

  componentDidMount() {
    const t = this;
    if(t.state.dynamicValue.length === 0) {
      api.get('children', { iso: 'CN', id: '1' }).then((res) => {
        
        t.setState({dynamicOptions: parseOptions(res)})
      })
    } else {
      t.setState({dynamicOptions: temp });
    }
    
  }

  handleChange(field, value) {
    console.log(value);
    this.setState({
      [field]: value,
    });
  }

  handleDynamicChange(selected) {
    console.log(selected)
    return api.get('children', { iso: 'CN', id: selected.value }).then((res) => {
      
      return parseSubOptions(res, selected)
    })
  }

  render() {
    const t = this;
    return (
      <div>
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">级联选择器演示</Group.Head>
          <Group.List>
            <CascadeSelectField locale="en-us" layout="v" label="普通模式" onSelect={t.handleChange.bind(t, 'value')} options={options} value={t.state.value} placeholder="请输入" tip="这里是提示信息" />
            <CascadeSelectField locale="en-us" label="级联模式" mode="complex" onSelect={t.handleChange.bind(t, 'value')} options={options} value={t.state.value} placeholder="请输入" columns={columns} />
            <CascadeSelectField label="查看态" onSelect={t.handleChange.bind(t, 'value')} options={options} value={t.state.value} placeholder="请输入" columns={columns} tip="这里是提示信息" readOnly />
            <CascadeSelectField label="禁用" onSelect={t.handleChange.bind(t, 'value')} options={options} value={t.state.value} placeholder="请输入" columns={columns} tip="这里是提示信息" disabled />
            <CascadeSelectField cascadeSize={4} locale="en-us" label="动态模式" mode="dynamic" options={t.state.dynamicOptions} onSelect={t.handleChange.bind(t, 'dynamicValue')} value={t.state.dynamicValue} onChange={t.handleDynamicChange.bind(t)} placeholder="请输入" columns={columns} />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;


