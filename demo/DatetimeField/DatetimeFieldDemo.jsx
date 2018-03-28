/**
 * DatetimeField Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */
import React from 'react';

import Group from 'salt-group';
import DatetimeField from 'salt-datetime-field';

// build之后, 测试一下下面一行, 把上面一行注释掉
// const DatetimeField = require('../../dist');

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    const now = new Date().getTime();// 1500353913176

    t.state = {
      value1: '',
      value2: {
        value: '',
        timeType: 'PM',
      },
      value3: {
        value: '***',
        timeType: 'PM',
      },
      value4: '2017-7-20 12:42:44', // '2017-7-20 12:42:44',
      value5: '**ji',
    };
  }

  handleChange(field, value) {
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
            <DatetimeField
              label="日期选择"
              layout="v"
              placeholder="请选择日期"
              disabledDate={() => [
                {
                  end: new Date(),
                },
                {
                  start: new Date(2017, 0, 1),
                  end: new Date(2017, 4, 31),
                },
                {
                  start: new Date(2017, 5, 1),
                  end: new Date(2017, 6, 31),
                },
                {
                  start: new Date(2017, 7, 2),
                  end: new Date(2017, 7, 30),
                },
                {
                  start: new Date(2018, 7, 3),
                  end: new Date(2018, 7, 20),
                },
                new Date(2013, 11, 1),
              ]}
              // minDate={new Date()}
              onSelect={t.handleChange.bind(t, 'value1')}
              value={t.state.value1}
              columns={DatetimeField.YMD}
              tip="这里是提示信息"
            />
            <DatetimeField
              label="日期/上下午选择"
              onSelect={t.handleChange.bind(t, 'value2')}
              value={t.state.value2}
              columns={DatetimeField.YMDT}
              placeholder="请选择日期"
            />
            <DatetimeField
              label="时间选择"
              onSelect={t.handleChange.bind(t, 'value3')}
              value={t.state.value3}
              columns={DatetimeField.YMDWHM}
            />
            <DatetimeField
              label="时间选择"
              readOnly
              onSelect={t.handleChange.bind(t, 'value4')}
              value={t.state.value4}
              columns={DatetimeField.YMDWHM}
            />
            <DatetimeField
              label="日期/上下午选择"
              onSelect={t.handleChange.bind(t, 'value5')}
              value={t.state.value5}
              columns={DatetimeField.YMDT}
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}

export default Demo;
