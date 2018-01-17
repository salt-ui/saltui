/**
 * SelectField Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Group from 'salt-group';

import SelectField from 'salt-select-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const SelectField = require('../../dist');

const monthArray = [
  { value: 0, text: '一月' }, { value: 1, text: '二月' },
  { value: 2, text: '三月' }, { value: 3, text: '四月' },
  { value: 4, text: '五月' }, { value: 5, text: '六月' },
  { value: 6, text: '七月' }, { value: 7, text: '八月' },
  { value: 8, text: '九月' }, { value: 9, text: '十月' },
  { value: 10, text: '十一月' }, { value: 11, text: '十二月' },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    t.state = {
      value: null,
      value1: monthArray[6],
    };
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  handleChange1(value) {
    this.setState({
      value1: value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">滚动选择器演示</Group.Head>
          <Group.List>
            <SelectField readOnly={false} label="没有默认值" options={monthArray} onSelect={t.handleChange.bind(t)} value={t.state.value} placeholder="请输入" />
            <SelectField readOnly={false} label="有默认值" options={monthArray} onSelect={t.handleChange1.bind(t)} value={t.state.value1} tip="这里是tip" />
            <SelectField readOnly label="不可选" options={monthArray} value={t.state.value1} />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
