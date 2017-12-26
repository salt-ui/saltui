/**
 * PickerField Component Demo for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import Group from 'salt-group';
import PickerField from 'salt-picker-field';

const React = window.React;

// build之后, 测试一下下面一行, 把上面一行注释掉
// const PickerField = require('../../dist');

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
      value2: monthArray[10],
      value3: monthArray[11],
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

  handleChange2(value) {
    this.setState({
      value2: value,
    });
  }

  handleChange3(value) {
    this.setState({
      value3: value,
    });
  }

  render() {
    const t = this;
    return (
      <div>
        <Group>
          <Group.Head className="t-FS14 t-LH1_5 t-LH20 t-PT10 t-PB10 t-PL18">选择器演示</Group.Head>
          <Group.List>
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              fetchDataOnOpen
              label="没有默认值"
              onSelect={(e) => {
                t.handleChange(e);
              }}
              value={t.state.value}
              placeholder="请输入"
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="有默认值"
              onSelect={(e) => {
                t.handleChange1(e);
              }}
              value={t.state.value1}
              tip="这里是tip"
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="无搜索框"
              onSelect={(e) => {
                t.handleChange2(e);
              }}
              value={t.state.value2}
              tip="这里是tip"
              showSearch={false}
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="多选"
              onSelect={(e) => {
                t.handleChange3(e);
              }}
              value={t.state.value3}
              tip="这里是tip"
              multiple
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="不可选"
              value={t.state.value1}
              readOnly
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
