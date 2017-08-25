/**
 * DatetimeField Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

const Group = require('@ali/tingle-group');

const DatetimeField = require('../../src');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const DatetimeField = require('../../dist');

class Demo extends React.Component {

  constructor(props) {
    super(props);

    const t = this;
    const now = new Date().getTime();
    t.state = {
      value: null,
      value1: now, // 仅readOnly状态传非Date类型的value才能保证不报错
      value2: now,
      value3: now,
      value4: now,
      value5: now,
      value6: now,
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
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">时间选择器演示</Group.Head>
          <Group.List>
            <DatetimeField label="不可选" value={t.state.value} readOnly />
            <DatetimeField label="没有默认值" onSelect={t.handleChange.bind(t, 'value')} value={t.state.value} placeholder="请输入" tip="这里是提示信息" />
            <DatetimeField readOnly label="年选择" onSelect={t.handleChange.bind(t, 'value1')} value={t.state.value1} columns={['年']} />
            <DatetimeField label="月选择" onSelect={t.handleChange.bind(t, 'value2')} value={t.state.value2} columns={['年', '月']} />
            <DatetimeField label="日选择" onSelect={t.handleChange.bind(t, 'value3')} value={t.state.value3} columns={['年', '月', '日']} />
            <DatetimeField label="时选择" onSelect={t.handleChange.bind(t, 'value4')} value={t.state.value4} columns={['年', '月', '日', '时']} />
            <DatetimeField label="分选择" onSelect={t.handleChange.bind(t, 'value5')} value={t.state.value5} columns={['年', '月', '日', '时', '分']} />
            <DatetimeField label="秒选择" onSelect={t.handleChange.bind(t, 'value6')} value={t.state.value6} columns={['年', '月', '日', '时', '分', '秒']} />
          </Group.List>
        </Group>
      </div>
    );
  }
}

module.exports = Demo;
