/**
 * PickerField Component Demo for SaltUI
 * @author longyan
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */

import Group from 'salt-group';
import PickerField from '../../src/PickerField';
import React from 'react';
import AngleRight from 'salt-icon/lib/AngleRight';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const PickerField = require('../../dist');

const monthArray = [
  {
    value: 0, text: '一月', label: '第一个月', phonetic: ['yi', 'yue'],
  },
  {
    value: 1, text: '二月', label: '第二个月', phonetic: ['er', 'yue'],
  },
  {
    value: 2, text: '三月', label: '第三个月', phonetic: ['san', 'yue'],
  },
  {
    value: 3, text: '四月', label: '第四个月', phonetic: ['si', 'yue'],
  },
  {
    value: 4, text: '五月', label: '第五个月', phonetic: ['wu', 'yue'],
  },
  {
    value: 5, text: '六月', label: '第六个月', phonetic: ['liu', 'yue'],
  },
  {
    value: 6, text: '七月', label: '第七个月', phonetic: ['qi', 'yue'],
  },
  {
    value: 7, text: '八月', label: '第八个月', phonetic: ['ba', 'yue'],
  },
  {
    value: 8, text: '九月', label: '第九个月', phonetic: ['jiu', 'yue'],
  },
  {
    value: 9, text: '十月', label: '第十个月', phonetic: ['shi', 'yue'],
  },
  {
    value: 10, text: '十一月', label: '第十一个月', phonetic: ['shi', 'yi', 'yue'],
  },
  {
    value: 11, text: '十二月', label: '第十二个月', phonetic: ['shi', 'er', 'yue'],
  },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    t.state = {
      value: monthArray[6],
      value1: monthArray[5],
      value2: null,
      value3: monthArray[11],
      value4: monthArray[3],
      value5: monthArray[8],
      value6: monthArray[2],
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

  handleChange4(value) {
    this.setState({
      value4: value,
    });
  }

  handleChange5(value) {
    this.setState({
      value5: value,
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
              label="从本地获取"
              options={monthArray}
              onSelect={(e) => {
                t.handleChange(e);
              }}
              value={t.state.value}
              // filterOption={(item, index) => index === 0}

            />
            <PickerField
              label="从接口中获取"
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              onSelect={(e) => {
                t.handleChange1(e);
              }}
              value={t.state.value1}
              customRender={<div>自定义内容</div>}
            />
            <PickerField
              icon={<AngleRight onClick={(e) => { e.stopPropagation(); alert('1'); }} />}
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              fetchDataOnOpen
              layout={'v'}
              label="没有默认值"
              onSelect={(e) => {
                t.handleChange2(e);
              }}
              value={t.state.value2}
              placeholder="请输入"
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="无搜索框"
              onSelect={(e) => {
                t.handleChange3(e);
              }}
              value={t.state.value3}
              tip="这里是tip"
              showSearch={false}
            />
            <PickerField
              // fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              options={monthArray}
              label="多选"
              onSelect={(e) => {
                t.handleChange4(e);
              }}
              locale="en-us"
              value={t.state.value4}
              tip="这里是tip"
              multiple
              formatter={(value, type) => {
                if (type === 'label') {
                  return value && value.label || '';
                }
                return value && value.text || '';
              }}
              resultFormatter={value => (`我已经选择了${value.length}项`)}
            />
            <PickerField
              label="按字母分组"
              options={monthArray}
              onSelect={(e) => {
                t.handleChange5(e);
              }}
              value={t.state.value5}
              grouping
              groupingIndicator
            />
            <PickerField
              fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp"
              label="不可选"
              value={t.state.value6}
              readOnly
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
